import axios from "axios";
import { API_URL } from "./domain";

export const api = {
    getLists: async () => {
        try{
            const response = await axios.get(API_URL);
            return response.data
        }
        catch(error){
            return{
                error: 'Error fetching list'
            }
        }
    },
    addList: async (data) => {
        try{
            const response = await axios.post(API_URL, data)
            return response.data
        }
        catch(error){
            return{
                error: 'Error adding task'
            }
        }
    },
    updateList: async (id, data) => {
        try{
            const response = await axios.put(`${API_URL}/${id}`, data)
            return response.data
        }
        catch{
            return{
                error: 'Error updating task'
            }
        }
    },
    deleteList: async (id) => {
        try{
            const response = await axios.delete(`${API_URL}/${id}`)
        }
        catch{
            return{
                error: 'Error deleting task'
            }
        }
    }
}