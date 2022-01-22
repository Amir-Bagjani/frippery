import { useContext } from "react"
import { TweetContext } from "../context/TweetContext"

export const useTweetContext = () => {
    const tweetContext = useContext(TweetContext)

    if(!tweetContext){
        throw Error(`useTweetContext must be used inside of TweetContextProvider`)
    }

    return tweetContext
}