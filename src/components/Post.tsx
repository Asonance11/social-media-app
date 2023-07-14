interface PostProps {
	username: string;
	caption: string;
	imageUrl: string;
}

const Post = (props: PostProps) => {
	return (
		<section>
			<div>{props.username}</div>
			<img src={props.imageUrl} alt="Image" />
			<div>
				<p>
					<strong>{props.username}:</strong> <caption>{props.caption}</caption>
				</p>
			</div>
		</section>
	);
};

export default Post;
