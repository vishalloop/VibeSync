import {register, login, getMe, logout} from "../services/auth.api.js";
import {setUser, setLoading, setError} from "../state/auth.slice.js";
import {useDispatch} from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();

    async function handleRegister(name, email, password) {
        const data = await register(name, email, password);

        dispatch(setUser(data.user));

        return data.user;
    };

    async function handleLogin(email, password) {
        const data = await login(email, password);

        dispatch(setUser(data.user));

        return data.user;
    };

    
    async function handleGetMe() {
        try{
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        }catch(err) {
            console.log(err);
            dispatch(setError(err));
        } finally{
            dispatch(setLoading(false));
        }

    };

    async function handleLogout() {
        const data = await logout();

        dispatch(setUser(data.user));

        return data;
    };

    return {handleRegister, handleLogin, handleGetMe, handleLogout};

};