import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  Renderer,
  ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'mp-search-box',
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.css']
})

export class SearchBoxComponent implements OnChanges {
  @Input() value:string;
  @Input() active:boolean;
  @Output() changed:EventEmitter<string> = new EventEmitter();
  @Output() activate:EventEmitter<boolean> = new EventEmitter();
  @ViewChild('input') input:ElementRef;
  formControl:FormControl = new FormControl();
  private windowClickListener: Function;

  constructor(private renderer:Renderer) {
    this.formControl.valueChanges
      .debounceTime(500)
      .subscribe(value => this.changed.emit(value));
  }

  ngOnChanges(changes:any) {
    if (changes.value) {
      this.formControl.setValue(this.value, {});
    }

    if (changes.active && this.active) {
      setTimeout(() => {
        this.input.nativeElement.focus();
      },0);
    }
  }

  activateInput() {
    if(!this.windowClickListener) {
      this.windowClickListener = this.renderer.listenGlobal('window', 'click',
        (event:any) => {
          if(!event.target.parentElement || event.target.parentElement.className.indexOf('mp-search-box') === -1) {
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
    this.destroyListener();
  }

  private toggleActive(active:boolean) {
    this.active = active;
    this.activate.emit(active);
  }

  private destroyListener() {
    if(this.windowClickListener) {
      this.windowClickListener();
      this.windowClickListener = null;
    }
  }
}
