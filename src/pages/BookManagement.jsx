import React from 'react';
import { Outlet } from 'react-router-dom';

const BookManagement = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default BookManagement;