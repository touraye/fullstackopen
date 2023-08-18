/* eslint-disable react/prop-types */
const Person = ( { person, onDelete } ) => {	
	return (
		<li>
			<span>
				{ person.name } { person.number }
			</span>
			{ ' ' }
			<span>
				<button onClick={onDelete}>
					delete
				</button>
			</span>
		</li>
	)
}

export default Person
