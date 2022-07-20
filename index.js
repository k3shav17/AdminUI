const searchBar = document.getElementById("searchBar");
const memberList = document.getElementById("dataTable");
const nameId = document.getElementById("name");
let members = [];

searchBar.addEventListener("keyup", (event) => {
  console.log(event);
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
          <td class="data">${membersData.name}</td>
          <td class="data">${membersData.email}</td>
          <td class="data">${membersData.role}</td>

          <td>
          <button class="btn btn-secondary" onclick="editMember(event)" id="${membersData.id}" value="edit">
          <i class="fa-solid fa-pen-to-square"></i>
          </button>
          </td>

          <td>
          <button onclick="deleteMember(event)" id="${membersData.id}" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
          </td>

          </tr>`;
    })
    .join("");

  memberList.innerHTML = htmlString;
};

function editMember(event) {
  $(this).parent().siblings('td.data').each(function () {
    let content = $(this).html();
    $(this).html('<input value="' + content + '"/>') ;
  })

  console.log(event.target);
}

function deleteMember(event) {
  const getMember = members.findIndex(
    (member) => member.id === event.target.id
  );
  members.splice(getMember.id - 1, 1);
  displayMembers(members);
}
fetchMembers();
