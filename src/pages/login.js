import '../App.css';
import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/images/Logo.png'
import { useNavigate } from 'react-router-dom';

const LoadingIcon = () => (
  <svg id="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
      <defs>
      <linearGradient id="spinner-gradient-a" x1="49.892%" x2="55.03%" y1="58.241%" y2="89.889%">
        <stop offset="0%" stopColor="#00ff00" />
        <stop offset="22.44%" stopOpacity=".59" stopColor="#00ff00" />
        <stop offset="100%" stopOpacity="0" stopColor="#00ff00" />
      </linearGradient>
      </defs>
      <g fill="none" transform="translate(-8 -8)">
        <path d="M32,56 C18.745166,56 8,45.254834 8,32 C8,18.745166 18.745166,8 32,8 C45.254834,8 56,18.745166 56,32 C56,45.254834 45.254834,56 32,56 Z M32,52 C43.045695,52 52,43.045695 52,32 C52,20.954305 43.045695,12 32,12 C20.954305,12 12,20.954305 12,32 C12,43.045695 20.954305,52 32,52 Z"/>
        <path fill="url(#spinner-gradient-a)" d="M56,32 C56,33.1045695 55.1045695,34 54,34 C52.8954305,34 52,33.1045695 52,32 C52,20.954305 43.045695,12 32,12 C20.954305,12 12,20.954305 12,32 C12,43.045695 20.954305,52 32,52 C33.1045695,52 34,52.8954305 34,54 C34,55.1045695 33.1045695,56 32,56 C18.745166,56 8,45.254834 8,32 C8,18.745166 18.745166,8 32,8 C45.254834,8 56,18.745166 56,32 Z" transform="rotate(45 32 32)"/>
      </g>
    </svg>
);

function Login() {
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();
    navigate('/register');
  }

  const notify = async (event) =>{
    event.preventDefault();
    if (user === '' || senha === ''){
        toast.warn('Preencha todos os campos!!!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    } else {
        try {
            setLoading(true);
            const {data} = await axios.post('http://localhost:8000/api/verifyUser', { user, senha });
            if (data.auth === 'Success'){
                navigate('/home');
            } else {
              toast.error('Senha ou usuário incorreto', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
          } catch(error) {
            console.log(error);
          } finally {
            setLoading(false)
          }
    }
  };
  return (
    <div className='square'>
      
      <form>
        <img id='logo' src={Logo} alt='logoPalmont' />
        <input name='user' value={user} onChange={(e) => setUser(e.target.value)} type='text' placeholder='USER:' required={true}></input>
        <input name='senha' value={senha} onChange={(e) => setSenha(e.target.value)} type='password' placeholder='SENHA:' required={true}></input>
        <div className='botoes'>
          <button id='login' onClick={notify}>{loading ? <LoadingIcon /> : 'LOGIN'}</button>
          <button id='register' onClick={register}>REGISTER</button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Login;