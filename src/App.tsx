import React, { useState, useEffect } from 'react';
import { hiragana } from '../hiragana';
import {motion} from 'framer-motion'

const App: React.FC = () => {

  const [values, setValues] = useState({ hiragana: '', roumaji: '' });
  const [randomRoumajis, setRandomRoumajis] = useState<string[]>([]);
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [timer, setTimer] = useState(10);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [endNumber, setEndNumber] = useState(20);
  const [currentRound, setCurrentRound] = useState(0);
  
  //const [gameStarted, setGameStarted] = useState(false);
  //const [gamePaused, setGamePaused] = useState(false);

  //const [dark, setDark] = useState(false);

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

  useEffect(() => {
    if (currentRound === endNumber) {
      if (score === endNumber) {
        alert('Congratulations');
        setScore(0);
        setCurrentRound(0);
        setEndNumber(0);
      } else {
        alert('Game Over');
      }
      setScore(0);
      setCurrentRound(0);
      setEndNumber(0);
    }
  }, [currentRound, score]);

  let checkIfCorrect = (roumaji: string) => {
    if (roumaji === values.roumaji) {
      alert('correct');
      setCorrect(true);
      setScore((prevScore) => prevScore + 1);
      setTimer(10);
      const newIndex = Math.floor(Math.random() * 3);
      setRandomIndex(newIndex);
      setCurrentRound(currentRound + 1)
  
      const newIndexHiragana = Math.floor(Math.random() * hiragana.length);
      const hiraganaSymbol = hiragana[newIndexHiragana].kana;
      setValues({ hiragana: hiraganaSymbol, roumaji: hiragana[newIndexHiragana].roumaji });
    } else {
      alert('wrong');
      setCorrect(false);
      setTimer(10);
  
      const newIndex = Math.floor(Math.random() * 3);
      setRandomIndex(newIndex);
  
      const newIndexHiragana = Math.floor(Math.random() * hiragana.length);
      const hiraganaSymbol = hiragana[newIndexHiragana].kana;
      setValues({ hiragana: hiraganaSymbol, roumaji: hiragana[newIndexHiragana].roumaji });
      setRandomIndex(newIndex)
      setCurrentRound(currentRound + 1)
    }
  }

  return (
    <>

    {/*Timer*/}
    <div className='flex justify-between items-center'>
      <motion.div
          key={score}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y:5 }}
          transition={{ duration: 1 }}
      className='px-5 py-5 font-bold text-xl'>
        {score} / {endNumber}
      </motion.div>
      <div>
        <motion.div
                key={currentRound}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y:5 }}
                transition={{ duration: 1 }}
        className='text-sm font-bold px-5 py-5'>
          round: {currentRound} / {endNumber}
        </motion.div>
      </div>
      <motion.div 
        key={timer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y:5 }}
        transition={{ duration: 1 }}
        className='flex justify-center items-center text-xl px-5 py-5  font-bold '>
        <p>{timer}</p>
      </motion.div>
    </div>


      {/* Random hiragana value */}
      <div className='mt-20 flex justify-center items-center'>
        <motion.div
            key={randomIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y:5 }}
            transition={{ duration: 1 }}
        className='flex justify-center items-center w-96 h-48 font-bold text-5xl'>
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

    </>
  );
};

let Buttons1 = ({ values, randomRoumajis, check }: { values: any, randomRoumajis: any, check: any }) => {
  let buttonStyle = `rounded border w-full text-xl w-full py-2 hover:bg-stone-100 mb-2 text-xs`;
  return (
    <motion.div 
    key={values}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y:5 }}
    transition={{ duration: 1 }}
    className='w-full mb-2'>
      <button onClick={() => { check(values.roumaji) }} className={buttonStyle}>{values.roumaji}</button>
      <button onClick={() => { check(randomRoumajis[0]) }} className={buttonStyle}>{randomRoumajis[0]}</button>
      <button onClick={() => { check(randomRoumajis[1]) }} className={buttonStyle}>{randomRoumajis[1]}</button>
      <button onClick={() => { check(randomRoumajis[2]) }} className={buttonStyle}>{randomRoumajis[2]}</button>
    </motion.div>
  );
};
let Buttons2 =  ({values, randomRoumajis, check}:{values: any, randomRoumajis: any, check:any}) => {
  let buttonStyle = `rounded border w-full text-xl w-full py-2 hover:bg-stone-100 mb-2 text-xs`;
  return(
    <motion.div
    key={values}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y:5 }}
    transition={{ duration: 1 }}
    className='w-full'>
      <button onClick={()=>{check(randomRoumajis[0])}} className={buttonStyle}>{randomRoumajis[0]}</button>
      <button onClick={()=>{check(values.roumaji)}} className={buttonStyle}>{values.roumaji}</button>
      <button onClick={()=>{check(randomRoumajis[2])}} className={buttonStyle}>{randomRoumajis[2]}</button>
      <button onClick={()=>{check(randomRoumajis[1])}} className={buttonStyle}>{randomRoumajis[1]}</button>
    </motion.div>
  )
}
let Buttons3 =  ({values, randomRoumajis, check}:{values: any, randomRoumajis: any, check:any}) => {
  let buttonStyle = `rounded border w-full text-xl w-full py-2 hover:bg-stone-100 mb-2 text-xs`;
  return(
    <motion.div
    key={values}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y:5 }}
    transition={{ duration: 1 }}
    className='w-full'>
      <button onClick={()=>{check(randomRoumajis[2])}} className={buttonStyle}>{randomRoumajis[2]}</button>
      <button onClick={()=>{check(randomRoumajis[1])}} className={buttonStyle}>{randomRoumajis[1]}</button>
      <button onClick={()=>{check(values.roumaji)}} className={buttonStyle}>{values.roumaji}</button>
      <button onClick={()=>{check(randomRoumajis[0])}} className={buttonStyle}>{randomRoumajis[0]}</button>
    </motion.div>
  )
}

export default App;
