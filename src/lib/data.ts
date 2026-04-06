import { User, Post, Recognition, Survey, Event, Task, ChatRoom, ChatMessage } from "./types";

export const currentUser: User = {
  id: "1",
  name: "Alex Johnson",
  avatar: "AJ",
  role: "Product Manager",
  department: "Product",
  email: "alex.johnson@company.com",
  phone: "+1 555-0101",
  location: "New York, NY",
  joinedDate: "2023-01-15",
};

export const users: User[] = [
  currentUser,
  {
    id: "2", name: "Sarah Chen", avatar: "SC", role: "Senior Engineer",
    department: "Engineering", email: "sarah.chen@company.com",
    phone: "+1 555-0102", location: "San Francisco, CA", joinedDate: "2022-06-01",
  },
  {
    id: "3", name: "Marcus Rivera", avatar: "MR", role: "Design Lead",
    department: "Design", email: "marcus.rivera@company.com",
    phone: "+1 555-0103", location: "Austin, TX", joinedDate: "2022-09-15",
  },
  {
    id: "4", name: "Emily Watson", avatar: "EW", role: "HR Director",
    department: "Human Resources", email: "emily.watson@company.com",
    phone: "+1 555-0104", location: "Chicago, IL", joinedDate: "2021-03-10",
  },
  {
    id: "5", name: "David Kim", avatar: "DK", role: "Marketing Manager",
    department: "Marketing", email: "david.kim@company.com",
    phone: "+1 555-0105", location: "Los Angeles, CA", joinedDate: "2023-04-20",
  },
  {
    id: "6", name: "Lisa Park", avatar: "LP", role: "Data Analyst",
    department: "Analytics", email: "lisa.park@company.com",
    phone: "+1 555-0106", location: "Seattle, WA", joinedDate: "2023-08-01",
  },
  {
    id: "7", name: "James Brown", avatar: "JB", role: "Sales Director",
    department: "Sales", email: "james.brown@company.com",
    phone: "+1 555-0107", location: "Boston, MA", joinedDate: "2021-11-05",
  },
  {
    id: "8", name: "Nina Patel", avatar: "NP", role: "DevOps Engineer",
    department: "Engineering", email: "nina.patel@company.com",
    phone: "+1 555-0108", location: "Denver, CO", joinedDate: "2022-12-01",
  },
];

export const posts: Post[] = [
  {
    id: "1",
    author: users[3],
    content: "Exciting news! We're launching our new employee wellness program starting next month. This includes mental health days, gym memberships, and weekly yoga sessions. Check your email for enrollment details!",
    likes: 47,
    liked: false,
    comments: [
      { id: "c1", author: users[1], content: "This is amazing! Can't wait to sign up for yoga.", createdAt: "2h ago" },
      { id: "c2", author: users[4], content: "Great initiative! Will there be virtual options too?", createdAt: "1h ago" },
    ],
    createdAt: "3h ago",
    category: "announcement",
  },
  {
    id: "2",
    author: users[1],
    content: "Just shipped the new real-time collaboration feature! Huge shoutout to the entire engineering team for pulling this off in record time. This is going to transform how our users work together.",
    likes: 32,
    liked: true,
    comments: [
      { id: "c3", author: users[2], content: "The UI looks incredible. Great work everyone!", createdAt: "30m ago" },
    ],
    createdAt: "5h ago",
    category: "update",
  },
  {
    id: "3",
    author: users[4],
    content: "Team lunch photos from yesterday's quarterly celebration! What an amazing group of people. Feeling grateful to work with such talented colleagues.",
    image: "lunch",
    likes: 58,
    liked: false,
    comments: [],
    createdAt: "1d ago",
    category: "social",
  },
  {
    id: "4",
    author: users[6],
    content: "Q1 results are in and we've exceeded our targets by 23%! This is a company-wide achievement. Every department contributed to this success. Let's keep the momentum going into Q2!",
    likes: 89,
    liked: true,
    comments: [
      { id: "c4", author: users[0], content: "Incredible results! The product improvements definitely played a role.", createdAt: "2h ago" },
      { id: "c5", author: users[3], content: "So proud of this team!", createdAt: "1h ago" },
    ],
    createdAt: "1d ago",
    category: "announcement",
  },
];

