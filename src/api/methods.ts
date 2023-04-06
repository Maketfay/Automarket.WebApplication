import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7045",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }
})

axios.interceptors.request.use(config => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  }, 
  error => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export type MessageRequestType = {
  chatId: string,
  username: string,
  message: string
}

export type MessageType = {
  username: string,
  message: string  
}

export type AuthDataType = {
  username: string
  password: string
}
export type AuthResponseDataType = {
  accessToken: string
  refreshToken: string
  userId: string
}
export type RegDataType = {
  firstName: string
  lastName: string
  patronymic: string
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export type CarItemType = {
  name: string,
  description: string,
  model:string,
  speed: number,
  color: string,
  price: number,
  dateCreate: string,
  typeCar: number,
  chatId: string
}

export type UserChatType = {
  id: string,
  username: string
}

export type ChatConnectionType={
  userChat: UserChatType,
  chatId: string
}

export type CarsListType = CarItemType[]

export type MessageListType = MessageType[]

export const methods = {
    getMessageList(data: any) {
        return api.get("/getMessages",  {params: data})
    },
    login(data: AuthDataType) {
        return api.post<AuthResponseDataType>("/Users/authenticate", data)
    },
    register(data: RegDataType){
      return api.post<string>("/Users/register", data)
    },
    getCarsList(data: any){
      return api.get<CarsListType>("/cars/getCars", {params: data})
    },
}