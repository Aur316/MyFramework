"use client";

import { JSX, useState } from "react";
import { useTranslation } from "next-i18next";
import { useCardService } from "../service/useCardService";
import { useCardStore } from "../store/useCardContext";
import Loader from "./ui/Loader";

type AddCardModalProps = {
  onClose: () => void;
};

export function AddCardModal({ onClose }: AddCardModalProps): JSX.Element {
  const { t } = useTranslation();
  const { createCardLoading } = useCardStore();
  const { createCard } = useCardService();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addCard = async () => {
    if (!title.trim()) return;

    await createCard({
      id: new Date().toISOString(),
      title,
      description,
      date: new Date().toLocaleDateString(),
    });

    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          aria-label={t("close")}
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg">{t("addNewCardTitle")}</h3>

        <div className="mt-4">
          <label className="label">
            <span className="label-text">{t("title")}</span>
          </label>
          <input
            className="input input-bordered w-full"
            placeholder={t("titlePlaceholder") || ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="label mt-2">
            <span className="label-text">{t("description")}</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder={t("descriptionPlaceholder") || ""}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modal-action">
          {createCardLoading ? (
            <Loader colorClass="text-success" />
          ) : (
            <button className="btn btn-success" onClick={addCard}>
              {t("save")}
            </button>
          )}
          <button className="btn" onClick={onClose}>
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
