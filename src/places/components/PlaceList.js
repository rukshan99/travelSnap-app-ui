import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = props => {
    if(props.items.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2>No places found!</h2>
                <button>Share a place</button>
            </Card>
        </div>
    }

    return (
        <ul className="place-list">
            {props.items.map(place => (
                <PlaceItem 
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    creatorId={place.creator}
                    address={place.address}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
};

export default PlaceList;