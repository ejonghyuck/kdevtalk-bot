const util = require('util');
const request = require('request');
const q = require('q');
const common = require('../common');
const config = require('../config.json');

const getWeather = function (rtm, channel, location) {
    getGeocode(location)
        .then((geocode) => {
            getWeatherInfo(rtm, channel, location, geocode);
        })
        .catch(() => {
            rtm.sendMessage('지역 불러오기에 실패했습니다.', channel);
        });
}

const getGeocode = function (location) {
    var deferred = q.defer();
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(location);
    request.get({ url: url }, (err, res, body) => {
        var response = JSON.parse(body);
        if (response.status === 'OK') {
            var geocode = {
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng
            };
            deferred.resolve(geocode);
        }
        else {
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

const getWeatherInfo = function (rtm, channel, location, geocode) {
    var deferred = q.defer();
    var lat = geocode['lat'], lng = geocode['lng'];
    var url = 'http://apis.skplanetx.com/weather/current/minutely?version=1';
    url += '&lat=' + lat;
    url += '&lon=' + lng;
    url += '&appKey=' + config['weather-api-key'];
    request.get({ url: url }, (err, res, body) => {
        var response = JSON.parse(body);
        var minutely = response.weather.minutely[0];
        var skyStatus = minutely.sky.name;
        var tempCurrent = minutely.temperature.tc;
        var precipitation = minutely.precipitation.sinceOntime;

        var message = '현재 ' + location + '의 날씨 정보\n\n';
        message += '상태 : `' + skyStatus + '`\n';
        message += '기온 : `' + tempCurrent + '`℃\n'
        message += '강수량 : `' + precipitation + '`mm';
        rtm.sendMessage(message, channel);
    });
}

module.exports = function (router) {
    router.hear(function (rtm, message) {
        var channel = message.channel;
        var text = message.text;

        var command = common.getCommandParam('날씨!', text);
        if (!util.isNullOrUndefined(command)) {
            getWeather(rtm, channel, command);
        }
    });
}
