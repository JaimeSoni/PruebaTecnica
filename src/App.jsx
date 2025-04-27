import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserList from './components/user_list';
import { UserProvider } from './context/user_context';
import UserDetail from './components/user_detail';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;