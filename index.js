const searchBar = document.getElementById("searchBar");
const memberList = document.getElementById("dataTable");
let members = [];

searchBar.addEventListener("keyup", (event) => {
  const searchString = event.target.value.toLowerCase();
  const filteredMembers = members.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.role.toLowerCase().includes(searchString) ||
      character.email.toLowerCase().includes(searchString)
    );
  });
  displayMembers(filteredMembers);
});

const fetchMembers = async () => {
  try {
    const res = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    members = await res.json();
    displayMembers(members);
  } catch (err) {
    console.error(err);
  }
};

const displayMembers = (membersData) => {
  const htmlString = membersData
    .map((membersData) => {
      return `<tr>
          <td><input type="checkbox"></td>
          <td>${membersData.name}</td>
          <td>${membersData.email}</td>
          <td>${membersData.role}</td>

          <td>
          <button class="btn btn-secondary" onclick="editMember()" id="${membersData.id}">
          <i class="fa-solid fa-pen-to-square"></i>
          </button>
          </td>

          <td>
          <button onclick="deleteMember(event)" id="${membersData.id}" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
          </button>
          </td>

          </tr>`;
    })
    .join("");

  memberList.innerHTML = htmlString;
};

function editMember() {

  
}

function deleteMember(event) {
  const getMember = members.findIndex(
    (member) => member.id === event.target.id
  );
  members.splice(getMember.id - 1, 1);
  displayMembers(members);
}
fetchMembers();
