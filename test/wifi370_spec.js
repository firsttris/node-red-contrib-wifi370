var should = require("should");

var homematicNode = require("../wifi370.js");
var helper = require("./helper.js");

describe('wifi370Node', function() {

    beforeEach(function(done) {
	helper.startServer(done);
    });

    afterEach(function(done) {
	helper.unload();
	helper.stopServer(done);
    });

    describe('#wifi370', function() {

	it('should be loaded', function(done) {
	    var flow = [ {
		"id" : "wifi370Node1",
		"type" : "wifi370com",
		"name" : "wifi370Node",
		"wires" : [ [] ]
	    } ];
	    helper.load(homematicNode, flow, function() {
		var homematicNode1 = helper.getNode("wifi370Node1");
		homematicNode1.should.have.property('name', 'wifi370Node');
		done();
	    });
	});

    });
});