export interface ConfigInterface {
  paths?: ConfigPathsInterface;
  env?: string;
}

export interface ConfigPathsInterface {
  charts?: string;
  news?: string;
  proxy?: string;
  search?: string;
  stocks?: string;
}


export const Config: any = JSON.parse('<%= ENV_CONFIG %>');
