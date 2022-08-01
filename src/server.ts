import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = 8080;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/filteredimage/", async (req:express.Request, res:express.Response) => {
    const { image_url } = req.query;
    console.log('IMAGE_URL' + image_url);
    if (image_url) {
      const filteredpath = await filterImageFromURL(image_url);
      console.log(filteredpath);
      res.status(200).sendFile(filteredpath, {}, function (err) {
        if (err) {
          res.status(422).send('Please check the file location - ERROR!');
        } else {
          deleteLocalFiles([filteredpath]);
        }
      });
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();