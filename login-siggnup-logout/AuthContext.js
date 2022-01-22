import { createContext, useReducer, useEffect } from "react";
import Axios from 'axios';
export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, user: action.payload }

    case 'LOGOUT':
      return  {...state, user: null}

     case 'AUTH_IS_READY':
         return {...state, authIsReady: true} 

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
    const [user, dispatch] = useReducer(authReducer,{
        user: null,
        authIsReady: false
    });

  useEffect(() => {
    const getUser = async () => {
      const localToken = localStorage.getItem(`user`);
      if (localToken) {
          //login
            try {
                Axios.defaults.headers.common['x-auth-token'] = JSON.parse(localToken);
                const res = await Axios.get(`https://twitterapi.liara.run/api/getProfile`);
                dispatch({type: 'LOGIN', payload: res.data})
                localStorage.setItem(`user`, JSON.stringify(res.data['x-auth-token']))
            } catch (err) {
                console.log(err.response.data.message);
                dispatch({type: 'LOGOUT'})
                localStorage.setItem(`user`, ``)
            }
        }else{
          //logout
          dispatch({type: 'LOGOUT'})
          localStorage.setItem(`user`, ``)
        }
        dispatch({ type: 'AUTH_IS_READY'});
    };
    getUser()

  }, []);

  return (
    <AuthContext.Provider value={{ ...user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;