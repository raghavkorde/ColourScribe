//import { Express } from 'express';
import { Configuration, OpenAIApi } from 'openai'
import express from  "express"
import 'dotenv/config'
import cors from 'cors'
import ejs from "ejs"

const app = express();
const port = 3000;
let ERROR = ''

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:5173',
  }));

async function getResponse(prompt){
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    
        // console.log(process.env.OPENAI_API_KEY)
    
    const openai = new OpenAIApi(configuration);
        
    try {
        const input_prompt = prompt.prompt
        console.log(input_prompt)
        const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a color pallet generating assistant who generates 2 to 8 colours with their hex codes based on the mood, theme or instruction based on the prompt. You have to generate a List of JSON with key as color's generic name and value as the hex code including the '#' symbol."},
                    {"role": "user", "content": "Convert the following verbal description of the color palette into List of JSON as described above: Shades of sky during sunset"},
                    {"role": "assistant", "content": '[{"name": "Coral", "colour": "#FF7F50"}, {"name": "LightSalmon", "colour": "#FFA07A"}, {"name": "Pink", "colour": "#FFC0CB"}, {"name": "Gold", "colour": "#FFD700"}, {"name": "Orange", "colour": "#FFA500"}, {"name": "Tomato", "colour": "#FF6347"}, {"name": "OrangeRed", "colour": "#FF4500"}]'},
                    {"role": "user", "content": "Convert the following verbal description of the color palette into List of JSON as described above: 4 shades in Miscrsoft Edge Browser logo"},
                    {"role": "assistant", "content": '[{"name": "Blue", "colour": "#0078D7"}, {"name": "Green", "colour": "#00BC64"}, {"name": "Yellow", "colour": "#FFB900"}, {"name": "Red", "colour": "#F25022"}]'},
                    {"role": "user", "content": "Convert the following verbal description of the color palette into List of JSON as described above: Apple macBooks"},
                    {"role": "user", "content": '[{"name": "Silver", "colour": "#C0C0C0"}, {"name": "SpaceGray", "colour": "#808080"}, {"name": "RoseGold", "colour": "#FFC0CB"}]'},
                    {"role": "user", "content": `Convert the following verbal description of the color palette into List of JSON as described above: ${input_prompt}`}
                    ],
        });
        const response = JSON.parse(completion.data.choices[0].message['content'])
        return response
        
        
    }catch (error) {
        if (error.response) {
        const ERROR = error.response
        return null
        } else {
        const ERROR = {'Status Code': '404'} 
        }
    }

    // const response = [
    //     { name: 'Red', colour: '#FF0000' },
    //     { name: 'Orange', colour: '#FFA500' },
    //     { name: 'Yellow', colour: '#FFFF00' },
    //     { name: 'Green', colour: '#008000' },
    //     { name: 'Blue', colour: '#0000FF' },
    //     { name: 'Indigo', colour: '#4B0082' },
    //     { name: 'Violet', colour: '#EE82EE' }
    //   ]
    // return response
}

app.post('/api/get-response', async (req, res) => {
    const prompt = req.body.prompt; // Assuming the prompt is sent as { "prompt": "Your prompt here" }
    
    // console.log(req.body)
    const response = await getResponse(prompt);
    if (response != null){
        console.log(response)
        res.json({ response });
    }
    else{
        // Does not work as server is on a different port
        res.render('error', { error: ERROR });
    }
  });




app.listen(port, () => {
    console.log(`Server started at ${port}`);
})

