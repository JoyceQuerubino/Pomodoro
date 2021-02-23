import styles from '../styles/components/CompletedChallenges.module.css'

export function CompleteChallenges(){
    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafios completos</span>
            <s>05</s>
        </div>
    )
}