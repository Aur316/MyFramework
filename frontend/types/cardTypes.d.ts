export interface Card {
  title: string;
  description: string;
  date: string;
  id: string;
}

export interface CardContextType {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  getCardLoading: boolean;
  setGetCardLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateCardLoading: boolean;
  setUpdateCardLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteCardLoading: boolean;
  setDeletetCardLoading: React.Dispatch<React.SetStateAction<boolean>>;
  createCardLoading: boolean;
  setCreateCardLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sureForDelete: boolean;
  setSureForDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseHttp {
  httpGet: <T>(
    endpoint: string,
    params?: unknown,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  httpPost: <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  httpPut: <T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  httpDelete: <T>(endpoint: string, config?: AxiosRequestConfig) => Promise<T>;
}

export interface UseCardRepository {
  fetchCards: () => Promise<Card[]>;
  addCard: (card: Card) => Promise<Card>;
  updateCard: (card: Card) => Promise<Card>;
  deleteCard: (id: string) => Promise<void>;
}

export interface UseCardService {
  cards: Card[];
  createCard: (card: Card) => Promise<void>;
  updateCard: (card: Card) => Promise<void>;
  removeCard: (id: string) => Promise<void>;
  loadCards: () => Promise<void>;
}

export interface SureMessageProps {
  title: string;
  text: string;
  yesText: string;
  noText: string;
  noClick: () => void;
  yesClick: () => void;
  cancel: () => void;
  loader: boolean;
}
