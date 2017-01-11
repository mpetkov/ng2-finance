import { Component } from '@angular/core';
import { ChartsService } from './chart.service';

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  providers: [ChartsService]
})

export class ChartComponent {
  data:any[] = [];
  constructor(private chartsService: ChartsService) {
    chartsService.data$.subscribe(
      data => this.data = data
    );

    chartsService.load('YHOO');
  }
}
