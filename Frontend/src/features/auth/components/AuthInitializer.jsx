import {useEffect} from "react"
import {useAuth} from "../hooks/useAuth.js"

const AuthInitializer = ({children}) => {

  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <>{children}</>
  )
}

export default AuthInitializer
