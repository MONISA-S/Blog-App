let posts = JSON.parse(localStorage.getItem("posts")) || [];

let isAdmin = false;

const list = document.getElementById("list");
const title = document.getElementById("title");
const content = document.getElementById("content");
const img = document.getElementById("img");
const search = document.getElementById("search");
const adminDiv = document.getElementById("admin");

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
        <img src="${p.img}">
        <p>${p.c.substring(0,50)}...</p>
        ${isAdmin ? `
        <button onclick="editPost(${i})">Edit</button>
        <button onclick="deletePost(${i})">Delete</button>` : ""}
      </div>
    `;
  });
}

function viewPost(i){
  alert(posts[i].c); 
}

function deletePost(i){
  if(confirm("Are you sure to delete?")){
    posts.splice(i,1);
    localStorage.setItem("posts", JSON.stringify(posts));
    showPosts();
  }
}

function editPost(i){
  title.value = posts[i].t;
  content.value = posts[i].c;
  img.value = posts[i].img;

  deletePost(i);
}

search.addEventListener("keyup", function(){
  let value = search.value.toLowerCase();

  let filtered = posts.filter(p =>
    p.t.toLowerCase().includes(value)
  );

  showPosts(filtered);
});

showPosts();