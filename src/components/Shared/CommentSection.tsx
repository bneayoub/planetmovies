import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import SignInModal from './SignInModal';

interface Comment {
  _id: string;
  user: { _id: string; name: string };
  text: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: string;
}

interface CommentSectionProps {
  contentType: 'movie' | 'tvshow';
  contentId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ contentType, contentId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [contentType, contentId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?contentType=${contentType}&contentId=${contentId}`);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setIsSignInModalOpen(true);
      return;
    }
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, contentId, text: newComment }),
      });
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleVote = async (commentId: string, action: 'upvote' | 'downvote') => {
    if (!userId) {
      setIsSignInModalOpen(true);
      return;
    }
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (response.ok) {
        fetchComments();
      } else {
        console.error('Error voting:', await response.text());
      }
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Comments</h2>
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{comment.user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote(comment._id, 'upvote')}
                  className={`flex items-center p-1 rounded ${comment.upvotes.includes(userId || '') ? 'text-green-500' : 'text-gray-500 hover:text-green-500'}`}
                >
                  <ArrowUp size={16} />
                  <span className="ml-1">{comment.upvotes.length}</span>
                </button>
                <button
                  onClick={() => handleVote(comment._id, 'downvote')}
                  className={`flex items-center p-1 rounded ${comment.downvotes.includes(userId || '') ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                >
                  <ArrowDown size={16} />
                  <span className="ml-1">{comment.downvotes.length}</span>
                </button>
                {userId && comment.user._id === userId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                    title="Delete comment"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </div>
        ))}
      </div>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </div>
  );
};

export default CommentSection;