"use server"
import axios from "axios";
import { API_URL } from "../API";

interface registerData {
    email: string;
    password: string;
    username: string;
    name: string;
}


export const register = async (data: registerData) => {
    try {

        const response = await axios.post(`${API_URL}/api/auth/register`, data,{
            headers:{
                'x-api-key': process.env.API_KEY,
            }}

        );
    
        return response.data.data
    } catch (err) {
        console.log(" Error :", err);
        return null;
    }
}

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
        return null;
    }
}