import { createContext, ReactNode, useContext, useEffect, useState } from "react"; 
import { ChallengesContext } from "./ChallengesContext";

//Criar uma vaeriável para não deixar o tempo passar
let countdownTimeout: NodeJS.Timeout;


interface CountdownContextData{
    minutes: number; 
    seconds: number; 
    hasFinished: boolean; 
    isActive: boolean; 
    startCountdown: () => void; 
    resetCountdown: () => void; 
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext)

    //Adicionar o tempo inicial em segundos (25min * 60s)
    const [time, setTime] = useState(0.1 * 60)

    //Verificar se o cronometro esta ativo - começa como desligado
    const [isActive, setIsActive] = useState(false)

    //O cronometro chegou a 0
    const [hasFinished, setHasFinished] = useState(false)

    //Arredondar o valor dos minutos para baixo 'Math.floor'
    const minutes = Math.floor(time / 60); 

     //Ação de inicializar o cronometro
     function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false); 
        setTime(0.1 * 60)
    }

    //quando = active
    //quando o valor de active e o time mudar, execute essa função
    useEffect( () => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time-1)
            }, 1000)
        }
        //Quando o time chegar a 0 dar o aviso
        else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    
    //Pegar o resto e transformar em segundos
    const seconds = time % 60;

    return(
        <CountdownContext.Provider value={{
            minutes, 
            seconds, 
            hasFinished, 
            isActive, 
            startCountdown, 
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}