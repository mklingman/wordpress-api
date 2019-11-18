window.addEventListener("DOMContentLoaded", getData);
//alert("hello");

function getData() {
	const urlParams = new URLSearchParams(window.location.search);
	const search = urlParams.get("search");
	//document.querySelector("h1").textContent = query

	const id = urlParams.get("id");
	const category = urlParams.get("category");

	console.log("id: " + id);

	if (search) {
		console.log("this is a search result")
		getSearchData();
	} else if (id) {
		getSingleMovie();
	} else if (category) {
		getCategoryData(category);
		console.log("you should be showing category", category);

	} else {
		console.log("NOT SEARCHING")
		getFrontpageData();
	}

	getNavigation()
}

function getNavigation() {
	fetch("http://popispop.net/wordpress/wp-json/wp/v2/categories?per_page.search=100")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			data.forEach(addLink)
		})

}


//category stuff here
function addLink(oneItem) {
	console.log(oneItem.name);
	if (oneItem.parent === 37 && oneItem.count > 0) {
		const link = document.createElement("a");
		link.textContent = oneItem.name;
		link.setAttribute("href", "category.html?category=" + oneItem.id)
		document.querySelector("nav").appendChild(link);
	}
}

function getSearchData() {
	console.log("getData");
	const urlParams = new URLSearchParams(window.location.search);
	const search = urlParams.get("search");
	//console.log(search)

	fetch("http://popispop.net/wordpress/wp-json/wp/v2/movie?_embed&search=" + search)
		.then(res => res.json())
		.then(handleData)

}

function getCategoryData(catId) {
	console.log(catId);
	fetch("http://popispop.net/wordpress/wp-json/wp/v2/movie?_embed&categories=" + catId)
		.then(res => res.json())
		.then(handleData)


}


function handleData(myData) {
	//	console.log(myData);
	//	1. loop
	//console.log(myData)
	myData.forEach(showPost)
}

function getFrontpageData() {
	fetch("http://popispop.net/wordpress/wp-json/wp/v2/movie?_embed")


		.then(res => res.json())
		.then(handleData)
	//		console.log("getData")

}

function getSingleMovie(myData) {
	//		console.log("getData")
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	//document.querySelector("h1").textContent = query
	console.log(id)

	fetch("http://popispop.net/wordpress/wp-json/wp/v2/movie/" + id + "?_embed")
		.then(res => res.json())
		.then(showMovie);
}

function showMovie(movie) {
	console.log(movie._embedded)
	document.querySelector("article h1").textContent = movie.title.rendered;
	const imgPath = movie._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
	//const template =
	//document.querySelector(".postTemplate").content;
	//const postCopy = template.cloneNode(true);

	const img = document.querySelector('img')



	img.setAttribute("src", imgPath)

	document.querySelector(".singlemovie a").href = `sub.html?id=${movie.id}`
	document.querySelector(".director").textContent = movie.director;
	document.querySelector(".body-copy").innerHTML = movie.content.rendered;
	document.querySelector(".beer").textContent = movie.beer;
	document.querySelector(".price").textContent = movie.price;



}
//document.querySelector("article h1").textContent =





function showPost(post) {
	console.log("hey");
	console.log(post);
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
	img.setAttribute("alt", "Cover of the Movie" + post.title.rendered)

	const a = postCopy.querySelector("a");
	a.href = "sub.html?id=" + post.id



	const content = postCopy.querySelector("section");
	content.innerHTML = post.content.rendered;

	const director = postCopy.querySelector(".director");
	director.innerHTML = post.director;

	const beer = postCopy.querySelector(".beer");
	beer.innerHTML = post.beer;

	const price = postCopy.querySelector(".price");
	price.innerHTML = post.price;

	//	const img = postCopy.querySelector("img.cover");
	//	img.setAttribute("src", imgPath);

	//	4.append
	document.querySelector("#posts").appendChild(postCopy);
}
