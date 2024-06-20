import { Conference } from "./conference.class";
import { Topic } from "./topic.class";
import { Activity } from "./activity.class";
import { ActivitieType } from "../enums/activitie-type.enum";


export class EventOrganizer {
  private _conferences: Conference[];
  private _morningStartTime: number;
  private _morningEndTime: number;
  private _afternoonStartTime: number;
  private _lunchTime: number;
  private _minSocialEventTime: number;
  private _maxSocialEventTime: number;
  private _usedIndexes = new Set();
  private _date = new Date();
  private _invalidConferences: Conference[] = [];

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
    this._morningStartTime = params.morningStartTime;
    this._morningEndTime = params.morningEndTime;
    this._lunchTime = params.lunchTime;
    this._afternoonStartTime = params.afternoonStartTime;

    this._minSocialEventTime = params.minSocialEventTime;
    this._maxSocialEventTime = params.maxSocialEventTime;
    this._conferences = params.conferences;
  }

  public get invalidConferences() {
    return this._invalidConferences;
  }

  private findConferencesExceddDuration = (conferences: Conference[]) => {
    const maxMorningConferenceDuration = (this._morningEndTime - this._morningStartTime) * 60;
    const maxAfternoonConferenceDuration = (this._maxSocialEventTime - this._afternoonStartTime) * 60;
    return conferences.filter(conference => {
      return (conference.time > maxMorningConferenceDuration && conference.time > maxAfternoonConferenceDuration);
    })
  }

  private cleanData = (conferences: Conference[]) => {
    const conferencesExceedDuration = this.findConferencesExceddDuration(conferences);
    if (conferencesExceedDuration.length > 0) {
      this._invalidConferences = conferencesExceedDuration;
      this._conferences = this.filterValidConferences(conferences);
    }

  }

  private filterValidConferences = (conferences: Conference[]) => {
    const maxMorningConferenceDuration = (this._morningEndTime - this._morningStartTime) * 60;
    const maxAfternoonConferenceDuration = (this._maxSocialEventTime - this._afternoonStartTime) * 60;
    return conferences.filter(conference => {
      return (conference.time <= maxMorningConferenceDuration && conference.time <= maxAfternoonConferenceDuration);
    })
  }

  private setHour = (date: Date, hour: number, min = 0) => {
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
  }

  private converMinutesToMiliseconds = (minutes: number) => {
    return minutes * 60 * 1000;
  }

  organizeConferencesInTopics = (): Topic[] => {

    this.cleanData(this._conferences);

    this.setHour(this._date, this._morningStartTime, 0);
    const topics: Topic[] = [];

    let topicNumber = 1;


    while (this._usedIndexes.size < this._conferences.length) {

      const morningConferences = this.findCombination(this._morningStartTime, this._morningEndTime);
      this.addSocialEventOrLunch(morningConferences);

      const afternoonConferences = this.findCombination(this._afternoonStartTime, this._maxSocialEventTime);
      this.addSocialEventOrLunch(afternoonConferences);

      topics.push(new Topic(`Topic ${topicNumber}`, [...morningConferences, ...afternoonConferences]))
      this._date.setDate(this._date.getDate() + 1);
      this.setHour(this._date, this._morningStartTime);
      topicNumber++;

    }
    return topics;
  }

  private findCombination = (startTime: number, endTime: number): Activity[] => {

    const targetTime = (endTime - startTime) * 60;

    this.setHour(this._date, startTime, 0);

    const combination: Activity[] = [];
    let sum = 0;

    for (let i = 0; i < this._conferences.length; i++) {
      if (!this._usedIndexes.has(i) && sum + this._conferences[i].time <= targetTime) {
        this._conferences[i].startTime = this._date;
        combination.push(this._conferences[i]);
        sum += this._conferences[i].time;
        this._usedIndexes.add(i);

        const milliseconds = this._date.getTime() + (this._conferences[i].time * 60 * 1000)
        this._date = new Date(milliseconds);
      }
    }

    return combination;
  }

  addSocialEventOrLunch = (combination: Activity[]) => {
    const lastConference = combination[combination.length - 1];
    if (lastConference?.startTime) {
      const endLastConference = lastConference.startTime?.getTime() + this.converMinutesToMiliseconds(lastConference.time);
      const endDateLastConference = new Date(endLastConference);

      // si termina a las 12 agregar el lunch
      if (endDateLastConference.getHours() === this._lunchTime) {
        this.setHour(this._date, this._lunchTime, 0)

        combination.push(new Activity({
          time: (this._afternoonStartTime - this._lunchTime) * 60,
          type: ActivitieType.LUNCH,
          startTime: new Date(this._date)
        }))
      }

      if (this._minSocialEventTime <= endDateLastConference.getHours() && endDateLastConference.getHours() <= this._maxSocialEventTime) {
        this.setHour(this._date, endDateLastConference.getHours(), endDateLastConference.getMinutes())

        combination.push(new Activity({
          time: 60,
          type: ActivitieType.SOCIAL_EVENT,
          startTime: new Date(this._date)
        }))
      }

    }
  }

}
