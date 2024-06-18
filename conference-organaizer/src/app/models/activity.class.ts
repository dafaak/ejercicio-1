export class Activity {
  time: number;
  type: string;
  startTime?: Date;

  constructor(params: {
    time: number, type: string, startTime?: Date
  }) {
    this.time = params.time;
    this.type = params.type;
    if (params.startTime) this.startTime = params.startTime;
  }
}
