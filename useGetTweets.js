import { useState, useEffect, useContext } from "react";
import { useTweetContext } from "./useTweetContext";
import { DependencyContext } from "../context/DependencyContext";
import Axios from "axios";

export const useGetTweets = (url) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { tweetList, dispatch } = useTweetContext()
  const { dependency } = useContext(DependencyContext);//when tweet btn clicked, again get all tweets

  //set token in headers
  const setHeaders = () => {
    const localToken = localStorage.getItem(`user`)
    Axios.defaults.headers.common['x-auth-token'] = JSON.parse(localToken);
  }

  useEffect(() => {
    let source = Axios.CancelToken.source();
   
    const fetchData = async() => {
      setIsPending(true);
      setError(null);
      dispatch({type: 'SET_TWEETLIST', payload: []});
      try{
        const res = await Axios.post(url, {cancelToken: source.token})
        dispatch({type: 'SET_TWEETLIST', payload: [...res.data]});
        setIsPending(false);
        setError(null);
      }catch(err){
        if(Axios.isCancel(err)){
          console.log(`fetch aborted`)
        }else{
          setError(`could not fetch the data`)
          setIsPending(false);
          dispatch({type: 'SET_TWEETLIST', payload: []});
        }
      }
    };
    setHeaders();
    fetchData();

    return () => source.cancel();
  }, [dispatch, dependency, url]);

  return { tweetList, error, isPending };
};
