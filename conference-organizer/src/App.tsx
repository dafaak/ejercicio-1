import React, { useState } from 'react'
import './App.css'
import { Conference } from "./models/conference.class";
import { EventOrganizer } from "./models/event-organizer.class";
import { Topic } from "./models/topic.class";


function App() {

  const [fileContent, setFileContent] = useState<string>('');
  const [res, setRes] = useState<{ topic: string, activities: string[] }[]>([]);

  const maxFileSize = 1048576;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const isValidFile = validateFileSize(e.target.files[0], maxFileSize)
      if (isValidFile) readFile(e.target.files[0]);
    }
  };

  const validateFileSize = (file: File, maxFileSize: number) => {
    return file.size > maxFileSize ? false : true;
  }

  const readFile = (file: File) => {
    const reader = new FileReader();


    reader.onload = () => {
      const fileContentRes = reader.result as string;
      if (fileContentRes) setFileContent(fileContentRes as string)
    };

    reader.readAsText(file);

  }

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

  return (
      <>
        <div className={"container"}>
          <form className={"form"}>
            <div>
              <label>Archivo:</label>
            </div>
            <div>
              <input type="file" onChange={handleFileChange} accept={"text/plain"}/>
              <br/>
              <small>El archivo debe tener el formato "tema 'Tiempo'min" (tiempo en minutos) por cada tema</small>
            </div>

          </form>
          {fileContent &&
              <button className={"buttonOrganizar"} onClick={organizarEvento}>Organizar evento</button>}
          <div className={"margin1"}>{res.map((topic, index) => <>
            <h3 key={topic.topic}>{topic.topic}</h3>
            {topic.activities.map((activitie, indexActivitie) => <p
                key={`${index}${indexActivitie}`}>{activitie}</p>)}</>)}</div>
        </div>
      </>
  )
}

export default App