const util = require('util');
const request = require('request');
const q = require('q');
const config = require('../config.json');

const getWeather = function (msg, location) {
    getGeocode(location)
        .then((geocode) => {
            getWeatherInfo(msg, location, geocode);
        })
        .catch(() => {
            msg.send('지역 불러오기에 실패했습니다.');
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

const getWeatherInfo = function (msg, location, geocode) {
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

        msg.send(message);
    });
}

module.exports = function (router) {
    router.hear(/날씨! (.*)$/i, (msg) => {
        getWeather(msg, msg.match[1]);
    });
}
