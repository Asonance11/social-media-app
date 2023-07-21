import { ReactNode } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface SidebarProps {
	children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
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
							<button className="text-md">Create</button>
						</li>
					</div>
				</ul>
			</section>
			<main>{children}</main>
		</>
	);
};

export default Sidebar;
