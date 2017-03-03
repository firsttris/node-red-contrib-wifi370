module.exports = function (RED) {
  "use strict";
  function CommandsNode (n) {
    RED.nodes.createNode(this, n);
    this.controller = n.controller;
    this.action = n.action;
    this.command = n.command;
    this.rot = n.rot;
    this.gruen = n.gruen;
    this.blau = n.blau;
    this.message = [];
    this.CMD = {};
    this.LW12 = {
      INFO: ["239", "1", "119"],
      ON: ["204", "35", "51"],
      OFF: ["204", "36", "51"]
    };
    this.LD382A = {
      INFO: ["129", "138", "139", "150"],
      ON: ["113", "35", "15", "163"],
      OFF: ["113", "36", "15", "164"]
    };
    this.LD686 = {
      INFO: ["129", "138", "139", "150"],
      ON: ["113", "35", "15", "163"],
      OFF: ["113", "36", "15", "164"]
    };

    this.on('input', (msg) => {
      console.log("action: " + this.action + " command: " + this.command);
      //Command
      if (this.action === "COMMAND") {
        if (this.controller === 'LW12') {
          this.CMD = this.LW12;
        }
        if (this.controller === 'LD686') {
          this.CMD = this.LD686;
        }
        if (this.controller === 'LD382A') {
          this.CMD = this.LD382A;
        }
        if (this.command === "ON") {
          this.message = this.CMD.ON;
        } else if (this.command === "INFO") {
          this.message = this.CMD.INFO;
        } else {
          this.message = this.CMD.OFF;
        }
      }
      //COLOR
      if (this.action === "COLOR") {
        if (msg.color) {
          this.message = msg.color;
          delete msg.color;
        } else {
          this.message = [this.rot, this.gruen, this.blau];
        }
        if (this.controller === 'LW12') {
          this.message.unshift(86);
          this.message.push(170);
        }
        if (this.controller === 'LD686') {
          this.message.push(0, 0, 0, 15);
          this.message.unshift(49);
          let cs = 0;
          for (let i in this.message) {
            cs += parseInt(this.message[i], 10);
          }
          this.message.push(cs);
        }
        if (this.controller === 'LD382A' || controllerName === 'LD382') {
          this.message.push(0, 0, 15);
          this.message.unshift(49);
          let cs = 0;
          for (let i in this.message) {
            cs += parseInt(this.message[i], 10);
          }
          this.message.push(cs);
        }
      }


      if (this.message.length === 0) {
        this.error("msg.payload is empty!");
      }

      msg.payload = new Buffer(this.message);
      this.send(msg);
    });
  }

  RED.nodes.registerType("wifi370", CommandsNode);
};
