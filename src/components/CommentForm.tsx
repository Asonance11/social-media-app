import { useState } from 'react';

const CommentForm = () => {
	const [commment, setComment] = useState('');

	return (
		<form className="mt-2 flex items-center w-full gap-2 px-2">
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
