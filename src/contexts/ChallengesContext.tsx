import { createContext, useState, ReactNode, useEffect } from 'react'; 
import Cookies from 'js-cookie'; 
import challenges from '../../challenges.json'; //importtando arrey de desafios

import { LevelUpModal } from '../components/LevelUpModal';
interface Challenge{
    type: 'body' | 'eye'; 
    description: string; 
    amount: number; 
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number; 
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void; 
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelModal: () => void;
}
interface ChallengesProviderProps{
    children: ReactNode;
    level: number; 
    currentExperience: number; 
    challengesCompleted: number; 
}

export const ChallengesContext = createContext({} as ChallengesContextData); 

export function ChallengesProvider({ 
    children, 
    ...rest
}: ChallengesProviderProps){

    const [level, setlevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState( rest.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null); 
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false); 

    //Calculando quanto falta pra upar de level
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience)); 
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])
    
    function levelUp(){
      setlevel(level + 1); 
      setIsLevelModalOpen(true); 
    } 

    function closeLevelModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallenge(){
        //pegando um desafio aleatório (Math.floor para arredondar p baixo)
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[ramdomChallengeIndex]; 

        setActiveChallenge(challenge)

        //Adicionando som a ação (é literalmente APENAS essa linha)
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    //ação do botão de falhar
    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completedChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount; 

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }

        setCurrentExperience(finalExperience); 
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1); 
    }

    return(
        <ChallengesContext.Provider 
        value={{ 
            level, 
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            levelUp, 
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completedChallenge, 
            closeLevelModal
        }}
        >
            {children}
        
        {isLevelUpModalOpen && <LevelUpModal />}
    
        </ChallengesContext.Provider>
    )
}