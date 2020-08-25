const tankNames = require('./data/tankNames');
const WN8 = require('./data/wn8');

function calculatePlayerWN8(overall) {
    let weighedExpDamage = 0, weighedExpSpots = 0, weighedExpFrag = 0, weighedExpDef = 0, weighedExpWinrate = 0;
    let weighedDamage = 0, weighedSpots = 0, weighedFrag = 0, weighedDef = 0, weighedWinrate = 0;

    overall.map((row) => {
        if (row.tank_id in WN8) {
            const exp = WN8[row.tank_id];
            //console.log(row);
            const battles = row.all.battles;
            weighedExpDamage += battles*exp.expDamage;
            weighedExpSpots += battles*exp.expSpot;
            weighedExpFrag += battles*exp.expFrag;    
            weighedExpDef += battles*exp.expDef;    
            weighedExpWinrate += battles*exp.expWinRate;
        
            weighedDamage += row.all.damage_dealt;
            weighedSpots += row.all.spotted;
            weighedFrag += row.all.frags;
            weighedDef += row.all.dropped_capture_points;
            weighedWinrate += 100*row.all.wins;
        }
    });

    const rDAMAGE = weighedDamage / weighedExpDamage;
    const rSPOT   = weighedSpots  / weighedExpSpots;
    const rFRAG   = weighedFrag   / weighedExpFrag;
    const rDEF    = weighedDef    / weighedExpDef;
    const rWIN    = weighedWinrate   / weighedExpWinrate;

    const rWINc    = Math.max(0,                          (rWIN    - 0.71) / (1 - 0.71) );
    const rDAMAGEc = Math.max(0,                          (rDAMAGE - 0.22) / (1 - 0.22) );
    const rFRAGc   = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG   - 0.12) / (1 - 0.12)));
    const rSPOTc   = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT   - 0.38) / (1 - 0.38)));
    const rDEFc    = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF    - 0.10) / (1 - 0.10)));

    const overallWN8 = 980*rDAMAGEc + 210*rDAMAGEc*rFRAGc + 155*rFRAGc*rSPOTc + 75*rDEFc*rFRAGc + 145*Math.min(1.8,rWINc);
    return overallWN8;
}

module.exports = calculatePlayerWN8;
