// Ensure the quotes array exists
const quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Act as if what you do makes a difference. It does.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" },
];

// Function to display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerText = `"${quote.text}" - [${quote.category}]`;
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

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("New quote added successfully!");
}

// Ensure the event listener is correctly attached
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
