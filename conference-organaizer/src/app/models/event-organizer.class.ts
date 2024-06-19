import { Conference } from "./conference.class";
import { Topic } from "./topic.class";
import { Activity } from "./activity.class";
import { ActivitieType } from "../enums/activitie-type.enum";


export class EventOrganizer {
  private conferences: Conference[];
  private morningStartTime: number;
  private morningEndTime: number;
  private afternoonStartTime: number;
  private lunchTime: number;
  private minSocialEventTime: number;
  private maxSocialEventTime: number;
  private usedIndexes = new Set();
  private date = new Date();

  constructor(params: {
                conferences: Conference[],
                morningStartTime: number,
                morningEndTime: number,
                lunchTime: number,
                minSocialEventTime: number,
                maxSocialEventTime: number,
                afternoonStartTime: number,
              }
  ) {
    this.morningStartTime = params.morningStartTime;
    this.morningEndTime = params.morningEndTime;
    this.lunchTime = params.lunchTime;
    this.afternoonStartTime = params.afternoonStartTime;

    this.minSocialEventTime = params.minSocialEventTime;
    this.maxSocialEventTime = params.maxSocialEventTime;
    this.conferences = params.conferences;
  }


  private setHour(date: Date, hour: number, min = 0) {
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
  }

  private converMinutesToMiliseconds(minutes: number) {
    return minutes * 60 * 1000;
  }

  organizeConferencesInTopics(): Topic[] {

    this.setHour(this.date, this.morningStartTime, 0);
    const topics: Topic[] = [];

    let topicNumber = 1;


    while (this.usedIndexes.size < this.conferences.length) {

      const morningConferences = this.findCombination(this.morningStartTime, this.morningEndTime);

      const afternoonConferences = this.findCombination(this.afternoonStartTime, this.maxSocialEventTime);

      topics.push(new Topic(`Topic ${topicNumber}`, [...morningConferences, ...afternoonConferences]))
      this.date.setDate(this.date.getDate() + 1);
      this.setHour(this.date, this.morningStartTime);
      topicNumber++;

    }
    console.log(topics);
    return topics;
  }

  private findCombination(startTime: number, endTime: number): Activity[] {

    const targetTime = (endTime - startTime) * 60;

    this.setHour(this.date, startTime, 0);

    const combination: Activity[] = [];
    let sum = 0;

    for (let i = 0; i < this.conferences.length; i++) {
      if (!this.usedIndexes.has(i) && sum + this.conferences[i].time <= targetTime) {
        this.conferences[i].startTime = this.date;
        combination.push(this.conferences[i]);
        sum += this.conferences[i].time;
        this.usedIndexes.add(i);

        const milliseconds = this.date.getTime() + (this.conferences[i].time * 60 * 1000)
        this.date = new Date(milliseconds);
      }
    }
    // return sum === targetTime ? combination : null;

    const lastConference = combination[combination.length - 1];
    if (lastConference.startTime) {
      const endLastConference = lastConference.startTime?.getTime() + this.converMinutesToMiliseconds(lastConference.time);
      const endDateLastConference = new Date(endLastConference);
      // si termina a las 12 agregar el lunch
      if (endDateLastConference.getHours() === this.lunchTime) {
        this.setHour(this.date, this.lunchTime, 0)
        console.log(this.date);
        combination.push(new Activity({
          time: (this.afternoonStartTime - this.lunchTime) * 60,
          type: ActivitieType.LUNCH,
          startTime: new Date(this.date)
        }))
      }

      if (this.minSocialEventTime <= endDateLastConference.getHours() && endDateLastConference.getHours() <= this.maxSocialEventTime) {
        this.setHour(this.date, endDateLastConference.getHours(), endDateLastConference.getMinutes())
        console.log(this.date);
        combination.push(new Activity({
          time: 60,
          type: ActivitieType.SOCIAL_EVENT,
          startTime: new Date(this.date)
        }))
      }

    }
    return combination;
  }

}
