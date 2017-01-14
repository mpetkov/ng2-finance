import { Component } from '@angular/core';
import { ChartService } from './chart.service';

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  providers: [ChartService]
})

export class ChartComponent {
  constructor(private chartService:ChartService) {
    chartService.load('YHOO');
  }
}
