import { CONFIG } from "../../config.js";

export async function searchListing(query) {
  const url = `${CONFIG.apiUrl}listings/search?q=${query}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching auctions failed");
  }

  return json;
}
