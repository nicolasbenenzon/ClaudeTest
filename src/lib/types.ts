export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
  category: "announcement" | "update" | "social";
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Recognition {
  id: string;
  from: User;
  to: User;
  message: string;
  badge: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  responses: number;
  deadline: string;
  completed: boolean;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: "rating" | "multiple_choice" | "text";
  options?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  rsvped: boolean;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: User;
  assignedBy: User;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export interface ChatMessage {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  isGroup: boolean;
  participants: User[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  avatar?: string;
}
