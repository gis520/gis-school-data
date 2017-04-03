'use strict'

const cheerio = require('cheerio');
const request = require('superagent');
const URL = 'http://c.dituhui.com/data/95320';
let cookie = "isFirst=1; _dituhui_session=BAh7FUkiD3Nlc3Npb25faWQGOgZFVEkiJWRjZDQxYTk3NDJmMjdhOGNjNjI5OGZkYTBhZWQ5MWNlBjsAVEkiEHRhYmxldF92aWV3BjsARkZJIg91c2VyX21lZGlhBjsARkkiB3BjBjsAVEkiGGNhc19zZW50X3RvX2dhdGV3YXkGOwBGVEkiH2Nhc192YWxpZGF0aW9uX3JldHJ5X2NvdW50BjsARmkASSIdcHJldmlvdXNfcmVkaXJlY3RfdG9fY2FzBjsARkl1OglUaW1lDW5MHYDPbuIhCjoNbmFub19udW1pAmUBOg1uYW5vX2RlbmkGOg1zdWJtaWNybyIHNXA6C29mZnNldGkCgHA6CXpvbmVJIghDU1QGOwBUSSINYmFja191cmwGOwBGSSIWL3UvNzY2ODAyMjcxL2RhdGEGOwBUSSIMY2FwdGNoYQY7AEZJIgk2NzQ5BjsAVEkiGXdhcmRlbi51c2VyLnVzZXIua2V5BjsAVFsHWwZpAp7yMEkiHXdhcmRlbi51c2VyLnVzZXIuc2Vzc2lvbgY7AFR7BkkiFGxhc3RfcmVxdWVzdF9hdAY7AFRsKwfeW%2BJYSSINY2FzX3VzZXIGOwBGSSINZ2lzY2FmZXIGOwBUSSIZY2FzX2V4dHJhX2F0dHJpYnV0ZXMGOwBGQzotQWN0aXZlU3VwcG9ydDo6SGFzaFdpdGhJbmRpZmZlcmVudEFjY2Vzc3sLSSIHaWQGOwBUSSIKNjIxMTAGOwBGSSINbmlja25hbWUGOwBUSSINZ2lzY2FmZXIGOwBUSSIZYXV0aGVudGljYXRpb25fdG9rZW4GOwBUSSIZbWtLQWgxdEh4dnpXQ2N5ejFKMjcGOwBUSSIKZW1haWwGOwBUSSIXZ2lzNTIwQGRpdHVodWkuY29tBjsAVEkiCHRlbAY7AFRJIhAxODcwMDk0NDcyOQY7AEZJIgthdmF0YXIGOwBUSSI2aHR0cDovL3RwMy5zaW5haW1nLmNuLzI0ODM5NzIzMzQvMTgwLzU2OTIzNzIzNTYvMQY7AFRJIhJjYXNmaWx0ZXJ1c2VyBjsARkkiDWdpc2NhZmVyBjsAVEkiGmNhc19sYXN0X3ZhbGlkX3RpY2tldAY7AEZJIiVTVC0xNDkxMjI4NTEwckstbFlLc1VpU3Q5Z1NRc0hDbAY7AFRJIiJjYXNfbGFzdF92YWxpZF90aWNrZXRfc2VydmljZQY7AEZJIhpodHRwOi8vYy5kaXR1aHVpLmNvbS8GOwBUSSIQX2NzcmZfdG9rZW4GOwBGSSIxUHpDb05POGJHc0pSVTBGQzV3S0VIQW10OCtIdVRtQUJ2NnZvajdTYlRXWT0GOwBG--51d40ec433662ef0059d1e784f67cbc282f8e37c; Hm_lvt_dd7792943b01d1eaf5a718a0d648b461=1491228094; Hm_lpvt_dd7792943b01d1eaf5a718a0d648b461=1491229664";
function fetchInfo(url) {
    return new Promise((resolve, reject) => {
        request.get(url)
            .set("Cookie", cookie)
            .set("Host", "c.dituhui.com")
            .set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const $ = cheerio.load(res.text);
                    const itemProps = $("tr");
                    console.log(itemProps)
                    let result = [];
                    itemProps.each((index, item) => {
                        let info = {};
                        let items = $(item).find("pre");
                        let $name = $(items[0]);
                        let $location = $(items[1]);
                        let name = $name.text().trim();
                        if (name) {
                            info['name'] = name;
                            let point = $location.text().trim().split(",");
                            info['longitude'] = point[0];
                            info['latitude'] = point[1];
                            result.push(info);
                        }

                    });
                    resolve(result);
                }
            });
    });
}

function test(url) {
    if (!url) {
        url = URL;
    }
    fetchInfo(url).then((result) => {
        console.log(result)
    }).catch(e => {
        console.log(e)
    });
}
// test();
module.exports = { fetchInfo };
