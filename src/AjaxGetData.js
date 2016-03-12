"use strict";

export default class AjaxGetData {
    constructor(url) {
        this.url = url;
    }
    get(headers = {}) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.url, true);
        this.setRequestHeaders(xhttp, headers);
        xhttp.send();
        return new Promise((resolve, reject) => {
            let response = this.responseCodes();
            xhttp.onreadystatechange = (event) => {
                if (xhttp.readyState === response.REQUEST_FINISHED) {
                    if (xhttp.status === response.OK) {
                        resolve(event.target.response);
                    }
                    reject({ "message": "unable to fetch the data" });
                }
            }
        });
    }

    setRequestHeaders(xhttp, headers) {
        for (let key in headers) {
            xhttp.setRequestHeader(key, headers[key]);
        }
    }

    responseCodes() {
        return {
            "REQUEST_FINISHED": 4,
            "OK": 200
        }
    }
}
