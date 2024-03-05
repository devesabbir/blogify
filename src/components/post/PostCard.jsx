import PostActions from "./PostActions";
import PostBody from "../common/PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      {/* post header */}
      <PostHeader post={post} />
      {/* post header ends */}
      {/* post body */}
      <PostBody post={post} />
      {/* post body ends */}
      {/* post actions */}
      <PostActions post={post} commentCount={post?.comments?.length} />
      {/* post actions  */}
      {/* comment section */}
      <PostComments post={post} />
      {/* comment section ends */}
    </article>
  );
}
