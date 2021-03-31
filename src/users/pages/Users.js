import React from 'react';

import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: 'user001',
            name: 'Rukshan Jayasekara',
            image: 'https://scontent.fcmb4-1.fna.fbcdn.net/v/t1.6435-9/80344383_249388319364186_3624819842248343552_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=6Z1rhZ9uhuYAX9ardBt&_nc_ht=scontent.fcmb4-1.fna&oh=633c2cfbb7aec39d49d2259944ba0297&oe=60899200',
            places: 3   
            }
];
    return <UsersList items={USERS}/>;
};

export default Users;