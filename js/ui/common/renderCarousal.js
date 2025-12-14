export function renderCarousal(container, item) {
  const mediaItems = item?.media ?? [];
  const dotsContainer = document.querySelector("#carousel-dots");
  container.innerHTML = "";
  dotsContainer.innerHTML = "";

  if (mediaItems.length === 0) {
    const carouselSection = document.querySelector("#carousel-section");
    carouselSection.className =
      "min-w-full h-[420px] flex items-center justify-center bg-gray-200";

    carouselSection.innerHTML =
      "<p class='text-gray-500'>No media available</p>";
    return;
  }

  mediaItems.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "min-w-full h-[420px]";

    const img = document.createElement("img");
    img.src = item.url;
    img.alt = item.alt;
    img.className = "w-full h-full object-cover";

    slide.appendChild(img);
    container.appendChild(slide);
  });

  mediaItems.forEach(() => {
    const dot = document.createElement("div");
    dot.className = "w-3 h-3 bg-gray-400 rounded-full cursor-pointer";
    dotsContainer.appendChild(dot);
  });

  setupCarouselLogic(mediaItems.length);
}

function setupCarouselLogic(slideCount) {
  const prevBtn = document.querySelector(".prev-arrow");
  const nextBtn = document.querySelector(".next-arrow");
  const slides = document.querySelectorAll("#carousel > div");
  const dots = document.querySelectorAll("#carousel-dots > div");
  const container = document.querySelector("#carousel");

  if (slideCount <= 1) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  let index = 0;

  function render() {
    container.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.className =
        i === index
          ? "w-3 h-3 bg-[#008CB1] rounded-full"
          : "w-3 h-3 bg-gray-400 rounded-full";
    });
  }

  prevBtn.onclick = () => {
    index = index > 0 ? index - 1 : slideCount - 1;
    render();
  };

  nextBtn.onclick = () => {
    index = index < slideCount - 1 ? index + 1 : 0;
    render();
  };

  dots.forEach((dot, i) => {
    dot.onclick = () => {
      index = i;
      render();
    };
  });

  render();
}
