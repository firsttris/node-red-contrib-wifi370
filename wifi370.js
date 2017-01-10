module.exports = function (RED) {
    "use strict";
    function CommandsNode (n) {
        RED.nodes.createNode(this, n);
        this.action = n.action;
        this.command = n.command;
        this.rot = n.rot;
        this.gruen = n.gruen;
        this.blau = n.blau;
        this.message = [];
        this.CMD = {
            INFO: ["239", "1", "119"],
            ON: ["204", "35", "51"],
            OFF: ["204", "36", "51"]
        };

        this.on('input', (msg) => {
            console.log("action: "+this.action + " command: "+this.command);
            if (this.action == "COMMAND") {
                if (this.command == "ON") {
                    this.message = this.CMD.ON;
                } else if (this.command == "INFO") {
                    this.message = this.CMD.INFO;
                } else {
                    this.message = this.CMD.OFF;
                }
            }
            if (this.action == "COLOR") {
                if(msg.color) {
                    this.message = msg.color;
                    delete msg.color;
                } else {
                    this.message = [this.rot,this.gruen,this.blau];
                }
                this.message.unshift(86);
                this.message.push(170);
            }

            if(this.message.length == 0) {
                this.error("msg.payload is empty!");
            }

            msg.payload = new Buffer(this.message);
            this.send(msg);
        });
    }

    RED.nodes.registerType("wifi370", CommandsNode);
}
