import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './placeForm.css';

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const history = useHistory();

    const placeSubmitHandler = async event => {
        event.preventDefault();
        try{
            await sendRequest(
                'http://localhost:5000/api/places', 
                'POST', 
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId
                }),
                { 'Content-Type': 'application/json' }
            );
            history.push('/');    
        } catch(err) {}
    };

    return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && <LoadingSpinner asOverlay/>}
        <Input 
            id="title"
            element="input" 
            type="text" 
            lable="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a valid title." 
            onInput={inputHandler}
        />
        <Input 
            id="description"
            element="textarea" 
            lable="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="Please enter at least 5 characters." 
            onInput={inputHandler}
        />
        <Input 
            id="address"
            element="input" 
            lable="Address" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a valid address." 
            onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>Add place</Button>
    </form>
    </React.Fragment>
    );
};

export default NewPlace;