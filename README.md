node-red-contrib-wifi370
===
:bulb: Integrate your WIFI370 LED-Controller with <b>Node-RED</b>

[![npm version](https://badge.fury.io/js/node-red-contrib-wifi370.svg)](http://badge.fury.io/js/node-red-contrib-wifi370)

### Features
node-red-contrib-wifi370 provides commands to control your WIFI370 LED-Controller with <b>Node-RED</b>.<br>
<b>Node-RED</b> - is a visual tool for wiring the Internet of Things (IoT) - read more @http://nodered.org<br>
This node outputs a message to msg.payload containing a buffer which can be send to the WIFI370 LED-Controller using the TCP node.

### Communication

This node provides bit arrays messages which can be send using the TCP node

### How to use this Node?

#### Talk to WIFI370 with node-red-contrib-wifi370:

Inject node ---- Wifi370 node ---- TCP node

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370-flow.PNG)

#### Predefined Commands

- ON
- OFF
- INFO (Current State and Color)

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370-commands.PNG)

#### Color

if you pass an rgb Array to this node it will be used instead.

<b>msg.color = [ 255,255,255 ]</b>

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370-color.PNG)

#### Configure TCP node like this

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370-tcp-node.PNG)

#

### Get current state

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370-send-and-receive.PNG)

Output: data": [ 102, 1, 36, 65, 33, 2, 34, 255, 0, 1, 153 ]

value 3 represents ON/OFF 36/35

values 7,8,9 represents RGB 34,255,0

#

### The Vanilla Way

#### Talk to WIFI370 only with core nodes

Inject node ---- Function node ---- TCP node

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370-vanilla.PNG)

### Function node content

```
var CMD = {
INFO: ["239", "1", "119"],
ON: ["204", "35", "51"],
OFF: ["204", "36", "51"]
};
const buffer = new Buffer(CMD.OFF);
msg.payload = buffer;
return msg;
```

### Which hardware is used?

#### Controller Support
|Controller  | Supported     | Type  |
| ---------- |:-------------:| -----:|
| LW12       | [x]           | RGB   |
| LD382      | [x]           | RGB   |
| LD382A     | [x]           | RGB   |
| LD686      | [x]           | RGBW  |

Thanks to Meik Dirkes for reverse engineering the communication for all controller types.

#### WIFI370-LED Controller

![Screenshot](https://github.com/firsttris/node-red-contrib-wifi370/blob/master/wiki/wifi370img.PNG)

Link to Amazon (Germany): [Link](https://www.amazon.de/dp/B00Q6FKPZI/ref=cm_sw_r_tw_dp_x_HavByb4T01Q88)

### Exported Flow

Find the exported flow example in "test" directory

### Install

```
cd node-red/
npm install node-red-contrib-homematic
```

### Docker Install

On the host machine

```
docker run \
--name nodered \
--restart=always \
-v /home/docker/node-red:/data \
-p 1880:1880 \
-d nodered/node-red-docker
```

Also on the host machine

```
cd /home/docker/node-red
npm install node-red-contrib-homematic
```

### Something missing?

You can easily extend this module to fit your needs by editing the html file.
feel free to create a pull request!

### License
[MIT](http://opensource.org/licenses/MIT)
