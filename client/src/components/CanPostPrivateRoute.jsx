import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

export default function CanPostPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser && currentUser.canPost ? <Outlet /> : <Navigate to='/sign-in' />;
}