export const recognitions: Recognition[] = [
  {
    id: "1", from: users[0], to: users[1],
    message: "Sarah went above and beyond to mentor new team members this quarter. Her patience and knowledge sharing have been invaluable!",
    badge: "Mentor", createdAt: "2h ago", likes: 15, liked: false,
  },
  {
    id: "2", from: users[2], to: users[7],
    message: "Nina's infrastructure improvements reduced our deployment time by 60%. Absolute game changer for the entire engineering org!",
    badge: "Innovator", createdAt: "5h ago", likes: 22, liked: true,
  },
  {
    id: "3", from: users[3], to: users[4],
    message: "David created an incredible campaign that brought in 200% more leads this month. His creativity knows no bounds!",
    badge: "Star Performer", createdAt: "1d ago", likes: 31, liked: false,
  },
  {
    id: "4", from: users[6], to: users[5],
    message: "Lisa's data analysis helped us identify a key market opportunity worth $2M. Outstanding analytical work!",
    badge: "Problem Solver", createdAt: "2d ago", likes: 18, liked: false,
  },
];

export const surveys: Survey[] = [
  {
    id: "1",
    title: "Employee Satisfaction Q1 2026",
    description: "Help us understand your experience and how we can improve.",
    questions: [
      { id: "q1", text: "How satisfied are you with your work-life balance?", type: "rating" },
      { id: "q2", text: "What could we improve?", type: "multiple_choice", options: ["Communication", "Tools", "Benefits", "Culture", "Growth opportunities"] },
      { id: "q3", text: "Any additional feedback?", type: "text" },
    ],
    responses: 142,
    deadline: "2026-04-15",
    completed: false,
  },
  {
    id: "2",
    title: "Remote Work Policy Feedback",
    description: "Share your thoughts on our updated remote work policy.",
    questions: [
      { id: "q4", text: "How many days per week would you prefer to work remotely?", type: "multiple_choice", options: ["1 day", "2 days", "3 days", "4 days", "Fully remote"] },
      { id: "q5", text: "Rate your home office setup", type: "rating" },
    ],
    responses: 89,
    deadline: "2026-04-10",
    completed: true,
  },
  {
    id: "3",
    title: "New Office Space Preferences",
    description: "We're redesigning our office! Help us plan the perfect workspace.",
    questions: [
      { id: "q6", text: "What type of workspace do you prefer?", type: "multiple_choice", options: ["Open plan", "Private offices", "Hot desking", "Mixed"] },
      { id: "q7", text: "Rate the importance of a cafeteria", type: "rating" },
      { id: "q8", text: "What amenities would you like to see?", type: "text" },
    ],
    responses: 56,
    deadline: "2026-04-30",
    completed: false,
  },
];

export const events: Event[] = [
  {
    id: "1", title: "Company Town Hall", description: "Quarterly all-hands meeting with leadership team. Q1 review, Q2 plans, and open Q&A session.",
    date: "2026-04-10", time: "2:00 PM", location: "Main Auditorium & Zoom",
    attendees: 234, maxAttendees: 500, rsvped: true,
  },
  {
    id: "2", title: "Tech Talk: AI in Production", description: "Learn about how our engineering team is leveraging AI to improve our products and internal tools.",
    date: "2026-04-12", time: "11:00 AM", location: "Conference Room A",
    attendees: 45, maxAttendees: 60, rsvped: false,
  },
  {
    id: "3", title: "Spring Team Building", description: "Outdoor team building activities, BBQ lunch, and games. Bring your family!",
    date: "2026-04-18", time: "10:00 AM", location: "Central Park",
    attendees: 156, maxAttendees: 200, rsvped: false,
  },
  {
    id: "4", title: "Hackathon 2026", description: "48-hour hackathon! Form teams, build prototypes, and pitch to leadership. Prizes for top 3 teams.",
    date: "2026-04-25", time: "9:00 AM", location: "Innovation Lab",
    attendees: 78, maxAttendees: 100, rsvped: true,
  },
];

