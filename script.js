let posts = JSON.parse(localStorage.getItem("posts")) || [
  {t:"Role Of Education", c:"Education is very important in everyone’s life. It helps us gain knowledge, improve skills, and build a successful future. Education also helps in making better decisions and becoming a responsible person in society.", img:"https://images.pexels.com/photos/414511/pexels-photo-414511.jpeg?auto=compress&cs=tinysrgb&w=600", date:new Date().toLocaleDateString()},
  {t:"Technology Importance", c:"Technology plays an important role in our daily life. It makes communication easy, improves education, and helps in faster work.", img:"https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600", date:new Date().toLocaleDateString()},
  {t:"College Life", c:"College life is one of the best phases of life. We learn new things, make friends, and build our future.", img:"https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600", date:new Date().toLocaleDateString()},
  {t:"Time Management", c:"Time management is very important for success. It helps us complete tasks on time, reduce stress, and achieve our goals effectively in both personal and professional life.", img:"https://images.pexels.com/photos/955389/pexels-photo-955389.jpeg?auto=compress&cs=tinysrgb&w=600", date:new Date().toLocaleDateString()}
];

localStorage.setItem("posts", JSON.stringify(posts));

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
        ${p.img ? `<img src="${p.img}">` : ""}
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