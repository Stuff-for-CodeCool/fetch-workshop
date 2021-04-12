const API = "https://jsonplaceholder.typicode.com/";

function sanitizeUrl(url) {
    return url.replace(window.location.href, "");
}

function loadBlog(event) {
    event.preventDefault();
    console.log("loading Blog");
}

function loadGallery(event) {
    event.preventDefault();
    console.log("loading Gallery");
}

function loadUsers(event) {
    event.preventDefault();
    console.log("loading Users");
}

function topNavigation() {
    const functions = [loadBlog, loadGallery, loadUsers];
    document.querySelectorAll("header nav a").forEach((link, index) => {
        link.addEventListener("click", functions[index]);
    });
}

topNavigation();
