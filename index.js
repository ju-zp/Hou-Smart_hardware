const express = require('express')
var five = require("johnny-five");
var cors = require('cors')
var bodyParser = require('body-parser');
const app = express()
const port = 3002


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var board = new five.Board();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.connection.setNoDelay(true)
    next();
  });

app.use(cors())

board.on("ready", function() {
    let led = new five.Led.RGB({
        pins: {
            red: 9,
            green: 10,
            blue: 11
        },
        isAnode: true
    })
    led.off()
    // var red = new five.Led(9);
    // var green = new five.Led(10);
    // var blue = new five.Led(11);
    // green.on();
    // blue.on();
    // red.on();
    app.get('/switchOn', (req, res) => {
        led.on()
        res.send("on")
        console.log('on')
    });

    app.get('/switchOff', (req, res) => {
        console.log("off")
        led.off()
        res.send("off")
    })

    app.patch('/setColor', (req, res) => {
        console.log("set")
        led.color(req.body)
        res.send('set')
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))