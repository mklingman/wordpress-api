const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
//document.querySelector("h1").textContent = query
console.log(id)


fetch("http://popispop.net/wordpress/wp-json/wp/v2/book/" + id)
	.then(res => res.json())
	.then(showBook)


function showBook(book) {
	console.log(book)
	document.querySelector("article h1").textContent = book.title.rendered
}
