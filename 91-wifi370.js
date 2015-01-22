
module.exports = function (RED) {
	"use strict";
	var reconnectTime = RED.settings.socketReconnectTime || 10000;
	var socketTimeout = RED.settings.socketTimeout || null;
	var net = require('net');

	var connectionPool = {};

	function TcpOut(n) {
		RED.nodes.createNode(this, n);
		this.host = n.host;
		this.port = n.port * 1;
		this.doend = false;
		this.name = n.name;
		this.closing = false;
		var node = this;

		var reconnectTimeout;
		var client = null;
		var connected = false;
		var end = false;

		var setupTcpClient = function () {
			node.log("connecting to " + node.host + ":" + node.port);
			node.status({
				fill : "grey",
				shape : "dot",
				text : "connecting"
			});
			client = net.connect(node.port, node.host, function () {
					connected = true;
					node.log("connected to " + node.host + ":" + node.port);
					node.status({
						fill : "green",
						shape : "dot",
						text : "connected"
					});
				});
			client.on('error', function (err) {
				node.log('error : ' + err);
			});
			client.on('end', function (err) {});
			client.on('close', function () {
				node.status({
					fill : "red",
					shape : "ring",
					text : "disconnected"
				});
				connected = false;
				client.destroy();
				if (!node.closing) {
					if (end) {
						end = false;
						reconnectTimeout = setTimeout(setupTcpClient, 20);
					} else {
						node.log("connection lost to " + node.host + ":" + node.port);
						reconnectTimeout = setTimeout(setupTcpClient, reconnectTime);
					}
				}
			});
		}
		setupTcpClient();

		node.on("input", function (msg) {
			if (connected && msg.payload != null) {
				var buffer = new Buffer(msg.payload, 'hex');
				client.write(buffer);

				if (node.doend === true) {
					end = true;
					client.end();
				}
			}
		});

		node.on("close", function () {
			this.closing = true;
			client.end();
			clearTimeout(reconnectTimeout);
		});
	}
	RED.nodes.registerType("wifi370", TcpOut);

	function CommandsNode(n) {
		RED.nodes.createNode(this, n);
		this.action = n.action;
		this.command = n.command;
		this.custom = n.custom;
		this.color = n.color;
		this.name = n.name;
		var node = this;
		node.cmds = {
			RUNON : ["0xcc", "0x20", "0x33"],
			RUNOFF : ["0xcc", "0x21", "0x33"],
			OPENON : ["0xcc", "0x23", "0x33"],
			OPENOFF : ["0xcc", "0x24", "0x33"],
			SevenColourCrossFade : ["0xbb", "0x25", "0x44"],
			RedGradualChange : ["0xbb", "0x26", "0x44"],
			GreenGradualChange : ["0xbb", "0x27", "0x44"],
			BlueGradualChange : ["0xbb", "0x28", "0x44"],
			YellowGradualChange : ["0xbb", "0x29", "0x44"],
			CyanGradualChange : ["0xbb", "0x2a", "0x44"],
			PurpleGradualChange : ["0xbb", "0x2b", "0x44"],
			WhiteGradualChange : ["0xbb", "0x2c", "0x44"],
			RedGreenCrossfade : ["0xbb", "0x2d", "0x44"],
			RedBlueCrossfade : ["0xbb", "0x2e", "0x44"],
			GreenBlueCrossfade : ["0xbb", "0x2f", "0x44"],
			SevenColourStrobeFlash : ["0xbb", "0x30", "0x44"],
			RedStrobeFlash : ["0xbb", "0x31", "0x44"],
			GreenStrobeFlash : ["0xbb", "0x32", "0x44"],
			BlueStrobeFlash : ["0xbb", "0x33", "0x44"],
			YellowStrobeFlash : ["0xbb", "0x34", "0x44"],
			CyanStrobeFlash : ["0xbb", "0x35", "0x44"],
			PurpleStrobeFlash : ["0xbb", "0x36", "0x44"],
			WhiteStrobeFlash : ["0xbb", "0x37", "0x44"],
			SevenColourJumpingChange : ["0xbb", "0x38", "0x44"]
		}

		this.on('input', function (msg) {
			var cmds = [];
			if (node.action == "basic") {

				if (node.command == "OPENON") {
					cmds = node.cmds.OPENON;
				} else if (node.command == "OPENOFF") {
					cmds = node.cmds.OPENOFF;
				} else if (node.command == "RUNON") {
					cmds = node.cmds.RUNON;
				} else if (node.command == "RUNOFF") {
					cmds = node.cmds.RUNOFF;
				}

			} else if (node.action == "present") {

				if (node.preset == "SevenColourCrossFade") {
					cmds = node.cmds.SevenColourCrossFade;
				} else if (node.preset == "RedGradualChange") {
					cmds = node.cmds.RedGradualChange;
				} else if (node.preset == "GreenGradualChange") {
					cmds = node.cmds.GreenGradualChange;
				} else if (node.preset == "BlueGradualChange") {
					cmds = node.cmds.BlueGradualChange;
				} else if (node.preset == "YellowGradualChange") {
					cmds = node.cmds.YellowGradualChange;
				} else if (node.preset == "CyanGradualChange") {
					cmds = node.cmds.CyanGradualChange;
				} else if (node.preset == "PurpleGradualChange") {
					cmds = node.cmds.PurpleGradualChange;
				} else if (node.preset == "WhiteGradualChange") {
					cmds = node.cmds.WhiteGradualChange;
				} else if (node.preset == "RedGreenCrossfade") {
					cmds = node.cmds.RedGreenCrossfade;
				} else if (node.preset == "RedBlueCrossfade") {
					cmds = node.cmds.RedBlueCrossfade;
				} else if (node.preset == "GreenBlueCrossfade") {
					cmds = node.cmds.GreenBlueCrossfade;
				} else if (node.preset == "SevenColourStrobeFlash") {
					cmds = node.cmds.SevenColourStrobeFlash;
				} else if (node.preset == "RedStrobeFlash") {
					cmds = node.cmds.RedStrobeFlash;
				} else if (node.preset == "GreenStrobeFlash") {
					cmds = node.cmds.GreenStrobeFlash;
				} else if (node.preset == "BlueStrobeFlash") {
					cmds = node.cmds.BlueStrobeFlash;
				} else if (node.preset == "YellowStrobeFlash") {
					cmds = node.cmds.YellowStrobeFlash;
				} else if (node.preset == "CyanStrobeFlash") {
					cmds = node.cmds.CyanStrobeFlash;
				} else if (node.preset == "PurpleStrobeFlash") {
					cmds = node.cmds.PurpleStrobeFlash;
				} else if (node.preset == "WhiteStrobeFlash") {
					cmds = node.cmds.WhiteStrobeFlash;
				} else if (node.preset == "SevenColourJumpingChange") {
					cmds = node.cmds.SevenColourJumpingChange;
				}

			} else if (node.action == "color") {
				if (node.custom != null) {
					var input = node.color.match(/.{2}/g);
					var index;
					cmds.push("0x56");
					for (index = 0; index < input.length; ++index) {
						var value = "0x" + input[index];
						cmds.push(value);
					}
					cmds.push("0xaa");
				}
			} else if (node.action == "custom") {
				if (node.custom != null) {
					var input = node.custom.split(" ");
					var index;
					for (index = 0; index < input.length; ++index) {
						var value = "0x" + input[index];
						cmds.push(value);
					}
				}
			} else if (node.action == "through") {
				if (msg.payload != null) {
					var input = msg.payload.split(" ");
					var index;
					for (index = 0; index < input.length; ++index) {
						var patt = new RegExp("^([A-Fa-f0-9]{2})");
						var res = patt.test(input[index]);
						if (res = false) {
							this.error("input not a 2 digit hex");
						}
						var value = "0x" + input[index];
						cmds.push(value);
					}
				}
			}
			console.log(cmds);
			msg.payload = cmds;
			node.send(msg);
		});
	}
	RED.nodes.registerType("wifi370com", CommandsNode);
}
