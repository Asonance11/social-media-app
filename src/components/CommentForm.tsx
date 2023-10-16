import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'sonner';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

interface PropsType {
	postId: string;
}

const CommentForm = ({ postId }: PropsType) => {
	const [commment, setComment] = useState('');

	const { user } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const commentRef = addDoc(
				collection(db, 'posts', `${postId}`, 'comments'),
				{
					username: user?.displayName,
					comment: commment,
					timestamp: serverTimestamp(),
				}
			);
			await commentRef;
			setComment('');
		} catch (error) {
			console.error(error);
			toast.error(`${error}`);
		}
	};

	return (
		<form
			className="mt-2 flex items-center w-full gap-2 px-2"
			onSubmit={(e) => {
				handleSubmit(e);
			}}
		>
			<input
				type="text"
				name="comment"
				id="comment"
				placeholder="Add a comment"
				required
				className="flex-1 border-b border-darkBlue outline-none"
				value={commment}
				onChange={(e) => {
					setComment(e.target.value);
				}}
			/>
			<button
				type="submit"
				disabled={!commment ? true : false}
				className="p-2 bg-darkBlue rounded text-white disabled:opacity-75"
			>
				Comment
			</button>
		</form>
	);
};

export default CommentForm;
