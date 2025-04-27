import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user_context';
import LoadingSpinner from './loading_spinner';

const UserDetail = () => {
  const { selectedUser, detailLoading, fetchUserDetails, setSelectedUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log('UserDetail rendering - ID:', id);
  console.log('Current state - detailLoading:', detailLoading, 'selectedUser:', selectedUser);

  useEffect(() => {
    console.log('UserDetail useEffect - Fetching user with ID:', id);
    
    if (id) {
      fetchUserDetails(id);
    } else {
      setError('ID de usuario no válido');
    }
    
    return () => {
      console.log('UserDetail unmounting - clearing selectedUser');
      setSelectedUser(null);
    };
  }, [id, fetchUserDetails, setSelectedUser]);

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (detailLoading) {
    console.log('Showing loading spinner');
    return <LoadingSpinner />;
  }

  if (!selectedUser) {
    console.log('No user found, but loading completed');
    return <div className="text-center py-8">No se encontró información del usuario</div>;
  }

  console.log('Rendering user details for:', selectedUser.name);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button 
        onClick={() => navigate('/')}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Back to List
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 h-48 flex items-center justify-center">
          <span className="text-white text-6xl font-bold">{selectedUser.name.charAt(0)}</span>
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedUser.name}</h1>
          <p className="text-gray-600 mb-4">@{selectedUser.username.toLowerCase().replace(/\s+/g, '')}</p>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
              <p className="text-gray-600">{selectedUser.email}</p>
              <p className="text-gray-600">{selectedUser.phone}</p>
              <p className="text-gray-600">{selectedUser.website}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600">
                {selectedUser.address.street}, {selectedUser.address.suite}<br />
                {selectedUser.address.city}, {selectedUser.address.zipcode}
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Company</h2>
              <p className="text-gray-600">{selectedUser.company.name}</p>
              <p className="text-gray-600 italic">"{selectedUser.company.catchPhrase}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;