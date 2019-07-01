import { action, thunk } from 'easy-peasy'


const postsViewModel = {
	filters: {},
	results: [],
	loaded: [],
	payload: null,

	savePayload: action((state, payload) => {
		state.payload = payload || 'payload'
	})
}

// NOTE: This replicates the 'posts' state created in rootReducer.
// This is for TESTING - it is not required.
const initialPostsState = {
	items: [],
	count: 0,
	isFetching: false
}

const postsModel = {
	...initialPostsState,

	setIsFetching: action(
		state => { state.isFetching = true },
		{ listenTo: '@thunk.posts.getItems(started)' }
	),
	setNotFetching: action(
		state => { state.isFetching = false },
		{ listenTo: [
			'@thunk.posts.getItems(completed)',
			'@thunk.posts.getItems(failed)'
		]}
	),

	getItems: thunk((actions, config, { injections }) => (
		injections.api.getPosts(config)
		.then(actions.setItems)
	)),
	setItems: action((state, items) => {
		state.items = state.items.concat(items)
		state.count = state.items.length
	}),

	view: postsViewModel
}

export default postsModel
