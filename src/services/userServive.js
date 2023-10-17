import axios from "axios"

export const fetUsers = () => {
    const res = axios.get('https://reqres.in/api/users?page=1')
    
    return res
}