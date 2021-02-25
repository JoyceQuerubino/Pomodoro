import { useContext } from 'react'; 
import { CountdownContext } from '../contexts/CountdownContext'; 
import styles from '../styles/components/Countdown.module.css'; 


export function Countdown(){

    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown 
    } = useContext(CountdownContext)

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

            
            {hasFinished ? (
                    <button 
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <img src="icons/check_circle.svg" alt="Check"/>
                </button>
            ) : (
                <>
                 {isActive ? (
                    <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                    >
                    Abandonar ciclo
                    </button>
                ): (
                    <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >
                        Iniciar um ciclo
                    </button>
                    )}
                </>
            )}
        </div>
    )
}