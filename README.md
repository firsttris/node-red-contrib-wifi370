node-red-contrib-wifi370
===
integrate your wifi370 led controller with <b>Node-RED</b>

### Overview
node-red-contrib-wifi370 provides two nodes to control your wifi370 led controller in <b>Node-RED</b>.<br>

<ul>
<li><b>The blue node</b>: provides commands and is used to create the message.</li>
</ul>
<table>
  <tr>
    <td>node</td>
    <td><img src="https://dl.dropboxusercontent.com/u/13344648/dev/wifi370_1.PNG" alt=""/></td>
  </tr>
  <tr>
    <td>commands</td>
    <td><img src="https://dl.dropboxusercontent.com/u/13344648/dev/wifi370_2.PNG" alt=""/></td>
  </tr>
  <tr>
    <td>colpick</td>
    <td><img src="https://dl.dropboxusercontent.com/u/13344648/dev/wifi370_3.PNG" alt=""/></td>
  </tr>
</table>

<ul>
<li><b>The pink node</b>: is to connect a led controller (sends tcp message).</li>
</ul>
<table>
  <tr>
    <td>node</td>
    <td><img src="https://dl.dropboxusercontent.com/u/13344648/dev/wifi370_4.PNG" alt=""/></td>
  </tr>
  <tr>
    <td>settings</td>
    <td><img src="https://dl.dropboxusercontent.com/u/13344648/dev/wifi370_5.PNG" alt=""/></td>
  </tr>
</table>

### colpick Color Picker

<ul>
<li>This node uses colPick to display a Color Picker.</li>
<li>In order to use the Color Picker download colPick from: http://colpick.com/plugin</li>
<li>Copy the library to the folder containing your static http content for <b>Node-RED</b>.</li>
<li>For more info check the "httpStatic" option in settings.js in your node-red directory.</li>
</ul>

### Which hardware is used in this project?

WIFI370 LED CONTROLLER:
![Screenshot](https://dl.dropboxusercontent.com/u/13344648/dev/wifi370img.PNG)

Amazon Link (Germany):<br>
http://www.amazon.de/dp/B00G55329A/ref=cm_sw_r_tw_dp_64xWub0KG32KV
