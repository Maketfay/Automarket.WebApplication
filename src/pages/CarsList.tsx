import React, {useState, useEffect, useContext} from "react"
import { CarItemType, CarsListType, methods } from "../api/methods"
import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { authContext } from "../App"


const Car: React.FC<{carData: CarItemType}> = ({carData}) => {


    return (<>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            backgroundColor: "#bbcadf",
            borderRadius: "30px",
            padding: "50px 30px"

        }}>
            <Typography>{carData.name}</Typography>
            <Typography>{carData.model}</Typography>
            <Typography>{carData.price}</Typography>
            <Typography>{carData.description}</Typography>
            <Link to={`/chat/${carData.chatId}/`}>Go to chat</Link>
        </Box>  
    </>)
}

const CarsList = () => {

    const [carsList, setCarsList] = useState<CarsListType>([])

    useEffect(() => {
        (async () => {
            try {
                const list = (await methods.getCarsList({
                })).data

                console.log(list)

                setCarsList(list)
        
            }
            catch(e) {
                console.error(e)
            }
        })()
    }, [])


    return (<Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", margin: "100px 0"}}>
        {carsList?.map(item => <Car carData={item}/> )}
    </Box>)
}

export default CarsList