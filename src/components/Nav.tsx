import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { FaGithubAlt } from "react-icons/fa";
import { useAtom } from 'jotai'
import { darkAtom } from '../../store.js'
import { motion } from 'framer-motion'

export const Nav = () => {
    const [dark, setDark] = useAtom(darkAtom)
    return(
        <motion.div 
        key={String(dark)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1,}}
        transition={{ duration: 1 }}
        className={` ${dark ? 'text-stone-200' : 'text-stone-900'} flex justify-between`}>
        <div className='px-5 font-bold italic text-md pt-5'>Hiragana 🌸</div>
        <div className='flex px-5 pt-5'>
        <div className="px-2 cursor-pointer" onClick={() => setDark(!dark)}>{dark ? <FiSun/> : <IoMoonOutline/>}</div>          <div><a href="https://github.com/mahls" className="cursor-pointer"><FaGithubAlt/></a></div>
        </div>
        </motion.div>
    )
}