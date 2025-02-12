"use client";

import { useState, useEffect, JSX } from "react";
import { Card } from "./Card";
import { useCardService } from "../service/useCardService";
import { AddCardModal } from "./AddCardModal";
import { useTranslation } from "react-i18next";

export function CardList(): JSX.Element {
  const { cards, loadCards, createCard } = useCardService();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    loadCards();
  }, []);

  const addCard = (title: string, description: string) => {
    createCard({
      id: new Date().toISOString(),
      title,
      description,
      date: new Date().toLocaleDateString(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Server - {t("cards")}</h2>

      <button
        className="btn btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        {t("addNewCardTitle")}
      </button>

      {isModalOpen && (
        <AddCardModal onClose={() => setIsModalOpen(false)} onSave={addCard} />
      )}

      {cards?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">{t("noCardsAvailable")}</p>
      )}
    </div>
  );
}
