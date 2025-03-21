// Load quotes from local storage or initialize default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Act as if what you do makes a difference. It does.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" },
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display quote
    document.getElementById("quoteDisplay").innerText = `"${quote.text}" - [${quote.category}]`;

    // Save last viewed quote in session storage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Add new quote to array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Save updated quotes to local storage
    saveQuotes();

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("New quote added successfully!");
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);

            if (!Array.isArray(importedQuotes)) {
                alert("Invalid JSON format. Expected an array of quotes.");
                return;
            }

            // Add imported quotes and save to local storage
            quotes.push(...importedQuotes);
            saveQuotes();
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// Load last viewed quote from session storage when page loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
    document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
    document.getElementById("importFile").addEventListener("change", importFromJsonFile);

    const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
    if (lastViewedQuote) {
        document.getElementById("quoteDisplay").innerText = `"${lastViewedQuote.text}" - [${lastViewedQuote.category}]`;
    }
});
