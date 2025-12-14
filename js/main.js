import { createMenu } from "../js/ui/common/createMenu.js";
import { registerFormListener } from "../js/listeners/auth/registerFormListener.js";
import { loginFormListener } from "../js/listeners/auth/loginFormListener.js";
import { logoutButtonListener } from "./listeners/auth/logoutButtonListener.js";
import { displayAuctionList } from "./listeners/auction/displayAuctionList.js";
import { displayAuction } from "./listeners/auction/displayAuction.js";
import { displayProfile } from "./ui/profile/displayProfile.js";
import { displayMyListing } from "./ui/myListing/displayMyListing.js";
import { createListFormListener } from "./listeners/list/createListFormListener.js";
import { handleUpdateList } from "./ui/myListing/updateList.js";
import { handleEditProfile } from "./ui/profile/editProfile.js";

async function initializeApp() {
  await createMenu();
  logoutButtonListener();

  const path = window.location.pathname;

  if (path === "/" || path === "/index.html") {
    displayAuctionList();
  } else if (path.startsWith("/login")) {
    loginFormListener();
  } else if (path.startsWith("/register")) {
    registerFormListener();
  } else if (path.startsWith("/auctionItem/")) {
    displayAuction();
  } else if (path.startsWith("/profile/")) {
    displayProfile();
  } else if (path.startsWith("/myListing")) {
    displayMyListing();
  } else if (path.startsWith("/createList")) {
    createListFormListener();
  } else if (path.startsWith("/updateList")) {
    handleUpdateList();
  } else if (path.startsWith("/editProfile")) {
    handleEditProfile();
  }
}

initializeApp();
