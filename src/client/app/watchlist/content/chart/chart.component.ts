import { Component } from '@angular/core';
import { ChartService } from './chart.service';

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  providers: [ChartService]
})

export class ChartComponent {
  constructor(private chartService:ChartService) {
    chartService.load('YHOO');
  }
}
