import { clearStorage } from "../../utils/storage.js";

export function logoutButtonListener() {
  const logoutButton = document.querySelector("#logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        clearStorage();
        window.location.href = "/login";
      }
    });
  }
}
