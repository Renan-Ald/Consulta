import React from 'react';
function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return (
      <div>
       <h1>olá mundo</h1>
      </div>
    );
  }
  
  export default Dashboard;