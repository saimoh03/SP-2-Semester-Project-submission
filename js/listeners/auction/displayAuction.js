import { getAuction } from "../../api/auctions/getAuction.js";
import { createBid } from "../../api/auctions/saveBid.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderCarousal } from "../../ui/common/renderCarousal.js";
import { populateListingDetails } from "../../ui/auctions/populateListingDetails.js";
import { populateSellerDetails } from "../../ui/auctions/populateSellerDetails.js";
import { getQueryParam } from "../../utils/getQueryParam.js";
import { getToken } from "../../utils/storage.js";

export async function displayAuction() {
  const id = getQueryParam("id");

  if (!id) {
    return (window.location.href = "/");
  }

  const makeBidBtn = document.querySelector("#makeBidBtn");
  if (getToken() === null) {
    makeBidBtn.style.display = "none";
  }
  const carouselContainer = document.querySelector("#carousel");

  try {
    const { data } = await getAuction(id);

    renderCarousal(carouselContainer, data);
    populateListingDetails(data);
    populateSellerDetails(data);
    saveBidBtnListener();
  } catch (error) {
    console.error(error);
    displayMessage(document.body, "error", error.message);
  }
}

function saveBidBtnListener() {
  const saveBidBtn = document.querySelector("#saveBidBtn");
  const newBid = document.querySelector("#newBid");

  if (saveBidBtn) {
    saveBidBtn.addEventListener("click", async () => {
      try {
        await createBid(getToken(), Number(newBid.value), getQueryParam("id"));

        displayMessage(
          document.querySelector("#message-container"),
          "success",
          "Bid placed successfully!",
        );
      } catch (error) {
        displayMessage(
          document.querySelector("#message-container"),
          "error",
          error.message || "Failed to place bid",
        );
      }
    });
  }
}
