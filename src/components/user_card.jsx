import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user_context';

const UserCard = ({ user }) => {
  const { fetchUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  // Funcion para mostrar la card mas detalla
  const handleClick = () => {
    fetchUserDetails(user.id);
    navigate(`/user/${user.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg" >
      <div className="bg-verde h-32 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">{user.name.charAt(0)}</span>
      </div>

      {/* Obtener los datos de nombre, correo y compañia */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h3>
        <p className="text-gray-600 truncate">{user.email}</p>
        <p className="text-sm text-gray-500 mt-2">{user.company.name}</p>
      </div>

      {/* Btn para abrir la Card */}
      <button type="submit" onClick={handleClick} className="border-verde flex justify-center gap-2 items-center mx-auto shadow-xl text-base bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-2 py-1 overflow-hidden border-2 rounded-full group mb-2">
      Ver más
      <svg className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" className="fill-gray-800 group-hover:fill-gray-800" />
      </svg>
    </button>
    </div>
  );
};

export default UserCard;