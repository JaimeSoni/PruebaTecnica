import { useContext } from 'react';

import { UserContext } from '../context/user_context';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(UserContext);

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;