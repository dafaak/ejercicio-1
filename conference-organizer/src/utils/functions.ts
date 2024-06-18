type Topic = {
  time: number
  topic: string
}

type OrganizedMeeting = {
  schedule: 'morning' | 'afternoon'
  topics: Topic[]
}

export enum HourRanges {
  morningStartTime = 9,
  morningEndTime = 12,
  afternoonStartTime = 13,
  minSocialEventTime = 16,
  maxSocialEventTime = 17
}


const setData = (textInput: string) => {

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

const main = () => {
  const topics = setData(textInput)
  const organizedMeetings = organizeMeetings(topics);

  console.log(addTime(organizedMeetings));

}
export default main;

function addTime(organizedMeetings: OrganizedMeeting[]) {
  let today = new Date();

  return organizedMeetings.map((meetingItem, indexMeeting) => meetingItem.topics.map((topic, index) => {

            if (meetingItem.schedule === 'morning') {// morning

              if (index === 0) {
                setHour(today, HourRanges.morningStartTime);
              }

              const topicWithTime = `${today.getHours()}:${today.getMinutes()} ${topic.topic}`;

              const milliseconds = today.getTime() + (topic.time * 60 * 1000)
              today = new Date(milliseconds);

              return {...topic, topic: topicWithTime}
            }


            if (meetingItem.schedule === 'afternoon') {// morning
              if (index === 0) {
                setHour(today, HourRanges.afternoonStartTime);
              }
              const topicWithTime = `${today.getHours()}:${today.getMinutes()} ${topic.topic}`;

              const milliseconds = today.getTime() + (topic.time * 60 * 1000)
              today = new Date(milliseconds);

              return {...topic, topic: topicWithTime}
            }

          }
      )
  );
}

function setHour(date: Date, hour: number, min = 0) {
  date.setHours(hour);
  date.setMinutes(min);
  date.setSeconds(0);
}

function organizeMeetings(topics: Topic[]): OrganizedMeeting[] {
  const meetings: OrganizedMeeting[] = [];
  const usedIndices = new Set();

  function findCombination(targetTime: number): Topic[] | null {
    const combination: Topic[] = [];
    let sum = 0;

    for (let i = 0; i < topics.length; i++) {
      if (!usedIndices.has(i) && sum + topics[i].time <= targetTime) {
        combination.push(topics[i]);
        sum += topics[i].time;
        usedIndices.add(i);
      }
    }
    return sum === targetTime ? combination : null;
  }

  while (usedIndices.size < topics.length) {
    const threeHourMeeting = findCombination(180);
    if (threeHourMeeting) {
      meetings.push({schedule: 'morning', topics: threeHourMeeting});
    }

    const fourHourMeeting = findCombination(240);
    if (fourHourMeeting) {
      meetings.push({schedule: 'afternoon', topics: fourHourMeeting});
    }
  }

  return meetings;
}

const textInput = `HOW TO USE E-LEARNING FOR TESTING AND ASSESSING LARGE
CLASSES 60min
THREE-DIMENSIONAL COLLABORATIVE VIRTUAL ENVIRONMENTS TO
ENHANCE LEARNING MATHEMATICS 45min
DO STUDENT RESPONSES DECREASE IF TEACHERS KEEP ASKING
QUESTIONS THROUGH STUDENT RESPONSE SYSTEMS: A
QUANTITATIVE RESEARCH 30min
A SEQUENTIAL ANALYSIS OF TEACHING BEHAVIORS TOWARD THE
USE OF BLACKBOARD LEARNING MANAGEMENT SYSTEM 45min
THE UAV SIMULATION COMPLEX FOR OPERATOR TRAINING 45min
THE IMPACT OF E-LEARNING ON LEARNER KNOWLEDGE SHARING QUALITY 60min
ASSESSING OPEN-BOOK-OPEN-WEB EXAM IN HIGH SCHOOLS: THE
CASE OF A DEVELOPING COUNTRY 60min
RESEARCH ON CHANGE AND GROWTH OF STUDENTS AND TEACHERS
EXPERIENCED PROBLEM BASED LEARNING 45min
E-LEARNING ASSISTED DRAMATIZATION FOR COMMUNICATIVE
LANGUAGE ABILITY AND COLLABORATIVE LEARNING 30min
LEARNING READINESS WHEN SHARING KNOWLEDGE WHILE ELEARNING 30min
LEARNING RELATED DEVICE USAGE OF GERMAN AND INDIAN
STUDENTS 45min
TWENTY-FIRST CENTURY INTERVIEWING FOR TWENTY-FIRST
CENTURY JOBS. ARE WE PREPARING OUR STUDENTS FOR TODAY'S
JOB MARKET? 60min
ONLINE GRADUATE DEGREES: PERCEPTIONS OF MOROCCAN
UNIVERSITY STUDENTS 60min
DEVELOPMENT OF AN ONLINE LABORATORY: APPLICATION FOR THE
CHARACTERIZATION OF NTC TEMPERATURE SENSOR 45min
LEARNING STRATEGIES THAT CONTRIBUTE TO ACADEMIC EFFICIENCY
IN RELATION TO THE BUSINESS SCHOOL STUDENT'S LEARNING
STYLES 30min
STUDENTS' TEAM-LEARNING INSPIRES CREATIVITY 30min
FLIPPED CLASSROOM ASSESSMENT: A LEARNING PROCESS
APPROACH 60min
OPEN PROFESSIONAL DEVELOPMENT OF MATH TEACHERS THROUGH
AN ONLINE COURSE 30min
GENERATING GRAPHS IN VIRTUAL REALITY 30min`


