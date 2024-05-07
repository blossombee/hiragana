import React, { useState, useEffect } from 'react';
import { hiragana } from '../hiragana';
import {motion} from 'framer-motion'
import { Nav } from './components/Nav';
import { useAtom } from 'jotai'
import { darkAtom } from '../store.js'
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';


const App: React.FC = () => {

  const [values, setValues] = useState({ hiragana: '', roumaji: '' });
  const [randomRoumajis, setRandomRoumajis] = useState<string[]>([]);
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [timer, setTimer] = useState(10);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [win, setWin] = useState(false);

  const endNumber = 20;

  const [dark] = useAtom(darkAtom)
  const [playLottie, setPlayLottie] = useState(false);
  
  //const [gameStarted, setGameStarted] = useState(false);
  //const [gamePaused, setGamePaused] = useState(false);


  useEffect(() => {
    setPlayLottie(true)
    const timeout = setTimeout(() => {
      setPlayLottie(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [values.hiragana]);
/*
  useEffect(() => {
    if (!gamePaused) {
      // Game logic here
    }
  }, [gamePaused]);
  
  useEffect(() => {
    if (gameStarted) {
      // Game logic here
    }
  }, [gameStarted]);
*/


  useEffect(() => {
    if (timer === 0) {
      const index = Math.floor(Math.random() * hiragana.length);
      const hiraganaSymbol = hiragana[index].kana;
      const hiraganaRoumaji = hiragana[index].roumaji;
      setValues({ hiragana: hiraganaSymbol, roumaji: hiraganaRoumaji });
      setCurrentRound(currentRound + 1)
  
      const newRandomRoumajis = [];
      for (let i = 0; i < 3; i++) {
        const newIndex = Math.floor(Math.random() * hiragana.length);
        newRandomRoumajis.push(hiragana[newIndex].roumaji);
      }
      setRandomRoumajis(newRandomRoumajis);
  
      const newIndex = Math.floor(Math.random() * 3);
      setRandomIndex(newIndex);
    }
  }, [timer]);


  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          return 10;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  
    return () => clearInterval(countdown);
  }, [timer, score]); // Added timer as a dependency to retrigger the effect when timer changes
  

  useEffect(() => {
    // Set values for the hiragana and roumaji to be found 
    const index = Math.floor(Math.random() * hiragana.length);
    const hiraganaSymbol = hiragana[index].kana;
    const hiraganaRoumaji = hiragana[index].roumaji;
    setValues({ hiragana: hiraganaSymbol, roumaji: hiraganaRoumaji });

    // Generate three other roumajis 
    const newRandomRoumajis = [];
    for (let i = 0; i < 3; i++) {
      const newIndex = Math.floor(Math.random() * hiragana.length);
      newRandomRoumajis.push(hiragana[newIndex].roumaji);
    }
    setRandomRoumajis(newRandomRoumajis);

    // Set random index 
    const newIndex = Math.floor(Math.random() * 3);
    setRandomIndex(newIndex);
    console.log(randomIndex)
  }, [correct]);

  // CHECK WINNER
  useEffect(() => {
    if (currentRound === endNumber) {
      alert('Game Over');
      setScore(0); // Reset the score
      setCurrentRound(0);
    } else if (score === endNumber && win === true) {
      alert('Congratulations');
      setScore(0); // Reset the score
      setCurrentRound(0);
      setWin(false); // Reset win condition
    } else if (win === true) {
      setCurrentRound(0); // Reset current round if win condition is met
      setWin(false); // Reset win condition
    }
  }, [currentRound, score, endNumber, win]);

  //CHECK ANSWER 
  let checkIfCorrect = (roumaji: string) => {
    if (roumaji === values.roumaji) {
      // If the answer is correct
      setCorrect(true);
      setScore((prevScore) => prevScore + 1);
      setTimer(10);
      const newIndex = Math.floor(Math.random() * 3);
      setRandomIndex(newIndex);
      
      // Increment current round and check for win condition
      setCurrentRound((prevRound) => {
        const updatedRound = prevRound + 1;
        if (updatedRound === endNumber) {
          setWin(true);
          return 0; // Reset current round
        }
        return updatedRound;
      });
  
      // Set new random hiragana symbol
      const newIndexHiragana = Math.floor(Math.random() * hiragana.length);
      const hiraganaSymbol = hiragana[newIndexHiragana].kana;
      setValues({ hiragana: hiraganaSymbol, roumaji: hiragana[newIndexHiragana].roumaji });
    } else {
      // If the answer is wrong
      setCorrect(false);
      setTimer(10);
  
      const newIndex = Math.floor(Math.random() * 3);
      setRandomIndex(newIndex);
  
      // Increment current round
      setCurrentRound((prevRound) => prevRound + 1);
  
      // Set new random hiragana symbol
      const newIndexHiragana = Math.floor(Math.random() * hiragana.length);
      const hiraganaSymbol = hiragana[newIndexHiragana].kana;
      setValues({ hiragana: hiraganaSymbol, roumaji: hiragana[newIndexHiragana].roumaji });
    }
  }

  // MAIN APP JSX

  return (
    <>

{playLottie && (
        <Player
          src='https://lottie.host/84da2e98-8638-4533-8f15-843ca13ce4eb/IxNRdvywa9.json'
          className="lottieburst"
          loop
          autoplay
        />
      )}

    <motion.div
                    key={String(dark)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.5 }}
    className={`${dark ? 'bg-[#1f1f1f]' : 'bg-stone-200'} ${dark ? 'text-stone-200' : 'text-stone-900'} h-screen scroll-auto`}>


    {/*Nav*/}
    <Nav/>



    {/*Timer, Score, Round*/}
    <div className='flex justify-between items-center'>
      <div>
      <motion.div
          key={score}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y:5 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
      className='px-5 font-bold text-sm italic'>
        score: {score} / {endNumber}
      </motion.div>
      <div>
        <motion.div
                key={currentRound}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y:5 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
        className='text-sm font-bold px-5 italic'>
          round: {currentRound} / {endNumber}
        </motion.div>
      </div>
      </div>
      <motion.div 
        key={timer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y:5 }}
        transition={{ duration: 1 }}
        className='flex justify-center items-center text-sm px-5 py-5  font-bold italic '>
        <p className='text-lg'>{timer}</p>
      </motion.div>
    </div>


      {/* Random hiragana value */}
      <div className='mt-20 flex justify-center items-center'>

        <motion.div
            key={randomIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y:50 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        className='flex justify-center items-center w-96 h-48 font-bold text-5xl mb-10 italic'>
          <p>{values.hiragana}</p>
        </motion.div>
      </div>

      {/* Three random roumajis buttons and one correct roumaji button to be found here, must change on index */}
      <div className='flex justify-center items-center'>
        <div className='flex content-center mt-2 font-bold w-96'>
          {randomIndex === 0 && <Buttons1 check={checkIfCorrect} values={values} randomRoumajis={randomRoumajis}/>}
          {randomIndex === 1 && <Buttons2 check={checkIfCorrect} values={values} randomRoumajis={randomRoumajis}/>}
          {randomIndex === 2 && <Buttons3 check={checkIfCorrect} values={values} randomRoumajis={randomRoumajis}/>}
        </div>
      </div>

    </motion.div>
    </>
  );
};

// GITHUB AND NIGHT MODE


// BUTTONS
let Buttons1 = ({ values, randomRoumajis, check }: { values: any, randomRoumajis: any, check: any }) => {
  let buttonStyle = `rounded border border-stone-500 w-full text-xl w-full py-2 mb-2 text-xs px-5 italic`;
  return (
    <motion.div 
    key={randomRoumajis[0]}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y:5 }}
    transition={{ duration: 1 }}

    className='w-full mb-2 px-5 z-50'>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      onClick={() => { check(values.roumaji) }} className={buttonStyle}>{values.roumaji}</motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      onClick={() => { check(randomRoumajis[0]) }} className={buttonStyle}>{randomRoumajis[0]}</motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
       onClick={() => { check(randomRoumajis[1]) }} className={buttonStyle}>{randomRoumajis[1]}</motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      onClick={() => { check(randomRoumajis[2]) }} className={buttonStyle}>{randomRoumajis[2]}</motion.button>
    </motion.div>
  );
};
let Buttons2 =  ({values, randomRoumajis, check}:{values: any, randomRoumajis: any, check:any}) => {
  let buttonStyle = `rounded border border-stone-500 w-full text-xl w-full py-2 mb-2 px-5 text-xs italic`;
  return(
    <motion.div
    key={values.roumaji}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y:5 }}
    transition={{ duration: 1 }}

    className='w-full px-5 z-50'>
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(randomRoumajis[0]) }}
  className={buttonStyle}
