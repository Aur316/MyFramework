import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        dashboard: "Dashboard",
        cards: "Cards",
        settings: "Settings",
        login: "Login",
        register: "Register",
        product: "Product",
        cart: "Cart",
        success: "Success",
        order: "Order Details",
        message: "Message",
        close: "Close",
        addNewCardTitle: "Add a New Card",
        title: "Title",
        description: "Description",
        save: "Save",
        cancel: "Cancel",
        titlePlaceholder: "Enter card title...",
        descriptionPlaceholder: "Enter card description...",
        noCardsAvailable: "No cards available.",
        edit: "Edit",
        delete: "Delete",
      },
    },
    hu: {
      translation: {
        home: "Kezdőlap",
        dashboard: "Irányítópult",
        cards: "Kártyák",
        settings: "Beállítások",
        login: "Bejelentkezés",
        register: "Regisztráció",
        product: "Termék",
        cart: "Kosár",
        success: "Sikeres rendelés",
        order: "Rendelés részletei",
        message: "Üzenet",
        close: "Bezár",
        addNewCardTitle: "Új kártya hozzáadása",
        title: "Cím",
        description: "Leírás",
        save: "Mentés",
        cancel: "Mégsem",
        titlePlaceholder: "Add meg a kártya címét...",
        descriptionPlaceholder: "Add meg a kártya leírását...",
        noCardsAvailable: "Nincsenek elérhető kártyák.",
        edit: "Módosítás",
        delete: "Törlés",
      },
    },
  },
  lng: "hu",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
