import React from 'react'
import { Provider as ReactReduxProvider } from 'react-redux'
import { StoreProvider } from 'easy-peasy'

import store from './data/store'

import List from './components/List'

import './App.css'


function App() {
	return (
		<StoreProvider store={store}>
			<ReactReduxProvider store={store}>
				<div className="App">
					<h2>Easy-Peasy Test App</h2>
					<List />
				</div>
			</ReactReduxProvider>
		</StoreProvider>
	)
}

export default App
