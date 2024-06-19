import { Activity } from "./activity.class";
import { Conference } from "./conference.class";

export class Topic {
  name: string;
  activities: (Activity|Conference)[];

  constructor(name: string,
              activities:( Activity|Conference)[]
  ) {
    this.name = name;

    this.activities = activities;
  }
}
