import { Component } from '@angular/core';
import { StocksStateService } from '../stocks/state/stocks-state.service';

@Component({
  moduleId: module.id,
  selector: 'mp-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})

export class EditComponent {
  constructor(public stocksState:StocksStateService) {
  }
}
