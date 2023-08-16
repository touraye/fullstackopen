/* eslint-disable react/prop-types */
const Person = ({ persons }) => (
	<>
		{persons?.map((person, index) => (
			<p key={index}>
				{person.name} {person.number}
			</p>
		))}
	</>
)

export default Person
