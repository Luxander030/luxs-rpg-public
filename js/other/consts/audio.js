/*
###########################################################################################

Elevator Music

###########################################################################################
*/

const elevatorMusic = new Audio("sfx/music/Elevator-music.mp3");

/*
###########################################################################################

Combat/Player SFX

###########################################################################################
*/

const healSFX = new Audio("sfx/player_sfx/player_heal.wav");
function playHealSFX() {
    healSFX.currentTime = 0;
    healSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const hurtSFX = new Audio("sfx/player_sfx/player_hurt.wav");
function playHurtSFX() {
    hurtSFX.currentTime = 0;
    hurtSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const playerHeartCrack = new Audio("sfx/player_sfx/player_death/heart_crack.wav");
function playHeartCrackSFX() {
    playerHeartCrack.currentTime = 0;
    playerHeartCrack.play().catch(e => console.log("Audio playback prevented:", e));
}

const playerHit = new Audio("sfx/player_sfx/player_attack/player_hit.wav");
function playPlayerAtkHitSFX() {
    playerHit.currentTime = 0;
    playerHit.play().catch(e => console.log("Audio playback prevented:", e));
}

const playerHitHeavy = new Audio("sfx/player_sfx/player_attack/player_heavydamage.wav");
function playPlayerAtkHitHeavySFX() {
    playerHitHeavy.currentTime = 0;
    playerHitHeavy.play().catch(e => console.log("Audio playback prevented:", e));
}

const iceshockSFX = new Audio("sfx/player_sfx/player_attack/player_iceshock.wav");
function playIceshockSFX() {
    iceshockSFX.currentTime = 0;
    iceshockSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const combatStartSFX = new Audio("sfx/combat/combat_start.wav");
function playCombatStartSFX() {
    combatStartSFX.currentTime = 0;
    combatStartSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const cantSelectSFX = new Audio("sfx/snd_cantselect.wav");
function playCantSelectSFX() {
    cantSelectSFX.currentTime = 0;
    cantSelectSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const itemUseSFX = new Audio("sfx/player_sfx/itemUse.wav");
function playItemUseSFX() {
    itemUseSFX.currentTime = 0;
    itemUseSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const menuBtnClickedSFX = new Audio("sfx/btnClicked.wav");
function playMenuButtonClickSFX() {
    menuBtnClickedSFX.currentTime = 0;
    menuBtnClickedSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const saveSFX = new Audio("sfx/player_sfx/save.wav");
function playSaveSFX() {
    saveSFX.currentTime = 0;
    saveSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const coinSFX = new Audio("sfx/player_sfx/coin.wav");
function playCoinSFX() {
    coinSFX.currentTime = 0;
    coinSFX.play().catch(e => console.log("Audio playback prevented:", e));
}

/*
###########################################################################################

Shop SFX

###########################################################################################
*/

const dmgMultBuySFX = new Audio("sfx/shop/dmg_mult.wav");
function playDmgMultBuySFX() {
    dmgMultBuySFX.currentTime = 0;
    dmgMultBuySFX.play().catch(e => console.log("Audio playback prevented:", e));
}

const shopBuySFX = new Audio("sfx/shop/buy_item.wav");
function playShopBuySFX() {
    shopBuySFX.currentTime = 0;
    shopBuySFX.play().catch(e => console.log("Audio playback prevented:", e));
}