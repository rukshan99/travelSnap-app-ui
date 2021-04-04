import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
  const [ loadedPlaces, setLoadedPlaces ] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userID = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userID}`);
        setLoadedPlaces(responseData.places);
      } catch(err) {}
    };
    fetchPlaces();
  }, [sendRequest, userID]);

  const placeDeleteHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id!==deletedPlaceId));
  };
  return (
  <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/> 
    {isLoading && (
    <div class="center">
      <LoadingSpinner asOverlay/>
      </div>)}
    {!isLoading && loadedPlaces && <PlaceList items={filteredPlaces} onDeletePlace={placeDeleteHandler}/>}
  </React.Fragment>);
};

export default UserPlaces;