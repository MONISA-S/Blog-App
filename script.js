let posts = [
  {t:"EDUCATION", c:"⭐Education is very important in everyone’s life.\n⭐It helps us to gain knowledge, improve skills, and build a successful future.\n⭐It also helps in making better decisions and becoming a responsible person in society.", img:"https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww", category:"Importance Of Education", date: new Date().toLocaleDateString('en-GB'), likes:0, comments:[]},
  {t:"TECHNOLOGY", c:"⭐Technology plays a major role in modern life.\n⭐It makes communication easy, improves education, and helps in faster work.\n⭐Without technology, modern life is difficult.", img:"https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg", category:"Technology In Modern Life", date: new Date().toLocaleDateString('en-GB'), likes:0, comments:[]},
  {t:"COLLEGE LIFE", c:"⭐College life is one of the best phases of life.\n⭐We learn new things, make friends, and build our future.\n⭐It gives both knowledge and experience.", img:"https://media.istockphoto.com/id/2168908764/photo/graduation-cap-toss.jpg?s=612x612&w=0&k=20&c=URWTTXnrXRDC-rrS3O7fNFBWf8dm5-SF-C8o2mMfjcg=", category:"Journey Of College Life", date: new Date().toLocaleDateString('en-GB'), likes:0, comments:[]},
  {t:"TIME MANAGEMENT", c:"⭐Time management is very important for success.\n⭐It helps us complete tasks on time and reduce our stress.\n⭐Achieve our goals effectively in both personal and professional life.", img:"https://cdn.pixabay.com/photo/2018/03/11/09/11/time-3216252_1280.jpg", category:"Art Of Time Management", date: new Date().toLocaleDateString('en-GB'), likes:0, comments:[]}
];

const home = document.getElementById("home");
const fullPost = document.getElementById("fullPost");
const postList = document.getElementById("postList");
const fullTitle = document.getElementById("fullTitle");
const fullImage = document.getElementById("fullImage");
const fullContent = document.getElementById("fullContent");
const postDate = document.getElementById("postDate");
const likeCount = document.getElementById("likeCount");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const adminSection = document.getElementById("adminSection");
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const postCategory = document.getElementById("postCategory");
const postImage = document.getElementById("postImage");
let currentIndex = 0;
let isAdmin = false; 

document.addEventListener("DOMContentLoaded", function () {
  adminSection.classList.add("hidden");
});

let categories = [...new Set(posts.map(p => p.category))];
categories.forEach(c => {
  let opt = document.createElement("option");
  opt.value = c;
  opt.innerText = c;
  categoryFilter.appendChild(opt);
});

function renderPosts() {
  postList.innerHTML = "";

  let search = searchInput.value.toLowerCase();
  let filter = categoryFilter.value;

  let filtered = posts.filter(p =>
    (filter === "All" || p.category === filter) &&
    p.t.toLowerCase().includes(search)
  );

  if (filtered.length === 0) {
    postList.innerHTML = "No posts found";
    return;
  }

  filtered.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "postCard";

    div.innerHTML = `
      <h3>${p.t}</h3>
      <p>${p.category} | ${p.date}</p>
      <img src="${p.img}" width="100%">
      <p>${p.c.substring(0, 80)}...</p>
    `;

    div.onclick = () => viewPost(i);

    postList.appendChild(div);
  });
}

function viewPost(i) {
  currentIndex = i;
  home.classList.add("hidden");
  fullPost.classList.remove("hidden");

  fullTitle.innerText = posts[i].t;
  fullImage.src = posts[i].img;
  fullContent.innerHTML = (posts[i].c || "").replace(/\n/g, "<br>");
  postDate.innerText = posts[i].date;
  likeCount.innerText = posts[i].likes;

  renderComments();
}
document.getElementById("backBtn").onclick = function () {
  fullPost.classList.add("hidden");
  home.classList.remove("hidden");
};

document.getElementById("likeBtn").onclick = function () {
  posts[currentIndex].likes++;
  likeCount.innerText = posts[currentIndex].likes;
};
document.getElementById("addCommentBtn").onclick = function () {
  let comment = commentInput.value.trim();
  if (comment) {
    posts[currentIndex].comments.push(comment);
    commentInput.value = "";
    renderComments();
  }
};

function renderComments() {
  commentList.innerHTML = "";
  posts[currentIndex].comments.forEach(c => {
    let li = document.createElement("li");
    li.innerText = c;
    commentList.appendChild(li);
  });
}

function adminLogin() {
  let password = prompt("Enter Admin Password");

  if (password === "admin123") {
    alert("Login Successful");
    adminSection.classList.remove("hidden");
    isAdmin = true;
  } else {
    alert("Wrong Password");
  }
}

function savePost() {
  if (!isAdmin) {
    alert("Only admin can add posts!");
    return;
  }

  let t = postTitle.value.trim();
  let c = postContent.value.trim();
  let cat = postCategory.value.trim();
  let img = postImage.value.trim();

  if (!t || !c) {
    alert("Enter title and content");
    return;
  }

  posts.push({
    t,
    c,
    category: cat || "General",
    img,
    date: new Date().toLocaleDateString('en-GB'),
    likes: 0,
    comments: []
  });

  postTitle.value = "";
  postContent.value = "";
  postCategory.value = "";
  postImage.value = "";

  if (!categories.includes(cat)) {
    categories.push(cat);
    let opt = document.createElement("option");
    opt.value = cat;
    opt.innerText = cat;
    categoryFilter.appendChild(opt);
  }

  renderPosts();
  alert("Post added!");
}

searchInput.oninput = renderPosts;
categoryFilter.onchange = renderPosts;
renderPosts();
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", function() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkModeToggle.textContent = "☀️ Light Mode";
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
});