import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user_context';

const UserCard = ({ user }) => {
  const { fetchUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    fetchUserDetails(user.id);
    navigate(`/user/${user.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="bg-blue-500 h-32 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">{user.name.charAt(0)}</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h3>
        <p className="text-gray-600 truncate">{user.email}</p>
        <p className="text-sm text-gray-500 mt-2">{user.company.name}</p>
      </div>
    </div>
  );
};

export default UserCard;