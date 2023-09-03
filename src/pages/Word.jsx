import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './styles/word.css'
import loader from '../assets/loader.gif'


function Word() {

    const { value } = useParams();
    const [ isLoading,setIsLoading ] = useState(false);
    const [ word,setWord ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        
        const getWordDef = async () => {
            try{
                const { data } = await axios.get(` https://api.dictionaryapi.dev/api/v2/entries/en/${value}`,{
                    headers:{
                        Accept:'application/json',
                    },
                });
                console.log(data);
                setWord(data);
            }
            catch(err){
                console.log(err.message);
            }   
            finally{
                setIsLoading(false);
            }
        }
        getWordDef();
    },[])

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

  return (
    <>
    { value === '' && navigate('/home') }

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
        </>
  )
}

export default Word