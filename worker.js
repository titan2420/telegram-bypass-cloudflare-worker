addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
  // Parse the URL and query parameters
  const url = new URL(request.url)
  const path = url.pathname.replace('/telegram/', '')
  
  // Construct the Telegram API URL
  const telegramUrl = `https://api.telegram.org/${path}`
  
  // Clone the request
  const modifiedRequest = new Request(telegramUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })
  
  // Forward the request to Telegram API
  const response = await fetch(modifiedRequest)
  
  // Return the response with CORS headers
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    }
  })
}
