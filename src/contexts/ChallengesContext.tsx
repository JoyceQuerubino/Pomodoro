import { createContext, useState } from 'react'; 

export const ChallengesContext = createContext({}); 

export function ChallengesProvider({ children }){

    const [level, setlevel] = useState(1)

    function levelUp(){
      setlevel(level + 1)
    }  

    return(
        <ChallengesContext.Provider value={{ level, levelUp }}>
            {children}
        </ChallengesContext.Provider>
    )
}