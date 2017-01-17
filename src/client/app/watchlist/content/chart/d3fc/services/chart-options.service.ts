import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
declare let d3:any;
export class ChartOptionsService {
  options:any;
  selectedPoint$:Observable<any>;
  private selectedPointObserver:Observer<any>;

  constructor() {
    this.options = {
      yTicks: 8,
      xTicks: 4,
      yAxisWidth: 50,
      xAxisHeight: 20,
      calloutLeftMargin: 8,
      calloutHeight: 16,
      dateFormat: d3.time.format('%b%e \'%y'),
      priceFormat: d3.format('.2f'),
      volumeFormat: function (value:number) {
        let prefix:any = d3.formatPrefix(value);
        return prefix.scale(value).toFixed(2) + prefix.symbol;
      }
    };

    this.options.calloutWidth = this.options.yAxisWidth - this.options.calloutLeftMargin;
    this.options.calloutPathData = this.getCalloutPathData(this.options.calloutWidth, this.options.calloutHeight);

    this.selectedPoint$ = new Observable<any>(
      (observer:Observer<any>) => this.selectedPointObserver = observer
    );
  }

  updateSelectedPoint(data:any) {
    if (this.selectedPointObserver) {
      this.selectedPointObserver.next(data);
    }
  }

  private getCalloutPathData(width:number, height:number):any[] {
    let height2:number = height / 2;
    return [
      [0, 0],
      [height2, -height2],
      [width, -height2],
      [width, height2],
      [height2, height2],
      [0, 0]
    ];
  }
}
