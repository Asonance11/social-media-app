import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { db } from '../config/firebase';

interface CommentsType {
	comment: string;
	username: string;
	id: string;
}
interface PropsType {
	postId: string;
}

const Comments = ({ postId }: PropsType) => {
	const [comments, setComments] = useState<CommentsType[]>([]);

	const commentCollectionRef = collection(db, 'posts', `${postId}`, 'comments');
	const commmentCollectionQuery = query(
		commentCollectionRef,
		orderBy('timestamp', 'desc')
	);

	const getComments = async () => {
		try {
			if (postId) {
				// @ts-ignore
				const unsub = onSnapshot(commmentCollectionQuery, (snapshot) => {
					// console.log(snapshot.docs);
					setComments(
						snapshot.docs.map(
							(doc) =>
								({
									...doc.data(),
									id: doc.id,
								} as CommentsType)
						)
					);
				});
			}
		} catch (error) {
			console.error(error);
			toast.error(`${error}`);
		}
	};

	useEffect(() => {
		getComments();
	});

	return (
		<section className="mt-2 px-2">
			{comments.map((comm) => (
				<div key={comm.id} className="flex items-center gap-2 mt-2 text-sm">
					<strong>{comm.username}</strong>
					<p>{comm.comment}</p>
				</div>
			))}
		</section>
	);
};

export default Comments;
