import { Component } from '@angular/core';
import { ChartApiService } from './chart-api.service';
import { ChartStateService } from './state/index';
import { SidebarStateService } from '../../sidebar/state/index';

@Component({
  moduleId: module.id,
  selector: 'mp-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  providers: [ChartApiService, ChartStateService]
})

export class ChartComponent {
  constructor(private chartApiService:ChartApiService,
              private sidebarState:SidebarStateService) {
    sidebarState.stock$.subscribe(
      value => chartApiService.load(value)
    );
  }
}
