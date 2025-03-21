// Load quotes from local storage or initialize default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal.", category: "Success" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" },
];

let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ✅ Fix: Ensure the populateCategories function exists and works properly
function populateCategories() {
    const categorySet = new Set(["all"]); // Ensure 'All Categories' exists
    quotes.forEach(quote => categorySet.add(quote.category));

    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = ""; // Clear existing options

    categorySet.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // ✅ Fix: Restore last selected category from localStorage
    categoryFilter.value = selectedCategory;
}

// ✅ Fix: Ensure the filterQuotes function exists
function filterQuotes() {
    selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // ✅ Save selected category
    displayFilteredQuotes();
}

// ✅ Fix: Implement logic to filter and update displayed quotes
function displayFilteredQuotes() {
    let filteredQuotes = quotes;
    if (selectedCategory !== "all") {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    if (filteredQuotes.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available for this category.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    document.getElementById("quoteDisplay").innerText = `"${quote.text}" - [${quote.category}]`;
}

// ✅ Fix: Save category when adding new quotes
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });

    saveQuotes();
    populateCategories();

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("New quote added successfully!");
}

// ✅ Fix: Ensure JSON Export/Import works correctly
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

function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);

            if (!Array.isArray(importedQuotes)) {
                alert("Invalid JSON format. Expected an array of quotes.");
                return;
            }

            quotes.push(...importedQuotes);
            saveQuotes();
            populateCategories();
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// ✅ Fix: Load last viewed category when the page loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newQuote").addEventListener("click", displayFilteredQuotes);
    document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
    document.getElementById("importFile").addEventListener("change", importFromJsonFile);

    populateCategories();
    filterQuotes();
});
