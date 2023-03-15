import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import Backend from "service/backend";

const AuthContext = createContext({});
export const backend = new Backend(undefined);

export const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("wood-token"));
  const navigate = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("wood-token");
    const getUser = async () => {
      backend.setToken(token);
      setToken(token);
      const { data } = await backend.me();
      if (!data || !data.data) {
        navigate.push("/");
      } else {
        setUser(data.data);
      }
    };
    if (token) {
      getUser();
    }
  }, []);

  const roleNavigate = (user) => {
    switch (user.role) {
      case 0:
        navigate.push("/admin");
        break;
      case 1:
        navigate.push("/admin/supplier");
        break;
      case 2:
        navigate.push("/admin/customer");
        break;
      default:
        break;
    }
  };

  const login = async (username, password) => {
    const response = await backend.login(username, password);
    setUser(response.data.data);
    setToken(response.data.data.token);
    localStorage.setItem("wood-token", response.data.data.token);
    roleNavigate(response.data.data);
    return response;
  };
  const register = async (data) => {
    const response = await backend.register(data);
    setUser(response.data.data);
    setToken(response.data.data.token);
    localStorage.setItem("wood-token", response.data.data.token);
    roleNavigate(response.data.data);
    return response;
  };
  const logout = () => {
    localStorage.removeItem("wood-token");
    navigate.push("/auth/sign-in");
  };
  return (
    <AuthContext.Provider
      value={{
        service: new Backend(token ?? localStorage.getItem("wood-token")),
        login,
        user,
        register,
        logout,
      }}
      {...props}
    ></AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
