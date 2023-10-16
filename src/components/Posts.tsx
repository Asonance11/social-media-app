import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { db } from '../config/firebase';
import Post from './Post';

interface PostType {
	username: string;
	caption: string;
	imageUrl: string;
	id: string;
}

const Posts = () => {
	const [posts, setPosts] = useState<PostType[]>([]);

	const postCollectionRef = collection(db, 'posts');
	const postCollectionQuery = query(
		postCollectionRef,
		orderBy('timestamp', 'desc')
	);

	useEffect(() => {
		try {
			const unsub = onSnapshot(postCollectionQuery, (snapshot) => {
				const newPosts: PostType[] = snapshot.docs.map(
					(doc) =>
						({
							...doc.data(),
							id: doc.id,
						} as PostType)
				);

				setPosts(newPosts);
			});

			return () => {
				unsub();
			};
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				toast.error(`Error fetching posts: ${error.message}`);
			}
		}
	}, []);

	return (
		<section className="container mx-auto p-4">
			{posts.map((post) => (
				<Post
					key={post.id}
					postId={post.id}
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}
		</section>
	);
};

export default Posts;
