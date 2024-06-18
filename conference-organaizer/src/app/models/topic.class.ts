import { Activity } from "./activity.class";

export class Topic {
  name: string;
  activities: Activity[];

  constructor(name: string,
              activities: Activity[]
  ) {
    this.name = name;

    this.activities = activities;
  }
}
