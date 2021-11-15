import address from "./address"
import axios from "axios"



export default function addClient(formData) {

    return axios.post(address + '/api/public/clients/upsertClient', formData)
}
export function getActiveClientList() {

    return axios.get(address + '/api/public/clients/getActiveClientList')
}
export function getNextId() {

    return axios.get(address + '/api/public/clients/getNextK_Id')
}

export function addClientImage(formData) {
    
    return axios.post(address + '/api/public/clientProfilePicture/createImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}