const cards = document.querySelectorAll(".card");
const congratulations = document.querySelector(".congratulations");
const matchedCountElement = document.getElementById('matchedCount');
const shuffleButton = document.getElementById('shuffleButton');

let flippedCards = [];
let matchedCards = [];
let matchedCount = 0;

// Kartları karıştırmak için fonksiyon
function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition;
    });
}

// Kartları karıştırmak için buton
shuffleButton.addEventListener("click", () => {
    cards.forEach(card => {
        card.classList.remove("flipped");
    });
    flippedCards = [];
    matchedCards = [];
    matchedCount = 0;
    matchedCountElement.textContent = 0;

    // Kartları karıştır
    shuffleCards();
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        if (!card.classList.contains("flipped") && flippedCards.length < 2) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                const [firstCard, secondCard] = flippedCards;
                if (firstCard.dataset.card === secondCard.dataset.card) {
                    matchedCards.push(...flippedCards);
                    flippedCards = [];

                    // Eşleşen kart sayısını artır ve ekrana yazdır
                    matchedCount++;
                    matchedCountElement.textContent = matchedCount;

                    if (matchedCount === cards.length / 2) {
                        setTimeout(() => {
                            congratulations.style.display = "block";
                            setTimeout(() => {
                                congratulations.style.display = "none";
                            }, 5000);
                        }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        flippedCards.forEach(card => card.classList.remove("flipped"));
                        flippedCards = [];
                    }, 1000);
                }
            }
        }
    });
});

// Sayfa yüklendiğinde kartları karıştır
shuffleCards();
