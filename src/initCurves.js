const db = require("./db");
const tankNames = require("./data/tankNames");

async function initCurves() {
    const keys = Object.keys(tankNames);
    for (const key of keys) {
        if (tankNames[key].tier >= 5) {
            console.log('key' + key);
            await db.query(`INSERT INTO curvesNA (
                tank_id, name, 
                42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
                54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
                WN200, WN300, WN400, WN500, WN600, WN700, WN800, WN900, WN1000, WN1100, 
                WN1200, WN1300, WN1400, WN1500, WN1600, WN1700, WN1800, WN1900, WN2000, WN2100, 
                WN2200, WN2300, WN2400, WN2500, WN2600, WN2700, WN2800, WN2900, WN3000, WN3100, 
                WN3200, WN3300, WN3400, WN3500
                ) VALUES (
                    $1, $2, 
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                )`, [key, tankNames[key].short_name]);
            await db.query(`INSERT INTO curvesCountNA (
                tank_id, name, 
                WR42, WR43, WR44, WR45, WR46, WR47, WR48, WR49, WR50, WR51, WR52, WR53,
                WR54, WR55, WR56, WR57, WR58, WR59, WR60, WR61, WR62, WR63, WR64, WR65,
                WN200, WN300, WN400, WN500, WN600, WN700, WN800, WN900, WN1000, WN1100, 
                WN1200, WN1300, WN1400, WN1500, WN1600, WN1700, WN1800, WN1900, WN2000, WN2100, 
                WN2200, WN2300, WN2400, WN2500, WN2600, WN2700, WN2800, WN2900, WN3000, WN3100, 
                WN3200, WN3300, WN3400, WN3500
                ) VALUES (
                    $1, $2, 
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                )`, [key, tankNames[key].short_name]);
            // ) VALUES (
            //     $1, $2, 
            //     $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3, $3,
            //     $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4,
            //     $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4, $4
            // )`, [key, tankNames[key].short_name, arr, arr2]);
        }
    }
}

module.exports = initCurves;