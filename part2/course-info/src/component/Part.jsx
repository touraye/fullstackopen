/* eslint-disable react/prop-types */
import Footer from "./Footer"

const Part = ({ parts }) => (
	<>
		{parts?.map((part, index) => (
			<>
				<p key={index}>
					{part.name} {part.exercises}
				</p>
			</>
		))}

		<Footer part={parts} />
	</>
)

export default Part
