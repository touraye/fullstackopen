/* eslint-disable react/prop-types */
const Notification = ( { message } ) => {
    if ( message === null ) {
        return null
    }

  return (
		<div className={message ? 'notification' : null}>
			{message}
		</div>
	)
}

export default Notification
