import { ownerActions } from "../common/ownerAuctionBtns.js";

export function renderAuctionList(container, listing, isOwner) {
  if (listing.length === 0) {
    container.innerHTML = "<div class='text-center'>No listing found</div>";
    return;
  }

  const auctionElements = listing.map((item) =>
    createAuctionItemCard(item, isOwner),
  );
  container.innerHTML = "";
  container.append(...auctionElements);
}

const createAuctionItemCard = (auctionItem, isOwner) => {
  const { media, id, title, description, tags, created, _count } = auctionItem;

  const card = document.createElement("div");
  card.className =
    "shadow-sm border-b-2 border-[#008CB1] overflow-hidden hover:shadow-md transition-shadow duration-200";

  const wrapper = document.createElement("a");
  wrapper.href = `/auctionItem/?id=${id}`;
  wrapper.className = "flex flex-col md:flex-row py-4";

  const leftContent = document.createElement("div");
  leftContent.className = "p-6 md:w-1/2 flex flex-col justify-between";

  const badge = document.createElement("div");
  badge.className =
    "inline-block px-3 py-1 bg-[#008CB1] text-white text-xs rounded-full w-fit mb-4";
  badge.textContent = `${_count.bids} bids`;

  const titleEl = document.createElement("h2");
  titleEl.className =
    "text-2xl md:text-3xl font-bold text-gray-800 mb-3 truncate";
  titleEl.textContent = title;

  const descEl = document.createElement("p");
  descEl.className = "text-gray-600 text-sm mb-4";
  descEl.textContent = description;

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "flex flex-wrap gap-2 mb-4";

  tags
    .filter((tag) => tag.trim() !== "")
    .forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.className =
        "px-3 py-1 text-gray-600 text-xs rounded border border-gray-300";
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });

  const dateEl = document.createElement("p");
  dateEl.className = "text-gray-500 text-sm";
  const formattedDate = new Date(created).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  dateEl.textContent = `date created : ${formattedDate}`;

  if (isOwner) {
    ownerActions(leftContent, id);
  }

  leftContent.appendChild(badge);
  leftContent.appendChild(titleEl);
  leftContent.appendChild(descEl);
  leftContent.appendChild(tagsContainer);
  leftContent.appendChild(dateEl);

  const rightImg = document.createElement("img");
  rightImg.className =
    "w-full md:w-1/2 h-64 md:h-ful object-cover rounded-lg-none md:rounded-lg";
  const imageUrl =
    media[0]?.url ||
    "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800";
  rightImg.setAttribute("src", imageUrl);
  rightImg.setAttribute("alt", title);

  wrapper.appendChild(leftContent);
  wrapper.appendChild(rightImg);
  card.appendChild(wrapper);

  return card;
};
