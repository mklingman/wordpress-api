window.addEventListener("DOMContentLoaded", getData);
//alert("hello");

function getData() {
	const urlParams = new URLSearchParams(window.location.search);
	const search = urlParams.get("search");
	//document.querySelector("h1").textContent = query

	const id = urlParams.get("id");
	console.log(id);

	if (search) {
		console.log("this is a search result")
		getSearchData();
	} else if (id) {
		getSingleBook();
	} else {
		console.log("NOT SEARCHING")
		getFrontpageData();
	}
}

function getSearchData() {
	console.log("getData")
	const urlParams = new URLSearchParams(window.location.search);
	const search = urlParams.get("search");


	fetch("http://popispop.net/wordpress/wp-json/wp/v2/book?_embed&search=" + search)
		.then(res => res.json())
		.then(handleData)

}

function handleData(myData) {
	//	console.log(myData);
	//	1. loop
	myData.forEach(showPost)
}

function getFrontpageData() {
	fetch("http://popispop.net/wordpress/wp-json/wp/v2/book?_embed")


		.then(res => res.json())
		.then(handleData)
	//		console.log("getData")

}

function getSingleBook(myData) {
	//		console.log("getData")
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	//document.querySelector("h1").textContent = query
	console.log(id)

	fetch("http://popispop.net/wordpress/wp-json/wp/v2/book/" + id + "?_embed")
		.then(res => res.json())
		.then(showBook);


	function showBook(book) {
		console.log(book._embedded)
		document.querySelector("article h1").textContent = book.title.rendered;

		const imgPath = book._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
		//const template =
		//document.querySelector(".postTemplate").content;
		//const postCopy = template.cloneNode(true);

		const img = document.querySelector('img')



		img.setAttribute("src", imgPath)

	}
	//document.querySelector("article h1").textContent =
}



function showPost(post) {
	console.log(post)
	const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
	//	2. clone a template
	const template =
		document.querySelector(".postTemplate").content;
	const postCopy = template.cloneNode(true);
	//	3. textContent & inerHTML
	const h1 = postCopy.querySelector("h1");
	h1.textContent = post.title.rendered;

	//	below is new javascript to pull data and build my sub page

	const img = postCopy.querySelector("img.cover");

	img.setAttribute("src", imgPath)
	img.setAttribute("alt", "Cover of the Book" + post.title.rendered)

	const a = postCopy.querySelector("a");
	a.href = "sub.html?id=" + post.id



	const content = postCopy.querySelector("section");
	content.innerHTML = post.content.rendered;

	const publisher = postCopy.querySelector(".publisher");
	publisher.innerHTML = post.publisher;

	//	const img = postCopy.querySelector("img.cover");
	//	img.setAttribute("src", imgPath);

	//	4.append
	document.querySelector("#posts").appendChild(postCopy);
}
