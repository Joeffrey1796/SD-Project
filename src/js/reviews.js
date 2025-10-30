const carousel = document.querySelector(".reviews-carousel");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let reviews = [];
let currentIndex = 0;

fetch("src/data/reviews.json")
  .then(res => res.json())
  .then(data => {
    reviews = data;
    renderReviews();
  });

function renderReviews() {
  carousel.innerHTML = "";

  // Determine which reviews to display (3 full + 2 peek)
  const start = Math.max(0, currentIndex - 1);
  const end = Math.min(reviews.length, currentIndex + 4);

  const visibleReviews = reviews.slice(start, end);
  visibleReviews.forEach((review, index) => {
    const div = document.createElement("div");
    div.classList.add("review-card");

    // Mark peek cards
    if (index === 0 || index === visibleReviews.length - 1) div.classList.add("peek");

    div.innerHTML = `
      <p class="review-text">"${review.review}"</p>
      <p class="review-author">- ${review.name}</p>
    `;
    carousel.appendChild(div);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < reviews.length - 3) {
    currentIndex++;
    renderReviews();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderReviews();
  }
});
