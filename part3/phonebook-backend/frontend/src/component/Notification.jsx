/* eslint-disable react/prop-types */
const Notification = ( { message, messageTye } ) => {
    if ( message === null ) {
        return null
    }

  return (
      <div className={
          message && messageTye === 'success' ? 'success' : messageTye === 'error' ? 'error' : ''
      }
      >
			{message}
		</div>
	)
}

export default Notification
