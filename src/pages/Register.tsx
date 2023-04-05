import React, { useState, useEffect } from "react"
import {  methods, RegDataType } from "../api/methods"
import { Button, TextField, Box,Typography } from "@mui/material"

const Register:React.FC = () => {

const [registrationData, setRegistrationData] = useState<RegDataType>({
    firstName: "",
    lastName: "",
    patronymic: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
})

const reg = async () => {
    try {
        const response = (await methods.register({
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            patronymic: registrationData.patronymic,
            username: registrationData.username,
            email: registrationData.email,
            password: registrationData.password,
            passwordConfirm: registrationData.passwordConfirm
        })).data

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
        }}>Registration Module</Typography>
        <TextField
            sx={{
                width: "350px"
            }}
            label="First Name"
            value={registrationData.firstName}
            onChange={(e) => setRegistrationData({...registrationData, firstName: e.target.value})}
        />
        <TextField
            sx={{
                width: "350px"
            }}
            label="Last Name"
            value={registrationData.lastName}
            onChange={(e) => setRegistrationData({...registrationData, lastName: e.target.value})}
        />
        <TextField
            sx={{
                width: "350px"
            }}
            label="Patronimyc"
            value={registrationData.patronymic}
            onChange={(e) => setRegistrationData({...registrationData, patronymic: e.target.value})}
        />
        <TextField
            sx={{
                width: "350px"
            }}
            label="Email"
            type = "email"
            value={registrationData.email}
            onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
            InputProps = {{
                type: "email"
            }} 
        />
        <TextField
            sx={{
                width: "350px"
            }}
            label="Username"
            value={registrationData.username}
            onChange={(e) => setRegistrationData({...registrationData, username: e.target.value})}
        />
        <TextField
            sx={{
                width: "350px",
                margin: "10px 0"
            }}
            label="Password"
            value={registrationData.password}
            onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
            />
        <TextField
            sx={{
                width: "350px",
                margin: "10px 0"
            }}
            label="Confirm Password"
            value={registrationData.passwordConfirm}
            onChange={(e) => setRegistrationData({...registrationData, passwordConfirm: e.target.value})}
            />
        
        <Button sx={{
                width: "250px"
            }} variant="contained" onClick={() =>  reg() }>
                Registration
        </Button>
    </Box>
</>)
}
export default Register