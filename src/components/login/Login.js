import React from 'react';
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import {useStateValue} from "../../StateProvider";
import { actionTypes } from '../../reducer';


function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () =>
    {
    auth.signInWithPopup(provider).then((result) => {
    dispatch({
        type: actionTypes.SET_USER,
        user:result.user,
    });   
})
    .catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <img 
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgpmrB-1Ds8tWYM_muDZRPggSi0hE5D-vZA&usqp=CAU" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in With Google
                </Button>
            </div>
        </div>
    )
}

export default Login;
