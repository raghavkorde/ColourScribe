import './ColourDiv.css'
import Color from 'color';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Popup from './Popup';
import { useState } from 'react';

const brightenColour = (color) => {
    const colorObj = Color(color);
    if(colorObj.isLight()){
        const newColor = colorObj.negate().hex()
        return newColor;
    }else{
        const newColor = colorObj.negate().hex()
        return newColor;
    }
    
}


function ColourDiv({width, color, name}){
    const [popup, setPopup] = useState(false)
    const elementStyle = {
        width: `${width}%`,
        height: '100vh',
        backgroundColor: color,
    };
    const handleClick = (text) => {
        navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard');
          setPopup(true)
          setTimeout(() => {
            setPopup(false);
          }, 5000);
        })
        .catch((error) => {
          console.error('Failed to copy text:', error);
          // Optionally, you can show an error message to the user
        })
        };
    const whitenColor = brightenColour(color)
    return(
        <>
            <div className='element' style={elementStyle}>
                <h3 style={{color: whitenColor}}>{name}</h3>
                <div className='icons'>
                    <button onClick={() => (handleClick(color))}><ContentCopyIcon /></button>   
                </div>
                <div className='color' style={{color: whitenColor}}>
                    {color}
                </div>
            </div>
            {popup && <Popup message={'Copied to Clipboard!'}/>}
        </>
    )
}
export default ColourDiv;