export const tasks: Task[] = [
  {
    id: "1", title: "Review Q2 product roadmap", description: "Review and provide feedback on the proposed Q2 roadmap before the planning meeting.",
    assignee: users[0], assignedBy: users[6], status: "in_progress", priority: "high", dueDate: "2026-04-08",
  },
  {
    id: "2", title: "Update onboarding documentation", description: "Refresh the new hire onboarding docs with latest tools and processes.",
    assignee: users[0], assignedBy: users[3], status: "todo", priority: "medium", dueDate: "2026-04-12",
  },
  {
    id: "3", title: "Prepare presentation for town hall", description: "Create slides covering product team achievements and Q2 plans.",
    assignee: users[0], assignedBy: users[6], status: "todo", priority: "high", dueDate: "2026-04-09",
  },
  {
    id: "4", title: "Complete security training", description: "Annual security awareness training module.",
    assignee: users[0], assignedBy: users[3], status: "done", priority: "low", dueDate: "2026-04-05",
  },
  {
    id: "5", title: "Review design mockups", description: "Provide feedback on the new dashboard design mockups.",
    assignee: users[0], assignedBy: users[2], status: "in_progress", priority: "medium", dueDate: "2026-04-11",
  },
];

export const chatRooms: ChatRoom[] = [
  {
    id: "1", name: "Sarah Chen", isGroup: false, participants: [users[0], users[1]],
    lastMessage: "Sure, let's sync tomorrow at 10am", lastMessageTime: "10m ago", unread: 2,
  },
  {
    id: "2", name: "Product Team", isGroup: true, participants: [users[0], users[1], users[2], users[4]],
    lastMessage: "Marcus: New mockups are ready for review", lastMessageTime: "30m ago", unread: 5, avatar: "PT",
  },
  {
    id: "3", name: "Marcus Rivera", isGroup: false, participants: [users[0], users[2]],
    lastMessage: "The design system update looks great!", lastMessageTime: "1h ago", unread: 0,
  },
  {
    id: "4", name: "All Company", isGroup: true, participants: users,
    lastMessage: "Emily: Don't forget to submit your timesheets!", lastMessageTime: "2h ago", unread: 12, avatar: "AC",
  },
  {
    id: "5", name: "Engineering", isGroup: true, participants: [users[0], users[1], users[7]],
    lastMessage: "Nina: Deployment successful!", lastMessageTime: "3h ago", unread: 0, avatar: "EN",
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  "1": [
    { id: "m1", sender: users[1], content: "Hey Alex! Do you have time for a quick sync about the API changes?", timestamp: "9:30 AM" },
    { id: "m2", sender: users[0], content: "Sure! What time works for you?", timestamp: "9:35 AM" },
    { id: "m3", sender: users[1], content: "How about tomorrow at 10am?", timestamp: "9:40 AM" },
    { id: "m4", sender: users[0], content: "Perfect, I'll send a calendar invite", timestamp: "9:42 AM" },
    { id: "m5", sender: users[1], content: "Sure, let's sync tomorrow at 10am", timestamp: "9:45 AM" },
  ],
  "2": [
    { id: "m6", sender: users[4], content: "Team, Q2 planning doc is ready for review", timestamp: "8:00 AM" },
    { id: "m7", sender: users[0], content: "Thanks David! I'll review it today", timestamp: "8:15 AM" },
    { id: "m8", sender: users[2], content: "New mockups are ready for review", timestamp: "9:00 AM" },
  ],
};
