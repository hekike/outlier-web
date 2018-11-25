export interface IWorkload {
  name: string,
  app: string,
  destinations: IWorkload[],
  sources: IWorkload[]
}

export interface IWorkloadStatusItem {
  date: string,
  status: string,
  approximateMedian?: number,
  avg?: number,
  median?: number
}

export interface IWorkloadStatus extends IWorkload {
  name: string,
  app: string,
  statuses: IWorkloadStatusItem[],
  destinations: IWorkloadStatus[],
  sources: IWorkloadStatus[]
}
