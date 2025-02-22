document.addEventListener("DOMContentLoaded", () => {
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" },
        { text: "Happiness depends upon ourselves.", category: "Happiness" },
    ];

    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteBtn = document.getElementById("addQuoteBtn");
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");

    // Function to display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.textContent = "No quotes available.";
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex].text}" - (${quotes[randomIndex].category})`;
    }

    // Function to add a new quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        quotes.push({ text: quoteText, category: quoteCategory });
        newQuoteText.value = "";
        newQuoteCategory.value = "";
        alert("Quote added successfully!");
    }

    newQuoteBtn.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);
});

// Initialize quotes array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById("quoteDisplay").innerText = "No quotes available!";
  } else {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quoteDisplay").innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();  // Save the updated quotes to localStorage
    showRandomQuote(); // Display a random quote
  }
}


// Store the last viewed quote in sessionStorage
function storeLastViewedQuote(quote) {
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
  }
  
  // Load the last viewed quote (if available)
  function loadLastViewedQuote() {
    const lastViewed = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
    if (lastViewed) {
      document.getElementById("quoteDisplay").innerText = `"${lastViewed.text}" - ${lastViewed.category}`;
    } else {
      showRandomQuote(); // If no last viewed quote, show random quote
    }
  }
  
  // Function to export quotes to a JSON file
function exportToJson() {
    const quotesJson = JSON.stringify(quotes);
    const blob = new Blob([quotesJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";  // The file name
    a.click();
  }
  
  // Add event listener to export button
  document.getElementById("exportButton").addEventListener("click", exportToJson);
  
  // Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();  // Save the imported quotes to localStorage
      alert('Quotes imported successfully!');
      showRandomQuote();  // Display a random quote after import
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset options

    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories

    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter
    const lastFilter = localStorage.getItem("selectedCategory");
    if (lastFilter) {
        categoryFilter.value = lastFilter;
        filterQuotes();
    }
}

function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save filter preference

    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear existing quotes

    const filteredQuotes = (selectedCategory === "all") ? quotes : quotes.filter(q => q.category === selectedCategory);

    filteredQuotes.forEach(quote => {
        let quoteElement = document.createElement("p");
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        populateCategories(); // Update category dropdown
        filterQuotes(); // Refresh displayed quotes
    } else {
        alert("Please enter both a quote and a category.");
    }
}

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    quotes = storedQuotes ? JSON.parse(storedQuotes) : [
        { text: "The only way to do great work is to love what you do.", category: "Motivation" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    ];
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();
    populateCategories();
    filterQuotes(); // Apply last filter on load
});
