import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { MessageListType, MessageRequestType } from "../api/methods";


export const joinChatRoom = async(user:any, chat:any, setConnection:any, setMessageList: any)=>{
    try
    {
        let accessToken = localStorage.getItem('accessToken');
        if(accessToken)
        {
            
            const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7045/chat")
            .configureLogging(LogLevel.Information)
            .build();
    
            connection.on("ReceiveMessage",(user,message)=>{
                console.log(message);
                console.log(user);
                
                setMessageList((messages: any)=>[...messages, {user, message}]);
            })
    
            connection.onclose(e=>{
                setConnection();
                setMessageList([]);
            })
    
            await connection.start();
            await connection.invoke("JoinChat",{user, chat})
            setConnection(connection);
        }   
    }
    catch(e)
    {
        console.log(e);
    }
}
export const sendMessage = async(message: MessageRequestType, connection:any)=>{
    try{

        await connection.invoke("SendMessage", message);
    }
    catch(e)
    {
        console.log(e);
    }
}