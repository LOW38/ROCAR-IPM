let firstCard = null;
let secondCard = null;
let lockBoard = false;
let cards_amount = 24;
let score = 0;
let moves = 0;
const colors = [
  { color: "#ff3620", name: "vermelho" },
  { color: "#3498db", name: "azul" },
  { color: "#2ecc71", name: "verde" },
  { color: "#efff0f", name: "amarelo" },
  { color: "#9b59b6", name: "roxo" },
  { color: "#ff9100", name: "laranja" },
  { color: "#500800", name: "vermelhoescuro" },
  { color: "#00406b", name: "azulescuro" },
  { color: "#004d20", name: "verdeescuro" },
  { color: "#380050", name: "roxoescuro" },
  { color: "#d35400", name: "laranjaescuro"},
  { color: "#ffffff", name: "branco" },
];

function updateScore() {
  score += 1;
  document.getElementById("score").textContent = score;
    if (score === 12) {
      document.getElementById('win-overlay').style.display = 'flex';
      document.getElementById('final-moves').textContent = document.getElementById('moves').textContent;
  }
}

function handleCardClick(card) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  moves+=1;

  document.getElementById("moves").textContent = moves;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    matching(firstCard);
    matching(secondCard);
    updateScore();
    resetTurn();
  } else {
    setTimeout(() => {unmatching(firstCard);unmatching(secondCard);}, 400);

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      secondCard.classList.remove("mismatched");
      firstCard.classList.remove("mismatched");
      resetTurn();
    }, 800);
  }
}

function unmatching(card) {
  card.classList.add("mismatched");
}

function matching(card) {
    card.classList.add("matched");
  setTimeout(() => {
    card.style.opacity = 0.3;
    card.style.pointerEvents = "none";
  }, 400);
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
function draw_cards() {
    
  const values = [];
  for (let i = 1; i <= (cards_amount / 2); i++) {
    values.push(i, i);
  }

  values.sort(() => 0.5 - Math.random());

  const container = document.getElementById("cartas_container");


  for (let i = 0; i < cards_amount; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = values[i];

    const front = document.createElement("div");
    front.classList.add("card-front");

    front.style.backgroundColor = colors[values[i] - 1].color;

    const img = document.createElement("img");
    img.src = "imgs/" + colors[values[i] - 1].name + ".png";
    img.style.opacity = 0;
    img.alt = colors[values[i] - 1].name;
    img.style.objectFit = "cover";
    img.style.width = "90%";
    img.style.height = "90%";

    front.appendChild(img);

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = "?";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", function () {
      handleCardClick(this);
    });

    container.appendChild(card);
  }
}


draw_cards();


function reset_game(){
    location.reload();
}

function addCardsWithCenterAnimation(cards, columns) {
    const rows = Math.ceil(cards.length / columns);
    const centerRow = (rows - 1) / 2;
    const centerCol = (columns - 1) / 2;

    cards.forEach((card, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        const dist = Math.abs(row - centerRow) + Math.abs(col - centerCol);
        // Each "step" from center adds 0.07s delay
        card.style.animationDelay = (0.1 + dist * 0.07) + 's';
    });
}

// After creating and appending all card elements to #cartas_container:
const cartas = Array.from(document.querySelectorAll('#cartas_container .card'));
const columns = 4; // or your dynamic column count
addCardsWithCenterAnimation(cartas, columns);

// After rendering cards
document.querySelectorAll('.card').forEach(card => {
  setTimeout(() => card.classList.add('card-visible'), 300);
});

function toggleImages() {
  const images = document.querySelectorAll('.card-front img');
  images.forEach(img => {
    if (img.style.opacity == 0) {
      img.style.opacity = 1;
    } else {
      img.style.opacity = 0;
    }
  });
}