"use client";

import { useEffect, useState } from "react";

interface Card {
  text: string | null;
  color: string;
}

const ALL_CARDS: Card[] = [
  { text: "Impact", color: "#FF9B33" },
  { text: null, color: "gray" },
  { text: "Collaboration", color: "#01AC9C" },
  { text: null, color: "gray" },
  { text: "Empathy", color: "#2B1D18" },
  { text: null, color: "gray" },
  { text: "Excellence", color: "#D76441" },
  { text: null, color: "gray" },
];

export function ValuesSection() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);

      if (window.innerWidth < 1024) {
        const filteredCards: Card[] = [];
        let coloredCount = 0;
        for (let i = 0; i < ALL_CARDS.length && filteredCards.length < 6; i++) {
          const card = ALL_CARDS[i];
          if (card.color !== "gray") {
            coloredCount++;
            filteredCards.push(card);
            if (coloredCount < 3 && filteredCards.length < 6) {
              const nextGray = ALL_CARDS.find((c) => c.color === "gray");
              if (nextGray) {
                filteredCards.push(nextGray);
              }
            }
          }
        }
        const lastColored = ALL_CARDS.find(
          (c) => c.color !== "gray" && !filteredCards.includes(c)
        );
        if (lastColored && filteredCards.length < 6) {
          filteredCards.push(lastColored);
        }
        setCards(filteredCards);
      } else {
        setCards(ALL_CARDS);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className=" py-0 md:py-16">
      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-general-black mb-8">
            Our Values
          </h2>

          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {cards.map((card, index) => (
              <div
                key={`${card.text ?? "empty"}-${index}`}
                className="rounded-full text-lg font-medium px-6 py-4 md:py-5 flex items-center justify-center slide-in transition-all duration-500 ease-in-out"
                style={{
                  backgroundColor:
                    card.color === "gray" ? "#f2e9dd" : card.color,
                  color: card.color !== "gray" ? "white" : "black",
                  width: card.text ? "auto" : isSmallScreen ? "150px" : "200px",
                }}
              >
                {card.text}
              </div>
            ))}
          </div>
        </div>
      </div>

    
    </section>
  );
}
