export interface Card {
  id: string;
  title: string;
  description: string;
  date: string;
}
export interface FirebaseCardDocument extends Omit<Card, "id"> {
  createdAt: string;
  perm: {
    read: [];
    write: [];
    delete: [];
  };
  timestamp: string;
}
