"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var environment_1 = require('../environments/environment');
var VideoService = (function () {
    function VideoService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.apiBase = environment_1.environment.apiBase;
    }
    VideoService.prototype.loadList = function () {
        return this.http.get(this.apiBase + "/video")
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.loadItem = function (id) {
        var url = this.apiBase + "/video/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    VideoService.prototype.delete = function (id) {
        var url = this.apiBase + "/video}/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    VideoService.prototype.create = function (name) {
        return this.http
            .post(this.apiBase + "/video", JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    VideoService.prototype.update = function (hero) {
        var url = this.apiBase + "/video/" + hero.id;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    VideoService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    VideoService = __decorate([
        core_1.Injectable()
    ], VideoService);
    return VideoService;
}());
exports.VideoService = VideoService;
