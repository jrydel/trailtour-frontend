import React from 'react';

import { UserContext } from "./AppContext";
import Cookies from 'universal-cookie';
import Layout from './pages/Layout';
import { CssBaseline } from '@material-ui/core';

const App = () => {
  const cookies = new Cookies();
  const sessionCookie = cookies.get("session");
  const [session, setSession] = React.useState(sessionCookie === undefined ? { login: false, role: null } : sessionCookie);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      <CssBaseline />
      <Layout />
    </UserContext.Provider >
  );
}

export default App;
