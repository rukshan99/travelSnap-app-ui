import React, { useEffect, useState, useContext } from'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card'
import './placeForm.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedPlace, setLoadedPlace ] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);

                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    }
                }, true);
            } catch(err) {}
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    const updateSubmitHandler = async event => {
        event.preventDefault();
        await sendRequest(
            `http://localhost:5000/api/places/${placeId}`, 
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }),
            {
                'Content-Type': 'application/json'
            }
        );
        history.push('/' + auth.userId + '/places');
    };

    if(isLoading) {
        return(
            <div className="center">
                <LoadingSpinner />
            </div>
            );
    }

    if(!loadedPlace && !error) {
        return(
        <div className="center">
            <Card>
                <h2>Could not find place!</h2>
            </Card>
        </div>
        );
    }

    return(
        <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>   
        {!isLoading && loadedPlace && <form className="place-form" onSubmit={updateSubmitHandler}>
            <Input 
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={loadedPlace.title}
                initialValid={true}
            />
            <Input 
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter at least 5 characters."
                onInput={inputHandler}
                initialValue={loadedPlace.description}
                initialValid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>Update place</Button>
        </form>}
        </React.Fragment>
    );
};

export default UpdatePlace;