import dayjs from "dayjs";
import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";
import Link from "next/link";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs['posts']['getAll'][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="bg-[#0f0f10] m-2 p-8 flex align-middle rounded-md">
      <Image
        src={author.profilePicture}
        alt="Profile image"
        width={56}
        height={56}
        className="h-14 w-14 rounded-full"
      />
      <div className="flex flex-col ml-1">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.userName}`}>
            <span>{`@${author.userName}`}</span>
          </Link>
          <span className="font-thin">{` . ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <Link href={`/post/${post.id}`}>
          <span className="text-xl">{post.content}</span>
        </Link>
      </div>
    </div>
  )
}