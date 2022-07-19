const searchBar = document.getElementById("searchBar");
const memberList = document.getElementById("dataTable");
let members = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredMembers = members.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.role.toLowerCase().includes(searchString) ||
      character.email.toLowerCase().includes(searchString)
    );
  });
  displayMembers(filteredMembers);
});

const populateMembers = async () => {
  try {
    console.log("before before");
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    members = await res.json();
    displayMembers(members);
  } catch (err) {
    console.error(err);
  }
};

const displayMembers = (members) => {
  const htmlString = members
    .map((members) => {
      return `<tr>
         <td><input type="checkbox"></td>
         <td>${members.name}</td>
         <td>${members.email}</td>
         <td>${members.role}</td>
         <td><button type="button" class="btn btn-secondary"><i class="fa-solid fa-pen-to-square"></i></button></td>
         <td><button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button></td>
         </tr>`;
    })
    .join("");

  memberList.innerHTML = htmlString;
};

populateMembers();
