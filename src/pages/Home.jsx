import React from 'react';

function Home() {
  return (
      <div>
          home page 
          {process.env.REACT_APP_URL}
      </div>
  )
}

export default Home;
