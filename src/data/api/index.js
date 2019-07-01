const SERVER = 'https://jsonplaceholder.typicode.com'
const GET = { method: 'GET' }

function getItems() {
	return fetch(`${SERVER}/todos`, GET) // /${from || 1
	.then(response => response.json())
	// Reduce items to an array of titles (strings)
	.then(data => data.reduce((acc, item) => acc.push(item.title) && acc, []))
}

function getPosts() {
	return fetch(`${SERVER}/posts`, GET)
	.then(response => response.json())
}

function getAlbums() {
	return fetch(`${SERVER}/albums`, GET)
	.then(response => response.json())
}

export default { getItems, getPosts, getAlbums }
