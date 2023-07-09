import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {RotatingLines} from 'react-loader-spinner'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './PromptForm.css'
import ColourContainer from "./ColourContainer";

const default_palette = [{"name": "Coral", "colour": "#FF7F50"}, {"name": "LightSalmon", "colour": "#FFA07A"}, {"name": "Pink", "colour": "#FFC0CB"}, {"name": "Gold", "colour": "#FFD700"}, {"name": "Orange", "colour": "#FFA500"}, {"name": "Tomato", "colour": "#FF6347"}, {"name": "OrangeRed", "colour": "#FF4500"}]
const theme = createTheme({
    palette: {
        primary: {
          main: '#484c8b',
        }
    }
})


function PromptForm(){
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const regOptions = {
        prompt: {required: "Prompt Required!",
                maxLength: {value: 50, message: "Prompt should not exceed 50 characters"}},
    }
    const [palette, setPalette] = useState(default_palette)
    const onSubmit = async (formData, event) => {
        event.preventDefault();
        setLoading(true);
        console.log(formData);
        try {
          const res = await fetch('http://localhost:3000/api/get-response', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: formData }),
          });
          const data = await res.json()
          console.log(data.response)
          setPalette(data.response);
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setApiError(true)
        }
      };
      
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-container">
                <ThemeProvider theme={theme}>
                    <TextField 
                        fullWidth 
                        label="Prompt" 
                        id="fullWidth"
                        type="text"
                        placeholder="Eg: Shades of sky during sunset"
                        name = "prompt"
                        {...register("prompt", regOptions.prompt)}    
                        />
                        {loading? 
                            <RotatingLines
                                strokeColor="#484c8bad"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="55"
                                visible={true}/>
                        : 
                        <Button type="submit" variant="contained">
                            <SendIcon />
                        </Button>}
                </ThemeProvider>
                <br/>
                <small className="error">
                    {errors?.prompt && errors.prompt.message}
                </small>
                {apiError && 
                    <small className="error"> Api Error cannot process request </small>
                }
            </div>
        </form>
        <ColourContainer palette={palette}/>
        </>
    )
}
export default PromptForm;