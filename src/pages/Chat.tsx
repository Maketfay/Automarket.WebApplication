import * as SR from "@microsoft/signalr";
import React, { useState, useEffect, useContext } from "react";
import { UserChatType, ChatConnectionType } from "../api/methods";
import { authContext } from "../App";

const Chat: React.FC = () => {

    const auth = useContext(authContext);

    const [connectionData, setConnectionData] = useState<ChatConnectionType>({
        chatId: "",
        userChat: {
            id: auth?.authConextState.userId || "",
            username: auth?.authConextState.username || ""
        }
    })

    useEffect(() => {
        setConnectionData({
            ...connectionData, 
            chatId: window.location.hash.replace("#/chat/", "").replace("/", "")
        })
    }, [])

    // const hubConnection = new SR.HubConnectionBuilder()
    // .withUrl("/chat")
    // .build();

    // hubConnection.start().then(a => {
    //     // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
    //     if (hubConnection.connectionId) {
    //       hubConnection.invoke("JoinChat", hubConnection.connectionId);
    //     }   
    // });  


    return (<>
        <h2>{connectionData.chatId} {connectionData.userChat.username}</h2>
    </>)
};


export default Chat


