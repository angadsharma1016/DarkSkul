const express = require("express");
const app = express();
const hbs = require("express-hbs");
const path = require("path");
const bp = require("body-parser");
const data = require("./data.json");

app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

// handlebars
app.engine('hbs',hbs.express4());
app.set("view engine","hbs");

app.use(express.static("static"));

app.get("/",(req,res)=>{
    res.render("index",{name:"angad"});
});

app.post("/chatbot",(req,res)=>{

    let params = req.body.queryResult.parameters;
    let subject = params.subject[0],clas = params.class;

    let result = data[`${clas}_${subject}`];

    if(!result)
        result = `loading class ${clas}th ${subject} from my data repository`;

    res.status(200).send({
        "fulfillmentText":`${result}`,
        "fulfillmentMessages":[{"text":{"text":[`${result}`]}}],
        "source":""
    });
});


server = app.listen(process.env.PORT || 3000,()=>console.log(`Listening on port ${server.address().port}`));

