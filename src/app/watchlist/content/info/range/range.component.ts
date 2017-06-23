import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'mp-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})

export class RangeComponent implements OnChanges {
  @Input() options: RangeOptionsInterface = {};
  position: RangePositionInterface = {};

  ngOnChanges() {
    if (this.options) {
      this.position = this.getPosition(this.options);
    }
  }

  private getPosition(options: RangeOptionsInterface) {
    const total: number = Number(options.end) - Number(options.start);
    return {
      left: ((Number(options.activeStart) - Number(options.start)) / total) * 100,
      width: ((Number(options.activeEnd) - Number(options.activeStart)) / total) * 100,
      pin: ((Number(options.active) - Number(options.start)) / total) * 100
    };
  }
}

export interface RangeOptionsInterface {
  text?: string;
  start?: number;
  end?: number;
  activeStart?: number;
  activeEnd?: number;
  active?: number;
}

export interface RangePositionInterface {
  left?: number;
  width?: number;
  pin?: number;
}
