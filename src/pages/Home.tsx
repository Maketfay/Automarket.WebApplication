import React, { useState, useEffect } from "react"
import { AuthDataType, methods } from "../api/methods"
import { Button, TextField, Box,Typography } from "@mui/material"
import { Link , LinkProps} from "react-router-dom"

// const Home = () => {

//     return (<>
//         <Box sx={{ // sx - стили для каждого контейнера
//             display: "flex",
//             flexDirection: "column",
//             gap: "30px"
//         }}>
//             <Typography variant="h2" sx={{
//                 margin: "40px 0"
//             }}>Home</Typography>
//             <Link to="/login">Login</Link>
//             <Link to="/reg">Registration</Link>
//             <Link to="/chat">Chat</Link>
//         </Box>
//     </>)
// }

// export default Home

const Home = () => {
    return (
      <>
        <Box sx={{ // sx - стили для каждого контейнера
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // добавляем этот стиль, чтобы контент выровнялся по нижнему краю
            minHeight: "100vh", // добавляем этот стиль, чтобы контент всегда занимал всю высоту экрана
            gap: "30px",
            
          }}>
          <Typography variant="h2" sx={{
            margin: "40px 0"
          }}>Home</Typography>
          <Box sx={{ // создаем вложенный контейнер для ссылок
            marginTop: "auto", // добавляем этот стиль, чтобы контент расположился сверху вниз
            bgcolor: "black",
            minHeight: "10vh"
            
          }}>
            <Link to="/login" style={{ color: "blue", marginRight: "20px" }}>Login</Link>
            <Link to="/reg" style={{ color: "blue", marginRight: "20px" }}>Registration</Link>
            <Link to="/cars" style={{ color: "blue" }}>List of cars</Link>
          </Box>
        </Box>
      </>
    )
  }
  
  export default Home
  