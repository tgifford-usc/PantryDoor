import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Pantry API
const apiBase = "https://getpantry.cloud/apiv1/pantry/";
const locationsEndpoint = "/basket/locations";


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});


app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    response.send(status);
});


app.post("/", async (request, response) => {
    console.log("Received locations request");
    try {
        const url = `${apiBase}${request.query["token"]}${locationsEndpoint}`;
        const apiResponse = await fetch(url, {
          method: 'PUT',
          headers: {
              Accept: "application/json",
          },
          body: request.body
        });
        const locations = await apiResponse.json();
        response.send(locations);
    } catch(err) {
      console.log("Error processing locations request: ", err);
    }
});