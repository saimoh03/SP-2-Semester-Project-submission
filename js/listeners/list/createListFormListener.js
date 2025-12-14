import { login } from "../../api/auth/login.js";
import { createMyisting } from "../../api/profile/createMyList.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import {
  getToken,
  getUsername,
  saveToken,
  saveUser,
} from "../../utils/storage.js";
import { mapListFormToApi } from "../../utils/structureObj.js";
import {
  validateListItemForm,
  validateLoginForm,
} from "../../utils/validation.js";

async function handleCreateListSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const messageContainer = document.querySelector("#message-container");
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector('button[type="submit"]');

  messageContainer.innerHTML = "";

  const formData = new FormData(form);
  const list = Object.fromEntries(formData.entries());

  const validationResult = validateListItemForm(
    list.title,
    list.description,
    list.tags,
    list.urls,
    list.endsAt,
    true,
  );

  if (!validationResult.isValid) {
    const errorHtml = validationResult.errors
      .map((error) => `<p class="text-red-500">${error}</p>`)
      .join("");
    displayMessage(messageContainer, "error", errorHtml);
    return;
  }

  fieldset.disabled = true;
  submitButton.textContent = "Creating list...";

  try {
    const { data } = await createMyisting(getToken(), mapListFormToApi(list));
    window.location.href = "/myListing";
  } catch (error) {
    displayMessage(messageContainer, "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.textContent = "Create List";
  }
}

export function createListFormListener() {
  const form = document.querySelector("#createListForm");

  if (form) {
    form.addEventListener("submit", handleCreateListSubmit);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const endsAt = document.getElementById("endsAt");
    const today = new Date().toISOString().split("T")[0];
    endsAt.min = today;
  });
}
