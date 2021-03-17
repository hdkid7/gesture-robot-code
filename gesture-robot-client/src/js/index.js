import p5 from 'p5'
import p5ble from 'p5ble'


const s = ( sketch ) => {
    let blueToothCharacteristic;
    let receivedValue = "";

    let blueTooth;
    let isConnected = false;

    var millisecondTimerStart;
    var oldColorPickerValue;

    var textfield;


    function newText() {
        sendData(textfield.value());
    }
    sketch.setup = () => {

        sketch.createCanvas(window.innterWidth, window.innerHeight);

        // Create a p5ble class
        console.log("setting up");
        blueTooth = new p5ble();



        //create textfield
        textfield = sketch.createInput();
        textfield.position(0, 50);
        textfield.changed(newText);

        const connectButton = sketch.createButton('Connect');
        connectButton.mousePressed(connectToBle);
        connectButton.position(15, 15);
        millisecondTimerStart = sketch.millis();
    };

    sketch.draw = () => {
       drawScreen()
    };


    function connectToBle() {
        // Connect to a device by passing the service UUID
        blueTooth.connect(0xFFE0, gotCharacteristics);
    }


// A function that will be called once got characteristics
    function gotCharacteristics(error, characteristics) {
        if (error) {
            console.log('error: ', error);
        }
        console.log('characteristics: ', characteristics);
        blueToothCharacteristic = characteristics[0];

        blueTooth.startNotifications(blueToothCharacteristic, gotValue, 'string');


        isConnected = blueTooth.isConnected();
        // Add a event handler when the device is disconnected
        blueTooth.onDisconnected(onDisconnected);
    }

// A function that will be called once got values
    function gotValue(value) {
        console.log('value: ', value);
    }


    function onDisconnected() {
        console.log('Device got disconnected.');
        isConnected = false;
    }


    function sendData(command) {
        const inputValue = command;
        if (!("TextEncoder" in window)) {
            console.log("Sorry, this browser does not support TextEncoder...");
        }
        var enc = new TextEncoder(); // always utf-8
        blueToothCharacteristic.writeValue(enc.encode(inputValue));
    }

    function drawScreen() {
        if (isConnected) {
            sketch.fill(0, 255, 0);
            sketch.ellipse(120,25,30,30);
        } else {
            sketch.fill(255, 0, 0);
            sketch.ellipse(120,25,30,30);
        }
    }
};

let myp5 = new p5(s);






