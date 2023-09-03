import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { useSelector,useDispatch } from 'react-redux';

import wordAction from '../redux/wordAction';

import './styles/home.css';
import loader from '../assets/loader.gif'

function Home() {

    const [ value,setValue ] = useState('');
    const [ isLoading,setIsLoading ] = useState(false);
    const [ word,setWord ] = useState([]);

    const dispatch =useDispatch();

    const getWordDef = async () => {
        setIsLoading(true);
        try{
            if(value === '')
                throw new Error('Enter Word To Search');
            const { data } = await axios.get(` https://api.dictionaryapi.dev/api/v2/entries/en/${value}`,{
                headers:{
                    Accept:'application/json',
                },
            });
            setWord(data);
            /* console.log(word); */
        }
        catch(err){
            alert(err.message);
        }
        finally{
            setIsLoading(false);
            dispatch(wordAction(value));
        }
    }

    const getPhonetics = (word) => {
       
        return word.map((item,index) => {
                return <div key={index}>
                        { item.audio !== '' && <audio controls>
                            <source src={item.audio} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>}
                        <p>{item.text}</p>
                        </div>
            })
        }

    const getDefinitions = (definitions) => {

        return definitions.map((item,index) => {
            return <div key={index}>
                    <p>{item.definition}</p>
                    </div>
        })
    }

    const getMeanings = (meaning) => {
        return meaning.map((item,index) => {
            return <div key={index}>
                        <h5>{item.partOfSpeech}</h5>
                        {getDefinitions(item.definitions)}
                    </div>
        })
    }

    useEffect(() => {
        console.log(word);
    })

  return (
    <div id='main_home_cont'>
        <section id='word_input'>
            <input type="text" placeholder='Enter Word' onChange={(e) => setValue(e.target.value)} required/>
            <button onClick={getWordDef}>Search</button>
        </section>

        { isLoading && <figure id='loader'>
            <img src={loader} alt='loader' />
            <h3>Seeking...</h3>
        </figure> }

        { !isLoading && <section id='word_dict'>
            {word.length > 0 && word.map((item,index) => {
                return <section key={index} className='word_dict_item'>
                        <h3>{item.word}</h3>

                        <p>{item.phonetic}</p>

                        {getPhonetics(item.phonetics)}

                        {getMeanings(item.meanings)}
                        
                        </section>
            })}
        </section>}

    </div>
  )
}

export default Home