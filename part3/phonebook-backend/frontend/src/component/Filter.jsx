/* eslint-disable react/prop-types */

const Filter = ( { handleFilter } ) => {
	return (
		<>
			Filter by name: {' '} 
			<input type='text' onChange={ handleFilter } placeholder='search person' />
		</>
	)
}

export default Filter
