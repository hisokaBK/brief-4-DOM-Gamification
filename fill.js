window.onload = () => {
  const cards = document.querySelectorAll(".cart");
  const scoreSpan = document.getElementById("span");
  const replayBtn = document.querySelector(".Rplay button");

  const flipBack = "./image/flip.jpg";

  // خريطة الصور حسب الـ data-img
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
  let matchedCards = new Set(); // لتخزين الكروت الصحيحة
  let flipCount = 0; // العداد ديال الكارطات لي تقلبو

  // إنشاء عنصر كيبيّن عدد الكليكات
  const flipCounter = document.createElement("p");
  flipCounter.style.color = "#AA04D7";
  flipCounter.style.fontFamily = "Irish Grover, system-ui";
  flipCounter.style.fontSize = "18px";
  flipCounter.textContent = `Flips: ${flipCount}`;
  document.querySelector("#scor-div div").appendChild(flipCounter);

  // لكل كارت نزيد event ديال click
  cards.forEach((card) => {
    card.addEventListener("click", () => flipCard(card));
  });

  // ===========================
  // 🔄 FUNCTION LI KAT9LB L-CARD
  // ===========================
  function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (matchedCards.has(card)) return; // إلى كانت الكارت مكتشفة، نوقف

    const img = card.querySelector("img");
    const imgKey = card.dataset.img;
    img.src = imgMap[imgKey];

    card.style.transform = "rotateY(180deg)";
    card.style.transition = "transform 0.3s";

    flipCount++;
    updateFlipCount();

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
  }

  // ===========================
  // 🎯 CHECK WACH MATCH WLA LA
  // ===========================
  function checkMatch() {
    const isMatch = firstCard.dataset.img === secondCard.dataset.img;

    if (isMatch) {
      matchedCards.add(firstCard);
      matchedCards.add(secondCard);
      score += 50;
      updateScore();
      disableCards();

      // ✅ واش تقلبو جميع الكارطات؟
      if (matchedCards.size === cards.length) {
        setTimeout(() => {
          alert(`🎉 Bravo rak fazt!\n💯 Score final: ${score}\n🌀 Total flips: ${flipCount}`);
        }, 300);
      }
    } else {
      score -= 5;
      if (score < 0) score = 0; // 👈 هنا شرط باش ماينزلش أقل من 0
      updateScore();
      unflipCards();
    }
  }

  // ===========================
  // ❌ تعطيل الكروت الصحيحة
  // ===========================
  function disableCards() {
    firstCard.removeEventListener("click", () => flipCard(firstCard));
    secondCard.removeEventListener("click", () => flipCard(secondCard));
    resetBoard();
  }

  // ===========================
  // 🔁 ترجيع الكروت للور
  // ===========================
  function unflipCards() {
    setTimeout(() => {
      firstCard.querySelector("img").src = flipBack;
      secondCard.querySelector("img").src = flipBack;

      firstCard.style.transform = "rotateY(0deg)";
      secondCard.style.transform = "rotateY(0deg)";

      resetBoard();
    }, 800);
  }

  // ===========================
  // 🧹 تصفير الحالات بعد كل جوج كروت
  // ===========================
  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  // ===========================
  // 📊 تحديث الـScore
  // ===========================
  function updateScore() {
    scoreSpan.textContent = score;
  }

  // ===========================
  // 🔢 تحديث عداد التقليب
  // ===========================
  function updateFlipCount() {
    flipCounter.textContent = `Flips: ${flipCount}`;
  }

  // ===========================
  // 🔁 زر RePlay
  // ===========================
  replayBtn.addEventListener("click", () => {
    cards.forEach((card) => {
      card.querySelector("img").src = flipBack;
      card.style.transform = "rotateY(0deg)";
    });
    score = 0;
    flipCount = 0;
    scoreSpan.textContent = "0";
    updateFlipCount();
    matchedCards.clear();
    resetBoard();
  });
};
