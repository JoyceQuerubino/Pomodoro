import { createContext, useState, ReactNode } from 'react'; 
import challenges from '../../challenges.json'; //importtando arrey de desafios

interface Challenge{
    type: 'body' | 'eye'; 
    description: string; 
    amount: number; 
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number; 
    activeChallenge: Challenge;
    levelUp: () => void; 
    startNewChallenge: () => void;
}
interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData); 

export function ChallengesProvider({ children }: ChallengesProviderProps){

    const [level, setlevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null); 
    
    function levelUp(){
      setlevel(level + 1); 
    } 

    function startNewChallenge(){
        //pegando um desafio aleatório (Math.floor para arredondar p baixo)
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[ramdomChallengeIndex]; 

        setActiveChallenge(challenge)
    }

    return(
        <ChallengesContext.Provider 
        value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp, 
            startNewChallenge,
            activeChallenge,
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}