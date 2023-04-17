import Axios from "axios"

const axiosClient = Axios.create({
    baseURL: "http://localhost:4001",
})

export default axiosClient
