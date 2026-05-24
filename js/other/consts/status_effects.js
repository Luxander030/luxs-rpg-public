const statusEffects = [
    /*
    
    Name: The name of the effect
    description: the description of what the effect does
    flavor: just some lorebuilding info
    icon: the file path for the icon
    
    */
    {
        name: "Frozen",
        description: "Take 50% more damage",
        flavor: "The frozen do not know warmth. They only know the biting cold.",
        icon: "images/status_effects/frozen.png"
    },
    {
        name: "Stunned",
        description: "Enemy skips turns for as long as they have this effect",
        flavor: "Stunned enemies do not know the flow of time. To them, it seems frozen.",
        icon: "images/status_effects/stun.png"
    },
    {
        name: "Poison",
        description: "Takes 50% of current stacks and deals poison damage based on amount of stacks used.", // formula for damage: p.lv * (totalAmountOfStacks / 2n)
        flavor: "Another way to a beautiful end.",
        icon: "images/status_effects/poison.png"
    },
    {
        name: "Burning",
        description: "Enemy takes burning damage each turn until effect ends.",
        flavor: "Fire. A most pure element in this world. Let it purify the remains of the fallen.",
        icon: "images/status_effects/burning.png"
    },
    {
        name: "Vulnerable",
        description: "Doubles incoming damage and adds a chance for a crit (x3 DMG)",
        flavor: "Vulnerability. A weakness in many places.",
        icon: "images/status_effects/vulnerable.png"
    },
    {
        name: "Resistant",
        description: "Halves incoming damage.",
        flavor: "Resistance. Many people need it. Many people want it.",
        icon: "images/status_effects/resistant.png"
    },
    {
        name: "Weakened",
        description: "Halves outgoing damage.",
        flavor: "Weakness. The scourge of the strong.",
        icon: "images/status_effects/weakened.png"
    },
    {
        name: "Fished",
        description: "I... I have no words.",
        flavor: "The equivilant of a 10-round revolver and the bullets are hidden.",
        icon: "images/status_effects/fish-spin.gif"
    },
];