import React, { useState } from 'react'
import './App.css'
import { Conference } from "./models/conference.class";
import { EventOrganizer } from "./models/event-organizer.class";
import { Topic } from "./models/topic.class";
import Form from "./components/form";
import Event from "./components/event";
import InvalidConferences from "./components/invalid-conferences";


function App() {

  const [fileContent, setFileContent] = useState<string>('');
  const [res, setRes] = useState<{ topic: string, activities: string[] }[]>([]);
  const [invalidConferences, setinvalidConferences] = useState<Conference[]>([]);

  const maxFileSize = 1048576;


  const setData = (): { topic: string, time: number }[] => {

    const topics: {
      topic: string
      time: number
    }[] = [];

    let textInput = fileContent.replaceAll('\n', '');

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


  const organizarEvento = () => {


    const topicsFromFile = setData()

    if (!fileContent) return;
    const conferences: Conference[] = topicsFromFile.map(conference => new Conference(conference.time, conference.topic))

    let eventOrganizer!: EventOrganizer;

    eventOrganizer = new EventOrganizer({
          conferences,
          morningStartTime: 9,
          morningEndTime: 12,
          lunchTime: 12,
          minSocialEventTime: 16,
          maxSocialEventTime: 17,
          afternoonStartTime: 13,
        }
    )

    let topics: Topic[] = [];

    topics = eventOrganizer.organizeConferencesInTopics()

    const invalidConferences = eventOrganizer.invalidConferences;
    setinvalidConferences(invalidConferences);

    let event: { topic: string, activities: string[] }[] = [];

    for (let topic of topics) {
      const eventToAdd: { topic: string, activities: string[] } = {topic: topic.name, activities: []};

      for (let activity of topic.activities) {
        if (activity instanceof Conference) {
          eventToAdd.activities.push(`${activity.startTime?.toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "numeric"
          })} ${activity.topic} ${activity.time}min`);
        } else {
          eventToAdd.activities.push(`${activity.startTime?.toLocaleTimeString('en-US', {
            hour: "numeric",
            minute: "numeric"
          })} ${activity.type}`);
        }

      }
      event.push(eventToAdd);
    }

    setRes(event);
  }
  const handleOnFileContentChange = (fileContent: string) => {
    setFileContent(fileContent);
  }

  return (
      <>
        <div className={"container"}>
          <Form onFileContentChange={handleOnFileContentChange} maxFileSize={maxFileSize} accept={"text/plain"}></Form>

          {fileContent && <button className={"buttonOrganizar"} onClick={organizarEvento}>Organizar evento</button>}
          <Event events={res}></Event>

          {invalidConferences.length > 0 &&
              <InvalidConferences invalidConferences={invalidConferences}></InvalidConferences>}


        </div>
      </>
  )
}

export default App