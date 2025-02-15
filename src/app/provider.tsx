"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../frontend/i18n/i18n";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
