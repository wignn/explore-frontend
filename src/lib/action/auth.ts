"use server"
import axios from "axios";
import { API_URL } from "../API";

interface registerData {
    email: string;
    password: string;
    username: string;
    name: string;
}


interface RegisterResponse {
    id: string;
    email: string;
    username: string;
    name: string;
    token: string;
  }
  
  export const register = async (data: registerData): Promise<RegisterResponse | null> => {
    try {
      const response = await axios.post<RegisterResponse>(`${API_URL}/api/auth/register`, data, {
        headers: {
          'x-api-key': process.env.API_KEY!,
        },
      });
  
      return response.data;
    } catch (err) {
      console.error("Error:", err);
      return null;
    }
  };
  

export const logout = async(username:string, token: string)=>{
    try {

        const response = await axios.patch(`${API_URL}/api/auth/logout`,{
           username,
           token
        },{
            headers:{
                'x-api-key': process.env.API_KEY,
            }
        });
        
        return response.status
    } catch (err) {
        console.log(" Error :", err);
    }
}