import { displayMessage } from "../../ui/common/displayMessage.js";
import { getToken } from "../../utils/storage.js";
import { validateListItemForm } from "../../utils/validation.js";
import { mapUpdateListFormToApi } from "../../utils/structureObj.js";
import { updateListing } from "../../api/profile/updateList.js";

export async function updateListFormListener(e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");
  if (!listingId) return;
  const messageContainer = document.querySelector("#message-container");
  const form = document.querySelector("#updateListForm");
  const titleEl = document.querySelector("#title");
  const descEl = document.querySelector("#description");
  const tagsEl = document.querySelector("#tags");
  const urlsEl = document.querySelector("#urls");
  const fieldset = form.querySelector("fieldset");
  const submitBtn = form.querySelector("button[type='submit']");

  const list = {
    title: titleEl.value,
    description: descEl.value,
    tags: tagsEl.value,
    urls: urlsEl.value,
  };

  const validation = validateListItemForm(
    list.title,
    list.description,
    list.tags,
    list.urls,
  );

  if (!validation.isValid) {
    const errHTML = validation.errors
      .map((e) => `<p class="text-red-500">${e}</p>`)
      .join("");
    displayMessage(messageContainer, "error", errHTML);
    return;
  }

  fieldset.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const body = mapUpdateListFormToApi(list);
    await updateListing(listingId, getToken(), body);

    window.location.href = "/myListing";
  } catch (error) {
    displayMessage(messageContainer, "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitBtn.textContent = "Save List";
  }
}
