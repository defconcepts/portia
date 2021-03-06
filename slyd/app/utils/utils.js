import Ember from 'ember';

/**
 * Cleans, normalizes and validates URLs
 */
export function cleanUrl(url) {
    if(typeof url !== 'string') {
        return null;
    }
    url = url.trim();
    if(!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    try {
        url = (new URI(url)).normalize();
    } catch(e){
        return null;
    }
    if(!url.host()) {
        return null;
    }
    return url.toString();
}

/**
 * Four random hex characters
 */
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function shortGuid(separator) {
    separator = typeof separator !== 'undefined' ? separator : '-';
    return s4() + separator + s4() + separator + s4();
}

export function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

export function captureMessage(msg, params) {
    Ember.Logger.log(msg);
    if (window.Raven) {
        Raven.captureMessage(msg, params);
    }
}
export function logError(err, params) {
    Ember.Logger.error(err);
    if (window.Raven) {
        Raven.captureException(err, params);
    }
}

