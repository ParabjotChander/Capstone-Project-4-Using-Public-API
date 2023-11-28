import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
  res.render("index.ejs");
});

app.post("/team", async (req, res) => {
  
  const id = req.body.number;
  const num = Number(id);
  
  if( typeof(num) === "number" && (num >= 1 && num <= 30) ){
    
    try {
      const response = await axios.get("https://www.balldontlie.io/api/v1/teams/" + id);
      const result = response.data;
      res.render("index.ejs", {team: result});
    }catch (error) {
      console.error(error.response.data);
      res.status(500);
      console.log("Couldn't Generate Team Information");
    }
  
  }

});

app.post("/player", async (req, res) => {
  
  const id = req.body.number2;
  const num = Number(id);
  
  if( typeof(num) === "number" && (num >= 1 && num <= 447) ){
    
    try {
      const response = await axios.get("https://www.balldontlie.io/api/v1/players/" + id);
      const result = response.data;
      res.render("index.ejs", {player: result});
    }catch (error) {
      console.error(error.response.data);
      res.status(500);
      console.log("Couldn't Generate Player Information");
    }
  
  }

});

app.listen(port, () =>{
  console.log(`Server listening on port ${port}`);
});