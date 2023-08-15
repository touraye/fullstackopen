/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ( { text, handleClick } ) => (
  <button
    onClick={ handleClick }>
    { text }
  </button>
)


const StatisticLine = ({ text, value, sign }) => (
	<p>
		{text} {value} {sign}
	</p>
)

const Statistics = ( {
  good,
  neutral,
  bad,
  all
} ) => { 
  
  if(all < 1) return <p>No feedback given</p>
  return (
		<>			
			<StatisticLine text='good' value={good} />
			<StatisticLine text='neutral' value={neutral} />
			<StatisticLine text='bad' value={bad} />
			<StatisticLine text='all' value={all} />
			<StatisticLine text='average' value={all / 3} />
			<StatisticLine text='positive' value={((good + neutral) / all) * 100} sign="%" />		
		</>
	)
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [ bad, setBad ] = useState( 0 )
  const [all, setAll] = useState(0);
  
  const handleGood = () => {
    setGood( good + 1 )
    setAll(all+1)
  }

  const handleNeutral = () => {
    setNeutral( neutral + 1 )
    setAll(all + 1)
  }
  
  const handleBad = () => {
    setBad( bad + 1 )
    setAll(all + 1)
  }

  return (
		<>
      <h2>give feedback</h2>
      
			<div>			
        <Button
          text='good'
          handleClick={ handleGood }
        />
        <Button
          text='neutral'
          handleClick={ handleNeutral }
        />
        <Button
          text='bad'
          handleClick={ handleBad }
        />
			</div>

      <h3>statistics</h3>
      
      <Statistics
        good={ good }
        neutral={ neutral }
        bad={ bad }
        all={ all }
      />
		</>
	)
}

export default App
