import address from "./address"
import axios from "axios"



export default function addClient(formData) {

    return axios.post(address + '/api/public/clients/upsertClient', formData)
}
export  function getActiveClientList() {
   
    return axios.get(address + '/api/public/clients/getActiveClientList')
}