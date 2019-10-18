const http = require("https");
const latLonsJson = require("./latLons.json")
const specialtiesJson = require("./specialties.json")

const options = {
    "method": "POST",
    "hostname": "tdp2-crmedical-api.herokuapp.com",
    "port": null,
    "path": "/lenders",
    "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "87f4d169-6757-1dc9-078b-695a8dde0e84"
    }
};

let i = 0;
const maxSpec = specialtiesJson.length;
const types = ["SANATORIO", "PROFESIONAL"]
const plans = ["A310", "A210", "A110"]
const langs = [["Español", "Ingles"], ["Español"], ["Ingles"]]
const phones = ["1512345678", "", "49876541", "45613652", "49875654", "1565473214", "4653987"]


const funcs = latLonsJson.map(ll => {
    const type = types[i % types.length]
    const name = type + '_' + i
    const plan = plans[i % plans.length]
    const emails = [name + '@bulk.com']
    const languages = langs[i % langs.length]
    const specialties = [(i % maxSpec) + 1]
    const address = ll.addr;
    const lat = ll.lat;
    const lon = ll.lon;
    const zone_id = ll.zone_id;
    const phone = phones[i % phones.length]
    i++

    return function () {
        return new Promise(function (resolve, reject) {
            const req = http.request(options, function (res) {
                const chunks = [];

                res.on("data", chunks.push);

                res.on("end", () => {
                    const body = Buffer.concat(chunks);
                    resolve(body.toString());
                });

                res.on("error", reject);
            });

            const lebody = {
                type, name, plan, emails, languages, specialties,
                offices: [{ address, phone, lat, lon, zone_id }]
            };
            const sbody = JSON.stringify(lebody);
            console.log("Creating: " + sbody);
            req.write(sbody);
            req.end();
        })
    }
});

const __funcs = funcs.splice(1);
const p = __funcs.reduce((acc, curr) => acc.then(function (result) {
    console.log("Done!");
    console.log(result);
    return curr(result);
}), funcs[0]())


p.then(res => console.log("All done!"));

