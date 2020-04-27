import React from 'react';
import Cookies from 'universal-cookie';

export const UserContext = React.createContext(null);
export const AlertContext = React.createContext({
    open: false,
    severity: "success",
    text: "",
});