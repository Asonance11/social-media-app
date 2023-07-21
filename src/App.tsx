import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoutes from './routes/ProtectedRoutes';

function App() {
	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					<Toaster richColors />
					<Navbar />
					<Sidebar />
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoutes>
									<Home />
								</ProtectedRoutes>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
