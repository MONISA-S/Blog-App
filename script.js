let posts = JSON.parse(localStorage.getItem("posts")) || [
  {t:"Role Of Education", c:"Education is very important in everyone’s life. It helps us gain knowledge, improve skills, and build a successful future. Education also helps in making better decisions and becoming a responsible person in society.", img:"https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww", date:new Date().toLocaleDateString()},
  {t:"Technology Importance", c:"Technology plays an important role in our daily life. It makes communication easy, improves education, and helps in faster work.", img:"https://wallpapers.com/images/hd/information-technology-1920-x-1080-background-yj5lntx9lzio3yiz.jpg", date:new Date().toLocaleDateString()},
  {t:"College Life", c:"College life is one of the best phases of life. We learn new things, make friends, and build our future.", img:"https://media.istockphoto.com/id/2168908764/photo/graduation-cap-toss.jpg?s=612x612&w=0&k=20&c=URWTTXnrXRDC-rrS3O7fNFBWf8dm5-SF-C8o2mMfjcg=", date:new Date().toLocaleDateString()},
  {t:"Time Management", c:"Time management is very important for success. It helps us complete tasks on time, reduce stress, and achieve our goals effectively in both personal and professional life.", img:"https://cdn.pixabay.com/photo/2018/03/11/09/11/time-3216252_1280.jpg", date:new Date().toLocaleDateString()}
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