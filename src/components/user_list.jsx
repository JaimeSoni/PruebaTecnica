import { useContext } from 'react';

import UserCard from './user_card';
import { UserContext } from '../context/user_context';
import SearchBar from './search_bar';
import LoadingSpinner from './loading_spinner';

const UserList = () => {
  const { users, loading, searchTerm, setSearchTerm } = useContext(UserContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">User Directory</h1>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
      
      {!loading && users.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No users found matching your search.</p>
      )}
    </div>
  );
};

export default UserList;