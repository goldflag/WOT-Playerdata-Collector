/*
CREATE TABLE OTSNA (
    id smallserial NOT NULL,
    tank_id INTEGER NOT NULL PRIMARY KEY, 
    name TEXT NOT NULL, 
    tier INTEGER NOT NULL, 
    class TEXT NOT NULL, 
    nation TEXT NOT NULL, 
    isPrem BOOLEAN NOT NULL,

    owned INTEGER NOT NULL,
    avgBattles INTEGER NOT NULL,
    avgWinrate REAL NOT NULL,
    avgWN8 INTEGER NOT NULL,
    avgDamage INTEGER NOT NULL,
    avgFrags REAL NOT NULL,
    dmgRatio REAL NOT NULL,
    KD REAL NOT NULL,
    avgXP REAL NOT NULL,
    hits REAL NOT NULL,
    avgSpots REAL NOT NULL,
    armorEff REAL NOT NULL,
    ThreeMark REAL NOT NULL,
    ACE REAL NOT NULL,

    DPGpercentiles INTEGER[],
    WN8percentiles INTEGER[]
);

CREATE TABLE playerCount (
    id smallserial NOT NULL,
    name TEXT NOT NULL PRIMARY KEY, 
    numPlayers INTEGER NOT NULL
);

CREATE TABLE NAcurves (
    id smallserial NOT NULL,
    tank_id INTEGER NOT NULL PRIMARY KEY, 
    name TEXT NOT NULL, 
    WR42 REAL, WR43 REAL, WR44 REAL, WR45 REAL, WR46 REAL, WR47 REAL, WR48 REAL, WR49 REAL, WR50 REAL, WR51 REAL, WR52 REAL, WR53 REAL,
    WR54 REAL, WR55 REAL, WR56 REAL, WR57 REAL, WR58 REAL, WR59 REAL, WR60 REAL, WR61 REAL, WR62 REAL, WR63 REAL, WR64 REAL, WR65 REAL,

    WN200 BIGINT, WN300 BIGINT, WN400 BIGINT, WN500 BIGINT, WN600 BIGINT, WN700 BIGINT, WN800 BIGINT, WN900 BIGINT, WN1000 BIGINT, WN1100 BIGINT, 
    WN1200 BIGINT, WN1300 BIGINT, WN1400 BIGINT, WN1500 BIGINT, WN1600 BIGINT, WN1700 BIGINT, WN1800 BIGINT, WN1900 BIGINT, WN2000 BIGINT, WN2100 BIGINT, 
    WN2200 BIGINT, WN2300 BIGINT, WN2400 BIGINT, WN2500 BIGINT, WN2600 BIGINT, WN2700 BIGINT, WN2800 BIGINT, WN2900 BIGINT, WN3000 BIGINT, WN3100 BIGINT, 
    WN3200 BIGINT, WN3300 BIGINT, WN3400 BIGINT, WN3500 BIGINT
);

CREATE TABLE NAcurvesCount (
    id smallserial NOT NULL,
    tank_id INTEGER NOT NULL PRIMARY KEY, 
    name TEXT NOT NULL, 
    WR42 INTEGER, WR43 INTEGER, WR44 INTEGER, WR45 INTEGER, WR46 INTEGER, WR47 INTEGER, WR48 INTEGER, WR49 INTEGER, WR50 INTEGER, WR51 INTEGER, WR52 INTEGER, WR53 INTEGER,
    WR54 INTEGER, WR55 INTEGER, WR56 INTEGER, WR57 INTEGER, WR58 INTEGER, WR59 INTEGER, WR60 INTEGER, WR61 INTEGER, WR62 INTEGER, WR63 INTEGER, WR64 INTEGER, WR65 INTEGER,

    WN200 INTEGER, WN300 INTEGER, WN400 INTEGER, WN500 INTEGER, WN600 INTEGER, WN700 INTEGER, WN800 INTEGER, WN900 INTEGER, WN1000 INTEGER, WN1100 INTEGER, 
    WN1200 INTEGER, WN1300 INTEGER, WN1400 INTEGER, WN1500 INTEGER, WN1600 INTEGER, WN1700 INTEGER, WN1800 INTEGER, WN1900 INTEGER, WN2000 INTEGER, WN2100 INTEGER, 
    WN2200 INTEGER, WN2300 INTEGER, WN2400 INTEGER, WN2500 INTEGER, WN2600 INTEGER, WN2700 INTEGER, WN2800 INTEGER, WN2900 INTEGER, WN3000 INTEGER, WN3100 INTEGER, 
    WN3200 INTEGER, WN3300 INTEGER, WN3400 INTEGER, WN3500 INTEGER
);

CREATE TABLE tankDataNA (
    id smallserial NOT NULL,
    tank_id INTEGER NOT NULL PRIMARY KEY, 
    name TEXT NOT NULL, 
    tier INTEGER NOT NULL, 
    class TEXT NOT NULL, 
    nation TEXT NOT NULL, 
    isPrem BOOLEAN NOT NULL,

    owned INTEGER NOT NULL,
    battles INTEGER NOT NULL,
    wins INTEGER NOT NULL,
    damage BIGINT NOT NULL,
    damage_received BIGINT NOT NULL,

    WN8 BIGINT NOT NULL,

    frags INTEGER NOT NULL,
    xp BIGINT NOT NULL,
    survived INTEGER NOT NULL,
    hits INTEGER NOT NULL,
    shots INTEGER NOT NULL,

    tanking_factor real NOT NULL,
    def INTEGER NOT NULL,
    cap INTEGER NOT NULL,
    explosion_hits_received INTEGER NOT NULL,
    no_damage_direct_hits_received INTEGER NOT NULL,
    
	blocked BIGINT NOT NULL,
	spotted INTEGER NOT NULL,
    explosion_hits INTEGER NOT NULL,
    
    threeMark INTEGER NOT NULL,
    twoMark INTEGER NOT NULL,
    oneMark INTEGER NOT NULL,
    ace INTEGER NOT NULL,
    firstClass INTEGER NOT NULL,
    secondClass INTEGER NOT NULL,
    thirdClass INTEGER NOT NULL,

    DPG INTEGER[],
    WN8s INTEGER[],

    totalWN8 BIGINT,
    totalWinrate BIGINT
);

CREATE TABLE naOverallstats (
    id serial NOT NULL,
    player_id INTEGER NOT NULL PRIMARY KEY, 
    username VARCHAR(24) NOT NULL, 
    WN8 INTEGER NOT NULL,
    Winrate REAL NOT NULL, 
    battles INTEGER NOT NULL,
    creationtime INTEGER NOT NULL
);

*/