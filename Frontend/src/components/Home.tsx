import React from 'react';
import SearchBar from './SearchBar';
import CategoryButtons from './CategoryButtons';
import TopTherapists from './TopTherapists';
import ThisWeekInTherapy from './ThisWeekInTherapy';
import Updates from './Updates';

const Home: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Tome control de su bienestar mental</h1>
      <SearchBar />
      <CategoryButtons />
      <TopTherapists />
      <ThisWeekInTherapy />
      <Updates />
    </>
  );
};

export default Home;