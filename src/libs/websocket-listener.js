'use strict';

const SockJS = require('sockjs-client');
const Stomp = require('stompjs');

module.exports.register = function register(registrations) {
    var socket = SockJS('/updates');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        registrations.forEach(function (registration) {
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}
