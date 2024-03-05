/* eslint-disable no-unused-vars */
import PostCard from "./PostCard";

export default function PostList({ posts }) {
  return (
    <div>
      {posts && posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
}
