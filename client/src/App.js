import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import CreateUser from './pages/CreateUser';
import UsersList from './pages/UsersList';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<UsersList />} />
				<Route path="/create_user" element={<CreateUser />} />
			</Routes>
		</div>
	);
}

export default App;
