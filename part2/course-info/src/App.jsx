/* eslint-disable react/prop-types */
const Header = ( { courseName } ) => (	
	<>
		<h3>{courseName}</h3>
	</>
)

const Part = ( { parts } ) => (
	<>
		{
			parts?.map( ( part, index ) => (
				<>
					<p key={ index }>{ part.name } { part.exercises }</p>
				</>
			))
		}

		<Footer part={parts} />
	</>
)

const Content = ({ courses }) => <Part parts={courses.parts} />	


const Footer = ( { part } ) => (
		<>
			<h4>
				total of {' '}
				{part
					.map((part) => part.exercises)
					.reduce( ( cur, acc ) => cur + acc ) }
				{' '} exercises
			</h4>
		</>
)

const Course = ( { course } ) => {	
	return (
		<>			
			<Header courseName={course.name} />
			<Content courses={course} />			
		</>
	)
}

function App() { 
 const courses = [
		{
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
				{
					name: 'Redux',
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1,
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2,
				},
			],
		},
 ]

  return (
		<>
			<h1>Web development curriculum</h1>
			{
				courses.map( course => (
					<Course
						key={ course.id }
						course={ course }
					/>					
				))
			}
		</>
	)
}

export default App
