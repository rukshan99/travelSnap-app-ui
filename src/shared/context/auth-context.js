import { createContext } from 'react';

export const AuthContext = createContext({
    isSignedIn: false,
    userId: null,
    signIn: () => {},
    signOut: () => {}
});