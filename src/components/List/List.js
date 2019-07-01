import React, { useState } from 'react'
import { useStoreState, useStoreActions, useStoreDispatch } from 'easy-peasy'
// import { connect } from 'react-redux'

import reduxActions from '../../data/actions'

function ListContainer() {
	// Load state values individually so no unnecessary re-renders
	const items = useStoreState(s => s.list.items)
	const count = useStoreState(s => s.list.count)

	console.log({ count, items })

	// Model Actions can be imported as one object instead of individually
	const listActions = useStoreActions(actions => actions.list)
	const postActions = useStoreActions(actions => actions.posts)

	// Easy-Peasy Thunk-Actions
	const getItemsAction = () => listActions.getItems()
		// .then(action => console.log('ListContainer.getItems', action))
	const getPostsAction = () => postActions.getItems()

	// Ordinary Redux Thunk-Dispatches (plus dispatch method)
	const dispatch = useStoreDispatch()
	const getAlbumsDispatch = () => dispatch(reduxActions.getAlbums())
	const getPostsDispatch = () => dispatch(reduxActions.getPosts())

	return (
		<List
			items={items}
			count={count}
			addItem={listActions.addItem}
			removeItem={listActions.removeItem}
			getItems={getItemsAction}
			getAlbums={getAlbumsDispatch}
			getPostsAction={getPostsAction}
			getPostsDispatch={getPostsDispatch}
			savePostView={() => postActions.view.savePayload()}
		/>
	)
}

const styles = {
	button: { margin: '0 10px' },
	listWrapper: { textAlign: 'left', display: 'inline-block' }
}

function List(props) {
	return (
		<div>
			<div>
				<button onClick={props.getItems} style={styles.button}>
					Get Items
				</button>

				<button onClick={props.getAlbums} style={styles.button}>
					Get Albums
				</button>

				<button onClick={props.getPostsDispatch} style={styles.button}>
					Get Posts (Dispatch)
				</button>

				<button onClick={props.getPostsAction} style={styles.button}>
					Get Posts (Action)
				</button>

				<button onClick={props.savePostView} style={styles.button}>
					Post.View Payload
				</button>
			</div>

			<div style={styles.listWrapper}>
				<p style={{ borderBottom: '1px solid #999', paddingBottom: '7px' }}>
					{props.count} Item{props.count === 1 ? '' : 's'}
				</p>

				<ul style={{ paddingLeft: 0, listStyle: 'none' }}>
					{props.items.map((item, idx) => (
						<ListItem
							key={idx}
							item={{ name: item, id: idx }}
							removeItem={props.removeItem}
						/>
					))}

					<NewListItem
						addItem={props.addItem}
					/>
				</ul>
			</div>
		</div>
	)
}


function ListItem(props) {
	const { item, removeItem } = props
	const remove = () => removeItem(item.id)

	return (
		<li style={{ padding: '5px 0', cursor: 'pointer' }}>
			<span onClick={remove}>[ &ndash; ]</span> {item.name}
		</li>
	)
}


function NewListItem(props) {
	const [ value, setValue ] = useState('')

	const onKey = e => {
		if (value && e.keyCode === 13) {
			props.addItem(value)
			setValue('')
		}
	}

	return (
		<li style={{ padding: '5px 0' }}>
			&nbsp; &nbsp; &nbsp;
			<input
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyUp={onKey}
				placeholder="new item..."
				style={{ padding: '5px' }}
			/>
		</li>
	)
}


export default ListContainer

// const stateToProps = state => ({
// 	items: state.list.items,
// 	count: state.list.count
// })
//
// const dispatchToProps = dispatch => dispatch.list
//
// export default connect(stateToProps, dispatchToProps)(ListContainer)
