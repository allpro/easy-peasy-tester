const initialAlbumsState = {
	items: [],
	count: 0,
	isFetching: false
}

const albumsReducer = (state, action) => {
	// Init State
	if (!state) return initialAlbumsState

	const { type, payload } = action

	switch(type) {
		// REF: The getAlbums action uses this action-name
		case 'GET_ALBUMS_ITEMS':
			return state

		case 'SET_ALBUMS_ITEMS':
			return Object.assign({}, state, {
				items: state.items.concat(payload),
				count: state.items.length + payload.length
			})

		case 'SET_ALBUMS_IS_FETCHING':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'SET_ALBUMS_NOT_FETCHING':
			return Object.assign({}, state, {
				isFetching: false
			})

		default:
			return state
	}
}

export default albumsReducer
