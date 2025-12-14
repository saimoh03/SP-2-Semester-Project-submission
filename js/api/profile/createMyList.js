import { CONFIG } from "../../config.js";

export async function createMyisting(token, list) {
  const url = `${CONFIG.apiUrl}listings`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": CONFIG.apiKey,
    },
    body: JSON.stringify(list),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return json;
}
