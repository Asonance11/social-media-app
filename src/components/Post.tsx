import { RxAvatar } from 'react-icons/rx';
interface PostProps {
	username: string;
	caption: string;
	imageUrl: string;
}

const Post = (props: PostProps) => {
	return (
		<section className="max-w-md rounded overflow-hidden shadow-lg bg-white mx-auto mb-4 mt-16 py-4 text-eerieBlack">
			<div className="flex items-center gap-3 px-2 mb-2">
				<p className="text-2xl">
					<RxAvatar />
				</p>
				<strong>{props.username}</strong>
			</div>
			<div>
				<img src={props.imageUrl} alt="Image" className="object-cover" />
			</div>
			<div className="flex items-center gap-2 mt-2 px-2">
				<strong>{props.username}:</strong>
				<caption>{props.caption}</caption>
			</div>
		</section>
	);
};

export default Post;
