const btnUpdate = document.querySelector('.btn');
const btnDelete = document.querySelector('.btn--delete');
const notif = document.querySelector('.notification');

btnUpdate.addEventListener('click', () => {
	fetch('/quotes', {
		method: 'put',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: 'Darth Vader',
			quote: 'Noooo'
		})
	})
	.then(res => {
		if (res.ok) return res.json();
	})
	.then(res => {
		window.location.reload(true);
	})
});

btnDelete.addEventListener('click', async () => {
	// fetch('/quotes', {
	// 	method: 'delete',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify({
	// 		name: 'Darth Vader',
	// 	})
	// })
	// .then(res => {	
	// 	if (res.ok) return res.json();
	// })
	// .then(res => {

	// 	window.location.reload(true);
	// })

	const response = await fetch('/quotes', {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: 'Darth Vader',
		})
	});

	const data = await response.json();
	if (data === 'Deleted Darth Vaders\'s quote') {
		notif.textContent = "No Darth Vader quote to delete"
	} else {
		window.location.reload(true);
	}
})