"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Send, Image, Smile } from "lucide-react";
import TopBar from "@/components/TopBar";
import Avatar from "@/components/Avatar";
import { posts as initialPosts, currentUser, users } from "@/lib/data";
import { Post } from "@/lib/types";

function CategoryBadge({ category }: { category: Post["category"] }) {
  const styles = {
    announcement: "bg-blue-100 text-blue-700",
    update: "bg-green-100 text-green-700",
    social: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles[category]}`}>
      {category}
    </span>
  );
}

function PostCard({ post, onLike }: { post: Post; onLike: () => void }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const authorIndex = users.findIndex((u) => u.id === post.author.id);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up">
      <div className="flex items-start gap-3">
        <Avatar initials={post.author.avatar} index={authorIndex} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{post.author.name}</span>
            <CategoryBadge category={post.category} />
          </div>
          <p className="text-xs text-[var(--muted)]">
            {post.author.role} &middot; {post.createdAt}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed">{post.content}</p>

      {post.image && (
        <div className="mt-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl h-48 flex items-center justify-center">
          <Image size={48} className="text-[var(--primary)] opacity-30" />
        </div>
      )}

      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-[var(--border)]">
        <button
          onClick={onLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            post.liked ? "text-red-500" : "text-[var(--muted)] hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={post.liked ? "currentColor" : "none"} />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
        >
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      {showComments && (
        <div className="mt-3 space-y-2 animate-fade-in">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2 pl-2">
              <Avatar
                initials={c.author.avatar}
                size="sm"
                index={users.findIndex((u) => u.id === c.author.id)}
              />
              <div className="bg-gray-50 rounded-xl px-3 py-2 flex-1">
                <span className="text-xs font-semibold">{c.author.name}</span>
                <p className="text-xs text-[var(--muted)]">{c.content}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-2 pl-2">
            <Avatar initials={currentUser.avatar} size="sm" index={0} />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-gray-50 rounded-full px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30"
              />
              <button className="text-[var(--primary)]">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeedPage() {
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (id: string) => {
    setFeedPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content: newPost,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: "Just now",
      category: "social",
    };
    setFeedPosts([post, ...feedPosts]);
    setNewPost("");
  };

  return (
    <>
      <TopBar title="Feed" />
      <main className="pt-16 pb-20 px-4 space-y-4">
        {/* Compose */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex gap-3">
            <Avatar initials={currentUser.avatar} index={0} />
            <div className="flex-1">
              <textarea
                placeholder="Share something with your team..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full resize-none text-sm outline-none placeholder:text-gray-400 min-h-[60px]"
                rows={2}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-[var(--muted)]">
                    <Image size={18} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 text-[var(--muted)]">
                    <Smile size={18} />
                  </button>
                </div>
                <button
                  onClick={addPost}
                  className="px-4 py-1.5 bg-[var(--primary)] text-white text-sm font-medium rounded-full hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stories/highlights bar */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1">
          {users.slice(0, 6).map((user, i) => (
            <div key={user.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="p-0.5 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
                <Avatar initials={user.avatar} size="md" index={i} />
              </div>
              <span className="text-[10px] text-[var(--muted)] w-14 text-center truncate">
                {user.name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Posts */}
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => toggleLike(post.id)} />
        ))}
      </main>
    </>
  );
}
