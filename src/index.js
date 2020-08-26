require("dotenv").config();
const fetch = require("node-fetch");
const db = require("./db");
const morgan = require("morgan");
const tankNames = require("./data/tankNames");
const WN8calculator = require("./wn8");
const calculatePlayerWN8 = require("./calculatePlayerWN8");

async function insertCurves(id, WR, overallWR, WN8, overallWN8, battles) {
    overallWR = parseInt(overallWR+0.5);
    overallWN8 = Math.floor((overallWN8 + 50) / 100) * 100;
    if (overallWR >= 42 && overallWR <= 65 && overallWN8 >= 200 && overallWN8 <= 3500) {
        await db.query(`UPDATE NAcurves SET WR${overallWR} = WR${overallWR} + ${WR*battles}, WN${overallWN8} = WN${overallWN8} + ${parseInt(WN8*battles)} WHERE tank_id = ${id}`);
        await db.query(`UPDATE NAcurvesCount SET WR${overallWR} = WR${overallWR} + ${battles}, WN${overallWN8} = WN${overallWN8} + ${battles} WHERE tank_id = ${id}`);
    }
}

async function initCurves() {
    const keys = Object.keys(tankNames);
    for (const key of keys) {
        if (tankNames[key].tier >= 5) {
            console.log('key' + key);
            await db.query(`INSERT INTO NAcurves (
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
            await db.query(`INSERT INTO NAcurvesCount (
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

async function initTable() {
    const keys = Object.keys(tankNames);
    for (const key of keys) {
        console.log('key' + key);
        if (tankNames[key].tier > 0) {
            const arr = [];
            const arr2 = [];
            const newtank = await db.query(`INSERT INTO tankdatana (
                tank_id,
                name, 
                tier,
                class,
                nation, 
                isPrem, 
    
                owned,
                battles,
                wins,
                damage,
                damage_received,
                WN8,
                frags,
                xp,
                survived,
                hits,
                shots,
                tanking_factor,
                def,
                cap,
                explosion_hits_received,
                no_damage_direct_hits_received,
                blocked,
                spotted,
                explosion_hits,
                threeMark,
                twoMark,
                oneMark,
                ace,
                firstClass,
                secondClass,
                thirdClass,
                totalWN8,
                totalWinrate,

                DPG,
                WN8s
            ) 
            VALUES ( $1, $2, $3, $4, $5, $6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, $7, $8)`, 
            [key, tankNames[key].short_name, tankNames[key].tier, tankNames[key].type, tankNames[key].nation, tankNames[key].is_premium, arr, arr2]);
        }
    }
}

let successful = 0;

async function APIcall(i, index) {
    const res = await fetch(`https://api.worldoftanks.com/wot/account/info/?application_id=8ba23e3f52cb01825226d0e5a0ec1877&account_id=${i}`)
    const data = await res.json();
    if (data.data[`${i}`] != null && data.data[`${i}`].statistics.all.battles > 100) {
        db.query(`UPDATE playercount SET numplayers = numplayers + 1 WHERE name = 'NA'`);
        successful++;
        console.log(`success: ${successful} total: ${index}`);
        try {
            const res2 = await fetch(`https://api.worldoftanks.com/wot/tanks/stats/?application_id=008d3e193f77f75897ccaeb120958535&account_id=${i}&fields=mark_of_mastery%2C+tank_id%2C+all`);
            const res3 = await fetch(`https://api.worldoftanks.com/wot/tanks/achievements/?application_id=e1c99c63c09dc9dbc087aac9db72de86&account_id=${i}&fields=achievements%2C+tank_id`);
            const res4 = await fetch(`https://api.worldoftanks.com/wot/account/info/?application_id=bd589e105895f2f6b8af31f27da3e05e&account_id=${i}`);
            const data2 = await res2.json();
            const data3 = await res3.json();
            const data4 = await res4.json();

            const tankData = data2.data[`${i}`];
            const moeData = data3.data[`${i}`];
            const playerWN8 = parseInt(calculatePlayerWN8(tankData));
            const playerWinrate = data4.data[`${i}`].statistics.all.wins*100 / data4.data[`${i}`].statistics.all.battles;

            // CREATE TABLE naOverallstats (
            //     id serial NOT NULL,
            //     player_id INTEGER NOT NULL PRIMARY KEY, 
            //     username VARCHAR(24) NOT NULL, 
            //     WN8 INTEGER NOT NULL,
            //     Winrate REAL NOT NULL, 
            //     battles INTEGER NOT NULL,
            //     creationtime INTEGER NOT NULL
            // );

            await db.query(
                `INSERT INTO naOverallstats (
                    player_id, 
                    username, 
                    WN8,
                    Winrate, 
                    battles,
                    creationtime
                ) VALUES 
                (
                    $1, $2, $3, $4, $5, $6
                )
                `,
                [i, data4.data[`${i}`].nickname, playerWN8, playerWinrate, data4.data[`${i}`].statistics.all.battles, data4.data[`${i}`].created_at]);

            tankData.map( async (row, index) => {
                if (row.tank_id in tankNames) {
                    const avgDamage = row.all.damage_dealt / row.all.battles;
                    const avgDef = row.all.dropped_capture_points / row.all.battles;
                    const avgFrag = row.all.frags / row.all.battles;
                    const avgSpots = row.all.spotted / row.all.battles;
                    const winrate = row.all.wins*100 / row.all.battles;
                    const WN8 = parseInt(WN8calculator(row.tank_id, avgDamage, avgDef, avgFrag, avgSpots, winrate));
                    db.query(
                        `UPDATE tankdatana SET 
                        owned = owned + 1, battles = battles + ${row.all.battles}, wins = wins + ${row.all.wins}, damage = damage + ${row.all.damage_dealt},
                        damage_received = damage_received + ${row.all.damage_received}, WN8 = WN8 + ${WN8 * row.all.battles}, frags = frags + ${row.all.frags}, 
                        xp = xp + ${row.all.xp}, survived = survived + ${row.all.survived_battles}, hits = hits + ${row.all.hits}, shots = shots + ${row.all.shots}, 
                        tanking_factor = tanking_factor + ${row.all.tanking_factor}, def = def + ${row.all.dropped_capture_points}, cap = cap + ${row.all.capture_points}, 
                        explosion_hits_received = explosion_hits_received + ${row.all.explosion_hits_received}, no_damage_direct_hits_received = no_damage_direct_hits_received + ${row.all.no_damage_direct_hits_received},
                        blocked = blocked + ${parseInt(row.all.avg_damage_blocked*row.all.battles)}, spotted = spotted + ${row.all.spotted}, explosion_hits = explosion_hits + ${row.all.explosion_hits},
                        totalWN8 = totalWN8 + ${playerWN8*row.all.battles}, totalWinrate = totalWinrate + ${playerWinrate*row.all.battles}
                        WHERE tank_id = ${row.tank_id}
                        `);
                    if (row.mark_of_mastery === 1)  db.query(`UPDATE tankdatana SET thirdClass = thirdClass + 1 WHERE tank_id = $1`, [row.tank_id]);
                    else if (row.mark_of_mastery === 2)  db.query(`UPDATE tankdatana SET secondClass = secondClass + 1 WHERE tank_id = $1`, [row.tank_id]);
                    else if (row.mark_of_mastery === 3)  db.query(`UPDATE tankdatana SET firstClass = firstClass + 1 WHERE tank_id = $1`, [row.tank_id]);
                    else if (row.mark_of_mastery === 4)  db.query(`UPDATE tankdatana SET ace = ace + 1 WHERE tank_id = $1`, [row.tank_id]);
        
                    if (!isNaN(moeData[index].achievements.marksOnGun)) {
                        if (moeData[index].achievements.marksOnGun === 1)  db.query(`UPDATE tankdatana SET oneMark = oneMark + 1 WHERE tank_id = $1`, [row.tank_id]);
                        else if (moeData[index].achievements.marksOnGun === 2)  db.query(`UPDATE tankdatana SET twoMark = twoMark + 1 WHERE tank_id = $1`, [row.tank_id]);
                        else if (moeData[index].achievements.marksOnGun === 3)  db.query(`UPDATE tankdatana SET threeMark = threeMark + 1 WHERE tank_id = $1`, [row.tank_id]);     
                    }
                    if (tankNames[row.tank_id].tier <= 5) {
                        if (row.all.battles >= 25) db.query(`UPDATE tankdatana SET DPG = array_append(DPG, ${parseInt(avgDamage)}), WN8s = array_append(WN8s, ${WN8}) WHERE tank_id = ${row.tank_id}`);
                    }
                    else if (tankNames[row.tank_id].tier === 6) {
                        if (row.all.battles >= 40) db.query(`UPDATE tankdatana SET DPG = array_append(DPG, ${parseInt(avgDamage)}), WN8s = array_append(WN8s, ${WN8}) WHERE tank_id = ${row.tank_id}`);
                    }
                    else if (tankNames[row.tank_id].tier === 7) {
                        if (row.all.battles >= 50) db.query(`UPDATE tankdatana SET DPG = array_append(DPG, ${parseInt(avgDamage)}), WN8s = array_append(WN8s, ${WN8}) WHERE tank_id = ${row.tank_id}`);
                    }
                    else if (tankNames[row.tank_id].tier >= 8) {
                        if (row.all.battles >= 75) db.query(`UPDATE tankdatana SET DPG = array_append(DPG, ${parseInt(avgDamage)}), WN8s = array_append(WN8s, ${WN8}) WHERE tank_id = ${row.tank_id}`);
                    }
                    if (tankNames[row.tank_id].tier >= 5) {
                        insertCurves(row.tank_id, winrate.toFixed(2), playerWinrate, WN8, playerWN8, row.all.battles);
                    }
                }
            });
        }
        catch (err) { console.log(err) }
        return true;
    }
    return false;
}

function loop() {
    let counter = 1000000000;
    for (let i = 0; i < 250; ++i) {
        setTimeout(function () {
            //const id = counter + 40*i;
            const id = counter + Math.floor(Math.random() * 40000000); 
            //APIcall(1011694618, i);
            APIcall(id, i);
        }, i * 60);
    }
}

function main() {
    loop();  
}
//initCurves();
//initTable();
main();

//SET client_encoding TO 'UTF8';
