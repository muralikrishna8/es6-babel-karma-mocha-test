"use strict";

import AjaxGetData from "../src/AjaxGetData.js";
import { expect } from "chai";
import sinon from "sinon";

describe("AjaxGetData", () => {
    let xhr = null;
    let requests = null;

    beforeEach("AjaxGetData", () => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = xhr => {
            requests.push(xhr)
        }
    })

    afterEach("AjaxGetData", () => {
        xhr.restore();
    })

    it("should get the XML data from the server", () => {
        let data = `<?xml version="1.0" encoding="utf-8" ?>
                     <rss version="2.0" xml:base="http://www.nasa.gov/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/"> <channel>
                    <item>
                     <title>NASA Administrator Remembers Apollo-Era Astronaut Edgar Mitchell</title>
                     <link>http://www.nasa.gov/press-release/nasa-administrator-remembers-apollo-era-astronaut-edgar-mitchell</link>
                     <description>The following is a statement from NASA Administrator Charles Bolden on the passing of NASA astronaut Edgar Mitchell:</description>
                    </item>

                    <item>
                     <title>NASA Television to Air Russian Spacewalk</title>
                     <link>http://www.nasa.gov/press-release/nasa-television-to-air-russian-spacewalk</link>
                     <description>NASA Television will broadcast live coverage of a 5.5-hour spacewalk by two Russian cosmonauts aboard the International Space Station beginning at 7:30 a.m. EST Wednesday, Feb. 3.</description>
                    </item>
                    </channel>
                    </rss>`;

        let xmlData = new AjaxGetData("http://localhost:3000/data.xml");
        let headers = {
            "Authorization": "Basic abcdefgh="
        }
        let xmlDoc = xmlData.get(headers);
        requests[0].respond(200, { 'Content-Type': 'application/xml'}, data);

        return xmlDoc.then(successData => {
            expect(successData).to.eq(data);
        });
    });

    it("should be able to handle the error case", () => {
        let xmlData = new AjaxGetData("http://localhost:3000/data.xml");
        let xmlDoc = xmlData.get();

        requests[0].respond(404);

        return xmlDoc.catch(error => {
            expect(error.message).to.eq("unable to fetch the data");
        });
    });
})
