import { Dialog, Transition } from '@headlessui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { db, storage } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
interface Props {
	isOpen: boolean;
	closeModal: () => void;
}

const CreatePostModal = ({ isOpen, closeModal }: Props) => {
	const [caption, setCaption] = useState('');
	const [image, setImage] = useState<File | null>(null);

	const { user } = useAuth();

	const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (!image) {
				toast.error('Please select an image to upload.');
				return;
			}

			const storageRef = ref(storage, `images/${image?.name}`);
			const uploadTask = uploadBytesResumable(storageRef, image);
			await uploadTask;
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

			// add download URL to firestore

			const postRef = addDoc(collection(db, 'posts'), {
				timestamp: serverTimestamp(),
				caption: caption,
				username: user?.displayName,
				imageUrl: downloadURL,
			});
			await postRef;
			setCaption('');
			setImage(null);
			closeModal();
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				toast.error(`Error creating a post: ${error.message}`);
			}
		}
	};

	return (
		<>
			<Transition show={isOpen} as={Fragment}>
				<Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
					<div className="min-h-screen flex items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="bg-white rounded-2xl max-w-md p-6 text-left">
								<Dialog.Title className="text-lg font-medium text-center text-eerieBlack">
									Create A Post
								</Dialog.Title>
								<form onSubmit={handleUpload} className="mt-4 space-y-4">
									<label
										htmlFor="post-image"
										className="block text-md text-center text-eerieBlack font-medium"
									>
										Upload Image
									</label>
									<input
										type="file"
										id="post-image"
										accept="image/*"
										required
										onChange={(e) => {
											if (e.target.files) {
												setImage(e.target.files[0]);
											}
										}}
									/>
									<input
										type="text"
										id="post-caption"
										name="post_caption"
										placeholder="Caption"
										required
										className="w-full rounded border border-solid border-neutral-300 px-3 py-[0.32rem] placeholder:text-neutral-700 focus:outline-none"
										onChange={(e) => {
											setCaption(e.target.value);
										}}
										value={caption}
									/>
									<button
										type="submit"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									>
										Create Post
									</button>
								</form>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default CreatePostModal;
