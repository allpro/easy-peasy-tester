import api from '../api'


const ACTIONS = [
	'GET_POSTS_ITEMS',
	'SET_POSTS_ITEMS',
	'SET_POSTS_IS_FETCHING',
	'SET_POSTS_NOT_FETCHING',
	'GET_ALBUMS_ITEMS',
	'SET_ALBUMS_ITEMS',
	'SET_ALBUMS_IS_FETCHING',
	'SET_ALBUMS_NOT_FETCHING',
].reduce((hash, name) => {
	hash[name] = name
	return hash
}, {})


const actions = {
	getPosts: config => dispatch => {
		dispatch({ type: ACTIONS.SET_POSTS_IS_FETCHING })
		dispatch({ type: ACTIONS.GET_POSTS_ITEMS })

		return api.getPosts(config)
		.then(payload => {
			dispatch({ type: ACTIONS.SET_POSTS_ITEMS, payload })
			dispatch({ type: ACTIONS.SET_POSTS_NOT_FETCHING })
		})
	},

	getAlbums: config => dispatch => {
		dispatch({ type: ACTIONS.SET_ALBUMS_IS_FETCHING })
		dispatch({ type: ACTIONS.GET_ALBUMS_ITEMS })

		return api.getAlbums(config)
		.then(payload => {
			dispatch({ type: ACTIONS.SET_ALBUMS_ITEMS, payload })
			dispatch({ type: ACTIONS.SET_ALBUMS_NOT_FETCHING })
		})
	}
}

export default actions
