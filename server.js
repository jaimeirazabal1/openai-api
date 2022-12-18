const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());  // Para poder procesar el cuerpo de la solicitud en formato JSON
app.use(cors());  // Para poder procesar el cuerpo de la solicitud en formato JSON

app.post('/text', async (req, res) => {
    const text = req.body.text;  // Obtiene el texto enviado en el cuerpo de la solicitud
    try {
      const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: text,
          temperature: 0.9,
          max_tokens: 400,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:"], 
      });
      console.log('respuesta',response.data)
      res.send({response:response.data.choices[0].text});
    } catch (error) {
      console.log(error);
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});