import { ReactNode, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import CreatePostModal from './CreatePostModal';

interface SidebarProps {
	children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Sucessfully logged out');
		} catch (error) {
			console.error(error);
			toast.error(`${error}`);
		}
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<section className="h-screen w-1/5 fixed left-0 z-10 bg-white p-4 flex flex-col gap-4">
				<h1 className="text-3xl text-darkBlue">Logo</h1>

				<ul className="flex flex-col gap-2 mt-4">
					<Link to="/">
						<div className="flex items-center gap-2 p-2 text-eerieBlack rounded hover:bg-lotion">
							<p className="text-xl">
								<AiFillHome />
							</p>
							<li className=" text-md ">Home</li>
						</div>
					</Link>
					<div className="flex items-center gap-2 p-2 text-eerieBlack rounded hover:bg-lotion">
						<p className="text-xl">
							<MdOutlineAddBox />
						</p>
						<li>
							<button className="text-md" type="button" onClick={openModal}>
								Create
							</button>
						</li>
					</div>
					<div className="flex items-center gap-2 p-2 text-eerieBlack rounded hover:bg-lotion">
						<p className="text-xl">
							<BiLogOut />
						</p>
						<li>
							<button className="text-md" type="button" onClick={handleLogout}>
								Logout
							</button>
						</li>
					</div>
				</ul>
			</section>
			<CreatePostModal isOpen={isOpen} closeModal={closeModal} />
			<main>{children}</main>
		</>
	);
};

export default Sidebar;
