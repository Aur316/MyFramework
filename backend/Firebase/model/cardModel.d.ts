export interface Card {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface FirebaseCardDocument extends Omit<Card, "id"> {
  id: string;
  createdAt: Date;
  perm: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
  timestamp: number;
}
