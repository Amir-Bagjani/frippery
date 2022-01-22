import { useState, useEffect  } from "react";
import  Axios  from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  //set token in headers
  const setHeaders = () => {
    const token = JSON.parse(localStorage.getItem(`token`))
    if(token) Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else Axios.defaults.headers.common['Authorization'] = null;
  }

  
  useEffect(() => {
    let source = Axios.CancelToken.source();
   
    const fetchData = async() => {
      setIsPending(true);
      setError(null);
      try{
        const res = await Axios.get(url, {cancelToken: source.token})
        setData(res.data);
        setIsPending(false);
        setError(null);
      }catch(err){
        if(Axios.isCancel(err)){
          console.log(`fetch aborted`)
        }else{
          setError(`could not fetch the data`)
          setIsPending(false);
          setData(null);
        }
      }
    };
    setHeaders();
    fetchData();

    return () => source.cancel();
  }, [url]);

  return { isPending, data, error };
};
