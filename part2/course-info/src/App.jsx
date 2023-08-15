/* eslint-disable react/prop-types */
const Header = ({ courseName }) => (
	<>
		<h2>{courseName}</h2>
	</>
)

const Part = ( {part } ) => {	
	return (<>
		<p>
			{part.name} {part.exercises}
		</p>
	</>
)
}

const Content = ( { parts } ) => {		
	return (
		<>
			{ parts?.map( ( course, index ) => (
				<Part key={index} part={course} />
			))}					
		</>
	)
}

const Course = ( { course } ) => {
	return (
		<>
			<Header courseName={ course.name } />
			<Content parts={course.parts} />
		</>
	)
}

function App() { 
 const course = {
		name: 'Half Stack application development',
		id: 1,
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2,
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3,
			},
		],
 }

  return (
		<>
			<Course 
			course={course} />
		</>
	)
}

export default App
