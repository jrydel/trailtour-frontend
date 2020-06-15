import React from 'react';

export const PageTitle = ({ children }) => <h1 className="text-2xl text-dark h-10">{children}</h1>;
export const PageMenu = ({ children }) => <div className="flex flex-row items-center justify-between h-10">{children}</div>
export const PageContent = ({ children }) => <div className="mt-4">{children}</div>;
export const PageLoader = () => <div className="mt-4 flex flex-row items-center justify-center"><div className="loader" /></div>;
