// Fetch quotes from a mock server and update local storage
async function fetchQuotesFromServer() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with actual API
        let quotes = await response.json();
        localStorage.setItem('quotes', JSON.stringify(quotes));
        return quotes;
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}

// Post a new quote to the mock server
async function postQuoteToServer(quote) {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quote)
        });
        let data = await response.json();
        console.log('Quote posted:', data);
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

// Sync quotes between local storage and server
async function syncQuotes() {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    let serverQuotes = await fetchQuotesFromServer();
    
    if (!serverQuotes) return;
    
    // Merge quotes: server takes precedence
    let mergedQuotes = [...serverQuotes, ...localQuotes.filter(lq => !serverQuotes.some(sq => sq.id === lq.id))];
    localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
    console.log('Quotes synced successfully.');
    showConflictNotification();
}

// Periodically check for new quotes from the server
setInterval(syncQuotes, 60000); // Fetch updates every 60 seconds

// UI notification for conflicts
function showConflictNotification() {
    let notification = document.createElement('div');
    notification.innerText = "Data conflict resolved using server data.";
    notification.style.position = "fixed";
    notification.style.top = "10px";
    notification.style.right = "10px";
    notification.style.background = "red";
    notification.style.color = "white";
    notification.style.padding = "10px";
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 5000);
}
