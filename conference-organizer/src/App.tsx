import React, { useState } from 'react'
import './App.css'
import { Conference } from "./models/conference.class";
import { EventOrganizer } from "./models/event-organizer.class";
import { Topic } from "./models/topic.class";


function App() {

  const [fileContent, setFileContent] = useState<string>('');
  const [res, setRes] = useState<{ topic: string, activities: string[] }[]>([]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFile(e.target.files[0]);
    }
  };

  function readFile(file: File) {
    const reader = new FileReader();


    reader.onload = () => {
      const fileContentRes = reader.result as string;
      if (fileContentRes) setFileContent(fileContentRes as string)
    };

    reader.readAsText(file);

  }

  async function setData() {

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


  const organizarEvento = async () => {


    const topicsFromFile = await setData()

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
    console.log(topics);
  }

  return (
      <>
        <form>
          <input type="file" onChange={handleFileChange}/>
        </form>
        {fileContent && <button onClick={organizarEvento}>Organizar evento</button>}
        <div>{res.map((topic, index) => <>
          <header key={topic.topic}>{topic.topic}</header>
          {topic.activities.map((activitie, indexActivitie) => <div
              key={`${index}${indexActivitie}`}>{`${index}${indexActivitie}`} {activitie}</div>)}</>)}</div>

      </>
  )
}

export default App