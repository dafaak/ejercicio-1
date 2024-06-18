const data = {
  60: ['HOW TO USE E-LEARNING FOR TESTING AND ASSESSING LARGE CLASSES',
    'THE IMPACT OF E-LEARNING ON LEARNER KNOWLEDGE SHARING QUALITY',
    'ASSESSING OPEN-BOOK-OPEN-WEB EXAM IN HIGH SCHOOLS: THE CASE OF A DEVELOPING COUNTRY',
    `TWENTY-FIRST CENTURY INTERVIEWING FOR TWENTY-FIRS…PREPARING OUR STUDENTS FOR TODAY'S JOB MARKET?`,
    'ONLINE GRADUATE DEGREES: PERCEPTIONS OF MOROCCAN UNIVERSITY STUDENTS',
    'FLIPPED CLASSROOM ASSESSMENT: A LEARNING PROCESS APPROACH'],
  45: ['THREE-DIMENSIONAL COLLABORATIVE VIRTUAL ENVIRONMENTS TO ENHANCE LEARNING MATHEMATICS',
    'A SEQUENTIAL ANALYSIS OF TEACHING BEHAVIORS TOWAR…E USE OF BLACKBOARD LEARNING MANAGEMENT SYSTEM',
    'THE UAV SIMULATION COMPLEX FOR OPERATOR TRAINING',
    'RESEARCH ON CHANGE AND GROWTH OF STUDENTS AND TEACHERS EXPERIENCED PROBLEM BASED LEARNING',
    'LEARNING RELATED DEVICE USAGE OF GERMAN AND INDIAN STUDENTS',
    'DEVELOPMENT OF AN ONLINE LABORATORY: APPLICATION …THE CHARACTERIZATION OF NTC TEMPERATURE SENSOR'],
  30: ['DO STUDENT RESPONSES DECREASE IF TEACHERS KEEP AS…DENT RESPONSE SYSTEMS: A QUANTITATIVE RESEARCH',
    'E-LEARNING ASSISTED DRAMATIZATION FOR COMMUNICATIVE LANGUAGE ABILITY AND COLLABORATIVE LEARNING',
    'LEARNING READINESS WHEN SHARING KNOWLEDGE WHILE ELEARNING',
    'LEARNING STRATEGIES THAT CONTRIBUTE TO ACADEMIC E… THE BUSINESS SCHOOL STUDENT\'S LEARNING STYLES',
    'STUDENTS\' TEAM-LEARNING INSPIRES CREATIVITY',
    'OPEN PROFESSIONAL DEVELOPMENT OF MATH TEACHERS THROUGH AN ONLINE COURSE',
    'GENERATING GRAPHS IN VIRTUAL REALITY']
}

// Helper function to convert time in minutes to HH:MM AM/PM format
function convertirHora(minutos) {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  const ampm = horas >= 12 ? 'PM' : 'AM';
  const horas12 = horas % 12 || 12;
  return `${horas12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
}

const setData = (textInput: string) => {

  const topics: {
    topic: string
    time: number
  }[] = [];

  textInput = textInput.replaceAll('\n', '');

  const topicsWithTime = textInput.split('min')

  topicsWithTime.forEach((topicWithTime) => {

    let timePart = topicWithTime.match(/\d+/);
    let textPart = topicWithTime.match(/[^\d]+/);

    if (timePart && textPart) {
      topics.push({topic: textPart[0], time: Number(timePart[0])});
    }

  })

  return topics;
}


function generateSchedule(data: { [key: number]: string[] }) {

  setData(textInput);

}

const main = () => {
  const topics=setData(textInput)
  let organizedMeetings = organizeMeetings(topics);

  organizedMeetings.forEach((meeting, index) => {
    console.log(`Meeting ${index + 1} (${meeting.duration}):`);
    meeting.topics.forEach(topic => {
      console.log(` - ${topic.topic.trim()} (${topic.time} minutes)`);
    });

  });
}
export default main;

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

function organizeMeetings(topics) {
  let meetings = [];
  let usedIndices = new Set();

  function findCombination(targetTime) {
    let combination = [];
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
    let threeHourMeeting = findCombination(180);
    if (threeHourMeeting) {
      meetings.push({ duration: "3 hours", topics: threeHourMeeting });
    }

    let fourHourMeeting = findCombination(240);
    if (fourHourMeeting) {
      meetings.push({ duration: "4 hours", topics: fourHourMeeting });
    }
  }

  return meetings;
}

