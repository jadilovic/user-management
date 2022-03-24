import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import AssignPermission from './pages/AssignPermission';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import UsersList from './pages/UsersList';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<UsersList />} />
				<Route path="/create_user" element={<CreateUser />} />
				<Route path="/edit_user" element={<EditUser />} />
				<Route path="/assign_permission" element={<AssignPermission />} />
			</Routes>
		</div>
	);
}

export default App;
