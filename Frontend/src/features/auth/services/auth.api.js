import axios from "axios"

const authApiInstance = axios.create({
    baseURL : "http://loacalhost:3000/api/auth",
    withCredentials : true,
});

export  async function register(name, email, password) {
    const response = await authApiInstance.post("/register",{
        name,
        email,
        password
    });

    return response.data;
};

export  async function login(email, password) {
    const response = await authApiInstance.post("/login",{
        email,
        password
    });

    return response.data;
};

export  async function getMe() {
    const response = await authApiInstance.get("/get-me");

    return response.data;
};

export  async function logout() {
    const response = await authApiInstance.post("/logout");

    return response.data;
};
