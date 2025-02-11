import { useTranslation } from "react-i18next";

export function getRoutes() {
  const { t } = useTranslation();

  return {
    HOME: { path: "/", name: "home", displayName: t("home") },
    DASHBOARD: {
      path: "/dashboard",
      name: "dashboard",
      displayName: t("dashboard"),
    },
    CARDS: { path: "/cards", name: "cards", displayName: t("cards") },
    SETTINGS: {
      path: "/settings",
      name: "settings",
      displayName: t("settings"),
    },
    LOGIN: { path: "/login", name: "login", displayName: t("login") },
    REGISTER: {
      path: "/register",
      name: "register",
      displayName: t("register"),
    },
  };
}
