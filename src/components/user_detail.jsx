import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/user_detail.css'

import { UserContext } from '../context/user_context';
import LoadingSpinner from './loading_spinner';

const UserDetail = () => {
  // Se obtienen las funciones y el estado del contexto
  const { selectedUser, detailLoading, fetchUserDetails, setSelectedUser } = useContext(UserContext);

  // Se obtiene el ID y el uso de Hook para la navegación
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching user with ID:', id);
    fetchUserDetails(id);

    return () => {
      setSelectedUser(null);
    };
  }, [id]);

  // Spinner de carga
  if (detailLoading) {
    return <LoadingSpinner />;
  }

  // Mensaje para usuarios no encontrados
  if (!selectedUser) {
    return <div className="text-center py-8">No se encontró información del usuario</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button className="button" onClick={() => navigate('/')}>
        <div className="button-box">
          <span className="button-elem">
            <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
            </svg>
          </span>
          <span className="button-elem">
            <svg viewBox="0 0 46 40">
              <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
            </svg>
          </span>
        </div>
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-verde h-48 flex items-center justify-center">
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