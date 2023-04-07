import * as SR from "@microsoft/signalr";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserChatType, ChatConnectionType, MessageType, MessageListType, MessageRequestType } from "../api/methods";
import { authContext } from "../App";
import { Box, Typography, TextField, Button } from "@mui/material"
import { methods } from "../api/methods"
import { joinChatRoom, sendMessage } from "../scripts/signalR";
import { HubConnection } from "@microsoft/signalr";

const Chat: React.FC = () => {

    const auth = useContext(authContext);

    const [connectionData, setConnectionData] = useState<ChatConnectionType>({
        chatId: "",
        userChat: {
            id: auth?.authConextState.userId || "",
            username: auth?.authConextState.username || ""
        }
    })

    const [connection, setConnection] = useState();

    const {chatIdParam} = useParams<string>();

    const [messageList, setMessageList] = useState<MessageListType>([])


    const [messageRequest, setMessageRequest] = useState<MessageRequestType>({
        chatId: "",
        username: "",
        message: auth?.authConextState.username || ""
    })

    useEffect(() => {
        (async () => {
            try {
                const list = (await methods.getMessageList({
                })).data

                console.log(list)

                setMessageList(list)
        
            }
            catch(e) {
                console.error(e)
            }
        })()
    }, [])
    

    useEffect(() => {
        setConnectionData({
            ...connectionData, 
            chatId: chatIdParam as string //Bad thing
        });

        setMessageRequest({...messageRequest, chatId: chatIdParam as string});

        joinChatRoom(connectionData.userChat, connectionData.chatId, setConnection, setMessageList, messageList);
    }, [])
    
    const Message: React.FC<{messageData: MessageType}> = ({messageData}) => {
        return (<>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                backgroundColor: "#bbcadf",
                borderRadius: "30px",
                padding: "50px 30px"
    
            }}>
                <Typography>{messageData.username}</Typography>
                <Typography>{messageData.message}</Typography>
                
            </Box>  
        </>)
    }
   
//<Typography>{messageData.sentDate}</Typography>
    

    // const hubConnection = new SR.HubConnectionBuilder()
    // .withUrl("https://localhost:7045/chat")
    // .build();

    // hubConnection.start().then(a => {
    //     // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    //       hubConnection.invoke("JoinChat", connectionData);
    // });  


    return (
    <Box 
        sx={{display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "60px", 
        margin: "100px 0"
    }}>
    {messageList?.map(item => <Message messageData={item}/> )}

    <TextField
                sx={{
                    width: "350px"
                }}
                label="message"
                value={messageRequest.message}
                onChange={(e) => setMessageRequest({...messageRequest, message: e.target.value})}
            />
        <Button sx={{
                    width: "250px"
                }} 
                variant="contained" 
                onClick={() => sendMessage({message: messageRequest.message, chatId: messageRequest.chatId, username: messageRequest.username}, connection) }>
             Send
            </Button>
    </Box>
    
    )
};

export default Chat