>
  {randomRoumajis[0]}
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(values.roumaji) }}
  className={buttonStyle}
>
  {values.roumaji}
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(randomRoumajis[2]) }}
  className={buttonStyle}
>
  {randomRoumajis[2]}
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(randomRoumajis[1]) }}
  className={buttonStyle}
>
  {randomRoumajis[1]}
</motion.button>
    </motion.div>
  )
}
let Buttons3 =  ({values, randomRoumajis, check}:{values: any, randomRoumajis: any, check:any}) => {
  let buttonStyle = `rounded border border-stone-500 w-full text-xl w-full py-2 mb-2 px-5 text-xs italic`;
  return(
    <motion.div
    key={randomRoumajis[2]}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y:5 }}
    transition={{ duration: 1 }}

    className='w-full px-5 z-50'>
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(randomRoumajis[2]) }}
  className={buttonStyle}
>
  {randomRoumajis[2]}
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(randomRoumajis[1]) }}
  className={buttonStyle}
>
  {randomRoumajis[1]}
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(values.roumaji) }}
  className={buttonStyle}
>
  {values.roumaji}
</motion.button>

<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => { check(randomRoumajis[0]) }}
  className={buttonStyle}
>
  {randomRoumajis[0]}
</motion.button>
    </motion.div>
  )
}

export default App;