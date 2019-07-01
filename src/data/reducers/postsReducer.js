const initialPostsState = {
	items: [],
	count: 0,
	isFetching: false
}

const postsReducer = (state, action) => {
	// Init State
	if (!state) return initialPostsState

	const { type, payload } = action

	switch(type) {
		// REF: The getPosts action uses this action-name
		case 'GET_POSTS_ITEMS':
			return state

		case 'SET_POSTS_ITEMS':
			return Object.assign({}, state, {
				items: state.items.concat(payload),
				count: state.items.length + payload.length
			})

		case 'SET_POSTS_IS_FETCHING':
			return Object.assign({}, state, {
				isFetching: true
			})

		case 'SET_POSTS_NOT_FETCHING':
			return Object.assign({}, state, {
				isFetching: false
			})

		default:
			return state
	}
}

export default postsReducer
