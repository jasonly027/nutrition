// MyComponent.js
import React, {useEffect, useState} from 'react'
import firebase from 'firebase/compat/app';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase'; // Adjust the import path to your firebase auth file


const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleLogin = async() => {
        try{
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            
            const user = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
            if (user){
                console.log()
                navigate('/Day');
                console.log('User logged in successfully!');
                console.log(user)
                console.log(auth.currentUser)
            }
        }
            catch(error){
                console.error("Login Error", error);
            }
      } 

const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider) // Call signInWithPopup with auth and provider
    .then((result) => {
        console.log("User signed in with Google:", result.user);
        navigate("/Day");
    })
    .catch((error) => {
        console.error("Error during Google sign-in:", error);
    });
}
const handleSignOut = () => {
    auth.signOut()
    console.log(auth)
}

  return (
    <div className='font-sans space-y-2 flex flex-col'>
            <div className='text-xl font-sans text-blue-500'>Login</div>
            <div className='hidden text-red-600'>The username or password is incorrect</div>
            <input
                value={email}
                placeholder="Username/Email"
                onChange={(ev) => setEmail(ev.target.value)}
                className= " px-2 text-lg border-2 border-black flex w-full"
            />
            <input
                value={password}
                placeholder="Password"
                onChange={(ev) => setPassword(ev.target.value)}
                className= "px-2 text-lg border-2 border-black flex w-full"
            />

            <input className="justify-center font-bold text-white bg-blue-500 rounded-lg p-2 cursor-pointer" type="button" onClick={handleLogin} value={'Log in'}/>
            <input className="flex justify-center font-bold text-white bg-blue-500 rounded-lg p-2 cursor-pointer" type="button" onClick={handleGoogleLogin} value={'Log in with Google'}/>
            <input className="flex justify-center font-bold text-white bg-blue-500 rounded-lg p-2 cursor-pointer" type="button" onClick={handleSignOut} value={'Sign out'}/>
    </div>

  );
};

export default LoginComponent;
