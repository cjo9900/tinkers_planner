var version_dictionary = {
	"2.3.3": {
                "tools": {
                    hammer: {
                        "parts": [
                            "Hammer Head",
                            "Plate",
                            "Plate",
                            "Tough Tool Rod"
                            ],
                        // head and plates are treated as heads, with head double weighted
                        "durability":function(mat1, mat2, mat3, mat4){
                                var dur = Math.max(1, ((mat1.durability + mat1.durability + mat2.durability + mat3.durability)/4));
                                dur = 2.5*(Math.max(1, Math.round((dur)*mat4.handle_factor) + mat4.handle_durability));
                                var x = false; //make sure to only apply head_trait_multiplier once but this will fail if there are differnt head traits
                                if(mat1.hasOwnProperty("head_trait_multiplier")) { dur *= mat1.head_trait_multiplier; x = true; }
                                if(mat2.hasOwnProperty("head_trait_multiplier") && !x) { dur *= mat2.head_trait_multiplier; x = true; }
                                if(mat3.hasOwnProperty("head_trait_multiplier") && !x) { dur *= mat3.head_trait_multiplier; x = true; }
                                return dur;
                                // 2.5 is fixed multipler
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                                return ((mat1.speed + mat1.speed + mat2.speed + mat3.speed)/4)* 0.4;
                                // 0.4 is the miningSpeedModifier
                            },
                        "attack": function(mat1, mat2, mat3, mat4){
                                return 1.0 + (((mat1.attack + mat1.attack + mat2.attack + mat3.attack)/4)*1.2);
                                // 1.2 is the damagePotential
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return Math.max(mat1.harvest,mat2.harvest,mat3.harvest);
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + "-" + mat2 +"-"+ mat3 + " Hammer";
                            }
                        },
                    pickaxe: {
                        "parts": [
                            "Pick Head",
                            "Binding",
                            "Tool Rod"
                            ],
                        "durability":function(mat1, mat2, mat3, mat4){
                            var dur = Math.max(1, Math.round((mat1.durability + mat2.extra_durability)*mat3.handle_factor) + mat3.handle_durability);
                            if(mat1.hasOwnProperty("head_trait_multiplier"))
                            {
                                dur *= mat1.head_trait_multiplier;
                            }
                            return Math.max(1,dur);
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                            // only head counts
                            return mat1.speed;
                            },
                        "attack":function(mat1, mat2, mat3, mat4){
                            // only head counts
                            return 1.0 + (mat1.attack);
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return mat1.harvest;
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + " Pickaxe";
                            }
                        },
                    hatchet: {
                        "parts": [
                            "Axe Head",
                            "Binding",
                            "Tool Rod"
                            ],
                        "durability":function(mat1, mat2, mat3, mat4){
                            //same as pickaxe
                            return Math.max(1, Math.round((mat1.durability + mat2.extra_durability)*mat3.handle_factor) + mat3.handle_durability);
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                            return mat1.speed;
                            },
                        "attack": function(mat1, mat2, mat3, mat4){
                                return 1.0 + ((mat1.attack + 0.5) * 1.1);
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return mat1.harvest;
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + " Hatchet";
                            }
                        },
                    lumberaxe: {
                        "parts": [
                            "Axe Head",
                            "Plate",
                            "Tough Binding",
                            "Tough Tool Rod"
                            ],
                        "durability":function(mat1, mat2, mat3, mat4){
                                var dur = Math.max(1, ((mat1.durability + mat2.durability)/2));
                                dur += mat3.extra_durability;
                                dur = 2*(Math.max(1, Math.round((dur)*mat4.handle_factor) + mat4.handle_durability));
                                var x = false; //make sure to only apply head_trait_multiplier once but this will fail if there are differnt head traits
                                if(mat1.hasOwnProperty("head_trait_multiplier")) { dur *= mat1.head_trait_multiplier; x = true; }
                                if(mat2.hasOwnProperty("head_trait_multiplier") && !x) { dur *= mat2.head_trait_multiplier; x = true; }
                                return dur;
                                // 2.5 is fixed multipler
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                                return ((mat1.speed + mat2.speed )/2)* 0.35;
                                // 0.35 is the miningSpeedModifier
                            },
                        "attack": function(mat1, mat2, mat3, mat4){
                            //incorrect???
                                return 1.0 + (((mat1.attack + mat2.attack)/2)*1.2);
                                // 1.2 is the damagePotential
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return Math.max(mat1.harvest,mat2.harvest);
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + "-" + mat2 + " Lumberaxe";
                            }
                        },
                    broadsword : {
                        parts: [
                        "Sword Blade",
                        "Wide Guard",
                        "Tool Rod"
                        ],
                    "durability":function(mat1, mat2, mat3, mat4){
                        var dur = Math.max(1, Math.round((mat1.durability + mat2.extra_durability)*mat3.handle_factor) + mat3.handle_durability);
                        if(mat1.hasOwnProperty("head_trait_multiplier"))
                        {
                            dur *= mat1.head_trait_multiplier;
                        }
                        dur *= 1.1;
                        return Math.max(dur, 1);
                        },
                    "speed":function(mat1, mat2, mat3, mat4){
                        return 0.5 * mat1.speed;
                        },
                    "attack": function(mat1, mat2, mat3, mat4){
                            return 1.0 + 1.0 + (mat1.attack * 1.0);
                        },
                    getHarvestlevel:function(mat1, mat2, mat3, mat4){
                            return mat1.harvest;
                        },
                    getName:function(mat1, mat2, mat3){
                            return mat1 + " Broadsword";
                        }
                    },
                    cleaver : {
                        parts: [
                        "Large Sword Blade",
                        "Plate",
                        "Tough Tool Rod (Guard)",
                        "Tough Tool Rod (Handle)"
                        ],
                    "durability":function(mat1, mat2, mat3, mat4){
                            var dur = Math.max(1, ((mat1.durability + mat2.durability )/2));
                                 dur += mat4.extra_durability;
                            dur = 2*(Math.max(1, Math.round((dur)*mat4.handle_factor) + mat4.handle_durability));
                            var x = false; //make sure to only apply head_trait_multiplier once but this will fail if there are differnt head traits
                            if(mat1.hasOwnProperty("head_trait_multiplier")) { dur *= mat1.head_trait_multiplier; x = true; }
                            if(mat2.hasOwnProperty("head_trait_multiplier") && !x) { dur *= mat2.head_trait_multiplier; x = true; }
                            return dur;

                        var dur = Math.max(1, Math.round((mat1.durability + mat2.extra_durability)*mat3.handle_factor) + mat3.handle_durability);
                        if(mat1.hasOwnProperty("head_trait_multiplier"))
                        {
                            dur *= mat1.head_trait_multiplier;
                        }
                        return Math.max(dur*1.1, 1);
                        },
                    "speed":function(mat1, mat2, mat3, mat4){
                        return 0.2 * ((mat1.speed + mat2.speed)/2);
                        },
                    "attack": function(mat1, mat2, mat3, mat4){
                            return 1.0 + (2 + 1.4*(((mat1.attack + mat2.attack)/2)))*1.2;
                        },
                    getHarvestlevel:function(mat1, mat2, mat3, mat4){
                            return Math.max(mat1.harvest,mat2.harvest);
                        },
                    getName:function(mat1, mat2, mat3){
                            return mat1 + " Cleaver";
                        }
                    },
                    shovel: {
                        "parts": [
                            "Shovel Head",
                            "Binding",
                            "Tool Rod"
                            ],
                        "durability":function(mat1, mat2, mat3, mat4){
                            var dur = Math.max(1, Math.round((mat1.durability + mat2.extra_durability)*mat3.handle_factor) + mat3.handle_durability);
                            if(mat1.hasOwnProperty("head_trait_multiplier"))
                            {
                                dur *= mat1.head_trait_multiplier;
                            }
                            return Math.max(1,dur);
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                            // only head counts
                            return mat1.speed;
                            },
                        "attack":function(mat1, mat2, mat3, mat4){
                            // only head counts
                            return 1.0 + (mat1.attack*0.9);
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return mat1.harvest;
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + " Shovel";
                            }
                        },
                    excavator: {
                        "parts": [
                            "Excavator Head",
                            "Plate",
                            "Tough Binding",
                            "Tough Tool Rod"
                            ],
                        // head and plates are treated as heads, with head double weighted
                        "durability":function(mat1, mat2, mat3, mat4){
                                var dur = Math.max(1, ((mat1.durability + mat2.durability)/2));
                                dur += mat3.extra_durability;
                                dur = 1.75*(Math.max(1, Math.round((dur)*mat4.handle_factor) + mat4.handle_durability));
                                var x = false; //make sure to only apply head_trait_multiplier once but this will fail if there are differnt head traits
                                if(mat1.hasOwnProperty("head_trait_multiplier")) { dur *= mat1.head_trait_multiplier; x = true; }
                                if(mat2.hasOwnProperty("head_trait_multiplier") && !x) { dur *= mat2.head_trait_multiplier; x = true; }
                                return dur;
                                // 1.75 is fixed multipler
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                                return ((mat1.speed + mat2.speed )/2)* 0.28;
                                // 0.28 is the miningSpeedModifier
                            },
                        "attack": function(mat1, mat2, mat3, mat4){
                            // not correct???
                                return 1.0 + (((mat1.attack + mat2.attack)/2)*1.25);
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return Math.max(mat1.harvest,mat2.harvest);
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + "-" + mat2 +"-"+" Excavator";
                            }
                        },
                    mattock: {
                        "parts": [
                            "Axe Head",
                            "ShovelHead",
                            "Tool Rod"
                            ],
                        "durability":function(mat1, mat2, mat3, mat4){
                            return Math.max(1, Math.round(((mat1.durability + mat2.durability)/2)*mat3.handle_factor) + mat3.handle_durability);
                            },
                        "speed":function(mat1, mat2, mat3, mat4){
                            return 0.95*((mat1.speed + mat2.speed)/2);
                            },
                        "attack": function(mat1, mat2, mat3, mat4){
                                return 1.0 + ((3+(mat1.attack + mat2.attack)/2 )* 0.9);
                            },
                        getHarvestlevel:function(mat1, mat2, mat3, mat4){
                                return mat1.harvest;
                            },
                        getHarvestlevel2:function(mat1, mat2, mat3, mat4){
                                return mat2.harvest;
                            },
                        getName:function(mat1, mat2, mat3){
                                return mat1 + " Hatchet";
                            }
                        }
                    },
                    // icon name in materials dir
                    // head_trait_multiplier durability multipler when used as a head (stone only - CheapSkate)
                    // durability - when used as head
                    // speed when used as head
                    // attack when used as head
                    // harvest level when used as head
                    // handle_factor durability multipler when used as handle
                    // handle_durability when used as handle applied after factor
                    // extra_durability when used as extra item e.g. binding
                "materials" : {
                    "wood":{  icon:"planks_oak",durability : 35, speed : 2, attack : 2, harvest : 0, handle_factor : 1, handle_durability : 25, extra_durability : 15},
                    "stone":{ head_trait_multiplier:0.8, icon:"cobblestone",durability : 120, speed : 4, attack : 2.9, harvest : 1, handle_factor : 0.5, handle_durability : -50, extra_durability : 20},
                    "flint":{ icon:"flint",durability : 150, speed : 5, attack : 2.8, harvest : 1, handle_factor : 0.6, handle_durability : -60, extra_durability : 40},
                    "cactus":{ icon:"cactus_side",durability : 210, speed : 4, attack : 3.4, harvest : 1, handle_factor : 0.85, handle_durability : 20, extra_durability : 50},
                    "bone":{ icon:"bone",durability : 200, speed : 5.09, attack : 2.5, harvest : 1, handle_factor : 1.1, handle_durability : 50, extra_durability : 65},
                    "obsidian":{ icon:"obsidian",durability : 89, speed : 7.07, attack : 4.2, harvest : 4, handle_factor : 0.9, handle_durability : -150, extra_durability : 90},
                    "prismarine":{ icon:"prismarine_shard",durability : 430, speed : 5.5, attack : 6, harvest : 1, handle_factor : 0.6, handle_durability : -200, extra_durability : 100},
                    "endstone":{ icon:"end_stone",durability : 420, speed : 3.23, attack : 3.23, harvest : 3, handle_factor : 0.85, handle_durability : 0, extra_durability : 42},
                    "paper":{ icon:"paper",durability : 12, speed : 0.51, attack : 0.05, harvest : 0, handle_factor : 0.1, handle_durability : 5, extra_durability : 5},
                    "sponge":{ icon:"sponge",durability : 550, speed : 3.02, attack : 0, harvest : 0, handle_factor : 1.2, handle_durability : 250, extra_durability : 250},
                    "firewood":{ icon:"lavawood",durability : 550, speed : 6, attack : 5.5, harvest : 0, handle_factor : 1, handle_durability : -200, extra_durability : 150},
                    "slime":{ icon:"slimecrystal_green",durability : 1000, speed : 4.24, attack : 1.8, harvest : 0, handle_factor : 0.7, handle_durability : -100, extra_durability : 350},
                    "blueslime":{ icon:"slimecrystal_blue",durability : 780, speed : 4.03, attack : 1.8, harvest : 0, handle_factor : 1.3, handle_durability : -100, extra_durability : 200},
                    "knightslime":{ icon:"ingot_knightslime",durability : 850, speed : 5.8, attack : 5.1, harvest : 3, handle_factor : 0.5, handle_durability : 500, extra_durability : 125},
                    "magmaslime":{ icon:"slimecrystal_magma",durability : 600, speed : 2.1, attack : 7, harvest : 0, handle_factor : 0.85, handle_durability : -200, extra_durability : 150},
                    "netherrack":{ icon:"netherrack",durability : 270, speed : 4.5, attack : 3, harvest : 1, handle_factor : 0.85, handle_durability : -150, extra_durability : 75},
                    "cobalt":{ icon:"ingot_cobalt",durability : 780, speed : 12, attack : 4.1, harvest : 4, handle_factor : 0.9, handle_durability : 100, extra_durability : 300},
                    "ardite":{ icon:"ingot_ardite",durability : 990, speed : 3.5, attack : 3.6, harvest : 4, handle_factor : 1.4, handle_durability : -200, extra_durability : 450},
                    "manyullyn":{ icon:"ingot_manyullyn",durability : 820, speed : 7.02, attack : 8.72, harvest : 4, handle_factor : 0.5, handle_durability : 250, extra_durability : 50},
                    "iron":{ icon:"iron_ingot",durability : 204, speed : 6, attack : 4, harvest : 2, handle_factor : 0.85, handle_durability : 60, extra_durability : 50},
                    "pigiron":{ icon:"ingot_pigiron",durability : 380, speed : 6.2, attack : 4.5, harvest : 3, handle_factor : 1.2, handle_durability : -100, extra_durability : 170},
                    "copper":{ icon:"copper",durability : 210, speed : 5.3, attack : 3, harvest : 1, handle_factor : 1.05, handle_durability : 30, extra_durability : 100},
                    "bronze":{ icon:"bronze",durability : 430, speed : 6.8, attack : 3.5, harvest : 2, handle_factor : 1.1, handle_durability : 70, extra_durability : 80},
                    "lead":{ icon:"lead",durability : 334, speed : 5.25, attack : 3.5, harvest : 1, handle_factor : 0.7, handle_durability : -50, extra_durability : 100},
                    "silver":{ icon:"silver",durability : 250, speed : 5, attack : 5, harvest : 1, handle_factor : 0.95, handle_durability : 50, extra_durability : 150},
                    //"electrum":{ icon:"electrum",durability : 50, speed : 12, attack : 3, harvest : 1, handle_factor : 1.1, handle_durability : -25, extra_durability : 250},
                    "steel":{ icon:"steel",durability : 540, speed : 7, attack : 6, harvest : 3, handle_factor : 0.9, handle_durability : 150, extra_durability : 25}
                },
                "harvestlevels":["STONE","IRON","DIAMOND","OBSIDIAN","COBALT"]
                //STONE = 0;
                //IRON = 1;
                //DIAMOND = 2;
                //OBSIDIAN = 3;
                //COBALT = 4;
	}
};
