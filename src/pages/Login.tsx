
import React, { useState, useEffect, useContext } from "react"
import { AuthDataType, methods } from "../api/methods"
import { Button, TextField, Box,Typography } from "@mui/material"
import { authContext } from "../App"
import { useNavigate, useNavigation } from "react-router-dom"

const Login:React.FC = () => {

    const [loginData, setLoginData] = useState<AuthDataType>({
        password: "",
        username: ""
    })

    const navigate = useNavigation();

    const a = useContext(authContext);

    const auth = async () => {
        try {
            const response = (await methods.login({
              username: loginData.username,
              password: loginData.password
            })).data
    
            localStorage.setItem("accessToken", response.accessToken)
            localStorage.setItem("refreshToken", response.refreshToken)

            a?.setAuthContextState({
                username: loginData.username,
                userId: response?.userId,
                isAuth: true
            })

            // navigate.location()

          }
          catch(e) {
            console.error(e)
          }
    }   

    return (<>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center"
        }}>
            <Typography variant="h2" sx={{
                margin: "40px 0"
            }}>Login Module</Typography>
            <TextField
                sx={{
                    width: "350px"
                }}
                label="username"
                value={loginData.username}
                onChange={(e) => setLoginData({password: loginData.password, username: e.target.value})}
            />
            <TextField
                sx={{
                    width: "350px",
                    margin: "10px 0"
                }}
                label="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({password: e.target.value, username: loginData.username})}
                InputProps={{
                    type: "password"
                }}
                />
            
            <Button sx={{
                    width: "250px"
                }} variant="contained" onClick={() =>  auth()}>
             Login
            </Button>
        </Box>
    </>)
}

export default Login