$(document).ready(function () {
  console.log("heyheyhey");
});

var toDosCheck = $(".form-check-input");
var numOfItems = toDosCheck.length;
// This is to ensure the items are sorted when the file is refreshed.
toSort();

// To hide the respective elements when the active button are pressed.
$("#ex1-tab-1").on("click", forAllList);
$("#ex1-tab-2").on("click", forActiveList);
$("#ex1-tab-3").on("click", forCompletedList);

// To listen for checkbox changes;
toDosCheck.on("change", () => {
  var currentTab = $(".nav-link.active").text();
  toSort();
  if (currentTab === "All") {
    forAllList();
  } else if (currentTab === "Active") {
    forActiveList();
  } else {
    forCompletedList();
  }
});

// We need to send back the data to the web based to update the data they have on their end.
toDosCheck.on("change", () => {
  var arrayForServer = [[], []];

  for (let i = 0; i < numOfItems; i++) {
    arrayForServer[0].push($($(toDosCheck.get(i)).siblings()).text());
    if (toDosCheck.get(i).checked) {
      arrayForServer[1].push("checked");
    } else {
      arrayForServer[1].push("unchecked");
    }
  }
  console.log(arrayForServer);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/update", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(arrayForServer));
});

// To sort out the items whenever page is refreshed.
function toSort() {
  for (let i = 0; i < numOfItems; i++) {
    if (toDosCheck.get(i).checked) {
      $(toDosCheck.get(i)).parent().addClass("todo-completed");
    } else {
      $(toDosCheck.get(i)).parent().addClass("todo-active");
    }
  }
  console.log("Sorting Done");
}

// To show/hide whenever the all button is pressed.
function forAllList() {
  $("#ex1-tab-1").addClass("active");
  $("#ex1-tab-2").removeClass("active");
  $("#ex1-tab-3").removeClass("active");
  for (let i = 0; i < numOfItems; i++) {
    $(toDosCheck.get(i)).parent().show();
    $(toDosCheck.get(i)).parent().addClass("d-flex");
  }
  console.log("For All List Activated");
}

// To show/hide whenever the active button is pressed.

function forActiveList() {
  $("#ex1-tab-1").removeClass("active");
  $("#ex1-tab-2").addClass("active");
  $("#ex1-tab-3").removeClass("active");

  for (let i = 0; i < numOfItems; i++) {
    if (toDosCheck.get(i).checked) {
      $(toDosCheck.get(i)).parent().removeClass("d-flex");
      $(toDosCheck.get(i)).parent().hide();
    } else {
      $(toDosCheck.get(i)).parent().show();
      $(toDosCheck.get(i)).parent().addClass("d-flex");
    }
  }
  console.log("For Active List Activated");
}

// Tp shpw/hide whenver the completed button is pressed.
function forCompletedList() {
  $("#ex1-tab-1").removeClass("active");
  $("#ex1-tab-2").removeClass("active");
  $("#ex1-tab-3").addClass("active");
  for (let i = 0; i < numOfItems; i++) {
    if (toDosCheck.get(i).checked) {
      $(toDosCheck.get(i)).parent().show();
      $(toDosCheck.get(i)).parent().addClass("d-flex");
    } else {
      $(toDosCheck.get(i)).parent().removeClass("d-flex");
      $(toDosCheck.get(i)).parent().hide();
    }
  }
  console.log("For Completed List Activated");
}
