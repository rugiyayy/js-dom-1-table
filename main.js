let form = document.querySelector("#userForm");
let userListContainer = document.querySelector("#userListContainer");

let userArray = [];
let selectedUserId = null;

let userItems = document.getElementsByClassName("user-item");

form.addEventListener("submit", addUser);
document.getElementById("updateButton").addEventListener("click", updateUser); //iz-za toqo chto oni oba sumbit , prishlos napisat tak ibo kajis uchitivayutsa oba "submit"s
//form.addEventListener("submit", updateUser)---ussloviya putayutsa privodit k oshibke(nelza izmenit "submit na button zdes , ibo v eventlistener net button event")

function addUser(e) {
  e.preventDefault(); //prevent updating(def)
  let fullNameInput = e.target.elements["fullName"]; //vozvrashaet input
  let ageInput = e.target.elements["age"];
  let detailsInput = e.target.elements["details"];

  let userObj = {
    fullName: fullNameInput.value, //vozvrashaet vse to chto vnutri input (value)
    age: ageInput.value,
    details: detailsInput.value,
  };

  if (userObj.fullName && userObj.age && userObj.details) {
    userArray.push(userObj);
    Clear([fullNameInput, ageInput, detailsInput]); // chtobi input bil pustim i ne prixodilos kajdiy raz manually ochishat i vvesti sleduyushie dannie

    List();
  } else {
    confirm("zapolnite vse polya pls");
  }
}

function Clear(inputArr) {
  inputArr.forEach((input) => {
    input.value = "";
  });
}

function List() {
  userListContainer.innerHTML = ""; // chtobi ne bilo povtora posle kajdoqo submit-a, ibo bez neqo nam vivedetsa nesk raz odno i toje
  userArray.forEach((user, index) => {
    userListContainer.innerHTML +=
      //*innerHTML += *   "+" zdes nam nujen dla toqo chtobi k sushestvuyushemu listu dobavit sleduyusheqo "polzovatela", bez + sk b ni bilo polz otobrazitsa odin
      `<tr  class="user-item " data-id="${index}">
<th scope="row">${index + 1}</th>
<td>${user.fullName}</td>
<td>${user.age}</td>
<td>${user.details}</td>
<td><button type="submit" class="btn btn-primary  btn-sm update-button" data-id="${index}">Update</button>
<button type="submit" class="btn btn-danger btn-sm delete-button" data-id="${index}">Delete</button></td>
</tr>`;
  });
  addingUpdateButton();
  addingDeleteButton();
}

function addingUpdateButton() {
  let updateButtons = document.querySelectorAll(".update-button");
  updateButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");
      selectedUserId = Number(index);
      updateUserFields(e);
    });
  });
}

function deleteUser(index) {
  userArray.splice(index, 1); //udalayem user-a iz massiva po index-u
  List(); // obnovlayem spisok polzovateley(dobavlennix i tp)
}
function addingDeleteButton() {
  let deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-id");
      deleteUser(index);
    });
  });
}

function updateUserFields(e) {
  if (selectedUserId !== null) {
    let selectedUser = userArray[selectedUserId];
    form.elements["fullName"].value = selectedUser.fullName;
    form.elements["age"].value = selectedUser.age;
    form.elements["details"].value = selectedUser.details;
  }
}

function updateUser(e) {
  e.preventDefault();
  if (selectedUserId !== null) {
    let updatedName = form.elements["fullName"].value;
    let updatedAge = form.elements["age"].value;
    let updatedDetails = form.elements["details"].value;

    if (updatedName && updatedAge && updatedDetails) {
      //nado proverit fields na zapolnennost
      // i obnovit dannie:
      userArray[selectedUserId].fullName = updatedName;
      userArray[selectedUserId].age = updatedAge;
      userArray[selectedUserId].details = updatedDetails;
      Clear([
        //eto pishem v chasti "if" chtobi v sluchae else ne prixodilos zanovo vvodit ddannie
        form.elements["fullName"],
        form.elements["age"],
        form.elements["details"],
      ]);
      List();
    } else {
      alert("zapolnite vse polya pls");
    }
  } else {
    alert("select a user for updating.");
  }
}
