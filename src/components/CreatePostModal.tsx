import { Dialog, Transition } from '@headlessui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { db, storage } from '../config/firebase';
import UserAuth from '../context/AuthContext';
interface Props {
	isOpen: boolean;
	closeModal: () => void;
}

const CreatePostModal = ({ isOpen, closeModal }: Props) => {
	const [caption, setCaption] = useState('');
	const [image, setImage] = useState<any>(null);

	const { user } = UserAuth();

	const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const storageRef = ref(storage, `images/${image?.name}`);
			const uploadTask = uploadBytesResumable(storageRef, image);
			await uploadTask;
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

			// add download URL to firestore

			const postRef = await addDoc(collection(db, 'posts'), {
				timestamp: serverTimestamp(),
				caption: caption,
				username: user?.displayName,
				imageUrl: downloadURL,
			});
		} catch (error) {
			console.error(error);
			toast.error(`${error}`);
		}
	};

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium text-center leading-6 text-eerieBlack"
									>
										Create A Post
									</Dialog.Title>
									<div className="mt-2">
										<form
											action=""
											className="flex flex-col gap-4 w-full"
											onSubmit={(e) => {
												handleUpload(e);
											}}
										>
											<div>
												<label
													className="mb-2 text-md text-center text-eerieBlack font-medium"
													htmlFor="post-image"
												>
													Upload Image
												</label>
												<input
													className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:outline-none "
													type="file"
													name="post_image"
													id="post-image"
													accept="image/*"
													required
													onChange={(e) => {
														if (e.target.files) {
															setImage(e.target.files[0]);
														}
													}}
													value={image}
												/>
											</div>
											<input
												type="text"
												name="post_caption"
												id="post-caption"
												required
												placeholder="Caption"
												className="w-full rounded border border-solid border-neutral-300 px-3 py-[0.32rem] placeholder:text-neutral-700 focus:outline-none"
												onChange={(e) => {
													setCaption(e.target.value);
												}}
												value={caption}
											/>

											<div>
												<button
													type="submit"
													className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												>
													Create Post
												</button>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default CreatePostModal;
