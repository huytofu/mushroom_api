var http = require('http');
var app = require('../index');
var server = http.createServer(app);
var request = require('supertest');
var assert = require('chai').assert;

describe.only('Unit Tests For Api', function () {
    this.timeout(5000);
    
    it('GET/prediction/get-mushroom-edibility-prediction', function (done) {
        request(server)
        .get('/prediction/get-mushroom-edibility-prediction')
        .query({mushroom_data: {"cap-surface":{"value":"s"}, "gill-color":{"value":"w"}}})
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .end(function(err, res) {
            assert.isNull(err);
            assert.isNotNull(res.body.data);
            assert.typeOf(res.body.data, 'object');
            assert.isNotNull(res.body.data.label);
            assert.typeOf(res.body.data.label, 'string');
            done();
        });
    });
    
    it('GET/prediction/get-mushroom-historical-predictions', function (done) {
        request(server)
        .get('/prediction/get-mushroom-historical-predictions')
        .query({num_last: 2})
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .end(function(err, res) {
            assert.isNull(err);
            assert.isNotNull(res.body.data);
            assert.typeOf(res.body.data, 'object');
            assert.isNotNull(res.body.data.predictions);
            assert.typeOf(res.body.data.predictions, 'array');
            done();
        });
    });
});
