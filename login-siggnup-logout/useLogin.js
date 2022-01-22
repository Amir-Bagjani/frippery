import { useState, useEffect } from 'react';
import Axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    // const [isCancelled, setIsCancelled] = useState(false)
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    let source = Axios.CancelToken.source();// out of function scope

    const login = async(username, password) => {
        setError(null)
        setIsPending(true)
        dispatch({type: 'LOGIN', payload: null})
        try{
            const res = await Axios.post(`https://twitterapi.liara.run/api/login`, {username, password}, {cancelToken: source.token})
            dispatch({type: 'LOGIN', payload: res.data})
            // if(!isCancelled){
                setError(null)
                setIsPending(false)
                localStorage.setItem(`user`, JSON.stringify(res.data['x-auth-token']))
            // }
        }catch(err){
            if(Axios.isCancel(err)){
                console.log(`fetch aborted`)
                // setIsPending(false)
                // setError(err.response.data.message)
            }else{
            // if(!isCancelled){
                // dispatch({type: 'LOGIN', payload: null})
                setIsPending(false)
                setError(err.response.data.message)
            }
        }
    }

    useEffect(() => {
        // return () => setIsCancelled(true)
        return () => source.cancel()
    }, [source])

    return { isPending, error, login}
}