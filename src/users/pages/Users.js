import React from 'react';

import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: 'user001',
            name: 'Rukshan Jayasekara',
            image: 'https://scontent.fcmb2-1.fna.fbcdn.net/v/t1.0-9/82815802_258830861753265_407311067442577408_o.jpg?_nc_cat=107&ccb=3&_nc_sid=a4a2d7&_nc_ohc=-HTvKc0akLoAX_SS3OR&_nc_ht=scontent.fcmb2-1.fna&oh=7c1724ec45683b770b88c29134a61c11&oe=60561C07',
            places: 3   
            }
];
    return <UsersList items={USERS}/>;
};

export default Users;