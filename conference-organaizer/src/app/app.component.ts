import { Component, OnInit } from '@angular/core';
import { EventOrganizer } from "./models/event-organizer.class";
import { Conference } from "./models/conference.class";
import { FormControl, FormGroup } from "@angular/forms";
import { Topic } from "./models/topic.class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conference-organaizer';
  eventOrganizer!: EventOrganizer;
  file?: File;
  fileContent?: string;
  topics: Topic[] = [];
  event: { topic: string, activities: string[] }[] = [];

  async organizarEvento() {
    if (!this.fileContent) return;

    const topicsFromFile = this.setData(this.fileContent)

    const conferences: Conference[] = topicsFromFile.map(conference => new Conference(conference.time, conference.topic))

    this.eventOrganizer = new EventOrganizer({
        conferences,
        morningStartTime: 9,
        morningEndTime: 12,
        lunchTime: 12,
        minSocialEventTime: 16,
        maxSocialEventTime: 17,
        afternoonStartTime: 13,
      }
    )

    this.topics = this.eventOrganizer.organizeConferencesInTopics()
    this.event = [];
    for (let topic of this.topics) {
      const event: { topic: string, activities: string[] } = {topic: topic.name, activities: []};

      for (let activity of topic.activities) {
        if (activity instanceof Conference) {
          event.activities.push(`${activity.startTime?.toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "numeric"
          })} ${activity.topic} ${activity.time}min`);
        } else {
          event.activities.push(`${activity.startTime?.toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "numeric"
          })} ${activity.type}`);
        }

      }
      this.event.push(event);
    }
  }

  setData(textInput: string) {

    const topics: {
      topic: string
      time: number
    }[] = [];

    textInput = textInput.replaceAll('\n', '');

    const topicsWithTime = textInput.split('min')

    topicsWithTime.forEach((topicWithTime) => {

      const timePart = topicWithTime.match(/\d+/);
      const textPart = topicWithTime.match(/[^\d]+/);

      if (timePart && textPart) {
        topics.push({topic: textPart[0], time: Number(timePart[0])});
      }

    })

    return topics;
  }

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.readFile(this.file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result;
      this.fileContent = fileContent as string;
      console.log(this.fileContent);
    };
    reader.readAsText(file);
  }


}

