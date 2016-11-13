'use strict';

const util = require('util');
const request = require('request');
const q = require('q');
const config = require('../config.json');

const getWeather = (msg, location) => {
    getGeocode(location)
        .then((geocode) => {
            getWeatherInfo(msg, location, geocode);
        })
        .catch(() => {
            msg.send('지역 불러오기에 실패했습니다.');
        });
}

const getGeocode = (location) => {
    let deferred = q.defer();
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}`;
    request.get({ url: url }, (err, res, body) => {
        let response = JSON.parse(body);
        if (response.status === 'OK') {
            let geocode = {
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

const getWeatherInfo = (msg, location, geocode) => {
    let deferred = q.defer();
    let lat = geocode['lat'], lng = geocode['lng'];
    let url = `http://apis.skplanetx.com/weather/current/minutely?version=1&lat=${lat}&lon=${lng}&appKey=${config['weather-api-key']}`;
    request.get({ url: url }, (err, res, body) => {
        let response = JSON.parse(body);
        let minutely = response.weather.minutely[0];
        let skyStatus = minutely.sky.name;
        let tempCurrent = minutely.temperature.tc;
        let precipitation = minutely.precipitation.sinceOntime;

        msg.send(`현재 ${location}의 날씨 정보\n\n상태 : \`${skyStatus}\`\n기온 : \`${tempCurrent}\`℃\n강수량 : \`${precipitation}\`mm`);
    });
}

module.exports = (router) => {
    router.hear(/날씨! (.*)$/i, (msg) => {
        getWeather(msg, msg.match[1]);
    });
}
