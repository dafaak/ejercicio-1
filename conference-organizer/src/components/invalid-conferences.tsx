import React from "react";
import { Conference } from "../models/conference.class";

interface InvalidConferencesProps {
  invalidConferences: Conference[]
}

function InvalidConferences({invalidConferences}: InvalidConferencesProps) {


  return <>
    <div className={"invalidConferences"}><h3>INVALID CONFERENCES</h3>
      <div className={"margin1"}>{invalidConferences.map((invalidConference, indexInvalidConference) => <p
          key={indexInvalidConference}>{invalidConference.topic} <span>{invalidConference.time}min</span>
      </p>)

      }</div>
    </div>
  </>

}

export default InvalidConferences