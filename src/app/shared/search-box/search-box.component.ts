import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'mp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnChanges, OnDestroy {
  @Input() value: string;
  @Input() active: boolean;
  @Output() changed: EventEmitter<string> = new EventEmitter();
  @Output() activate: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  formControl: FormControl = new FormControl();
  private windowClickListener: Function;
  private ngOnDestroy$ = new Subject<boolean>();

  constructor(private renderer: Renderer) {
    this.formControl.valueChanges
      .takeUntil(this.ngOnDestroy$)
      .debounceTime(500)
      .subscribe(value => this.changed.emit(value));
  }

  ngOnChanges(changes: any) {
    if (changes.value) {
      this.formControl.setValue(this.value, {});
    }

    if (changes.active && this.active) {
      setTimeout(() => {
        this.input.nativeElement.focus();
      }, 0);
    }
  }

  activateInput() {
    if (!this.windowClickListener) {
      this.windowClickListener = this.renderer.listenGlobal('window', 'click',
        (event: any) => {
          if (!event.target.parentElement ||
            (event.target.parentElement.className.indexOf('mp-search-box') === -1 &&
            event.target.className.indexOf('mdl-button') === -1)) {
            this.toggleActive(false);
            this.formControl.setValue('', {});
            this.destroyListener();
          }
        });
      this.toggleActive(true);
    }
  }

  clear() {
    this.formControl.setValue('', {});
    this.changed.emit(null);
    this.input.nativeElement.focus();
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(true);
    this.destroyListener();
  }

  private toggleActive(active: boolean) {
    this.active = active;
    this.activate.emit(active);
  }

  private destroyListener() {
    if (this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }
}
