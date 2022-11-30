import React from 'react';
import CastCard from './CastCard';

const CastList = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-5">
      <CastCard></CastCard>
      <CastCard></CastCard>
    </div>
  );
};

export default CastList;