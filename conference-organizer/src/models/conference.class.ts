import { Activity } from "./activity.class";
import { ActivitieType } from "../enums/activitie-type.enum";

export class Conference extends Activity {
  topic: string;

  constructor(time: number, topic: string, startTime?: Date) {
    super({time, type: ActivitieType.CENFERENCE, startTime});
    this.topic = topic;
  }


}
