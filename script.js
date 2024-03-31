var url
var tabIconUrl
var tabTitle


chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  console.log(tabs[0]);

  url = tabs[0].url
  tabIconUrl = tabs[0].favIconUrl
  tabTitle = tabs[0].title

  var tabFavIcon = document.getElementById("tabIcon")
  var title = document.getElementById("title");
  var tabUrl = document.getElementById("tabUrl");

  tabFavIcon.src = tabs[0].favIconUrl
  title.innerHTML = tabs[0].title;
  tabUrl.innerHTML = tabs[0].url;

});

fetch("https://chrome-extention-backend.onrender.com/folder/getAll"
  , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: localStorage.getItem('email') })
  }
)
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById("collectionSelect");

    data.forEach(item => {
      const optionElement = document.createElement("option");
      optionElement.textContent = item.name;
      optionElement.value = item._id;
      selectElement.appendChild(optionElement);
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });


var saveBtn = document.getElementsByClassName("btnSave")[0]

saveBtn.addEventListener("click", function () {
  console.log("Button clicked!");
  const selectElementval = document.getElementById("collectionSelect");

  const selectedOption = selectElementval.selectedOptions[0];

  const selectedName = selectedOption.textContent;

  const data = {
    url: url,
    title: tabTitle,
    tabIconUrl: tabIconUrl,
    note: document.getElementById("note").value,
    folder: selectedName,
    email: localStorage.getItem('email'),
    userId: "55",
    tags: "college"
  };

  console.log(JSON.stringify(data))

  fetch("https://chrome-extention-backend.onrender.com/bookmark/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Bookmark saved successfully:", data);
      document.getElementById("note").value = ""
      alert("saved")
    })
    .catch(error => {
      console.error("Error saving bookmark:", error);
      alert("error")
    });
});


////

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const emailForm = document.getElementById("emailForm");
  const emailInput = document.getElementById("emailInput");
  const saveEmailBtn = document.getElementById("saveEmailBtn");

  const email = localStorage.getItem("email");

  if (email) {
    container.style.display = "block";
  } else {
    emailForm.style.display = "block";
  }

  saveEmailBtn.addEventListener("click", function () {
    const enteredEmail = emailInput.value.trim();

    if (enteredEmail) {
      localStorage.setItem("email", enteredEmail);
      container.style.display = "block";
      emailForm.style.display = "none";
      window.location.reload()
    } else {
      alert("Please enter a valid email.");
    }
  });
});