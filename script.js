const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const btn = document.querySelector("#button");
const errorMsg = document.querySelector("#er");
const userTable = document.querySelector("#user-table");

btn.addEventListener("click", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    //For Delete Message
    errorMsg.classList.add("error");
    errorMsg.innerHTML = "Please enter user details.";
    setTimeout(() => {
      errorMsg.classList.remove("error");
      errorMsg.innerHTML = "";
    }, 1000);
  } else {
    // Create table row and cells for user details
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    nameCell.textContent = nameInput.value;
    emailCell.textContent = emailInput.value;
    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    deleteButton.classList.add("del");
    editButton.classList.add("del");

    deleteCell.appendChild(deleteButton);
    editCell.appendChild(editButton);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(deleteCell);
    row.appendChild(editCell);
    userTable.appendChild(row);

    const obj = {
      name: nameInput.value,
      Email: emailInput.value,
    };
    //  Sending data on Cloud By axios
    axios
      .post(
        "https://crudcrud.com/api/85a9e58aaac54be4be0630685c95f305/appointmentdata",
        obj
      )
      .then((result) => {
        console.log("post is", result);
      })
      .catch((err) => {
        console.log(err);
      });

    //For success message
    errorMsg.classList.add("success");
    errorMsg.innerHTML = "User successfully added.";
    setTimeout(() => {
      errorMsg.classList.remove("success");
      errorMsg.innerHTML = "";
    }, 1000);

    // Add function on Delete Button.(only for display. actual do by Postman)
    deleteButton.addEventListener("click", () => {
      row.remove(); // Remove the row from the table
    });

    // clear details on refreshing
    nameInput.value = "";
    emailInput.value = "";
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  axios
    .get(
      "https://crudcrud.com/api/85a9e58aaac54be4be0630685c95f305/appointmentdata"
    )
    .then((result) => {
      // console.log(result);
      for (var i = 0; i < result.data.length; i++) {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const deleteCell = document.createElement("td");
        const editCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        nameCell.textContent = result.data[i].name;
        emailCell.textContent = result.data[i].Email;
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";
        deleteButton.classList.add("del");
        editButton.classList.add("del");

        deleteCell.appendChild(deleteButton);
        editCell.appendChild(editButton);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(deleteCell);
        row.appendChild(editCell);
        userTable.appendChild(row);
      }
    });
});

// Add function on button after getting by Cloud (But it only for display actually it not delete or edit in cloud. it is do by postman)
userTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("del")) {
    const data = event.target.parentElement.parentElement;
    if (event.target.textContent === "Delete") {
      data.remove();
    } else if (event.target.textContent === "Edit") {
      var newnam = prompt("Enter new Name", data.children[0].textContent);
      var newemail = prompt("Enter new Email", data.children[1].textContent);

      if (newnam !== "" && newnam !== null)
        data.children[0].textContent = newnam;
      if (newemail !== "" && newemail !== null)
        data.children[1].textContent = newemail;
    }
  }
});
