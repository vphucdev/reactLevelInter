import httpRequest from "./httpRequest"

export const fetUsers = () => {
    const res = httpRequest.get('/users?page=1')
    
    return res
}