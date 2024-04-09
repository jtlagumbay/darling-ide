import React from 'react';
import WelcomeScreenGif from '../images/Welcome Screen.gif';


export default function WelcomeScreen() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={WelcomeScreenGif} style={{ width: '100%', height: 'auto', maxWidth: '100%' }} alt="Welcome Screen" />
        </div>
    );
}