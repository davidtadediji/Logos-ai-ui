let serverApi: string;

if (import.meta.env.VITE_ENVIRONMENT == "local") {
  serverApi = "http://127.0.0.1:8000";
} else {
  serverApi = "https://davidtadediji--logosai-fastapi-app.modal.run";
}

export async function searchBible(query: string, type: "verse" | "chapter") {
  const response = await fetch(`${serverApi}/api/logos/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      top_k: 20,
      index_type: type,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
