import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const { activeChallenge } = useContext(ChallengesContext); 

    return(
        <div className={styles.challengeBoxContainer}>
           { activeChallenge ? (
               <div className={styles.challengeActive}>
                   <header>Ganhe {activeChallenge.amount} xp</header>

                   <main>
                       <img src={`icons/${activeChallenge.type}.svg`} alt="concluído"/>
                       <strong>Novo desafio</strong>
                       <p>{activeChallenge.description}</p>
                   </main>

                    <footer>
                        <button 
                          type="button"
                          className={styles.challengeFaildButton}
                        >
                            Falhei
                        </button>
                        <button 
                          type="button"
                          className={styles.challengeSuccededButton}
                        >
                            Completei
                        </button>
                    </footer>

               </div>
           ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios
                    </p>
                </div>
           ) }
        </div>
    )
}