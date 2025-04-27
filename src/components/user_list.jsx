import { useContext } from 'react';

import UserCard from './user_card';
import { UserContext } from '../context/user_context';
import SearchBar from './search_bar';
import LoadingSpinner from './loading_spinner';

const UserList = () => {
  // Se obtienen datos y funciones del contexto
  const { users, loading, searchTerm, setSearchTerm } = useContext(UserContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Usuarios Disponibles</h1>
      
      {/* Componente de busqueda */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Mapeo de la lista de usuarios */}
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* Mensaje de busqueda no encontrada */}
      {!loading && users.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Al parecer no existe el usuario, intenta probar de nuevo . . .</p>
      )}
    </div>
  );
};

export default UserList;