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

const data = [
  {
    "topic": "HOW TO USE E-LEARNING FOR TESTING AND ASSESSING LARGECLASSES ",
    "time": 60
  },
  {
    "topic": "THREE-DIMENSIONAL COLLABORATIVE VIRTUAL ENVIRONMENTS TOENHANCE LEARNING MATHEMATICS ",
    "time": 45
  },
  {
    "topic": "DO STUDENT RESPONSES DECREASE IF TEACHERS KEEP ASKINGQUESTIONS THROUGH STUDENT RESPONSE SYSTEMS: AQUANTITATIVE RESEARCH ",
    "time": 30
  },
  {
    "topic": "A SEQUENTIAL ANALYSIS OF TEACHING BEHAVIORS TOWARD THEUSE OF BLACKBOARD LEARNING MANAGEMENT SYSTEM ",
    "time": 45
  },
  {
    "topic": "THE UAV SIMULATION COMPLEX FOR OPERATOR TRAINING ",
    "time": 45
  },
  {
    "topic": "THE IMPACT OF E-LEARNING ON LEARNER KNOWLEDGE SHARING QUALITY ",
    "time": 60
  },
  {
    "topic": "ASSESSING OPEN-BOOK-OPEN-WEB EXAM IN HIGH SCHOOLS: THECASE OF A DEVELOPING COUNTRY ",
    "time": 60
  },
  {
    "topic": "RESEARCH ON CHANGE AND GROWTH OF STUDENTS AND TEACHERSEXPERIENCED PROBLEM BASED LEARNING ",
    "time": 45
  },
  {
    "topic": "E-LEARNING ASSISTED DRAMATIZATION FOR COMMUNICATIVELANGUAGE ABILITY AND COLLABORATIVE LEARNING ",
    "time": 30
  },
  {
    "topic": "LEARNING READINESS WHEN SHARING KNOWLEDGE WHILE ELEARNING ",
    "time": 30
  },
  {
    "topic": "LEARNING RELATED DEVICE USAGE OF GERMAN AND INDIANSTUDENTS ",
    "time": 45
  },
  {
    "topic": "TWENTY-FIRST CENTURY INTERVIEWING FOR TWENTY-FIRSTCENTURY JOBS. ARE WE PREPARING OUR STUDENTS FOR TODAY'SJOB MARKET? ",
    "time": 60
  },
  {
    "topic": "ONLINE GRADUATE DEGREES: PERCEPTIONS OF MOROCCANUNIVERSITY STUDENTS ",
    "time": 60
  },
  {
    "topic": "DEVELOPMENT OF AN ONLINE LABORATORY: APPLICATION FOR THECHARACTERIZATION OF NTC TEMPERATURE SENSOR ",
    "time": 45
  },
  {
    "topic": "LEARNING STRATEGIES THAT CONTRIBUTE TO ACADEMIC EFFICIENCYIN RELATION TO THE BUSINESS SCHOOL STUDENT'S LEARNINGSTYLES ",
    "time": 30
  },
  {
    "topic": "STUDENTS' TEAM-LEARNING INSPIRES CREATIVITY ",
    "time": 30
  },
  // {
  //   "topic": "FLIPPED CLASSROOM ASSESSMENT: A LEARNING PROCESSAPPROACH ",
  //   "time": 60
  // },
  // {
  //   "topic": "OPEN PROFESSIONAL DEVELOPMENT OF MATH TEACHERS THROUGHAN ONLINE COURSE ",
  //   "time": 30
  // },
  // {
  //   "topic": "GENERATING GRAPHS IN VIRTUAL REALITY ",
  //   "time": 30
  // }
]
