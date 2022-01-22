import { createContext, useState } from "react";

export const DependencyContext = createContext()

const DependencyContextProvider = ({children}) => {
    const [dependency, setDependency] = useState(false)
    const changeDependency = () => {
        setDependency(!dependency)
    }
    return (
        <DependencyContext.Provider value={{dependency, changeDependency}}>
            {children}
        </DependencyContext.Provider>
    );
}
 
export default DependencyContextProvider;