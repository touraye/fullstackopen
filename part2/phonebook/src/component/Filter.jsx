/* eslint-disable react/prop-types */

const Filter = ({handleFilter}) => (
	<input type='text' onChange={handleFilter} placeholder='search person' />
)

export default Filter
