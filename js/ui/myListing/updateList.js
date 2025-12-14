import { displayMessage } from "../../ui/common/displayMessage.js";
import { getListById } from "../../api/profile/fetchListById.js";
import { updateListFormListener } from "../../listeners/list/updateListFormListener.js";

export async function handleUpdateList() {
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");

  if (!listingId) return;

  const messageContainer = document.querySelector("#message-container");
  const form = document.querySelector("#updateListForm");

  const titleEl = document.querySelector("#title");
  const descEl = document.querySelector("#description");
  const tagsEl = document.querySelector("#tags");
  const urlsEl = document.querySelector("#urls");

  try {
    const { data } = await getListById(listingId);

    titleEl.value = data.title;
    descEl.value = data.description || "";
    tagsEl.value = data.tags.join(", ");
    urlsEl.value = data.media.map((media) => media.url).join(", ");
  } catch (error) {
    displayMessage(messageContainer, "error", "Failed to load listing.");
    return;
  }

  form.addEventListener("submit", updateListFormListener);
}
