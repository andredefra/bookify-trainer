
export interface TrainerMessage {
  id: number;
  name: string;
  avatar: string;
  status: string;
  unread: number;
  lastMessage: string;
  timestamp: string;
}

export interface Conversation {
  [key: number]: {
    id: number;
    sender: "trainer" | "you";
    text: string;
    time: string;
  }[];
}

export type StatusType = "online" | "away" | "offline";
