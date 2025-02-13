import React, { JSX } from "react";
import Loader from "./Loader";
import { SureMessageProps } from "../../types/cardTypes";

export default function SureMessage({
  title,
  text,
  yesText,
  noText,
  noClick,
  yesClick,
  cancel,
  loader,
}: SureMessageProps): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={cancel}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {text && <p className="text-gray-700">{text}</p>}

        <div className="flex justify-end space-x-2">
          <button onClick={noClick} className="btn btn-outline btn-sm">
            {noText}
          </button>
          {loader ? (
            <Loader colorClass="text-error" />
          ) : (
            <button
              onClick={yesClick}
              className="btn btn-error btn-sm text-white"
            >
              {yesText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
