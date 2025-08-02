export enum StatusTask {
  DONE = 'Completed',
  NOT_DONE = 'Not fulfilled'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: StatusTask;
}
