import { CompleteChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head'

import styles from '../styles/Pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home(props) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Pomodoro.it</title>
      </Head>
      
      <ExperienceBar />

      <CountdownProvider>
        <section>
         <div>
            <Profile />
            <CompleteChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
      
    </div>
  )
}

//Para manipular os dados que serão passados da camada front-end para a camada do Next.js
export const getServerSideProps = async () => {
  //chamando a api
  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,   

  }
  
  return {
    props: user
  }
}