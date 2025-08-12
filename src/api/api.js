// --- Dịch vụ API chung --- //
import axios from "axios";

export const api = {
    getAll: async (resource) => {
        try{
            const response = await axios.get(resource);
            return response.data
        }
        catch(error){
            return{
                error: `Error fetching ${resource}`
            }
        }
    },
    add: async (resource, data) => {
        try{
            const response = await axios.post(resource, data)
            return response.data
        }
        catch(error){
            return{
                error: `Error adding ${resource}`
            }
        }
    },
    update: async (resource, id, data) => {
        try{
            const response = await axios.put(`${resource}/${id}`, data)
            return response.data
        }
        catch{
            return{
                error: `Error updating ${resource}`
            }
        }
    },
    remove: async (resource, id) => {
        try{
            const response = await axios.delete(`${resource}/${id}`)
            return response.data
        }
        catch{
            return{
                error: `Error removing ${resource}`
            }
        }
    }
}