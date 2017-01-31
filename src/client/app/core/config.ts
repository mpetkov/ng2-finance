export interface ConfigInterface {
  paths?: ConfigPathsInterface;
  env?: string;
  chartRanges?:ChartRangesInterface[];
}

export interface ConfigPathsInterface {
  charts?: string;
  news?: string;
  proxy?: string;
  search?: string;
  stocks?: string;
}

export interface ChartRangesInterface {
  id?: string;
  text?: string;
  interval?: string;
}


export const Config: any = JSON.parse('<%= ENV_CONFIG %>');
