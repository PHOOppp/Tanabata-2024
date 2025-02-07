
var BOD = document.querySelector('body');
var windowWidth = window.innerWidth;
BOD.style.height = windowWidth * 2.42 + 'px';
window.addEventListener('resize', function () {
    var BOD = document.querySelector('body');
    var windowWidth = window.innerWidth;
    BOD.style.height = windowWidth * 2.42 + 'px';
});

var x = document.getElementById("popup");
x.style.visibility = "hidden";
var x = document.getElementById("otherWish");
x.style.visibility = "hidden";

let decorIndex = 0;
showDecor();
function showDecor() {
    let slides = document.getElementsByClassName("decorate");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (decorIndex > slides.length) { decorIndex = 1 }
    if (decorIndex < 1) { decorIndex = slides.length }
    slides[decorIndex - 1].style.display = "block";
}
function plusDecor(n) {
    showDecor(decorIndex += n);
}

let frameIndex = 0;
showFrame();
function showFrame() {
    let slides = document.getElementsByClassName("frame");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (frameIndex > slides.length) { frameIndex = 1 }
    if (frameIndex < 1) { frameIndex = slides.length }
    slides[frameIndex - 1].style.display = "block";
}
function plusFrame(n) {
    showFrame(frameIndex += n);
}

document.getElementById('wishForm').addEventListener('submit', submitWish);

function submitWish(event) {
  event.preventDefault(); // Prevent default form submission
  
  var formData = new FormData(event.target);
  var name = formData.get('Name');
  var wish = formData.get('Wish');

  // Call function to submit data to Google Sheets
  submitToGoogleSheets(name, wish);
  
  // Optionally, clear the form fields after submission
  event.target.reset();
}

function submitToGoogleSheets(name, wish) {
  var url = `https://script.google.com/macros/s/AKfycby1fvKBEeaqk2vf5LzoolkJ_8fOPQvyRW-VaBeIiNliWfqSUKDVzCCENoISvV1jeTUz/exec`;

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeFormData({ 'Name': name, 'Wish': wish })
  })
  .then(response => console.log('Wish submitted successfully!'))
  .catch(error => console.error('Error submitting wish:', error));
}

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}


document.addEventListener('DOMContentLoaded', function () {
    const spreadsheetId = '1veaKWvAWCSAk6ZGelvUm6Wvnn8bE0_o-OwJCfs8n_-I'; // Replace with your actual spreadsheet ID
    const sheetName = 'Sheet1'; // Replace with your actual sheet name
    const apiKey = 'AIzaSyBqTMPNlJ0EmdXDvFTwr8ogaBkhY6eL5LA'; // Replace with your Google API key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    const fetchButton = document.getElementById('randoms');
    const dataContainer = document.getElementById('wishess');

    fetchButton.addEventListener('click', function () {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const values = data.values;

                if (values.length > 1) {
                    const randomIndex = Math.floor(Math.random() * (values.length - 1)) + 1; // Random index from 1 to values.length-1
                    const randomRow = values[randomIndex];

                    // Clear previous content
                    dataContainer.innerHTML = '';

                    // Display random data

                    const p = document.createElement('p');
                    p.textContent = randomRow[1];
                    dataContainer.appendChild(p);
                } else {
                    dataContainer.innerHTML = 'No data available.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                dataContainer.innerHTML = 'Error fetching data. Please try again later.';
            });
    });
});



function popup() {
    var x = document.getElementById("popup");
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    }
    else {
        x.style.visibility = "hidden";
    }
}

function popupWish() {
    var x = document.getElementById("otherWish");
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    }
    else {
        x.style.visibility = "hidden";
    }
}

