import { Activity } from "./activity.class";

export class Conference extends Activity {
  topic: string;

  constructor(time: number, topic: string, startTime?: Date) {
    super({time, type: 'CONFERENCE', startTime});
    this.topic = topic;
  }


}
