export async function searchBible(query: string, type: "verse" | "chapter") {
    const response = await fetch(
      "https://davidtadediji--logosai-fastapi-app.modal.run/api/logos/search",
      {
        method: "POST", // Use POST instead of GET
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query, // Pass the query in the body
          top_k: 20, // Optional: Pass top_k in the body
          index_type: type, // Pass the index_type in the body
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }