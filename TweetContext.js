import { createContext, useReducer } from "react";

export const TweetContext = createContext()

const tweetReducer = (state, action) => {
    switch(action.type){
        case 'SET_TWEET':
            return {...state, tweet: action.payload}

        case 'SET_TWEETLIST':
            return {...state, tweetList: action.payload}

        case 'LIKE_TWEET':
            let newTweetList = [...state.tweetList.map(item=>{
                if(item._id === action.payload) return {...item , likes: item.likes + 1}
                return item
            })]
            return {...state, tweetList: newTweetList}

        default:
            return state
    }
    
}

const TweetContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(tweetReducer, {
        tweet: ``,
        tweetList: []
    })

    return (
        <TweetContext.Provider value={{...state, dispatch}}>
            {children}
        </TweetContext.Provider>
    )
}
 
export default TweetContextProvider;