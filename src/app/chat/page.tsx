"use client";

import { useState } from "react";
import { Send, ArrowLeft, Users as UsersIcon, Phone, Video } from "lucide-react";
import TopBar from "@/components/TopBar";
import Avatar from "@/components/Avatar";
import { chatRooms, chatMessages as initialMessages, users, currentUser } from "@/lib/data";
import { ChatMessage } from "@/lib/types";

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const room = chatRooms.find((r) => r.id === activeRoom);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeRoom) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), msg],
    }));
    setNewMessage("");
  };

  // Chat detail view
  if (room) {
    const roomMessages = messages[room.id] || [];
    const otherParticipant = room.participants.find((p) => p.id !== currentUser.id);

    return (
      <>
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-[var(--border)] z-50">
          <div className="max-w-lg mx-auto flex items-center h-14 px-4 gap-3">
            <button onClick={() => setActiveRoom(null)} className="text-[var(--primary)]">
              <ArrowLeft size={20} />
            </button>
            <Avatar
              initials={room.isGroup ? (room.avatar || room.name[0]) : (otherParticipant?.avatar || "?")}
              size="sm"
              index={room.isGroup ? 3 : users.findIndex((u) => u.id === otherParticipant?.id)}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{room.name}</p>
              <p className="text-[10px] text-[var(--muted)]">
                {room.isGroup
                  ? `${room.participants.length} members`
                  : otherParticipant?.role}
              </p>
            </div>
            <button className="p-2 text-[var(--muted)]">
              <Phone size={18} />
            </button>
            <button className="p-2 text-[var(--muted)]">
              <Video size={18} />
            </button>
          </div>
        </header>

        <main className="pt-16 pb-20 px-4">
          <div className="space-y-3 py-2">
            {roomMessages.map((msg) => {
              const isMe = msg.sender.id === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}
                >
                  {!isMe && (
                    <Avatar
                      initials={msg.sender.avatar}
                      size="sm"
                      index={users.findIndex((u) => u.id === msg.sender.id)}
                    />
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      isMe
                        ? "bg-[var(--primary)] text-white rounded-br-md"
                        : "bg-white rounded-bl-md"
                    }`}
                  >
                    {room.isGroup && !isMe && (
                      <p className="text-[10px] font-semibold mb-0.5 opacity-70">
                        {msg.sender.name}
                      </p>
                    )}
                    <p>{msg.content}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        isMe ? "text-white/60" : "text-[var(--muted)]"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Message input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] p-3 z-50">
          <div className="max-w-lg mx-auto flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-50 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </>
    );
  }

  // Chat list view
  return (
    <>
      <TopBar title="Chat" />
      <main className="pt-16 pb-20 px-4 space-y-1 mt-2">
        {chatRooms.map((chatRoom) => {
          const otherParticipant = chatRoom.participants.find((p) => p.id !== currentUser.id);

          return (
            <button
              key={chatRoom.id}
              onClick={() => setActiveRoom(chatRoom.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors text-left"
            >
              <div className="relative">
                <Avatar
                  initials={
                    chatRoom.isGroup
                      ? (chatRoom.avatar || chatRoom.name[0])
                      : (otherParticipant?.avatar || "?")
                  }
                  size="lg"
                  index={
                    chatRoom.isGroup
                      ? 3
                      : users.findIndex((u) => u.id === otherParticipant?.id)
                  }
                />
                {chatRoom.isGroup && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                    <UsersIcon size={10} className="text-[var(--primary)]" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{chatRoom.name}</span>
                  <span className="text-[10px] text-[var(--muted)]">
                    {chatRoom.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[var(--muted)] truncate pr-2">
                    {chatRoom.lastMessage}
                  </p>
                  {chatRoom.unread > 0 && (
                    <span className="flex-shrink-0 w-5 h-5 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {chatRoom.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </main>
    </>
  );
}
