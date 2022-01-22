import { useState, useEffect, useReducer } from "react";
import  Axios  from "axios";

const initialResponse = {data: null, isPending: false, error: null, success: null};

const responseReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':  
            return {...state, isPending: true}

        case 'ADD_DOCUMENT':
            return {error: null, isPending: false, data: action.payload, success: true}

        case 'DELETE_DOCUMENT':
            return {error: null, data: null, success: true, isPending: false}

        case 'UPDATE_DOCUMENT':
            return {error: null, data: action.payload, success: true, isPending: false}

        case 'ERROR':
            return {error: action.payload, success: false, isPending: false, data: null}

    default:
        return state
    }
}

export const useAxios = () => {
    const [response, dispatch] = useReducer(responseReducer, initialResponse)
    const [isCancelled, setIsCancelled] = useState(false);
    
    //set token in headrs
    const token = JSON.parse(localStorage.getItem(`token`))
    if(token) Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else Axios.defaults.headers.common['Authorization'] = null;
  
    //post request
    const postData = async (url, options) => {
        dispatch({type: `IS_PENDING`})
        try{
            const res = await Axios.post(url, options)
            if(!isCancelled) dispatch({type: 'ADD_DOCUMENT', payload: res.data})
        }catch(err){
            if(!isCancelled) dispatch({type: 'ERROR', payload: `could not fetch the data`})
        }
    };

    //delete request
    const deleteData = async (url) => {
        dispatch({type: `IS_PENDING`})
        try{
            await Axios.delete(url)
            if(!isCancelled) dispatch({type: 'DELETE_DOCUMENT'})
        }catch(err){
            if(!isCancelled) dispatch({type: 'ERROR', payload: `could not delete`})
        }
    }

    //update request
    const updateData = async (url, option) => {
        dispatch({type: `IS_PENDING`})
        try{
            const res = await Axios.put(url, option)
            if(!isCancelled) dispatch({type: 'UPDATE_DOCUMENT', payload: res.data})
        }catch(err){
            if(!isCancelled) dispatch({type: 'ERROR', payload: err.message})
        }
    }

    

    useEffect(() => {
        return () => setIsCancelled(true)
    }, []);

  return { response, postData, deleteData, updateData};
};