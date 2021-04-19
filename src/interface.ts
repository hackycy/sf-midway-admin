export interface ResOp {
  data?: any;
  code?: number;
  message?: string;
}

export interface ExecuteData {
  id: number;
  args?: string | null;
  service: string;
}
