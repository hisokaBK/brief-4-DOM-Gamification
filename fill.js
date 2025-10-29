
onload = () => {
  const cards = document.querySelectorAll(".cart");
  const scoreSpan = document.getElementById("span");
  const replayBtn = document.querySelector(".Rplay button");

  const flipBack = "./image/flip.jpg";


  const imgMap = {
    "img-1": "./image/girlchan.jpg",
    "img-2": "./image/kaniki.jpg",
    "img-3": "./image/lofi.jpg",
    "img-4": "./image/sokona.jpg",
    "img-5": "./image/tanjiro.jpg",
    "img-8": "./image/gojo.jpg",
    "img-9": "./image/imiso.jpg",
    "img-10": "./image/zoro.jpg",
  };

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let score = 0;


  cards.forEach(card => {
    card.addEventListener("click", () => flipCard(card));
  });

  function flipCard(card) {
    if (lockBoard) return; 
    if (card === firstCard) return; 
    const img = card.querySelector("img");
    const imgKey = card.dataset.img;
    img.src = imgMap[imgKey];

    card.style.transform = "rotateY(180deg)";
    card.style.transition = "transform 0.3s";

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
  }

  function checkMatch() {
    const isMatch = firstCard.dataset.img === secondCard.dataset.img;

    if (isMatch) {
      disableCards();
      updateScore();
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", () => flipCard(firstCard));
    secondCard.removeEventListener("click", () => flipCard(secondCard));
    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.querySelector("img").src = flipBack;
      secondCard.querySelector("img").src = flipBack;

      firstCard.style.transform = "rotateY(0deg)";
      secondCard.style.transform = "rotateY(0deg)";

      resetBoard();
    }, 800);
  }

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  function updateScore() {
    score += 10;
    scoreSpan.textContent = score;
  }

  replayBtn.addEventListener("click", () => {
    cards.forEach(card => {
      card.querySelector("img").src = flipBack;
      card.style.transform = "rotateY(0deg)";
    });
    score = 0;
    scoreSpan.textContent = "0";
    resetBoard();
  });
};
