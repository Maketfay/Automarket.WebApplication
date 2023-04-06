import React, { useEffect, useContext, useState, createContext } from 'react';
import Login from './pages/Login';
import CarsList from './pages/CarsList';
import Register from './pages/Register';
import Container from '@mui/material/Container/Container';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

export type AuthContextType = {
  authConextState: AuthStateType
  setAuthContextState: (newValue: AuthStateType) => void
}

export type AuthStateType = {
  isAuth: boolean,
  username: string,
  userId: string
}

export const authContext = createContext<AuthContextType | null>(null)

const App = () => {

  const [authConextState, setAuthContextState] = useState<AuthStateType>({
    isAuth: false,
    username: "",
    userId: ""
  })

  return (
    <Container>
      <authContext.Provider value={{authConextState, setAuthContextState}}>
        <HashRouter>
            <Routes>
              <Route path='/' element={<Home />}/>
              {authConextState.isAuth 
                ?   <>
                    <Route path ='/cars' element = {<CarsList/>}/>
                    <Route path ='/chat/:chatId' element = {<Chat/>}/>
                </>

                : <>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/reg' element={<Register />}/>
                </>
              }

            </Routes>
        </HashRouter>
      </authContext.Provider>
    </Container>

  );
}

export default App;
