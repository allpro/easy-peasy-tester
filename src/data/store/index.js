import { createStore } from 'easy-peasy'

import api from '../api'
import rootReducer from '../reducers'

import listModel from './listModel'
import postsModel from './postsModel'

const model = {
	list: listModel,
	posts: postsModel
}

const reducerEnhancer = (epRootReducer) => (
	(prevState, action) => {
		let nextState = prevState
		nextState = rootReducer(nextState, action)
		nextState = epRootReducer(nextState, action)
		return nextState
	}
)

const store = createStore(model, {
	name: 'Test Store',
	reducerEnhancer,
	injections:{ api }
})

export default store
