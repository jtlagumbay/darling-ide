import React from 'react';
// import the GIF file for the welcome screen
import WelcomeScreenGif from '../images/Welcome Screen.gif';
/**
 * 
 * @description React Functional Component for the Welcome Screen
 * @returns JSX element
 */
export default function WelcomeScreen() {
    return (
        // full screen display of GIF file
        <div style={{ 
            display: 'flex', // use flexbox
            justifyContent: 'center',  // center content horizontally
            alignItems: 'center', // center content vertically
            height: '100vh', //full height of the viewport
            backgroundColor: '#DDA15E', // background color
            }}>
         {/* display the welcome screen GIF file */}
        <img src={WelcomeScreenGif} // source of the GIF file
            style={{ 
                width: '100%', // full width of the container
                height: 'auto', // adjust height automatically
                maxWidth: '100%', // not exceed full width of the container 
            }} 
            // text description of the image for screen readers
            alt="darling IDE, powered by HONEY OS. atillo cataques lagumbay marfa puyot reponte. loading..." />
        </div>
    );
}