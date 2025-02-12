"use client";

import { JSX, useState } from "react";
import { Card as CardType } from "../types/cardTypes";
import { useCardService } from "../service/useCardService";
import { useTranslation } from "react-i18next";

type CardProps = {
  card: CardType;
};

export function Card({ card }: CardProps): JSX.Element {
  const { updateCard, removeCard } = useCardService();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(card.title);
  const [editDescription, setEditDescription] = useState<string>(
    card.description
  );

  const save = () => {
    updateCard({
      ...card,
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const deleteCard = () => {
    removeCard(card.id);
  };

  return (
    <div className="card shadow-xl bg-base-100 p-4">
      {isEditing ? (
        <div>
          <input
            className="input input-bordered w-full mb-2"
            placeholder={t("titlePlaceholder")}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            placeholder={t("descriptionPlaceholder")}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button className="btn btn-success" onClick={save}>
              {t("save")}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-1">{card.title}</h3>
          <p className="text-gray-700 mb-2">{card.description}</p>
          <div className="flex justify-end space-x-2">
            <button
              className="btn btn-outline"
              onClick={() => setIsEditing(true)}
            >
              {t("edit")}
            </button>
            <button className="btn btn-error" onClick={deleteCard}>
              {t("delete")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
