import { api } from "./api";

export const getSummary = async() => {
    try{
        const response =  await api.get("/todos/summary");
        return response.data;
    }
    catch(e){
        console.log("Error in fetching summary", e);
        return [];
    }

};