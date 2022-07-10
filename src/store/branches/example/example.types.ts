export interface IForecastState {
  forecast: Record<string, any> | null;
}

export interface IPaginationState {
  page: number;
}

export interface IInfiniteState {
  infiniteList: IInfiniteListItem[];
}

export interface IInfiniteListItem {
  description: string;
  address: string;
  photo: string;
  title: string;
  uuid: string;
}

export interface IExampleBranchState {
  paginationState: IPaginationState;
  forecastState: IForecastState;
  infiniteState: IInfiniteState;
}

export interface IGetForecastReqPayload {
  modalFlowId: string;
  lat: string;
  lon: string;
}
