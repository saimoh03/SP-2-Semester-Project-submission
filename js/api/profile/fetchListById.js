import { CONFIG } from "../../config.js";

export async function getListById(id) {
  const url = `${CONFIG.apiUrl}listings/${id}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Failed to update listing");
  }

  return json;
}
