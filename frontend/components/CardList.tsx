"use client";

import { useState, useEffect, JSX } from "react";
import { Card } from "./Card";
import { useCardService } from "../service/useCardService";
import { AddCardModal } from "./AddCardModal";
import { useTranslation } from "react-i18next";
import { useCardStore } from "../store/useCardContext";
import Loader from "./ui/Loader";

export function CardList(): JSX.Element {
  const { cards, loadCards } = useCardService();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const { getCardLoading } = useCardStore();

  useEffect(() => {
    const fetchCards = async () => {
      await loadCards();
    };

    fetchCards();
  }, []);

  if (getCardLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{t("cards")}</h2>

      <button
        className="btn btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        {t("addNewCardTitle")}
      </button>

      {isModalOpen && <AddCardModal onClose={() => setIsModalOpen(false)} />}

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
