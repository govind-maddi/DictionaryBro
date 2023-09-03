import React from 'react'

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import './styles/history.css'

function History() {

    const wordList = useSelector((state) => state.wordHistory);
    const navigate = useNavigate();

  return (
    <div id='main_history_cont' >
        <h3>Search History</h3>

        {wordList.map((item,index) => {
            return <p key={index} onClick={() => navigate(`/word/${item}`)}>
                        {item}
                    </p>
        })}
        {console.log(wordList)}
    </div>
  )
}

export default History