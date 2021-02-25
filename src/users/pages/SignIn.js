import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hooks';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './SignIn.css';

const SignIn = () => {
    const [isSignInMode, setIsSignInMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const signInSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // Will send the inputs to backend later.
    };

    const switchModeHandler = () => {
        if(!isSignInMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsSignInMode(prevMode => !prevMode);
    };

    return (
        <Card className="authentication">
            <h2>Please Sign in</h2>
            <hr />
            <form onSubmit={signInSubmitHandler}>
                {!isSignInMode && (
                    <Input 
                        id="name"
                        element="input" 
                        type="text" 
                        lable="Full name" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter your name." 
                        onInput={inputHandler}
                    />
                )}
                <Input 
                    id="email"
                    element="input" 
                    type="email" 
                    lable="E-mail" 
                    validators={[VALIDATOR_EMAIL()]} 
                    errorText="Please enter a valid E-mail." 
                    onInput={inputHandler}
                />
                <Input 
                    id="password"
                    element="input" 
                    type="password" 
                    lable="Password" 
                    validators={[VALIDATOR_MINLENGTH(8)]} 
                    errorText="Password should be at least 8 characters long." 
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>{isSignInMode ? 'Sign in' : 'Sign up'}</Button>
            </form>
            <Button inverse onClick={switchModeHandler}>{isSignInMode ? 'Sign up' : 'Sign in'}</Button>
        </Card>
    );
};


export default SignIn;