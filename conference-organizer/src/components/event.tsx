import React from "react";

interface EventProps {
  events: { topic: string, activities: string[] }[]
}

function Event({events}: EventProps) {


  return <>
    <div className={"margin1"}> {events.map((topic, index) => <>
      <h3 key={topic.topic}>{topic.topic}</h3>
      {topic.activities.map((activitie, indexActivitie) => <p
          key={`${index}${indexActivitie}`}>{activitie}</p>)}</>)}</div>
  </>
}

export default Event