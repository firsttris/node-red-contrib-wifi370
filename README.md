# node-red-contrib-wifi370
node-red node to ease the communication with wifi370 led controller.

two nodes are provided:
a blue node: provides commands and is used to create the message
a pink node: is to connect a led controller (sends tcp message)

Setup:
Copy node to: /node-red-directory/nodes/
Copy content in /static to the folder containing your static http content for node-red
(for more info check "httpStatic" option in settings.js in your node-red directory)

German Amazon Link for wifi370 Controller:
http://www.amazon.de/dp/B00G55329A/ref=cm_sw_r_tw_dp_64xWub0KG32KV
