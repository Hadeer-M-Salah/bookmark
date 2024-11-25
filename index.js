var bookmarkNameInput = siteName;
var websiteURLInput = siteURL;
var alerturl = URLalert;
var allData = [];
allData = JSON.parse(localStorage.getItem("allData")) || [];
displayData(allData);

function addWebsite() {
  if (validate()) {
    var data = {
      bookmarkName: bookmarkNameInput.value,
      websiteURL: websiteURLInput.value,
    };
    allData.push(data);
    displayData(allData);
    localStorage.setItem("allData", JSON.stringify(allData));
    clearForm();
    Swal.fire({
      title: "Good job!",
      text: "URL added successfully!",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "sorry!",
      text: "You should enter a valid URL!",
      icon: "error",
    });
  }
}

function displayData(array) {
  var cartoona = "";
  for (var i = 0; i < array.length; i++) {
    cartoona += `<tr>
                  <td>${i + 1}</td>
                  <td>${array[i].bookmarkName}</td>
                  <td>
                       <button class="btn btn-visit" onclick ="visitWebsite(${i})" ><i class="fa-solid fa-eye"></i><a>visit</a></button>
                  </td>
                  <td>
                       <button class="btn btn-danger" onclick = "deleteWebsite(${i})"><i class="fa-solid fa-trash-can"></i>Delete</button>
                  </td>
              </tr>`;
  }
  containerData.innerHTML = cartoona;
}
function visitWebsite(index) {
  var siteurl = allData[index].websiteURL;
  window.open(siteurl, "_blank");
}
function deleteWebsite(index) {
  allData.splice(index, 1);
  displayData(allData);
  localStorage.setItem("allData", JSON.stringify(allData));
}

function clearForm() {
  bookmarkNameInput.value = null;
  websiteURLInput.value = null;
}

function validate() {
  if (/^(https:[/]{2}www.)[\w\.]{2,100}$/.test(websiteURLInput.value) == true) {
    URLalert.classList.add("d-none");
    websiteURLInput.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    URLalert.classList.remove("d-none");
    websiteURLInput.classList.add("is-invalid");
    return false;
  }
}
