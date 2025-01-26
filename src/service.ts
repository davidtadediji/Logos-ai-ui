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

/**
 * Analyze biblical texts using the specified analysis type.
 *
 * @param texts - A list of biblical texts to analyze.
 * @param type - The type of analysis to perform (e.g., "comprehensive_exegetical_analysis").
 * @returns The analysis result from the server.
 * @throws Error if the HTTP request fails.
 */
export async function analyseScripture(texts: string[], type: string) {
  const response = await fetch(`${serverApi}/api/logos/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      texts: texts,
      type: type,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Create an anonymous session for the user and retrieve a JWT token.
 *
 * @returns The JWT token from the server.
 * @throws Error if the HTTP request fails.
 */
export async function createAnonymousSession() {
  const response = await fetch(
    `${serverApi}/api/logos/create-anonymous-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data; // Returns { access_token, token_type, user_id }
}

export async function chat(context: string, query: string, user_id?: string) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${serverApi}/api/logos/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token
    },

    body: JSON.stringify({
      context: context,
      query: query,
      user_id: user_id,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function correctText(query: string) {
  const response = await fetch(`${serverApi}/api/logos/correct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
