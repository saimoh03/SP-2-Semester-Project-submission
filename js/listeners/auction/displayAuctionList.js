import { getAuctions } from "../../api/auctions/getAuctions.js";
import { searchListing } from "../../api/auctions/searchListing.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { renderAuctionList } from "../../ui/auctions/renderAuctionList.js";

export async function displayAuctionList() {
  const container = document.querySelector("#auction-container");
  const searchListForm = document.querySelector("#searchListForm");

  try {
    const { data } = await getAuctions();
    renderAuctionList(container, data, false);
    if (searchListForm) {
      searchListForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(searchListForm);
        const searchTerm = formData.get("query").toLowerCase().trim();
        if (searchTerm.trim() === "") {
          const { data } = await getAuctions();
          renderAuctionList(container, data, false);
          return;
        } else {
          const searchedLists = await searchListing(searchTerm);
          renderAuctionList(container, searchedLists.data, false);
        }
      });
    }
  } catch (error) {
    console.log(error);
    displayMessage(container, "error", error.message);
  }
}
