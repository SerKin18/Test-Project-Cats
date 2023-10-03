const list = document.getElementById("list");
const input = document.getElementById("input");
const filterBtn = document.querySelector("#filter");

let USERS = [];

filterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filter(USERS);
});

input.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredUsers = USERS.filter((user) => {
    return user.name.toLowerCase().includes(value);
  });
  render(filteredUsers);
});

async function start() {
  list.innerHTML = "LOADING...";
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await resp.json();
    console.log(data);
    setTimeout(() => {
      USERS = data;
      render(USERS);
    }, 2000);
  } catch (err) {
    list.style.color = "red";
    list.innerHTML = "ERROR MASSAGE...";
  }
}

function render(users = []) {
  if (users.length === 0) {
    list.innerHTML = "No match users.";
  } else {
    const html = users.map(listToHtml).join("");
    list.innerHTML = html;
  }
}
function listToHtml(user) {
  return `
		<li class="list-item">  ${user.name}   </li>`;
}

function filter(data) {
  const filt = data.filter((item) => item.id % 2 === 0);
  render(filt);
}
start();
