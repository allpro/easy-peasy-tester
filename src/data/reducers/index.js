import { combineReducers } from 'redux'

import posts from './postsReducer'
import albums from './albumsReducer'

const dummyReducer = state => state || {}

export default combineReducers({
	posts,
	albums,

	// Add dummy keys for each easy-peasy root key.
	// This prevents combineReducers from ignoring/deleting these keys.
	list: dummyReducer
})
