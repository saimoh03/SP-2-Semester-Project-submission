import { CONFIG } from "../../config.js";

export async function deleteListing(id, token) {
  const url = `${CONFIG.apiUrl}listings/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": CONFIG.apiKey,
    },
  };

  const response = await fetch(url, options);
  if (response.status === 204) {
    return { success: true };
  }
  let json = null;
  try {
    json = await response.json();
  } catch (e) {}
  if (!response.ok) {
    throw new Error(json?.errors?.[0]?.message || "Failed to delete listing");
  }
  return json;
}
