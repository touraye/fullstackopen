/* eslint-disable react/prop-types */
import Content from "./Content"
import Header from "./Header"

const Course = ({ course }) => {
	return (
		<>
			<Header courseName={course.name} />
			<Content courses={course} />
		</>
	)
}

export default Course
