const db = require("./db");
const tankNames = require("./data/tankNames");

async function initTable() {
    const keys = Object.keys(tankNames);
    for (const key of keys) {
        console.log('key' + key);
        if (tankNames[key].tier > 0) {
            const arr = [];
            const arr2 = [];
            const newtank = await db.query(`INSERT INTO tankdatana2 (
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

module.exports = initTable;