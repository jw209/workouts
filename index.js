var header = document.getElementById("h");

// Function to format date as MM/DD/YYYY
function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Generate array of dates from 10 days in the past to 10 days in the future
function generateDateRange() {
    const dates = [];
    const today = new Date();

    for (let i = -10; i <= 10; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        dates.push(formatDate(date));
    }

    return dates;
}

// Populate the array
const dateArray = generateDateRange();
const today = formatDate(new Date());
dateArray.forEach(date => {
    var link = document.createElement("a");
    link.innerHTML = date;
    link.style.paddingRight = "10px";
    link.style.paddingLeft = "10px";
    link.style.cursor = "pointer";

    if (date === today) {
        link.classList.add('highlight');
        link.classList.add('selected');
        link.id = 'currentDate';
    }

    header.appendChild(link);
})

function centerCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    const header = document.getElementById('h');

    if (currentDateElement) {
        const headerWidth = header.offsetWidth;
        const currentDatePosition = currentDateElement.offsetLeft;
        const currentDateWidth = currentDateElement.offsetWidth;

        header.scrollLeft = currentDatePosition - (headerWidth / 2) + (currentDateWidth / 2) - 12;
    }
}

centerCurrentDate();

const form = document.querySelector('form');
var submitButton = document.getElementById("submitall");

submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const formData = new FormData(form);
    const jsonData = {};

    // Add the current date to the JSON object
    const currentDate = new Date();
    jsonData["date"] = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Iterate through form elements and populate JSON object
    for (let [key, value] of formData.entries()) {
        if (value !== '') {
            jsonData[key] = isNaN(value) ? value : parseFloat(value); // Parse numbers where applicable
        }
    }

    // Add cardio activity from the footer
    const cardioInput = document.querySelector('#f input[type="text"]');
    if (cardioInput && cardioInput.value.trim() !== '') {
        jsonData["cardio_activity"] = cardioInput.value.trim();
    }

    // Display the JSON at the bottom of the page
    const footer = document.getElementById('f');
    let outputDiv = document.getElementById('json-output');

    if (!outputDiv) {
        outputDiv = document.createElement('div');
        outputDiv.id = 'json-output';
        footer.appendChild(outputDiv);
    }

    outputDiv.innerHTML = `<pre>${JSON.stringify(jsonData, null, 2)}</pre>`;
});