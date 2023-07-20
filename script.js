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
    let row = document.createElement("tr");
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
        "https://crudcrud.com/api/d962fb9361da4ca5a924f9d526bb8df5/appointmentdata",
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

    // Add function on Delete Button.(it also delete data from crudcrud)
    deleteButton.addEventListener("click", (e) => {
      row = e.target.parentElement.parentElement;
     
      const name = row.children[0].textContent;
      findDataId().then((result) => {
        const filteredAppointments = result.filter(
          (eachrow) => eachrow.name === name
        ); // The filter method iterates through each element in the result array and applies the callback function to each element. And return details as an array of that particular row which satisfy eachrow.name===name this condition.
        const id = filteredAppointments[0]._id;
        deletedetails(id);
      });
      row.remove();
    });

     // function findDataId logic
     function findDataId() {
      return axios
        .get(
          "https://crudcrud.com/api/d962fb9361da4ca5a924f9d526bb8df5/appointmentdata"
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Function logic for deletedetails
    function deletedetails(id) {
      axios
        .delete(
          `https://crudcrud.com/api/d962fb9361da4ca5a924f9d526bb8df5/appointmentdata/${id}`
        )
        .then((res) => {
          console.log("deleted !!");
        });
    }

    // clear details on refreshing
    nameInput.value = "";
    emailInput.value = "";
  }
}

//  GET data from crudcrud on reload page
window.addEventListener("DOMContentLoaded", (event) => {
  axios
    .get(
      "https://crudcrud.com/api/d962fb9361da4ca5a924f9d526bb8df5/appointmentdata"
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

// Add function on button after getting by Cloud

userTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("del")) {
    const data = event.target.parentElement.parentElement;
    if (event.target.textContent === "Delete") {
      const name = data.children[0].textContent;
      findDataId().then((result) => {
        const filteredAppointments = result.filter(
          (eachrow) => eachrow.name === name
        ); // The filter method iterates through each element in the result array and applies the callback function to each element. And return details as an array of that particular row which satisfy eachrow.name===name this condition.
        const id = filteredAppointments[0]._id;
        deletedetails(id);
      });
      data.remove();
    }
  }
});

// function findDataId logic
function findDataId() {
  return axios
    .get(
      "https://crudcrud.com/api/d962fb9361da4ca5a924f9d526bb8df5/appointmentdata"
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// Function logic for deletedetails
function deletedetails(id) {
  axios
    .delete(
      `https://crudcrud.com/api/d962fb9361da4ca5a924f9d526bb8df5/appointmentdata/${id}`
    )
    .then((res) => {
      console.log("deleted after loaded !!");
    });
}
