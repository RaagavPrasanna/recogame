```javascript
// PLEASE NOTE THAT ANY POST REQUEST THAT MODIFIES THE DB NEEDS TO BE DONE AS SUCH:
// On the server side:
// Make sure to include the csrfProtect middleware as well as the isAuthenticated middleware if required
app.post('/api/your-endpoint', isAuthenticated, csrfProtect.csrfSynchronisedProtection, async (req, res) => {...});

// On the client side:
// We first need to request the csrf token from the server
const csrfToken = await fetch('/authentication/csrf-token').then(res => res.json());
  // Then we need to set the csrf token in the header of the request
  const response = await fetch('/api/your-endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken.csrfToken
  },
  body: JSON.stringify({
    /* Whatever data you would like to send to the server */
  })
});
/
```

