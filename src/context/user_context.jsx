import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const UserContext = createContext();

// Se obtienene las propiedades del componente y da acceso a los componentes hijos
export const UserProvider = ({ children }) => {

  // Almacena la lista de los usuarios
  const [users, setUsers] = useState([]);

  // Estado de carga 
  const [loading, setLoading] = useState(true);

  // Estado de busqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Almacena los detalles del usuario
  const [selectedUser, setSelectedUser] = useState(null);

  // Carga los detalles de un usuario seleccionado
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Peticion a la API para obtener los datos de los usuarios
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtra los resultados del Buscador
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Funcion para mostrar los datos del usuario seleccionado
  const fetchUserDetails = async (userId) => {
    setDetailLoading(true);
    try {
      // Peticion a la API de un usuario especifico mediante su ID
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setDetailLoading(false);
    }
  };

  return (

    // Valores obtenidos con el Context
    <UserContext.Provider
      value={{

        // Usurarios filtrados
        users: filteredUsers,
        
        // Carga del componente
        loading,

        // Busqueda
        searchTerm,

        // Busqueda actualizada 
        setSearchTerm,

        // Detalles del usuario
        selectedUser,

        // Detalles del usuario seleccionado
        fetchUserDetails,

        // Estado de carga
        detailLoading,

        // Actualiza el usuario seleccionado
        setSelectedUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};