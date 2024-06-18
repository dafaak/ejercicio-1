import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import main from './utils/functions'

function App() {
  const [count, setCount] = useState(0)

  const organizeTopics = (topics: { [key: number]: string[] }) => {

  }

  main();
  return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo"/>
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo"/>
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
  )
}

export default App
const data = {
  60: ['HOW TO USE E-LEARNING FOR TESTING AND ASSESSING LARGE CLASSES', 'THE IMPACT OF E-LEARNING ON LEARNER KNOWLEDGE SHARING QUALITY', 'ASSESSING OPEN-BOOK-OPEN-WEB EXAM IN HIGH SCHOOLS: THE CASE OF A DEVELOPING COUNTRY',
    `TWENTY-FIRST CENTURY INTERVIEWING FOR TWENTY-FIRS…PREPARING OUR STUDENTS FOR TODAY'S JOB MARKET?`, 'ONLINE GRADUATE DEGREES: PERCEPTIONS OF MOROCCAN UNIVERSITY STUDENTS', 'FLIPPED CLASSROOM ASSESSMENT: A LEARNING PROCESS APPROACH'],
  45: ['THREE-DIMENSIONAL COLLABORATIVE VIRTUAL ENVIRONMENTS TO ENHANCE LEARNING MATHEMATICS', 'A SEQUENTIAL ANALYSIS OF TEACHING BEHAVIORS TOWAR…E USE OF BLACKBOARD LEARNING MANAGEMENT SYSTEM',
    'THE UAV SIMULATION COMPLEX FOR OPERATOR TRAINING', 'RESEARCH ON CHANGE AND GROWTH OF STUDENTS AND TEACHERS EXPERIENCED PROBLEM BASED LEARNING', 'LEARNING RELATED DEVICE USAGE OF GERMAN AND INDIAN STUDENTS',
    'DEVELOPMENT OF AN ONLINE LABORATORY: APPLICATION …THE CHARACTERIZATION OF NTC TEMPERATURE SENSOR'],
  30: ['DO STUDENT RESPONSES DECREASE IF TEACHERS KEEP AS…DENT RESPONSE SYSTEMS: A QUANTITATIVE RESEARCH', 'E-LEARNING ASSISTED DRAMATIZATION FOR COMMUNICATIVE LANGUAGE ABILITY AND COLLABORATIVE LEARNING', 'LEARNING READINESS WHEN SHARING KNOWLEDGE WHILE ELEARNING',
    'LEARNING STRATEGIES THAT CONTRIBUTE TO ACADEMIC E… THE BUSINESS SCHOOL STUDENT\'S LEARNING STYLES', 'STUDENTS\' TEAM-LEARNING INSPIRES CREATIVITY', 'OPEN PROFESSIONAL DEVELOPMENT OF MATH TEACHERS THROUGH AN ONLINE COURSE', 'GENERATING GRAPHS IN VIRTUAL REALITY']
}


/*
* const y =x.replaceAll('\n',' ').split('min')
* */