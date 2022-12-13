const container = document.getElementById("container");
const confirm = document.getElementById("yes");
const cancel = document.getElementById("no");
const form_body = document.getElementById("form-body");
const error = document.getElementById("error");
const create = document.getElementById("create");
const form = document.getElementById("form");
const form_title = document.getElementById("form-title");


/*
ajax part
*/

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const Posts = JSON.parse(xhr.responseText);
    Posts.map((todo, index) => {
      return (container.innerHTML += `<div class="card"><p class="card-title">${
        Posts[index].title.length > 35
          ? Posts[index].title.slice(0,30) + "..."
          : Posts[index].title
      }</p>
        <p class="text">completed : ${
          Posts[index].body.length > 130
            ? Posts[index].body.slice(0, 129) + "..."
            : Posts[index].body
        } </p>
        </div>`);
    });
  }
};
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xhr.send();

/* making events */
let title2 = "";
let fill = "";
form_title.addEventListener("input", (e) => {
    title2 = e.target.value;
  mydata.title = title2;
});
form_body.addEventListener("input", (e) => {
 fill = e.target.value;
  mydata.body = fill;
});
const mydata = {
  title: title2,
  body:fill,
};

create.addEventListener("click", () => {
  error.style.display = "none";

  form.style.display = "flex";

  window.scrollTo(0, document.body.scrollHeight);
});
confirm.addEventListener("click", () => {
  if (title2 === "" && fill === "") {
    form.style.display = "none";
    error.style.display = "block";
  } else {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mydata),
    })
      .then((response) => response.json())
      .then((data) => {
        container.innerHTML += `<div class="card"><p class="card-title">${data.title}</p>
                 <p class="text">${data.body}</p>
                 </div>`;
      });

    form.style.display = "none";
  }
});
cancel.addEventListener("click", () => {
  form.style.display = "none";
});