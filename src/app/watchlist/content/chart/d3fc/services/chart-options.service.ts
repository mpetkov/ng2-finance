declare const d3: any;
export class ChartOptionsService {
  options: any;

  constructor() {
    this.options = {
      yTicks: 8,
      xTicks: 4,
      yAxisWidth: 55,
      yAxisLeftMargin: -3,
      xAxisHeight: 20,
      calloutLeftMargin: 8,
      calloutHeight: 16,
      dateFormat: d3.time.format('%b%e \'%y'),
      dayFormat: d3.time.format('%a %I:%M%p'),
      timeFormat: d3.time.format('%I:%M%p'),
      priceFormat: d3.format('.2f'),
      volumeFormat: function (value: number) {
        const prefix: any = d3.formatPrefix(value);
        return prefix.scale(value).toFixed(2) + prefix.symbol;
      }
    };

    this.options.calloutWidth = this.options.yAxisWidth - this.options.calloutLeftMargin;
    this.options.calloutPathData = this.getCalloutPathData(this.options.calloutWidth, this.options.calloutHeight);
  }

  getDateFormat(range: string) {
    if (range === '1d') {
      return this.options.timeFormat;
    } else if (range === '5d') {
      return this.options.dayFormat;
    } else {
      return this.options.dateFormat;
    }
  }

  private getCalloutPathData(width: number, height: number): any[] {
    const height2: number = height / 2;
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
