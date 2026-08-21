const API_BASE = "https://moneydivider-1.onrender.com";

// Keep Render server awake by pinging every 10 minutes
setInterval(() => fetch(API_BASE + "/users").catch(() => {}), 10 * 60 * 1000);
