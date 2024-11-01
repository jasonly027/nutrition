// MyComponent.js
import React, {useState} from 'react'
import firebase from 'firebase/compat/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase'; // Adjust the import path to your firebase auth file

const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleLogin = async() => {
        try {
            // Sign in the user with email and password
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
            // Redirect or perform further actions after successful login
        } catch (err) {
            console.error('Error logging in:', err);
        }
      }

  return (
    <div className='font-sans space-y-2'>
            <div className='text-xl font-sans text-blue-500'>Login</div>
            <input
                value={email}
                placeholder="Username/Email"
                onChange={(ev) => setEmail(ev.target.value)}
                className= " px-2 text-lg border-2 border-black flex"
            />
            <input
                value={password}
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                className= "px-2 text-lg border-2 border-black flex"
            />

            <input className="bg-blue-500 rounded-lg p-2 cursor-pointer" type="button" onClick={handleLogin} value={'Log in'}/>

    </div>

  );
};

export default LoginComponent;
