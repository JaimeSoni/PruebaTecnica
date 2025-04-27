import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const fetchUserDetails = async (userId) => {
    setDetailLoading(true);
    try {
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
    <UserContext.Provider
      value={{
        users: filteredUsers,
        loading,
        searchTerm,
        setSearchTerm,
        selectedUser,
        fetchUserDetails,
        detailLoading,
        setSelectedUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};