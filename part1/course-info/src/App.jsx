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

const Content = ({
	part1,
	exercises1,
	part2,
	exercises2,
	part3,
	exercises3,
}) => (
	<>
		<Part1
			part1={ part1 }
			exercises1={ exercises1 }
		/>

		<Part2
			part2={ part2 }
			exercises2={ exercises2 }
		/>
		<Part3
			part3={ part3 }
			exercises3={ exercises3 } 
			/>
	</>
)

const Footer = ( {
	exercises1,
	exercises2,
	exercises3
} ) => (
	<>
		<p>
			Number of exercises
			{ exercises1 + exercises2 + exercises3 }
		</p>
	</>
)


function App() { 
   const course = 'Half Stack application development'
   const part1 = 'Fundamentals of React'
   const exercises1 = 10
   const part2 = 'Using props to pass data'
   const exercises2 = 7
   const part3 = 'State of a component'
   const exercises3 = 14

  return (
		<>
			<Header
				course={ course }
			/>
			<Content
				part1={part1}
				exercises1={exercises1}
				part2={part2}
				exercises2={exercises2}
				part3={part3}
				exercises3={exercises3}
			/>
			<Footer
				exercises1={exercises1}
				exercises2={exercises2}
				exercises3={exercises3}
			/>
		</>
	)
}

export default App
