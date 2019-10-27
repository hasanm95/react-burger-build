import axios from "axios";

const instance = axios.create({
    baseURL: 'https://my-react-burger-68eef.firebaseio.com/'
})

export default instance