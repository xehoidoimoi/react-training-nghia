import axios from "axios";


const BASE_URL = "https://api.realworld.io/api/";
const user = JSON.parse(localStorage.getItem("persist:root"));
const TOKEN = user?.users ? JSON.parse(user.users).currentUser?.user.token : "";
// console.log("user: ", user);
// console.log("token: ", TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { "Authorization": `Bearer ${TOKEN}` }
})