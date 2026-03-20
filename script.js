// 🔹 Preloaded posts (everyone sees these by default)
let posts = JSON.parse(localStorage.getItem("posts")) || [
  {t:"Role Of Education", c:"Education is very important in everyone’s life. It helps us gain knowledge, improve skills, and build a successful future. Education also helps in making better decisions and becoming a responsible person in society.", img:"premium_photo-1682125773446-259ce64f9dd7.avif", date:new Date().toLocaleDateString()},
  {t:"Technology Importance", c:"Technology plays an important role in our daily life. It makes communication easy, improves education, and helps in faster work.", img:"information-technology-background-yj5lntx9lzio3yiz.jpg", date:new Date().toLocaleDateString()},
  {t:"College Life", c:"College life is one of the best phases of life. We learn new things, make friends, and build our future.", img:"istockphoto-2168908764-612x612.jpg", date:new Date().toLocaleDateString()},
  {t:"Time Management", c:"Time management is very important for success. It helps us complete tasks on time, reduce stress, and achieve our goals effectively in both personal and professional life.", img:"time-management-business-strategy-saving-260nw-2521622047.webp", date:new Date().toLocaleDateString()}
];

// 🔹 Save back to localStorage
localStorage.setItem("posts", JSON.stringify(posts));

let isAdmin = false;

const list = document.getElementById("list");
const title = document.getElementById("title");
const content = document.getElementById("content");
const img = document.getElementById("img");
const search = document.getElementById("search");
const adminDiv = document.getElementById("admin");

// 🔐 Admin Login
function login(){
  let pass = prompt("Enter admin password");
  if(pass && pass.trim() === "admin123"){
    alert("Login successful");
    isAdmin = true;
    adminDiv.classList.remove("hidden");
    showPosts();
  } else {
    alert("Wrong password");
  }
}

// ➕ Add / Save Post
function savePost(){
  if(!title.value || !content.value){
    alert("Enter title and content");
    return;
  }

  let post = {
    t: title.value,
    c: content.value,
    img: img.value,
    date: new Date().toLocaleDateString()
  };

  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  title.value = "";
  content.value = "";
  img.value = "";

  showPosts();
}

// 📄 Show posts
function showPosts(data = posts){
  list.innerHTML = "";

  if(data.length === 0){
    list.innerHTML = "<p>No posts found</p>";
    return;
  }

  data.forEach((p,i)=>{
    list.innerHTML += `
      <div class="post">
        <h3 onclick="viewPost(${i})">${p.t}</h3>
        <p>${p.date}</p>
        ${p.img ? `<img src="${p.img}">` : ""}
        <p>${p.c.substring(0,50)}...</p>
        ${isAdmin ? `
        <button onclick="editPost(${i})">Edit</button>
        <button onclick="deletePost(${i})">Delete</button>` : ""}
      </div>
    `;
  });
}

// 👁 View full post
function viewPost(i){
  alert(posts[i].c);
}

// ❌ Delete post
function deletePost(i){
  if(confirm("Are you sure to delete?")){
    posts.splice(i,1);
    localStorage.setItem("posts", JSON.stringify(posts));
    showPosts();
  }
}

// ✏ Edit post
function editPost(i){
  title.value = posts[i].t;
  content.value = posts[i].c;
  img.value = posts[i].img;
  deletePost(i); // remove old, will save new on Save
}

// 🔍 Search posts
search.addEventListener("keyup", function(){
  let value = search.value.toLowerCase();

  let filtered = posts.filter(p =>
    p.t.toLowerCase().includes(value)
  );

  showPosts(filtered);
});

// 🔹 Initial load
showPosts();