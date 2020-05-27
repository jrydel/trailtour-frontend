import React from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Cookies from 'universal-cookie';

import ReactGa from 'react-ga';

import { UserContext } from "./AppContext";
import Layout from './components/Layout';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1565c0" },
    secondary: { main: '#e61c5d' },
  }
});

const App = () => {

  const cookies = new Cookies();
  const sessionCookie = cookies.get("session");
  const [session, setSession] = React.useState(sessionCookie === undefined ? { login: false, role: null } : sessionCookie);

  React.useEffect(() => {
    ReactGa.initialize('UA-167777796-1');
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

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
