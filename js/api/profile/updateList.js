import { CONFIG } from "../../config.js";

export async function updateListing(id, token, body) {
  const url = `${CONFIG.apiUrl}listings/${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": CONFIG.apiKey,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to update listing");
  }

  return json;
}
