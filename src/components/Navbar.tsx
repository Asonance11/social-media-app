import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="py-4 px-8 flex justify-between items-center">
			<Link to="/">Logo</Link>
			<div>
				<Link to="/login">
					<button type="button">Login</button>
				</Link>
				<Link to="/signup">
					<button type="button">Signup</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
