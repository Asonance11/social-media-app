import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import UserAuth from '../context/AuthContext';

const Navbar = () => {
	const { user, logout } = UserAuth();

	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Sucessfully logged out');
		} catch (error) {
			console.error(error);
			toast.error(`${error}`);
		}
	};

	return (
		<nav className="px-[5%] fixed w-full py-4 flex justify-between items-center font-roboto bg-lotion text-eerieBlack md:px-8">
			<Link to="/">
				<h1 className="text-3xl text-darkBlue">Logo</h1>
			</Link>
			{user?.email ? (
				<div className="flex items-center gap-4">
					<p className="text-base font-medium text-darkBlue capitalize">
						{user?.displayName}
					</p>
					<button
						type="button"
						className="py-2 px-4 bg-darkBlue rounded-xl text-base font-medium text-white"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Link to="/login">
						<button
							type="button"
							className="py-2 px-4 bg-darkBlue rounded-xl text-base font-medium text-white"
						>
							Login
						</button>
					</Link>
					<Link to="/signup">
						<button
							type="button"
							className="hidden border border-darkBlue py-2 px-3 rounded-xl text-base font-medium text-darkBlue md:block"
						>
							Signup
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
