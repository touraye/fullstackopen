import React from 'react'

const Notification = ( { message, type } ) => {
    if ( message == null ) {
        return null
    }

  return (
		<div
			className={
				message && type === 'success'
					? 'success'
					: type === 'error'
					? 'error'
					: ''
			}>
			{message}
		</div>
	)
}

export default Notification
