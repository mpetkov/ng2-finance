import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'mp-search-box',
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.css']
})

export class SearchBoxComponent implements OnChanges, AfterViewInit {
  @Input() value:string;
  @Output() changed:EventEmitter<string> = new EventEmitter();
  @ViewChild('input') input;
  formControl:FormControl = new FormControl();

  constructor() {
    this.formControl.valueChanges
      .debounceTime(300)
      .subscribe(value => this.changed.emit(value));
  }

  ngAfterViewInit() {
    console.log(this.input);
    this.input.nativeElement.focus();
  }

  ngOnChanges(changes:any) {
    if (changes.value) {
      this.formControl.setValue(this.value, {});
    }
  }

  clear() {
    this.formControl.setValue('', {});
    this.changed.emit(null);
    this.input.nativeElement.focus();
  }
}
