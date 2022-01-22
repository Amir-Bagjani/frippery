import { useContext } from "react"
import { DependencyContext } from "../context/DependencyContext"

export const useDependency = () => {
    const dependencie = useContext(DependencyContext)

    if(!dependencie){
        throw Error(`useDependency must be use inside a DependencyContextProvider`)
    }

    return dependencie
}