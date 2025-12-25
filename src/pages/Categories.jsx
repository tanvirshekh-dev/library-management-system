import React from 'react';
import { Outlet } from 'react-router-dom';

const Categories = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Categories;