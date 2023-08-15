/* eslint-disable react/prop-types */
const Footer = ({ part }) => (
	<>
		<h4>
			total of{' '}
			{part?.map((part) => part.exercises).reduce((cur, acc) => cur + acc)}{' '}
			exercises
		</h4>
	</>
)

export default Footer
