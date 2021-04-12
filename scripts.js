const API = "https://jsonplaceholder.typicode.com/";

// async function _get(url) {
//     const req = await fetch(url, {
//         headers: { "Content-Type": "application/json" },
//     });
//     const res = await req.json();
//     return res;
// }

// async function _post(url, data) {
//     const req = await fetch(url, {
//         headers: { "Content-Type": "application/json" },
//         method: "POST",
//         body: JSON.stringify(data),
//     });
//     const res = await req.json();
//     return res;
// }

function sanitizeUrl(url) {
    return url.replace(window.location.href, "");
}

function clearMain() {
    const main = document.querySelector("main .container");
    main.innerHTML = "";
    return main;
}

async function createPostCard(obj, parent) {
    const title = document.createElement("h2");
    title.innerText = obj.title;

    const metaReq = await fetch(API + "users/" + obj.userId);
    const metaRes = await metaReq.json();

    const meta = document.createElement("p");
    meta.classList.add("meta");
    meta.innerHTML = `A blog post by <a href="/users/${obj.userId}">${metaRes.name}</a>`;

    const content = document.createElement("p");
    content.innerText = obj.body;

    const commentsTitle = document.createElement("h4");
    commentsTitle.innerText = "Comments:";

    const comments = document.createElement("ul");
    const commReq = await fetch(API + "posts/" + obj.id + "/comments");
    const commRes = await commReq.json();

    commRes.forEach((comment) => {
        const li = document.createElement("li");
        li.innerText = comment.body;
        comments.append(li);
    });

    parent.appendChild(title);
    parent.appendChild(meta);
    parent.appendChild(content);
    parent.appendChild(commentsTitle);
    parent.appendChild(comments);

    parent.querySelector(".meta a").addEventListener("click", (e) => {
        showUsersPosts(e, obj.userId);
    });
}

async function showBlogPost(event) {
    event.preventDefault();

    const request = await fetch(API + sanitizeUrl(event.target.href));
    const response = await request.json();

    const main = clearMain();
    createPostCard(response, main);
}

function buildBlogCard(obj, parent) {
    const div = document.createElement("div");
    div.classList.add("card");
    const head = document.createElement("h4");

    const link = document.createElement("a");
    link.innerText = obj.title;
    link.href = `/posts/${obj.id}`;

    link.addEventListener("click", showBlogPost);

    head.appendChild(link);
    div.appendChild(head);

    parent.appendChild(div);
}

async function loadBlog(event) {
    event.preventDefault();
    const url = API + sanitizeUrl(event.target.href);

    const request = await fetch(url);
    const response = await request.json();
    const main = clearMain();

    response.forEach((o) => buildBlogCard(o, main));
}

function loadGallery(event) {
    event.preventDefault();
    console.log("loading Gallery");
}

async function showUsersPosts(event, user) {
    event.preventDefault();

    const postsReq = await fetch(API + "posts");
    const postsRes = await postsReq.json();

    const myPosts = postsRes.filter((p) => p.userId === user);
    const main = clearMain();

    myPosts.forEach((post) => buildBlogCard(post, main));
}

function buildUsersCard(obj) {
    const div = document.createElement("div");
    div.classList.add("card");

    const link = document.createElement("a");
    link.innerText = obj.name;
    link.href = `/users/${obj.id}`;

    link.addEventListener("click", (e) => showUsersPosts(e, obj.id));

    div.appendChild(link);

    return div;
}

async function loadUsers(event) {
    event.preventDefault();

    const request = await fetch(API + sanitizeUrl(event.target.href));
    const response = await request.json();

    const main = clearMain();
    response.forEach((user) => {
        main.appendChild(buildUsersCard(user));
    });
}

function topNavigation() {
    const functions = [loadBlog, loadGallery, loadUsers];
    document.querySelectorAll("header nav a").forEach((link, index) => {
        link.addEventListener("click", functions[index]);
    });
}

topNavigation();
