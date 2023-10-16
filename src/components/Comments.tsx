import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { db } from '../config/firebase';

interface Comment {
	comment: string;
	username: string;
	id: string;
}
interface Props {
	postId: string;
}

const Comments = ({ postId }: Props) => {
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		const commentCollectionRef = collection(db, 'posts', postId, 'comments');
		const commentCollectionQuery = query(
			commentCollectionRef,
			orderBy('timestamp', 'desc')
		);

		try {
			const unsubscribe = onSnapshot(commentCollectionQuery, (snapshot) => {
				setComments(
					snapshot.docs.map(
						(doc) =>
							({
								...doc.data(),
								id: doc.id,
							} as Comment)
					)
				);
			});

			// Clean up the listener when the component unmounts
			return () => {
				unsubscribe();
			};
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				toast.error(`Error fetching comments: ${error.message}`);
			}
		}
	}, [postId]);

	return (
		<section className="mt-2 px-2">
			{comments.map((comment) => (
				<div key={comment.id} className="flex items-center gap-2 mt-2 text-sm">
					<strong>{comment.username}</strong>
					<p>{comment.comment}</p>
				</div>
			))}
		</section>
	);
};

export default Comments;
