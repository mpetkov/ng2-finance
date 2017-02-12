export interface ConfigInterface {
  paths?: ConfigPathsInterface;
  env?: string;
  chartRanges?:ChartRangesInterface[];
  notifications?:NotificationsInterface;
}

export interface ConfigPathsInterface {
  charts?: string;
  news?: string;
  proxy?: string;
  search?: string;
  stocks?: string;
  info?: string;
}

export interface ChartRangesInterface {
  id?: string;
  text?: string;
  interval?: string;
}

export interface NotificationsInterface {
  noData?: string;
  noStock?: string;
  search?: string;
  noFavorites?: string;
}

export const Config:any = JSON.parse('<%= ENV_CONFIG %>');
