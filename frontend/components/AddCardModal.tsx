"use client";

import { JSX, useState } from "react";
import { useTranslation } from "next-i18next";

type AddCardModalProps = {
  onClose: () => void;
  onSave: (title: string, description: string) => void;
};

export function AddCardModal({
  onClose,
  onSave,
}: AddCardModalProps): JSX.Element {
  const { t } = useTranslation();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const save = () => {
    if (!title.trim()) return;
    onSave(title, description);
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
          <button className="btn btn-success" onClick={save}>
            {t("save")}
          </button>
          <button className="btn" onClick={onClose}>
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
