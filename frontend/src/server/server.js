const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4242;

app.listen(port, () => {
   console.log(`The app server is running on port: ${port}`);
   console.log(`The app server is running: http://localhost:${port}`);
});

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
   res.sendFile(HTML_FILE, function(err){
      if(err){
         res.status(500).send(err);
      }
   });
});

app.get("/*", (req, res) => {
   res.sendFile(HTML_FILE, function(err){
      if(err){
         res.status(500).send(err);
      }
   });
});