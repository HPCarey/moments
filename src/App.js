import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from 'react-bootstrap/Container';
import {Route,Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export const CurrentUserContext = createContext();
export const setCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try{
      const {data} = await axios.get('dj_rest_auth/user/')
      setCurrentUser(data)
    } catch(err){

    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home Page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={()=><p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </setCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;