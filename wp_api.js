window.addEventListener("DOMContentLoaded", getData);


function getData() {
	console.log("getData")
	//	fetch("http://popispop.net/wordpress/wp-json/wp/v2/posts) if you want all !


	//	below this gives number of posts on which page
	//	fetch("http://popispop.net/wordpress/wp-json/wp/v2/posts?per_page=4&page=2")

	//	to search for gliss
	//	fetch("http://popispop.net/wordpress/wp-json/wp/v2/posts?search=gliss")


	//	to embed
	fetch("http://popispop.net/wordpress/wp-json/wp/v2/book?_embed")


		.then(res => res.json())
		.then(handleData)

}

function handleData(myData) {
	//	console.log(myData);
	//	1. loop
	myData.forEach(showPost)
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
//img.src = post["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"];
