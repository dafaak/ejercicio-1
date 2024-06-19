import { ActivitieType } from "../enums/activitie-type.enum";

export class Activity {
  time: number;
  type: ActivitieType;
  startTime?: Date;

  constructor(params: {
    time: number, type: ActivitieType, startTime?: Date
  }) {
    this.time = params.time;
    this.type = params.type;
    if (params.startTime) this.startTime = params.startTime;
  }
}
