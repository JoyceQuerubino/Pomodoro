import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'; 

export function Profile(){

    const { level } = useContext(ChallengesContext); 

    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66806696?s=400&u=8d322799564bf4b0e72262ca04d5f01fca74bb16&v=4" alt="Joyce Querubino"/>
            <div>
                <strong>Joyce Querubino</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}