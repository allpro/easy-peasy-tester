import { computed, action, thunk } from 'easy-peasy'


const initialListState = {
	items: ['Create store', 'Wrap application', 'Use store'],
	isFetching: false
}

const listModel = {
	...initialListState,

	count: computed(s => s.items.length),

	setIsFetching: action(
		state => { state.isFetching = true },
		{ listenTo: '@thunk.list.getItems(started)' }
	),
	setNotFetching: action(
		state => { state.isFetching = false },
		{ listenTo: '@thunk.list.getItems(completed)' }
	),

	getItems: thunk((actions, config, { injections }) => (
		injections.api.getItems(config)
		.then(actions.setItems)
	)),
	setItems: action((state, items) => {
		state.items = state.items.concat(items)
	}),

	addItem: action((state, item) => {
		state.items.push(item)
	}),
	removeItem: action((state, index) => {
		state.items.splice(index, 1)
	})
}

export default listModel
