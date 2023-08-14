/* eslint-disable react/prop-types */
import { useState } from 'react'

const Statistics = ( {
  good,
  neutral,
  bad,
  all
} ) => { 
  
  if(all < 1) return <p>No feedback given</p>
  return (
    <>      
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {all}</p>
			<p>average {all / 3}</p>
			<p>positive {((good + neutral) / all) * 100}%</p>
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
				<button onClick={handleGood}>good</button>
				<button onClick={handleNeutral}>neutral</button>
				<button onClick={handleBad}>bad</button>
			</div>

			<h3>statistics</h3>
      <Statistics
        good={ good }
        neutral={ neutral }
        bad={ bad } all={ all }
      />
		</>
	)
}

export default App
