export function populateListingDetails(auction) {
  document.querySelector("#listing-title").textContent = auction.title;
  document.querySelector("#listing-bid-count").textContent =
    `${auction._count.bids} bids`;
  document.querySelector("#listing-description").textContent =
    auction.description;

  const tagsContainer = document.querySelector("#listing-tags");
  tagsContainer.innerHTML = "";
  auction.tags.forEach((tag) => {
    const el = document.createElement("span");
    el.className =
      "px-4 py-1 rounded-full border border-gray-300 text-gray-500 text-sm";
    el.textContent = tag;
    tagsContainer.appendChild(el);
  });

  document.querySelector("#listing-created").textContent =
    auction.created.slice(0, 10);
  document.querySelector("#listing-updated").textContent =
    auction.updated.slice(0, 10);
}
