import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

//Criar uma vaeriável para não deixar o tempo passar
let countdownTimeout: NodeJS.Timeout;

export function Countdown(){

    //Adicionar o tempo inicial em segundos (25min * 60s)
    const [time, setTime] = useState(25 * 60)

    //Verificar se o cronometro esta ativo - começa como desligado
    const [isActive, setIsActive] = useState(false)

    //Arredondar o valor dos minutos para baixo 'Math.floor'
    const minutes = Math.floor(time / 60); 
    
    //Pegar o resto e transformar em segundos
    const seconds = time % 60;

    //Adicionar os valores em cada 'span' equivalente (quadradinhso cinzas)
    /* Para isso vai transformar os valores em string e dividir pelo número de caracteres, ou seja, 
    se eu tenho 25 ele será igual a '2' e '5'
    Porém, caso tenha um número q já seja um unico caractere, ele vai adcionar 0 antes. 
    exemplo: '5' será igual a '0' '5'

    -minuteLeft, minuteRight = O primeiro caractere do minuto e o segundo caractere do minuto
    - String(minutes) = transforma em string
    - adStart(2, '0') = Se só tiver um carcatere, add o '0'. 
    - split('') = Divide por caracteres
    */
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    //Ação de inicializar o cronometro
    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
    }

    //quando = active
    //quando o valor de active e o time mudar, execute essa função
    useEffect( () => {
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time-1)
            }, 1000)
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

           {isActive ? (
                <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={startCountdown}
            >
                Abandonar ciclo
            </button>
           ): (
           <button 
                type="button" 
                className={styles.countdownButton}
                onClick={resetCountdown}
            >
                Iniciar um ciclo
            </button>
           )}
        </div>
    )
}