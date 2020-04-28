import React from 'react';

import { UserContext } from "./AppContext";
import Cookies from 'universal-cookie';
import Layout from './pages/Layout';
import { CssBaseline } from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0288d1" },
    secondary: { main: '#d81b60' },
  }
});

const App = () => {
  const cookies = new Cookies();
  const sessionCookie = cookies.get("session");
  const [session, setSession] = React.useState(sessionCookie === undefined ? { login: false, role: null } : sessionCookie);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </UserContext.Provider >
  );
}

export default App;
