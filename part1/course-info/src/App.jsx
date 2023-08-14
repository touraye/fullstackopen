/* eslint-disable react/prop-types */
const Header = ({ course }) => (
	<>
		<h2>{course}</h2>
	</>
)

const Part1 = ( { part1, exercises1 } ) => (
	<>
		<p>
			{part1} {exercises1}
		</p>
	</>
)

const Part2 = ({ part2, exercises2 }) => (
	<>
		<p>
			{part2} {exercises2}
		</p>
	</>
)

const Part3 = ({ part3, exercises3 }) => (
	<>
		<p>
			{part3} {exercises3}
		</p>
	</>
)

const Content = ( { parts } ) => {	
	return (
		<>
			<Part1 part1={parts[0].name} exercises1={parts[0].exercises} />

			<Part2 part2={parts[1].name} exercises2={parts[1].exercises} />
			<Part3
				part3={ parts[ 2 ].name }
				exercises3={ parts[ 2 ].exercises }
			/>
		</>
	)
}

const Footer = ( { parts } ) => {	
	return (
		<>
			<p>
				Number of exercises  {' '}
				{
					parts[ 0 ].exercises +
					parts[ 1 ].exercises +
					parts[ 2 ].exercises
				}
			</p>
		</>
			
		)
}


function App() { 
 const course = 'Half Stack application development'
 const parts = [
		{
			name: 'Fundamentals of React',
			exercises: 10,
		},
		{
			name: 'Using props to pass data',
			exercises: 7,
		},
		{
			name: 'State of a component',
			exercises: 14,
		},
 ]

  return (
		<>
			<Header
				course={ course }
			/>
			<Content
				parts={parts}				
			/>
			<Footer
				parts={parts}	
			/>
		</>
	)
}

export default App
