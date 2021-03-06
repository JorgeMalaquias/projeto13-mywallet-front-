import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate, } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext.js';
import UserContext from '../contexts/UserContext.js';
import dotenv from 'dotenv';
dotenv.config();


function sendData(e, price,name,setDisable, token, navigate){
    e.preventDefault();
    setDisable(true);
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const body = {
        price,
        name,
        type:'output'
    }
    axios.post(`https://backendsdriven.herokuapp.com/records`,body,config).then((r)=>{
        navigate('/general');
    }).catch((r)=>{
        setDisable(false);
        alert('Alguns dos dados inseridos é inválido!');
    })
}
export default function Output() {
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [disable,setDisable]= useState(false);
    const {token} = useContext(TokenContext);
    const navigate = useNavigate();
    return (
        <OutputTag>
            <div>Nova saída</div>
            <FormTag onSubmit={(e)=>sendData(e,price,name,setDisable, token, navigate)}>
                <input type="text" value={price} placeholder='Valor' required onChange={(e) => setPrice(e.target.value)} />
                <input type="text" value={name} placeholder='Descrição' required onChange={(e) => setName(e.target.value)} />
                <button disabled={disable} type='submit'>Salvar saída</button>
            </FormTag>
        </OutputTag>
    );
}

const OutputTag = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 326px;
    padding-top: 10px;
    height: 100%;
    > *:nth-child(1){
        font-size: 26px;
        font-weight: 700;
        line-height: 31px;
        letter-spacing: 0em;
        text-align: left;
        color:white;
        margin-bottom: 20px;
    }
    input{
        height: 58px;
        width: 326px;
        left: 25px;
        top: 96px;
        border-radius: 5px;
        color: black;
        padding: 10px;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
    }
    button{
        height: 46px;
        width: 326px;
        left: 25px;
        top: 238px;
        border-radius: 5px;
        color:white;
        background-color: #A328D6;
        font-size: 20px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0em;
        border: none;
    }
    
`
const FormTag = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 188px;
    width: 326px;
    font-family: 'Raleway', sans-serif;
`