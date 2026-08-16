// ============================================================
// LOOT BOX SYSTEM
// ============================================================

const lootBoxTiers = [
    {
        id: "basic",
        name: "Basic Loot Box",
        color: "var(--commonItem)",
        gemCost: 10,
        rolls: 7,
        pool: [
            { weight: 60, run: () => { const amt = 50n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 50, run: () => { tryAddItem("Apple"); return { label: "Item", value: "Apple", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Health Vial"); return { label: "Item", value: "Health Vial", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Mana Well"); return { label: "Item", value: "Mana Well", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Clarity Tonic"); return { label: "Item", value: "Clarity Tonic", color: "var(--commonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("Bottle O' Water"); return { label: "Item", value: "Bottle O' Water", color: "var(--commonItem)" }; }},
            { weight: 20, run: () => { const amt = 1n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 10, run: () => { tryAddItem("Blood Stone"); return { label: "Item", value: "Blood Stone", color: "var(--rareItem)" }; }},
        ]
    },
    {
        id: "uncommon",
        name: "Uncommon Loot Box",
        color: "var(--uncommonItem)",
        gemCost: 25,
        rolls: 6,
        pool: [
            { weight: 50, run: () => { const amt = 150n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 40, run: () => { tryAddItem("Blood Stone"); return { label: "Item", value: "Blood Stone", color: "var(--rareItem)" }; }},
            { weight: 40, run: () => { tryAddItem("Abbie's Apple"); return { label: "Item", value: "Abbie's Apple", color: "var(--epicItem)" }; }},
            { weight: 35, run: () => { const amt = 3n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 35, run: () => { const amt = 100n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { tryAddItem("Martyr's Book"); return { label: "Item", value: "Martyr's Book", color: "var(--rareItem)" }; }},
            { weight: 25, run: () => { const amt = 10n * p.lv; p.mhp += amt; p.hp += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} Max HP`, color: "var(--hp)" }; }},
            { weight: 20, run: () => { tryAddItem("The Fool (0)"); return { label: "Tarot Card", value: "The Fool (0)", color: "var(--commonItem)" }; }},
            { weight: 15, run: () => { tryAddItem("The Empress (3)"); return { label: "Tarot Card", value: "The Empress (3)", color: "var(--uncommonItem)" }; }},
            { weight: 5,  run: () => { tryAddItem("Stone Sword"); return { label: "Item", value: "Stone Sword", color: "var(--uncommonItem)" }; }},
        ]
    },
    {
        id: "rare",
        name: "Rare Loot Box",
        color: "var(--rareItem)",
        gemCost: 60,
        rolls: 5,
        pool: [
            { weight: 50, run: () => { const amt = 500n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 40, run: () => { const amt = 500n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 35, run: () => { const amt = 5n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { const amt = 25n * p.lv; p.mhp += amt; p.hp += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} Max HP`, color: "var(--hp)" }; }},
            { weight: 30, run: () => { const amt = 25n * p.lv; p.mmp += amt; p.mp += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} Max MP`, color: "var(--mana)" }; }},
            { weight: 30, run: () => { const amt = 25n * p.lv; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} Max SN`, color: "var(--sanity)" }; }},
            { weight: 25, run: () => { tryAddItem("Medium Blood Stone"); return { label: "Item", value: "Medium Blood Stone", color: "var(--epicItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Hierophant (5)"); return { label: "Tarot Card", value: "The Hierophant (5)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Emperor (4)"); return { label: "Tarot Card", value: "The Emperor (4)", color: "var(--rareItem)" }; }},
            { weight: 15, run: () => { tryAddItem("Iron Sword"); return { label: "Item", value: "Iron Sword", color: "var(--rareItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Talisman"); return { label: "Spectral Card", value: "(Spectral Card) Talisman", color: "var(--epicItem)" }; }},
            { weight: 5,  run: () => { const amt = 5n; p.dmgmult += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)}% DMG Multiplier`, color: "#ff4757" }; }},
        ]
    },
    {
        id: "epic",
        name: "Epic Loot Box",
        color: "var(--epicItem)",
        gemCost: 150,
        rolls: 4,
        pool: [
            { weight: 40, run: () => { const amt = 2000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 35, run: () => { const amt = 2000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { const amt = 10n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 25, run: () => { const amt = 75n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 25, run: () => { const amt = 10n; p.dmgmult += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)}% DMG Multiplier`, color: "#ff4757" }; }},
            { weight: 20, run: () => { tryAddItem("Large Blood Stone"); return { label: "Item", value: "Large Blood Stone", color: "var(--legendaryItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Diamond Sword"); return { label: "Item", value: "Diamond Sword", color: "var(--epicItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The World (21)"); return { label: "Tarot Card", value: "The World (21)", color: "var(--legendaryItem)" }; }},
            { weight: 15, run: () => { tryAddItem("(Spectral Card) Cryptid"); return { label: "Spectral Card", value: "(Spectral Card) Cryptid", color: "var(--epicItem)" }; }},
            { weight: 15, run: () => { tryAddItem("(Spectral Card) Black Hole"); return { label: "Spectral Card", value: "(Spectral Card) Black Hole", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Corrucyst"); return { label: "Item", value: "Corrucyst", color: "var(--legendaryItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Mindspike"); return { label: "Item", value: "Mindspike", color: "var(--legendaryItem)" }; }},
            { weight: 5,  run: () => { p.manaReduction = BigMath.min(p.manaReduction + 5n, 100n); return { label: "Stat Boost", value: "+5% Mana Reduction", color: "var(--mana)" }; }},
        ]
    },
    {
        id: "legendary",
        name: "Legendary Loot Box",
        color: "var(--legendaryItem)",
        gemCost: 400,
        rolls: 3,
        pool: [
            { weight: 35, run: () => { const amt = 10000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 30, run: () => { const amt = 10000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 25, run: () => { const amt = 25n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 20, run: () => { const amt = 200n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 20, run: () => { const amt = 25n; p.dmgmult += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)}% DMG Multiplier`, color: "#ff4757" }; }},
            { weight: 15, run: () => { tryAddItem("Nox Nocturnal"); return { label: "Weapon", value: "Nox Nocturnal", color: "var(--mythicItem)" }; }},
            { weight: 15, run: () => { tryAddItem("(Spectral Card) Soul"); return { label: "Spectral Card", value: "(Spectral Card) Soul", color: "var(--insaneItem)" }; }},
            { weight: 15, run: () => { tryAddItem("Lux's Runic Triangle"); return { label: "Item", value: "Lux's Runic Triangle", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Lux's Lemon"); return { label: "Item", value: "Lux's Lemon", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { p.manaReduction = BigMath.min(p.manaReduction + 10n, 100n); return { label: "Stat Boost", value: "+10% Mana Reduction", color: "var(--mana)" }; }},
            { weight: 5,  run: () => { tryAddItem("Frying Pan"); return { label: "Weapon", value: "Frying Pan", color: "var(--mythicItem)" }; }},
            { weight: 5,  run: () => { tryAddItem("Lux's Sandwich"); return { label: "Item", value: "Lux's Sandwich", color: "var(--insaneItem)" }; }},
        ]
    },
    {
        id: "mythic",
        name: "Mythic Loot Box",
        color: "var(--mythicItem)",
        gemCost: 1000,
        rolls: 2,
        pool: [
            { weight: 30, run: () => { const amt = 50000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 25, run: () => { const amt = 50000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 20, run: () => { const amt = 50n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 20, run: () => { const amt = 500n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 20, run: () => { const amt = 50n; p.dmgmult += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)}% DMG Multiplier`, color: "#ff4757" }; }},
            { weight: 15, run: () => { p.manaReduction = BigMath.min(p.manaReduction + 20n, 100n); return { label: "Stat Boost", value: "+20% Mana Reduction", color: "var(--mana)" }; }},
            { weight: 15, run: () => { tryAddItem("Frying Pan"); return { label: "Weapon", value: "Frying Pan", color: "var(--mythicItem)" }; }},
            { weight: 15, run: () => { tryAddItem("Nox Nocturnal"); return { label: "Weapon", value: "Nox Nocturnal", color: "var(--mythicItem)" }; }},
            { weight: 15, run: () => { tryAddItem("Chara's Knife"); return { label: "Weapon", value: "Chara's Knife", color: "var(--legendaryItem)" }; }},
            { weight: 12, run: () => { tryAddItem("(Spectral Card) Black Hole"); return { label: "Spectral Card", value: "(Spectral Card) Black Hole", color: "var(--insaneItem)" }; }},
            { weight: 12, run: () => { tryAddItem("(Spectral Card) Soul"); return { label: "Spectral Card", value: "(Spectral Card) Soul", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Lux's Lemon"); return { label: "Item", value: "Lux's Lemon", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Lux's Sandwich"); return { label: "Item", value: "Lux's Sandwich", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Lux's Runic Triangle"); return { label: "Item", value: "Lux's Runic Triangle", color: "var(--insaneItem)" }; }},
            { weight: 8,  run: () => { tryAddItem("Bob's Bread"); return { label: "Item", value: "Bob's Bread", color: "var(--insaneItem)" }; }},
            { weight: 5,  run: () => { tryAddItem("MissingNo.'s Core"); return { label: "Item", value: "MissingNo.'s Core", color: "var(--insaneItem)" }; }},
            { weight: 3,  run: () => { tryAddItem("Bob's Cardboard Box"); return { label: "Item", value: "Bob's Cardboard Box", color: "var(--insaneItem)" }; }},
        ]
    },
    {
        id: "insane",
        name: "??? Loot Box",
        color: "var(--insaneItem)",
        gemCost: 5000,
        rolls: 1,
        pool: [
            { weight: 25, run: () => { const amt = 500000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 20, run: () => { const amt = 500000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 20, run: () => { const amt = 150n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 20, run: () => { const amt = 2000n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 18, run: () => { const amt = 150n; p.dmgmult += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)}% DMG Multiplier`, color: "#ff4757" }; }},
            { weight: 15, run: () => { p.manaReduction = BigMath.min(p.manaReduction + 50n, 100n); return { label: "Stat Boost", value: "+50% Mana Reduction", color: "var(--mana)" }; }},
            { weight: 15, run: () => { p.lv += 1n; p.sp += 1n; return { label: "Level Up", value: "+1 LV", color: "var(--unlocked)" }; }},
            { weight: 12, run: () => { tryAddItem("Lux's Lemon"); return { label: "Item", value: "Lux's Lemon", color: "var(--insaneItem)" }; }},
            { weight: 12, run: () => { tryAddItem("Lux's Sandwich"); return { label: "Item", value: "Lux's Sandwich", color: "var(--insaneItem)" }; }},
            { weight: 12, run: () => { tryAddItem("Lux's Runic Triangle"); return { label: "Item", value: "Lux's Runic Triangle", color: "var(--insaneItem)" }; }},
            { weight: 12, run: () => { tryAddItem("Bob's Bread"); return { label: "Item", value: "Bob's Bread", color: "var(--insaneItem)" }; }},
            { weight: 12, run: () => { tryAddItem("Bob's Cardboard Box"); return { label: "Item", value: "Bob's Cardboard Box", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Soul"); return { label: "Spectral Card", value: "(Spectral Card) Soul", color: "var(--insaneItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Black Hole"); return { label: "Spectral Card", value: "(Spectral Card) Black Hole", color: "var(--insaneItem)" }; }},
            { weight: 8,  run: () => { tryAddItem("MissingNo.'s Core"); return { label: "Item", value: "MissingNo.'s Core", color: "var(--insaneItem)" }; }},
            { weight: 8,  run: () => { tryAddItem("Frying Pan"); return { label: "Weapon", value: "Frying Pan", color: "var(--mythicItem)" }; }},
            { weight: 8,  run: () => { tryAddItem("Nox Nocturnal"); return { label: "Weapon", value: "Nox Nocturnal", color: "var(--mythicItem)" }; }},
            { weight: 5,  run: () => { tryAddItem("unobtainableItem"); return { label: "Item", value: "unobtainableItem", color: "var(--insaneItem)" }; }},
            { weight: 3,  run: () => { const amt = p.lv * 3n; p.lv += amt; p.sp += amt; return { label: "Level Up", value: `+${formatNumber(amt)} LV`, color: "var(--unlocked)" }; }},
            { weight: 1,  run: () => { tryAddItem("Bob's Cardboard Box"); tryAddItem("Bob's Bread"); tryAddItem("Lux's Sandwich"); tryAddItem("Lux's Lemon"); tryAddItem("Lux's Runic Triangle"); return { label: "JACKPOT", value: "All ??? Items!", color: "var(--insaneItem)" }; }},
            { weight: 0.2, run: () => { p.gems += 10000n; return {label: "Gem Jackpot!", value: "10K Gems!", color: "var(--epicItem)"};}}
        ]
    },

    // ============================================================
    // EVENT LOOT BOXES
    // ============================================================
    
    {
        id: "christmas",
        name: "🎄 Christmas Loot Box",
        color: "#2ed573",
        gemCost: 200,
        rolls: 5,
        condition: () => {
            const now = new Date();
            const month = now.getMonth(); // 0-indexed, 11 = December
            const day = now.getDate();
            return month === 11 && day >= 1 && day <= 31; // All of December
        },
        pool: [
            { weight: 40, run: () => { const amt = 5000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 35, run: () => { const amt = 5000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { const amt = 15n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 25, run: () => { const amt = 100n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 20, run: () => { tryAddItem("Santa's Gift"); return { label: "Item", value: "Santa's Gift", color: "#2ed573" }; }},
            { weight: 20, run: () => { tryAddItem("Candy Cane"); return { label: "Item", value: "Candy Cane", color: "#ff4757" }; }},
            { weight: 15, run: () => { tryAddItem("Warm Cocoa"); return { label: "Item", value: "Warm Cocoa", color: "#8B4513" }; }},
            { weight: 15, run: () => { tryAddItem("Gingerbread Man"); return { label: "Item", value: "Gingerbread Man", color: "#cd853f" }; }},
            { weight: 10, run: () => { tryAddItem("Snowglobe"); return { label: "Item", value: "Snowglobe", color: "#70a1ff" }; }},
            { weight: 5,  run: () => { tryAddItem("Lux's Christmas Card"); return { label: "Item", value: "Lux's Christmas Card", color: "var(--insaneItem)" }; }},
        ]
    },
    {
        id: "halloween",
        name: "🎃 Halloween Loot Box",
        color: "#ff6b00",
        gemCost: 200,
        rolls: 5,
        condition: () => {
            const now = new Date();
            const month = now.getMonth();
            const day = now.getDate();
            return month === 9 && day >= 1 && day <= 31; // All of October
        },
        pool: [
            { weight: 40, run: () => { const amt = 5000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 35, run: () => { const amt = 5000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { const amt = 15n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 25, run: () => { const amt = 100n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 20, run: () => { tryAddItem("Trick or Treat Bag"); return { label: "Item", value: "Trick or Treat Bag", color: "#ff6b00" }; }},
            { weight: 20, run: () => { tryAddItem("Cursed Pumpkin"); return { label: "Item", value: "Cursed Pumpkin", color: "#ff6b00" }; }},
            { weight: 15, run: () => { tryAddItem("Witch's Brew"); return { label: "Item", value: "Witch's Brew", color: "#a29bfe" }; }},
            { weight: 15, run: () => { tryAddItem("Skeleton Key"); return { label: "Item", value: "Skeleton Key", color: "#dfe6e9" }; }},
            { weight: 10, run: () => { tryAddItem("Jack O' Lantern"); return { label: "Item", value: "Jack O' Lantern", color: "#ff6b00" }; }},
            { weight: 5,  run: () => { tryAddItem("Lux's Halloween Mask"); return { label: "Item", value: "Lux's Halloween Mask", color: "var(--insaneItem)" }; }},
        ]
    },
    {
        id: "newyear",
        name: "🎆 New Year Loot Box",
        color: "#ffd700",
        gemCost: 200,
        rolls: 5,
        condition: () => {
            const now = new Date();
            const month = now.getMonth();
            const day = now.getDate();
            return (month === 11 && day === 31) || (month === 0 && day === 1); // Dec 31 and Jan 1
        },
        pool: [
            { weight: 40, run: () => { const amt = 10000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 35, run: () => { const amt = 10000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { const amt = 20n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 25, run: () => { const amt = 200n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            { weight: 20, run: () => { tryAddItem("Firework"); return { label: "Item", value: "Firework", color: "#ffd700" }; }},
            { weight: 15, run: () => { tryAddItem("Champagne"); return { label: "Item", value: "Champagne", color: "#ffd700" }; }},
            { weight: 10, run: () => { tryAddItem("Countdown Clock"); return { label: "Item", value: "Countdown Clock", color: "#ffd700" }; }},
            { weight: 5,  run: () => { tryAddItem("Lux's New Year Message"); return { label: "Item", value: "Lux's New Year Message", color: "var(--insaneItem)" }; }},
        ]
    },
    {
        id: "test",
        name: "test",
        color: "#ffd700",
        gemCost: 1,
        rolls: 10,
        condition: () => {
            const now = new Date();
            const month = now.getMonth();
            return (month === -1)
        },
        pool: [
            // Stats
            { weight: 40, run: () => { const amt = 10000n * p.lv; p.gold += amt; p.totalGold += amt; return { label: "Gold", value: `+${formatNumber(amt)}g`, color: "var(--gold)" }; }},
            { weight: 35, run: () => { const amt = 10000n * p.lv; addExperience(amt); return { label: "EXP", value: `+${formatNumber(amt)} EXP`, color: "var(--exp)" }; }},
            { weight: 30, run: () => { const amt = 20n * p.lv; p.sp += amt; return { label: "Skill Points", value: `+${formatNumber(amt)} SP`, color: "var(--exp)" }; }},
            { weight: 25, run: () => { const amt = 200n * p.lv; p.mhp += amt; p.hp += amt; p.mmp += amt; p.mp += amt; p.msn += amt; p.sn += amt; return { label: "Stat Boost", value: `+${formatNumber(amt)} All Stats`, color: "var(--unlocked)" }; }},
            // Common items
            { weight: 50, run: () => { tryAddItem("Apple"); return { label: "Item", value: "Apple", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Health Vial"); return { label: "Item", value: "Health Vial", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Mana Well"); return { label: "Item", value: "Mana Well", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Clarity Tonic"); return { label: "Item", value: "Clarity Tonic", color: "var(--commonItem)" }; }},
            { weight: 50, run: () => { tryAddItem("Bottle O' Water"); return { label: "Item", value: "Bottle O' Water", color: "var(--commonItem)" }; }},
            { weight: 45, run: () => { tryAddItem("Black Shard"); return { label: "Item", value: "Black Shard", color: "var(--commonItem)" }; }},
            { weight: 45, run: () => { tryAddItem("Armored Carapace"); return { label: "Item", value: "Armored Carapace", color: "var(--commonItem)" }; }},
            { weight: 45, run: () => { tryAddItem("Elf Ear"); return { label: "Item", value: "Elf Ear", color: "var(--commonItem)" }; }},
            { weight: 40, run: () => { tryAddItem("Rock"); return { label: "Item", value: "Rock", color: "var(--commonItem)" }; }},
            { weight: 40, run: () => { tryAddItem("Ash"); return { label: "Item", value: "Ash", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Glass Shard"); return { label: "Item", value: "Glass Shard", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Gambler's Coin"); return { label: "Item", value: "Gambler's Coin", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Small Bag of Gold"); return { label: "Item", value: "Small Bag of Gold", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Medium Bag of Gold"); return { label: "Item", value: "Medium Bag of Gold", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Large Bag of Gold"); return { label: "Item", value: "Large Bag of Gold", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Iron Bar"); return { label: "Item", value: "Iron Bar", color: "var(--commonItem)" }; }},
            { weight: 35, run: () => { tryAddItem("Chunk of Iron"); return { label: "Item", value: "Chunk of Iron", color: "var(--commonItem)" }; }},
            // Tarot - Common/Uncommon
            { weight: 35, run: () => { tryAddItem("The Fool (0)"); return { label: "Tarot Card", value: "The Fool (0)", color: "var(--commonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The Magician (1)"); return { label: "Tarot Card", value: "The Magician (1)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The High Priestess (2)"); return { label: "Tarot Card", value: "The High Priestess (2)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The Empress (3)"); return { label: "Tarot Card", value: "The Empress (3)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The Lovers (6)"); return { label: "Tarot Card", value: "The Lovers (6)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The Hermit (9)"); return { label: "Tarot Card", value: "The Hermit (9)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The Hanged Man (12)"); return { label: "Tarot Card", value: "The Hanged Man (12)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("Temperance (14)"); return { label: "Tarot Card", value: "Temperance (14)", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("The Star (17)"); return { label: "Tarot Card", value: "The Star (17)", color: "var(--uncommonItem)" }; }},
            // Tarot - Rare
            { weight: 20, run: () => { tryAddItem("The Emperor (4)"); return { label: "Tarot Card", value: "The Emperor (4)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Hierophant (5)"); return { label: "Tarot Card", value: "The Hierophant (5)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Chariot (7)"); return { label: "Tarot Card", value: "The Chariot (7)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Justice (8)"); return { label: "Tarot Card", value: "Justice (8)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Wheel of Fortune (10)"); return { label: "Tarot Card", value: "The Wheel of Fortune (10)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Strength (11)"); return { label: "Tarot Card", value: "Strength (11)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Death (13)"); return { label: "Tarot Card", value: "Death (13)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Devil (15)"); return { label: "Tarot Card", value: "The Devil (15)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Tower (16)"); return { label: "Tarot Card", value: "The Tower (16)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Moon (18)"); return { label: "Tarot Card", value: "The Moon (18)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("The Sun (19)"); return { label: "Tarot Card", value: "The Sun (19)", color: "var(--rareItem)" }; }},
            // Tarot - Epic/Legendary
            { weight: 10, run: () => { tryAddItem("Judgement (20)"); return { label: "Tarot Card", value: "Judgement (20)", color: "var(--epicItem)" }; }},
            { weight: 5,  run: () => { tryAddItem("The World (21)"); return { label: "Tarot Card", value: "The World (21)", color: "var(--legendaryItem)" }; }},
            // Uncommon items
            { weight: 30, run: () => { tryAddItem("Drow Elf Ear"); return { label: "Item", value: "Drow Elf Ear", color: "var(--uncommonItem)" }; }},
            { weight: 30, run: () => { tryAddItem("Stone Sword"); return { label: "Item", value: "Stone Sword", color: "var(--uncommonItem)" }; }},
            // Rare items
            { weight: 20, run: () => { tryAddItem("Blood Stone"); return { label: "Item", value: "Blood Stone", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Martyr's Book"); return { label: "Item", value: "Martyr's Book", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Blood Bat Eye"); return { label: "Item", value: "Blood Bat Eye", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Vampire Tooth"); return { label: "Item", value: "Vampire Tooth", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Iron Sword"); return { label: "Item", value: "Iron Sword", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Converter (HP ➡ MP)"); return { label: "Item", value: "Converter (HP ➡ MP)", color: "var(--rareItem)" }; }},
            { weight: 20, run: () => { tryAddItem("Converter (HP ➡ SN)"); return { label: "Item", value: "Converter (HP ➡ SN)", color: "var(--rareItem)" }; }},
            // Epic items
            { weight: 10, run: () => { tryAddItem("Abbie's Apple"); return { label: "Item", value: "Abbie's Apple", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Medium Blood Stone"); return { label: "Item", value: "Medium Blood Stone", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Glass Hourglass"); return { label: "Item", value: "Glass Hourglass", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Diamond"); return { label: "Item", value: "Diamond", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Diamond Sword"); return { label: "Item", value: "Diamond Sword", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("Converter (SN ➡ SP)"); return { label: "Item", value: "Converter (SN ➡ SP)", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Familiar"); return { label: "Spectral Card", value: "(Spectral Card) Familiar", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Grim"); return { label: "Spectral Card", value: "(Spectral Card) Grim", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Incantation"); return { label: "Spectral Card", value: "(Spectral Card) Incantation", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Talisman"); return { label: "Spectral Card", value: "(Spectral Card) Talisman", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Aura"); return { label: "Spectral Card", value: "(Spectral Card) Aura", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Wraith"); return { label: "Spectral Card", value: "(Spectral Card) Wraith", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Sigil"); return { label: "Spectral Card", value: "(Spectral Card) Sigil", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Ouija"); return { label: "Spectral Card", value: "(Spectral Card) Ouija", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Ankh"); return { label: "Spectral Card", value: "(Spectral Card) Ankh", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Immolate"); return { label: "Spectral Card", value: "(Spectral Card) Immolate", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Déjà Vu"); return { label: "Spectral Card", value: "(Spectral Card) Déjà Vu", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Hex"); return { label: "Spectral Card", value: "(Spectral Card) Hex", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Trance"); return { label: "Spectral Card", value: "(Spectral Card) Trance", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Medium"); return { label: "Spectral Card", value: "(Spectral Card) Medium", color: "var(--epicItem)" }; }},
            { weight: 10, run: () => { tryAddItem("(Spectral Card) Cryptid"); return { label: "Spectral Card", value: "(Spectral Card) Cryptid", color: "var(--epicItem)" }; }},
            // Legendary items
            { weight: 5, run: () => { tryAddItem("Large Blood Stone"); return { label: "Item", value: "Large Blood Stone", color: "var(--legendaryItem)" }; }},
            { weight: 5, run: () => { tryAddItem("Desperation Totem"); return { label: "Item", value: "Desperation Totem", color: "var(--legendaryItem)" }; }},
            { weight: 5, run: () => { tryAddItem("Taxman's Ledger"); return { label: "Item", value: "Taxman's Ledger", color: "var(--legendaryItem)" }; }},
            { weight: 5, run: () => { tryAddItem("Miss Circle's Oreo Pack"); return { label: "Item", value: "Miss Circle's Oreo Pack", color: "var(--legendaryItem)" }; }},
            { weight: 5, run: () => { tryAddItem("Corrucyst"); return { label: "Item", value: "Corrucyst", color: "var(--legendaryItem)" }; }},
            { weight: 5, run: () => { tryAddItem("Mindspike"); return { label: "Item", value: "Mindspike", color: "var(--legendaryItem)" }; }},
            { weight: 5, run: () => { tryAddItem("Chara's Knife"); return { label: "Item", value: "Chara's Knife", color: "var(--legendaryItem)" }; }},
            // Mythic items
            { weight: 3, run: () => { tryAddItem("Nox Nocturnal"); return { label: "Weapon", value: "Nox Nocturnal", color: "var(--mythicItem)" }; }},
            { weight: 3, run: () => { tryAddItem("Frying Pan"); return { label: "Weapon", value: "Frying Pan", color: "var(--mythicItem)" }; }},
            // ??? items
            { weight: 2, run: () => { tryAddItem("Lux's Runic Triangle"); return { label: "Item", value: "Lux's Runic Triangle", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("Lux's Sandwich"); return { label: "Item", value: "Lux's Sandwich", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("Lux's Lemon"); return { label: "Item", value: "Lux's Lemon", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("Bob's Bread"); return { label: "Item", value: "Bob's Bread", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("Bob's Cardboard Box"); return { label: "Item", value: "Bob's Cardboard Box", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("MissingNo.'s Core"); return { label: "Item", value: "MissingNo.'s Core", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("(Spectral Card) Soul"); return { label: "Spectral Card", value: "(Spectral Card) Soul", color: "var(--insaneItem)" }; }},
            { weight: 2, run: () => { tryAddItem("(Spectral Card) Black Hole"); return { label: "Spectral Card", value: "(Spectral Card) Black Hole", color: "var(--insaneItem)" }; }},
            { weight: 1, run: () => { tryAddItem("unobtainableItem"); return { label: "Item", value: "unobtainableItem", color: "var(--insaneItem)" }; }},
            // Event items
            { weight: 8, run: () => { tryAddItem("Santa's Gift"); return { label: "Item", value: "Santa's Gift", color: "#2ed573" }; }},
            { weight: 8, run: () => { tryAddItem("Candy Cane"); return { label: "Item", value: "Candy Cane", color: "#ff4757" }; }},
            { weight: 8, run: () => { tryAddItem("Warm Cocoa"); return { label: "Item", value: "Warm Cocoa", color: "#8B4513" }; }},
            { weight: 8, run: () => { tryAddItem("Gingerbread Man"); return { label: "Item", value: "Gingerbread Man", color: "#cd853f" }; }},
            { weight: 6, run: () => { tryAddItem("Snowglobe"); return { label: "Item", value: "Snowglobe", color: "#70a1ff" }; }},
            { weight: 2, run: () => { tryAddItem("Lux's Christmas Card"); return { label: "Item", value: "Lux's Christmas Card", color: "var(--insaneItem)" }; }},
            { weight: 8, run: () => { tryAddItem("Trick or Treat Bag"); return { label: "Item", value: "Trick or Treat Bag", color: "#ff6b00" }; }},
            { weight: 8, run: () => { tryAddItem("Cursed Pumpkin"); return { label: "Item", value: "Cursed Pumpkin", color: "#ff6b00" }; }},
            { weight: 6, run: () => { tryAddItem("Witch's Brew"); return { label: "Item", value: "Witch's Brew", color: "#a29bfe" }; }},
            { weight: 6, run: () => { tryAddItem("Skeleton Key"); return { label: "Item", value: "Skeleton Key", color: "#dfe6e9" }; }},
            { weight: 5, run: () => { tryAddItem("Jack O' Lantern"); return { label: "Item", value: "Jack O' Lantern", color: "#ff6b00" }; }},
            { weight: 2, run: () => { tryAddItem("Lux's Halloween Mask"); return { label: "Item", value: "Lux's Halloween Mask", color: "var(--insaneItem)" }; }},
            { weight: 8, run: () => { tryAddItem("Firework"); return { label: "Item", value: "Firework", color: "#ffd700" }; }},
            { weight: 8, run: () => { tryAddItem("Champagne"); return { label: "Item", value: "Champagne", color: "#ffd700" }; }},
            { weight: 6, run: () => { tryAddItem("Countdown Clock"); return { label: "Item", value: "Countdown Clock", color: "#ffd700" }; }},
            { weight: 2, run: () => { tryAddItem("Lux's New Year Message"); return { label: "Item", value: "Lux's New Year Message", color: "var(--insaneItem)" }; }},
        ]
    },

];

// ============================================================
// LOOT BOX UI
// ============================================================

function openLootBoxUI() {
    // Remove existing overlay if open
    const existing = document.getElementById('lootbox-overlay');
    if (existing) existing.remove();

    // Clean up any leftover tooltips
    document.querySelectorAll('[id^="pool-tip-"]').forEach(t => t.remove());

    const overlay = document.createElement('div');
    overlay.id = 'lootbox-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow-y: auto;
        padding: 32px 16px;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 800px;
        margin-bottom: 24px;
    `;
    header.innerHTML = `
        <h2 style="color: white; font-size: 1.4rem;">Loot Boxes</h2>
        <span style="color: var(--gold); font-size: 1rem;"><img src="images/gem.png" style="width:32px; height:32px;vertical-align:middle;margin-right:4px;">${formatNumber(p.gems ?? 0n)} Gems</span>
    `;


    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ Close';
    closeBtn.style.cssText = `
        background: #2f3542;
        color: white;
        border: none;
        padding: 6px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    `;
    closeBtn.onclick = () => {
        document.querySelectorAll('[id^="pool-tip-"]').forEach(t => t.remove());
        overlay.remove();
    };
    header.appendChild(closeBtn);

    // Box grid
    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 16px;
        width: 100%;
        max-width: 800px;
    `;

    lootBoxTiers.filter(tier => !tier.condition || tier.condition()).forEach(tier => {
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1a1a;
            border: 2px solid ${tier.color};
            border-radius: 8px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            text-align: center;
        `;

        card.innerHTML = `
            <div style="font-size: 1.1rem; font-weight: bold; color: ${tier.color};">${tier.name}</div>
            <div style="font-size: 0.8rem; color: #a4b0be;">${tier.rolls} rolls per open</div>
            <div style="font-size: 0.9rem; color: var(--gold);"><img src="images/gem.png" style="width:28px;height:28px;vertical-align:middle;margin-right:4px;">${tier.gemCost} Gems</div>
        `;


        const openBtn = document.createElement('button');
        openBtn.textContent = 'Open';
        openBtn.style.cssText = `
            background: ${tier.color};
            color: #000;
            border: none;
            padding: 8px 24px;
            border-radius: 4px;
            font-size: 0.9rem;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
            margin-top: 4px;
        `;

        // Build pool tooltip
        const poolTooltip = document.createElement('div');
        poolTooltip.id = `pool-tip-${tier.id}`;
        poolTooltip.style.cssText = `
            position: fixed;
            background: #1e1e24;
            border: 1px solid ${tier.color};
            border-radius: 8px;
            padding: 12px;
            color: white;
            font-size: 0.8em;
            max-width: 260px;
            pointer-events: none;
            display: none;
            z-index: 99999999;
            max-height: 85vh;
            overflow-y: auto;
        `;

        const totalWeight = tier.pool.reduce((sum, entry) => sum + entry.weight, 0);
        let tooltipHTML = `<div style="font-weight: bold; color: ${tier.color}; margin-bottom: 8px; border-bottom: 1px solid #2f3542; padding-bottom: 6px;">Possible Rewards</div>`;

        tier.pool.forEach(entry => {
            const chance = ((entry.weight / totalWeight) * 100).toFixed(1);

            // Save current stats
            const savedStats = {
                hp: p.hp, mhp: p.mhp,
                mp: p.mp, mmp: p.mmp,
                sn: p.sn, msn: p.msn,
                gold: p.gold, totalGold: p.totalGold,
                sp: p.sp, exp: p.exp,
                lv: p.lv, dmgmult: p.dmgmult,
                manaReduction: p.manaReduction,
                kills: p.kills,
                spares: p.spares,
                gems: p.gems
            };

            // Save inventory state
            const savedInventory = JSON.parse(JSON.stringify(p.inventory));

            // Intercept functions to capture what the entry does without applying it
            let previewLabel = "Unknown";
            const origLog = window.log;
            const origTryAddItem = window.tryAddItem;
            const origCheckSpace = window.checkSpaceAndAddItem;
            const origAddExp = window.addExperience;

            window.log = () => {};
            window.addExperience = () => {};
            window.tryAddItem = (name) => { previewLabel = name; };
            window.checkSpaceAndAddItem = (name) => { previewLabel = name; };

            try {
                const result = entry.run();
                if (result && result.value) previewLabel = result.value;
            } catch(e) {}

            // Restore everything
            window.log = origLog;
            window.tryAddItem = origTryAddItem;
            window.checkSpaceAndAddItem = origCheckSpace;
            window.addExperience = origAddExp;

            p.hp = savedStats.hp; p.mhp = savedStats.mhp;
            p.mp = savedStats.mp; p.mmp = savedStats.mmp;
            p.sn = savedStats.sn; p.msn = savedStats.msn;
            p.gold = savedStats.gold; p.totalGold = savedStats.totalGold;
            p.sp = savedStats.sp; p.exp = savedStats.exp;
            p.lv = savedStats.lv; p.dmgmult = savedStats.dmgmult;
            p.manaReduction = savedStats.manaReduction;
            p.kills = savedStats.kills;
            p.spares = savedStats.spares;
            p.gems = savedStats.gems;
            p.inventory = savedInventory;

            tooltipHTML += `
                <div style="display: flex; justify-content: space-between; gap: 12px; padding: 3px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="color: #e1e1e6;">${previewLabel}</span>
                    <span style="color: ${tier.color}; white-space: nowrap;">${chance}%</span>
                </div>
            `;
        });

        poolTooltip.innerHTML = tooltipHTML;
        document.body.appendChild(poolTooltip);

        const updateTooltipPos = (e) => {
            let x = e.clientX + 15;
            let y = e.clientY + 15;
            if (x + 275 > window.innerWidth) x = e.clientX - 275;
            if (y + poolTooltip.offsetHeight > window.innerHeight) y = window.innerHeight - poolTooltip.offsetHeight - 10;
            poolTooltip.style.left = x + 'px';
            poolTooltip.style.top = y + 'px';
        };

        openBtn.onmouseenter = (e) => {
            poolTooltip.style.display = 'block';
            updateTooltipPos(e);
        };
        openBtn.onmousemove = (e) => updateTooltipPos(e);
        openBtn.onmouseleave = () => {
            poolTooltip.style.display = 'none';
            openBtn.style.opacity = '1';
        };

        openBtn.onclick = () => {
            if ((p.gems ?? 0n) < BigInt(tier.gemCost)) {
                log(`You don't have enough gems! Need ${tier.gemCost} <img src="images/gem.png" style="width:14px;height:14px;vertical-align:middle;">`, "#ff4757");
                playCantSelectSFX();
                return;
            }
            p.gems = (p.gems ?? 0n) - BigInt(tier.gemCost);
            const rewards = rollLootBox(tier);
            showLootBoxResults(tier, rewards, overlay);
            updateUI();
        };

        card.appendChild(openBtn);
        grid.appendChild(card);
    });

    overlay.appendChild(header);
    overlay.appendChild(grid);
    document.body.appendChild(overlay);
}

// ============================================================
// ROLL LOGIC
// ============================================================

function rollLootBox(tier) {
    if (typeof awardAchievement === "function") awardAchievement("openedLootBox");
    const rewards = [];

    for (let i = 0; i < tier.rolls; i++) {
        const pool = tier.pool;
        const totalWeight = pool.reduce((sum, entry) => sum + entry.weight, 0);
        let roll = Math.random() * totalWeight;

        for (const entry of pool) {
            roll -= entry.weight;
            if (roll <= 0) {
                const result = entry.run();
                rewards.push(result);
                break;
            }
        }
    }

    return rewards;
}

// ============================================================
// RESULTS UI
// ============================================================

function showLootBoxResults(tier, rewards, parentOverlay) {
    // Dim the parent
    parentOverlay.style.display = 'none';

    const resultsOverlay = document.createElement('div');
    resultsOverlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 32px;
    `;

    const title = document.createElement('div');
    title.style.cssText = `font-size: 1.3rem; font-weight: bold; color: ${tier.color};`;
    title.textContent = `${tier.name} — Results`;

    const rewardList = document.createElement('div');
    rewardList.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        max-width: 400px;
    `;

    rewards.forEach((reward, i) => {
        const row = document.createElement('div');
        row.style.cssText = `
            background: #1a1a1a;
            border: 1px solid #2f3542;
            border-radius: 6px;
            padding: 10px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        row.innerHTML = `
            <span style="color: #a4b0be; font-size: 0.85rem;">${reward.label}</span>
            <span style="color: ${reward.color}; font-weight: bold; font-size: 0.9rem;">${reward.value}</span>
        `;
        rewardList.appendChild(row);

        // Staggered reveal animation
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, i * 150);
    });

    const gemDisplay = document.createElement('div');
    gemDisplay.style.cssText = `color: var(--gold); font-size: 0.9rem; margin-top: 8px;`;
    gemDisplay.innerHTML = `<img src="images/gem.png" style="width:28px;height:28px;vertical-align:middle;margin-right:4px;">Remaining Gems: ${formatNumber(p.gems ?? 0n)}`;

    const btnRow = document.createElement('div');
    btnRow.style.cssText = `display: flex; gap: 12px; margin-top: 8px;`;

    const openAgainBtn = document.createElement('button');
    openAgainBtn.innerHTML = `Open Again (<img src="images/gem.png" style="width:28px;height:28px;vertical-align:middle;margin-right:2px;">${tier.gemCost})`;
    openAgainBtn.style.cssText = `
        background: ${tier.color};
        color: #000;
        border: none;
        padding: 8px 20px;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
        font-weight: bold;
    `;
    openAgainBtn.onclick = () => {
        if ((p.gems ?? 0n) < BigInt(tier.gemCost)) {
            log(`You don't have enough gems! Need ${tier.gemCost} <img src="images/gem.png" style="width:14px;height:14px;vertical-align:middle;">`, "#ff4757");
            playCantSelectSFX();
            return;
        }
        p.gems = (p.gems ?? 0n) - BigInt(tier.gemCost);
        const newRewards = rollLootBox(tier);
        resultsOverlay.remove();
        showLootBoxResults(tier, newRewards, parentOverlay);
        updateUI();
    };

    const backBtn = document.createElement('button');
    backBtn.textContent = '← Back to Loot Boxes';
    backBtn.style.cssText = `
        background: #2f3542;
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
    `;
    backBtn.onclick = () => {
        resultsOverlay.remove();
        parentOverlay.style.display = 'flex';
        // Refresh gem count in header
        const gemSpan = parentOverlay.querySelector('span[style*="gold"]');
        if (gemSpan) gemSpan.innerHTML = `<img src="images/gem.png" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;">${formatNumber(p.gems ?? 0n)} Gems`;
    };

    btnRow.appendChild(openAgainBtn);
    btnRow.appendChild(backBtn);

    resultsOverlay.appendChild(title);
    resultsOverlay.appendChild(rewardList);
    resultsOverlay.appendChild(gemDisplay);
    resultsOverlay.appendChild(btnRow);
    document.body.appendChild(resultsOverlay);

    // Log the rewards
    log(`Opened a ${tier.name}:`, tier.color);
    rewards.forEach(r => log(`  → ${r.label}: ${r.value}`, r.color));
}