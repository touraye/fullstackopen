/* eslint-disable react/prop-types */

const PersonForm = ( {
  handleSubmit,
  handleNameChange,
  handleNumberChange
} ) => (
	<form onSubmit={handleSubmit}>
		<div>
			name:{' '}
			<input onChange={handleNameChange} placeholder='Enter person name' />
		</div>
		<div>
			number:{' '}
			<input onChange={handleNumberChange} placeholder='Enter person number' />
		</div>
		<div>
			<button type='submit'>add</button>
		</div>
	</form>
)

export default PersonForm
