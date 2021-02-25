import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './PlaceItem.css';

const PlaceItem = props => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMap = () => setShowMap(true);
    const closeMap = () => setShowMap(false);

    const showDeleteWarning = () => setShowConfirmModal(true);
    const cancelDelete = () => setShowConfirmModal(false);
    const confirmDelete = () => {
        setShowConfirmModal(false);
        console.log('Deleting...');
    }

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMap}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMap}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal show={showConfirmModal} onCancel={cancelDelete} header="Are you sure?" footerClass="place-item__modal-actions" footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDelete}>Cancel</Button>
                    <Button danger onClick={confirmDelete}>Delete</Button>
                </React.Fragment>
            }>
                <p>Do you want to proceed and delete this place? This can't be undone!</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                    <Button inverse onClick={openMap}>View on Map</Button>
                    <Button to={`/places/${props.id}`}>Edit</Button>
                    <Button danger onClick={showDeleteWarning}>Delete</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;