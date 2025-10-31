import React, { useState } from 'react';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="ml-14 flex flex-col items-center justify-center w-full">
      <form onSubmit={handleSearch} className="flex w-full items-center">
        <Input
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex justify-start items-center lg:bg-[#F0F0F0] lg:w-[500px] h-[40px] pl-2 ml-12 md:ml-0 hover:border-none rounded-full"
          type="search"
          placeholder="Search products..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;