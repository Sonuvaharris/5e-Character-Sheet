/************************************
* Author: Sonuvaharris
* Last updated: 2012-11-14
************************************/

let CHARSHEETS; //global for all character sheets
let CUR_CHARSHEETS_INDEX; //global for currently loaded character sheet

SizeReflex = {Colossal:-10, Gargantuan:-5, Huge:-5, Large:-1, Medium:0, Small:1, Tiny:2, Diminutive:5, Fine:10};
SizeGrapple = {Colossal:20, Gargantuan:15, Huge:10, Large:5, Medium:0, Small:-5, Tiny:-10, Diminutive:-15, Fine:-20};
SizeCarryCapacity = {Colossal:20, Gargantuan:10, Huge:5, Large:2, Medium:1, Small:0.75, Tiny:0.5, Diminutive:0.25, Fine:0.01};
SizeStealth = {Colossal:-20, Gargantuan:-15, Huge:-10, Large:-5, Medium:0, Small:5, Tiny:10, Diminutive:15, Fine:20};
ArmorPenalty = {Heavy:-10, Medium:-5, Light: -2};

DefaultFields = {"fields":{"attr_rank":{"value":"","checked":false},"attr_level":{"value":"1","checked":false},"attr_level_max":{"value":"0","checked":false},"attr_background":{"value":"","checked":false},"attr_species":{"value":"","checked":false},"attr_destiny":{"value":"","checked":false},"attr_gender":{"value":"","checked":false},"attr_STR":{"value":"8","checked":false},"attr_STR_max":{"value":"-1","checked":false},"attr_DEX":{"value":"8","checked":false},"attr_DEX_max":{"value":"-1","checked":false},"attr_CON":{"value":"8","checked":false},"attr_CON_max":{"value":"-1","checked":false},"attr_INT":{"value":"8","checked":false},"attr_INT_max":{"value":"-1","checked":false},"attr_WIS":{"value":"8","checked":false},"attr_WIS_max":{"value":"-1","checked":false},"attr_CHA":{"value":"8","checked":false},"attr_CHA_max":{"value":"-1","checked":false},"attr_CT":{"value":"0","checked":false},"attr_HP":{"value":"0","checked":false},"attr_HP_max":{"value":"0","checked":false},"attr_DT":{"value":"10","checked":false},"attr_DamageThresholdMisc":{"value":"0","checked":false},"attr_CTIgnoreDT":{"value":"","checked":false},"attr_DR-Show":{"value":"1","checked":false},"attr_DR":{"value":"0","checked":false},"attr_SR-Show":{"value":"1","checked":false},"attr_SR":{"value":"0","checked":false},"attr_SR_max":{"value":"0","checked":false},"attr_immune-Show":{"value":"1","checked":false},"attr_Immune":{"value":"","checked":false},"attr_FP":{"value":"5","checked":false},"attr_FP_max":{"value":"1d6","checked":false},"attr_DP":{"value":"0","checked":false},"attr_BAB":{"value":"0","checked":false},"attr_Speed":{"value":"6","checked":false},"attr_DSP":{"value":"0","checked":false},"attr_Grapple":{"value":"-1","checked":false},"attr_GrpMod_max":{"value":"0","checked":false},"attr_Reflex":{"value":"10","checked":false},"attr_RefLevel":{"value":"1","checked":false},"attr_RefClass":{"value":"0","checked":false},"attr_RefMisc":{"value":"0","checked":false},"attr_ReflexFlatFooted":{"value":"10","checked":false},"attr_RefFlatFootedMisc":{"value":"0","checked":false},"attr_Fortitude":{"value":"10","checked":false},"attr_FortLevel":{"value":"1","checked":false},"attr_FortClass":{"value":"0","checked":false},"attr_FortMisc":{"value":"0","checked":false},"attr_Will":{"value":"10","checked":false},"attr_WillLevel":{"value":"1","checked":false},"attr_WillClass":{"value":"0","checked":false},"attr_WillMisc":{"value":"0","checked":false},"attr_ArmorWornCheck":{"value":"1","checked":false},"attr_ArmorName":{"value":"","checked":false}, "attr_ArmorWorn":{"value":"","checked":false},"attr_ArmorRef":{"value":"0","checked":false},"attr_ArmorFort":{"value":"0","checked":false},"attr_ArmorDex":{"value":"0","checked":false},"attr_Speed_max":{"value":"0","checked":false},"attr_ArmorProf":{"value":"1","checked":false},"attr_ArmorDefense":{"value":"1","checked":false},"attr_ImpArmorDefense":{"value":"1","checked":false},"attr_AttackCount":{"value":"1","checked":false},"attr_WeaponName_${INDEX}":{"value":"","checked":false},"attr_WeaponName_max_${INDEX}":{"value":"","checked":false},"attr_AttackTotal_max_${INDEX}":{"value":"","checked":false},"attr_AttackModMisc_${INDEX}":{"value":"0","checked":false},"attr_damage_${INDEX}":{"value":"2d8","checked":false},"attr_DamageTotal_max_${INDEX}":{"value":"","checked":false},"attr_DamageMisc_${INDEX}":{"value":"0","checked":false},"attr_WeaponName_0":{"value":"","checked":false},"attr_WeaponName_max_0":{"value":"","checked":false},"attr_AttackTotal_max_0":{"value":"-1","checked":false},"attr_AttackModMisc_0":{"value":"0","checked":false},"attr_damage_0":{"value":"2d8","checked":false},"attr_DamageTotal_max_0":{"value":"0","checked":false},"attr_DamageMisc_0":{"value":"0","checked":false},"attr_Acrobatics":{"value":"-1","checked":false},"attr_AcrobaticsFeat":{"value":"5","checked":false},"attr_AcrobaticsFeat_max":{"value":"5","checked":false},"attr_AcrobaticsMisc":{"value":"0","checked":false},"attr_Climb":{"value":"-1","checked":false},"attr_ClimbFeat":{"value":"5","checked":false},"attr_ClimbFeat_max":{"value":"5","checked":false},"attr_ClimbMisc":{"value":"0","checked":false},"attr_Deception":{"value":"-1","checked":false},"attr_DeceptionFeat":{"value":"5","checked":false},"attr_DeceptionFeat_max":{"value":"5","checked":false},"attr_DeceptionMisc":{"value":"0","checked":false},"attr_Endurance":{"value":"-1","checked":false},"attr_EnduranceFeat":{"value":"5","checked":false},"attr_EnduranceFeat_max":{"value":"5","checked":false},"attr_EnduranceMisc":{"value":"0","checked":false},"attr_GatherInformation":{"value":"-1","checked":false},"attr_GatherInformationFeat":{"value":"5","checked":false},"attr_GatherInformationFeat_max":{"value":"5","checked":false},"attr_GatherInformationMisc":{"value":"0","checked":false},"attr_Initiative":{"value":"-1","checked":false},"attr_InitiativeFeat":{"value":"5","checked":false},"attr_InitiativeFeat_max":{"value":"5","checked":false},"attr_InitiativeMisc":{"value":"0","checked":false},"attr_Jump":{"value":"-1","checked":false},"attr_JumpFeat":{"value":"5","checked":false},"attr_JumpFeat_max":{"value":"5","checked":false},"attr_JumpMisc":{"value":"0","checked":false},"attr_Knowledge-Bureaucracy":{"value":"-1","checked":false},"attr_Knowledge-BureaucracyFeat":{"value":"5","checked":false},"attr_Knowledge-BureaucracyFeat_max":{"value":"5","checked":false},"attr_Knowledge-BureaucracyMisc":{"value":"0","checked":false},"attr_Knowledge-GalacticLore":{"value":"-1","checked":false},"attr_Knowledge-GalacticLoreFeat":{"value":"5","checked":false},"attr_Knowledge-GalacticLoreFeat_max":{"value":"5","checked":false},"attr_Knowledge-GalacticLoreMisc":{"value":"0","checked":false},"attr_Knowledge-LifeSciences":{"value":"-1","checked":false},"attr_Knowledge-LifeSciencesFeat":{"value":"5","checked":false},"attr_Knowledge-LifeSciencesFeat_max":{"value":"5","checked":false},"attr_Knowledge-LifeSciencesMisc":{"value":"0","checked":false},"attr_Knowledge-PhysicalScience":{"value":"-1","checked":false},"attr_Knowledge-PhysicalScienceFeat":{"value":"5","checked":false},"attr_Knowledge-PhysicalScienceFeat_max":{"value":"5","checked":false},"attr_Knowledge-PhysicalScienceMisc":{"value":"0","checked":false},"attr_Knowledge-SocialScience":{"value":"-1","checked":false},"attr_Knowledge-SocialScienceFeat":{"value":"5","checked":false},"attr_Knowledge-SocialScienceFeat_max":{"value":"5","checked":false},"attr_Knowledge-SocialScienceMisc":{"value":"0","checked":false},"attr_Knowledge-Tactics":{"value":"-1","checked":false},"attr_Knowledge-TacticsFeat":{"value":"5","checked":false},"attr_Knowledge-TacticsFeat_max":{"value":"5","checked":false},"attr_Knowledge-TacticsMisc":{"value":"0","checked":false},"attr_Knowledge-Technology":{"value":"-1","checked":false},"attr_Knowledge-TechnologyFeat":{"value":"5","checked":false},"attr_Knowledge-TechnologyFeat_max":{"value":"5","checked":false},"attr_Knowledge-TechnologyMisc":{"value":"0","checked":false},"attr_Mechanics":{"value":"-1","checked":false},"attr_MechanicsFeat":{"value":"5","checked":false},"attr_MechanicsFeat_max":{"value":"5","checked":false},"attr_MechanicsMisc":{"value":"0","checked":false},"attr_Perception":{"value":"-1","checked":false},"attr_PerceptionFeat":{"value":"5","checked":false},"attr_PerceptionFeat_max":{"value":"5","checked":false},"attr_PerceptionMisc":{"value":"0","checked":false},"attr_Persuasion":{"value":"-1","checked":false},"attr_PersuasionFeat":{"value":"5","checked":false},"attr_PersuasionFeat_max":{"value":"5","checked":false},"attr_PersuasionMisc":{"value":"0","checked":false},"attr_Pilot":{"value":"-1","checked":false},"attr_PilotFeat":{"value":"5","checked":false},"attr_PilotFeat_max":{"value":"5","checked":false},"attr_PilotMisc":{"value":"0","checked":false},"attr_Ride":{"value":"-1","checked":false},"attr_RideFeat":{"value":"5","checked":false},"attr_RideFeat_max":{"value":"5","checked":false},"attr_RideMisc":{"value":"0","checked":false},"attr_Stealth":{"value":"-1","checked":false},"attr_StealthFeat":{"value":"5","checked":false},"attr_StealthFeat_max":{"value":"5","checked":false},"attr_StealthMisc":{"value":"0","checked":false},"attr_Survival":{"value":"-1","checked":false},"attr_SurvivalFeat":{"value":"5","checked":false},"attr_SurvivalFeat_max":{"value":"5","checked":false},"attr_SurvivalMisc":{"value":"0","checked":false},"attr_Swim":{"value":"-1","checked":false},"attr_SwimFeat":{"value":"5","checked":false},"attr_SwimFeat_max":{"value":"5","checked":false},"attr_SwimMisc":{"value":"0","checked":false},"attr_TreatInjury":{"value":"-1","checked":false},"attr_TreatInjuryFeat":{"value":"5","checked":false},"attr_TreatInjuryFeat_max":{"value":"5","checked":false},"attr_TreatInjuryMisc":{"value":"0","checked":false},"attr_UseComputer":{"value":"-1","checked":false},"attr_UseComputerFeat":{"value":"5","checked":false},"attr_UseComputerFeat_max":{"value":"5","checked":false},"attr_UseComputerMisc":{"value":"0","checked":false},"attr_UsetheForce":{"value":"-1","checked":false},"attr_UsetheForceFeat":{"value":"5","checked":false},"attr_UsetheForceFeat_max":{"value":"5","checked":false},"attr_UsetheForceMisc":{"value":"0","checked":false},"attr_XP":{"value":"0","checked":false},"attr_XP_max":{"value":"0","checked":false},"attr_TotalEquipmentWorth":{"value":"0","checked":false},"attr_credits":{"value":"0","checked":false},"attr_TotalEquipmentWt":{"value":"0","checked":false},"attr_EquipmentCapacity":{"value":"16","checked":false},"attr_EquipmentLoad":{"value":"-10","checked":false},"attr_CarryingCapacity":{"value":"32","checked":false},"attr_CarryingCapacitySize":{"value":"1","checked":false},"attr_ArmorNotes-show":{"value":"1","checked":false},"attr_ArmorCarry":{"value":"1","checked":false},"attr_ArmorWt":{"value":"0","checked":false},"attr_ArmorCost":{"value":"0","checked":false},"attr_ArmorLocation":{"value":"","checked":false},"attr_EquipmentItem_${INDEX}":{"value":"","checked":false},"attr_EquipmentNotes-show_${INDEX}":{"value":"1","checked":false},"attr_EquipmentCarry_${INDEX}":{"value":"1","checked":false},"attr_EquipmentQty_${INDEX}":{"value":"0","checked":false},"attr_EquipmentWt_${INDEX}":{"value":"0","checked":false},"attr_EquipmentTotalWt_${INDEX}":{"value":"0","checked":false},"attr_EquipmentCost_${INDEX}":{"value":"0","checked":false},"attr_EquipmentTotalCost_${INDEX}":{"value":"0","checked":false},"attr_EquipmentLocation_${INDEX}":{"value":"","checked":false},"attr_ItemCount":{"value":"1","checked":false},"attr_EquipmentItem_0":{"value":"","checked":false},"attr_EquipmentNotes-show_0":{"value":"1","checked":false},"attr_EquipmentCarry_0":{"value":"1","checked":false},"attr_EquipmentQty_0":{"value":"0","checked":false},"attr_EquipmentWt_0":{"value":"0","checked":false},"attr_EquipmentTotalWt_0":{"value":"0","checked":false},"attr_EquipmentCost_0":{"value":"0","checked":false},"attr_EquipmentTotalCost_0":{"value":"0","checked":false},"attr_EquipmentLocation_0":{"value":"","checked":false},"attr_EquipmentWtRunningTotal":{"value":"0","checked":false},"attr_EquipmentCostRunningTotal":{"value":"0","checked":false},"attr_inventoryrunningsummary":{"value":"","checked":false},"attr_inventory":{"value":"","checked":false},"attr_Size":{"value":"Medium"},"attr_DamageThresholdDefense":{"value":"Fortitude"},"attr_GrpMod":{"value":"STR"},"attr_RefMod":{"value":"DEX"},"attr_FortMod":{"value":"CON"},"attr_WillMod":{"value":"WIS"},"attr_ArmorType":{"value":"Light"},"attr_ArmorPerception":{"value":"None"},"attr_AttackMod_${INDEX}":{"value":"STR"},"attr_DamageMod_${INDEX}":{"value":"0"},"attr_AttackMod_0":{"value":"STR"},"attr_DamageMod_0":{"value":"0"},"attr_AcrobaticsMod":{"value":"DEX"},"attr_ClimbMod":{"value":"STR"},"attr_DeceptionMod":{"value":"CHA"},"attr_EnduranceMod":{"value":"CON"},"attr_GatherInformationMod":{"value":"CHA"},"attr_InitiativeMod":{"value":"DEX"},"attr_JumpMod":{"value":"STR"},"attr_Knowledge-BureaucracyMod":{"value":"INT"},"attr_Knowledge-GalacticLoreMod":{"value":"INT"},"attr_Knowledge-LifeSciencesMod":{"value":"INT"},"attr_Knowledge-PhysicalScienceMod":{"value":"INT"},"attr_Knowledge-SocialScienceMod":{"value":"INT"},"attr_Knowledge-TacticsMod":{"value":"INT"},"attr_Knowledge-TechnologyMod":{"value":"INT"},"attr_MechanicsMod":{"value":"INT"},"attr_PerceptionMod":{"value":"WIS"},"attr_PersuasionMod":{"value":"CHA"},"attr_PilotMod":{"value":"DEX"},"attr_RideMod":{"value":"DEX"},"attr_StealthMod":{"value":"DEX"},"attr_SurvivalMod":{"value":"WIS"},"attr_SwimMod":{"value":"STR"},"attr_TreatInjuryMod":{"value":"WIS"},"attr_UseComputerMod":{"value":"INT"},"attr_UsetheForceMod":{"value":"CHA"}},
                "textFields":{"attr_ArmorNotes":{"value":""},"attr_WeaponNotes_max_${INDEX}":{"value":""},"attr_WeaponNotes_${INDEX}":{"value":""},"attr_WeaponNotes_max_0":{"value":""},"attr_WeaponNotes_0":{"value":""},"attr_AttackOptions":{"value":""},"attr_SpecialActions":{"value":""},"attr_ForcePowers":{"value":""},"attr_StarshipManeuvers":{"value":""},"attr_Language":{"value":""},"attr_DroidSystems":{"value":""},"attr_EquipmentNotes_${INDEX}":{"value":""},"attr_EquipmentNotes_0":{"value":""},"attr_SpecialQualities":{"value":""},"attr_ForceTechniques":{"value":""},"attr_Feats":{"value":""},"attr_ForceSecrets":{"value":""},"attr_Talents":{"value":""},"attr_ForceRegimens":{"value":""},"attr_Notes":{"value":""}}};

let Attributes = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

let Skills = ["Acrobatics", "Climb", "Deception", "Endurance", "GatherInformation",
            "Initiative", "Jump", "Knowledge-Bureaucracy", "Knowledge-GalacticLore", "Knowledge-LifeSciences",
            "Knowledge-PhysicalScience", "Knowledge-SocialScience", "Knowledge-Tactics", "Knowledge-Technology", "Mechanics",
            "Perception", "Persuasion", "Pilot", "Ride", "Stealth",
            "Survival", "Swim", "TreatInjury", "UseComputer", "UsetheForce"];

let ArmorCheckPenalties = ["Acrobatics", "Climb", "Endurance", "Initiative", "Jump",
                        "Stealth", "Swim"];

let HeavyLoadPenalties = ["Acrobatics", "Climb", "Endurance", "Initiative", "Jump",
                        "Stealth", "Swim"];

let AttackProperties = ["attr_WeaponName_", "attr_WeaponName_max_", "attr_AttackTotal_max_",
                    "attr_AttackMod_", "attr_AttackModMisc_", "attr_damage_",
                    "attr_DamageTotal_max_", "attr_DamageMod_", "attr_DamageMisc_",
                    "attr_WeaponNotes_max_", "attr_WeaponNotes_"];

let ItemProperties = ["attr_EquipmentItem_", "attr_EquipmentCarry_", "attr_EquipmentNotes-show_",
                    "attr_EquipmentQty_", "attr_EquipmentWt_", "attr_EquipmentTotalWt_",
                    "attr_EquipmentCost_", "attr_EquipmentTotalCost_", "attr_EquipmentLocation_",
                    "attr_EquipmentNotes_"];
                    //note, 'attr_EquipmentNotes-show' has two field instances (for css hide/show shenanigans)

/************************************
* CHARACTER SHEET LOADING/SAVING
************************************/

function renderCharSheetList() {
    //in case we are re-rendering the list
    let tabsContainer = document.getElementById("charTabsContainer");
    while (tabsContainer.firstChild.id !== "addTab") {
        tabsContainer.removeChild(tabsContainer.firstChild);
    }

    if (localStorage.getItem("CHARSHEETS") != null) {
        CHARSHEETS = localStorage.getItem("CHARSHEETS").split(",");
        CUR_CHARSHEETS_INDEX = parseFloat(localStorage.getItem("CUR_CHARSHEETS_INDEX"));
    } else {
        console.log("List of character sheets not found, generating new sheet");
        localStorage.removeItem("Ben Swolo");
        CHARSHEETS = ["Ben Swolo"];
        CUR_CHARSHEETS_INDEX = 0;
        //console.log("CHARSHEETS: " + CHARSHEETS.toString());
    }
    //CUR_CHARSHEETS_INDEX = 0;
    for (let i=0;i<CHARSHEETS.length;i++) {
        addCharTab(i);
        document.getElementsByName("charSheet_" + i)[0].value = CHARSHEETS[i];
    }
    //console.log("CUR_CHARSHEETS_INDEX: " + CUR_CHARSHEETS_INDEX);
    //console.log("CHARSHEETS: " + CHARSHEETS.toString());
    let curTab = document.getElementsByName("charSheet_" + CUR_CHARSHEETS_INDEX)[0];
    curTab.parentNode.parentNode.classList.add("active");
    curTab.disabled = "";

    if (CHARSHEETS.length === 1) {
        document.getElementById("deleteButton").disabled = "disabled";
    } else {
        document.getElementById("deleteButton").disabled = "";
    }
}

function saveCharSheetList() {
    localStorage.setItem("CHARSHEETS", CHARSHEETS.toString());
    localStorage.setItem("CUR_CHARSHEETS_INDEX", CUR_CHARSHEETS_INDEX);
}

/************************************
* CHARACTER SHEET SELECTION FUNCTIONS
************************************/

function setCharSheet(index) {
    if (index !== CUR_CHARSHEETS_INDEX) {
        var oldTab = document.getElementsByClassName("nav nav-tabs")[0].getElementsByClassName("active")[0].firstChild.firstChild;
        var tab = document.getElementsByName("charSheet_" + index)[0];
        if (index != null) {
            if (!tab.parentNode.parentNode.classList.contains("active")) {
                tab.parentNode.parentNode.classList.add("active");
                tab.disabled = "";
                saveCharSheet(CUR_CHARSHEETS_INDEX);
                loadCharSheet(CHARSHEETS[index], index);
                CUR_CHARSHEETS_INDEX = index;

                oldTab.disabled = "disabled";
                oldTab.parentNode.parentNode.classList.remove("active");
            }
        }
    }
}

//called when adding a new character sheet (pressing the plus button)
function addCharSheet() {
    var newName = "Ben Swolo";
    //can't have duplicates
    if (CHARSHEETS.includes(newName)) {
        let count = 1;
        while (CHARSHEETS.includes(newName + " " + count)) {
            count++;
        }
        newName = "Ben Swolo " + count;
        console.log("New character name: " + newName);
    }

    CHARSHEETS.push(newName);
    addCharTab(CHARSHEETS.length - 1);
    setCharSheet(CHARSHEETS.length - 1);

    //CHARSHEETS[CUR_CHARSHEETS_INDEX] = document.getElementsByName("charSheet_" + CUR_CHARSHEETS_INDEX)[0].value;
    saveCharSheetList();

    if (CHARSHEETS.length === 1) {
        document.getElementById("deleteButton").disabled = "disabled";
    } else {
        document.getElementById("deleteButton").disabled = "";
    }

    //console.log("CUR_CHARSHEETS_INDEX: " + CUR_CHARSHEETS_INDEX);
    //console.log("CHARSHEETS: " + CHARSHEETS.toString());
}

function addCharTab(index) {
    let node = document.getElementById("charTab").children[0].cloneNode(true);
    let htmlString = node.innerHTML;
    htmlString = htmlString.replace(/\${INDEX}/gi, index);
    node.innerHTML = htmlString;
    document.getElementById("charTabsContainer").insertBefore(node, document.getElementById("addTab"));
}

/************************************
* CHARACTER SHEET FUNCTIONS
************************************/

//loads values from json file for all input, select, and textarea fields for a given character sheet
function loadCharSheet(name, index) {
    console.log("Loading Character Sheet for " + name);
    let string = localStorage.getItem(name);
    let charSheet = JSON.parse(string);

    if (string == null) {
        console.log("Character sheet for '" + name + "' not found! Saving default values");
        charSheet = DefaultFields;

    }

    document.getElementsByName("charSheet_" + index)[0].value = name;

    let allFields = document.getElementsByClassName("characterdialog")[0].getElementsByTagName("input");
    let allSelects = document.getElementsByClassName("characterdialog")[0].getElementsByTagName("select");
    let allTextFields = document.getElementsByClassName("characterdialog")[0].getElementsByTagName("textarea");
    let attackCount = charSheet.fields["attr_AttackCount"].value;
    let itemCount = charSheet.fields["attr_ItemCount"].value;
    //console.log("attackCount: " + attackCount);

    //in case we are re-rendering this list
    let attacksContainer = document.getElementById("attacksContainer");
    while (attacksContainer.firstChild != null) {
        attacksContainer.removeChild(attacksContainer.firstChild);
    }
    //generate all attack items
    for (let i=0;i<attackCount;i++) {
        appendAttackHTML(i);
    }

    //in case we are re-rendering this list
    let itemsContainer = document.getElementById("itemsContainer");
    while (itemsContainer.firstChild != null) {
        itemsContainer.removeChild(itemsContainer.firstChild);
    }
    //generate all equipment items
    for (let i=0;i<itemCount;i++) {
        appendItemHTML(i);
    }

    //set field values
    for (let i=0;i<allFields.length;i++) {
        let field = allFields[i];

        //more bullshit for getting around radio field syntax
        if (charSheet.fields[field.name] != null) {
            if (field.name === "attr_CT") {
                if (field.value === charSheet.fields[field.name].value) {
                    field.checked = true;
                }
            } else {
                field.value = charSheet.fields[field.name].value;
                field.checked = charSheet.fields[field.name].checked === true;
            }
        }
    }

    //set select values
    for (let l=0;l<allSelects.length;l++) {
        let select = allSelects[l];
        if (charSheet.fields[select.name] != null) {
            select.value = charSheet.fields[select.name].value;
        }
    }

    //set textarea content
    for (let i=0;i<allTextFields.length;i++) {
        let textField = allTextFields[i];
        if (charSheet.textFields[textField.name] != null) {
            textField.value = charSheet.textFields[textField.name].value;
        }
    }

    calcData();
}

function saveCharSheet(index) {
    var charName = CHARSHEETS[index];
    console.log("Saving character sheet for " + charName);

    var allFields = document.getElementsByClassName("characterdialog")[0].getElementsByTagName("input");
    var allSelects = document.getElementsByClassName("characterdialog")[0].getElementsByTagName("select");
    var allTextFields = document.getElementsByClassName("characterdialog")[0].getElementsByTagName("textarea");

    //grab every value on the page and stick it in the Character object
    var charSheet = {fields: {}, textFields: {}};
    for (var i=0;i<allFields.length;i++) {
        var field = allFields[i];
        charSheet.fields[field.name] = {value: field.value, checked: field.checked};
    }

    for (var j=0;j<allSelects.length;j++) {
        var select = allSelects[j];
        charSheet.fields[select.name] = {value: select.value};
    }

    //because getting/saving a radio button group value is retarded
    for (var k=0;k<document.getElementsByName("attr_CT").length;k++) {
        if (document.getElementsByName("attr_CT")[k].checked) {
            var ct = document.getElementsByName("attr_CT")[k].value;
            charSheet.fields["attr_CT"] = {value: ct, checked: false};
            break;
        }
    }

    for (var l=0;l<allTextFields.length;l++) {
        var textField = allTextFields[l];
        charSheet.textFields[textField.name] = {value: textField.value};
    }

    var stringified = JSON.stringify(charSheet);
    localStorage.setItem(charName, stringified);
    //console.log("Saved Content: " + stringified);
}

//only called if 2 or more character sheets
function deleteCharacter() {
    confirm("Are you sure you want to delete this character?");
    var name = CHARSHEETS[CUR_CHARSHEETS_INDEX];
    CHARSHEETS.splice(CUR_CHARSHEETS_INDEX, 1);
    localStorage.removeItem(name);
    console.log("Deleted Character: " + name);

    if (CUR_CHARSHEETS_INDEX != 0) {
        CUR_CHARSHEETS_INDEX--;
    }

    saveCharSheetList();
    renderCharSheetList();
    loadCharSheet(CHARSHEETS[CUR_CHARSHEETS_INDEX], CUR_CHARSHEETS_INDEX);
    window.scrollTo(0, 0);

}

//generate initial values for calculated values
function calcData() {
    for (var i=0;i<document.getElementsByName("attr_CT").length;i++) {
        if (document.getElementsByName("attr_CT")[i].checked) {
            var ct = document.getElementsByName("attr_CT")[i].value;
            if (ct == "-10[Helpless]") {
                ct = -10;
            }
            CONDITION = parseInt(ct);
            //console.log("ct: " + ct);
            break;
        }
    }

    //set attributes
    for (var j=0;j<Attributes.length;j++) {
        calcAttributeMod(Attributes[j]);
    }

    //set skills
    for (var k=0;k<Skills.length;k++) {
        calcSkill(Skills[k]);
    }

    //set attacks
    var attackCount = parseInt(document.getElementsByName("attr_AttackCount")[0].value);
    for (var l=0;l<attackCount;l++) {
        calcAttack(l);
        calcDamage(l);
    }

    //set items
    var itemCount = parseInt(document.getElementsByName("attr_ItemCount")[0].value);
    for (var m=0;m<itemCount;m++) {
        calcItemValue(m, true);
        calcItemWeight(m, true);
    }

    //doing the level update stuff here, don't want to cause duplicate calculations
    document.getElementsByName("attr_level_max")[0].value = Math.floor(getHeroicLevel() / 2);
    document.getElementsByName("attr_FortLevel")[0].value = getHeroicLevel();
    document.getElementsByName("attr_WillLevel")[0].value = getHeroicLevel();

    calcGrapple();

    calcReflexDef();
    calcFortDef();
    calcWillDef();

    calcEquipmentWorth();
    calcEncumbrance();
    calcEquipmentCapacity();
    calcCarryCapacity();
}

function roll(name, field, dice) {
    var bonus = 0;
    if (field != "") {
        bonus = parseInt(document.getElementsByName(field)[0].value);
    }
    var total = bonus + getCondition();
    var diceCount = Number(dice.slice(0, dice.indexOf("d")));
    var dieType = Number(dice.slice(dice.indexOf("d") + 1, dice.length));
    var rolls = [];
    if (!Number.isNaN(diceCount) && !Number.isNaN(dieType)) {
        for (var i=0;i<diceCount;i++) {
            var roll = Math.floor((Math.random() * dieType) + 1);
            rolls.push(roll);
            total += roll;
        }
        var alertString = name.toUpperCase() + ": " +  total + "\n" + "(" + rolls.toString();
        if (field) {
            alertString += " + " + bonus;
        }
        alertString += ")";
        alert(alertString);
    } else {
        alert("invalid dice pattern: " + dice);
    }
}

function rollAttack(index) {
    var name = document.getElementsByName("attr_WeaponName_" + index)[0].value;
    var dice = document.getElementsByName("attr_damage_" + index)[0].value;

    var attackBonus = parseInt(document.getElementsByName("attr_AttackTotal_max_" + index)[0].value);
    var attackTotal = parseInt(getCondition()) + attackBonus;
    var damageBonus = parseInt(document.getElementsByName("attr_DamageTotal_max_" + index)[0].value);
    var damageTotal = damageBonus + getCondition();

    var diceCount = Number(dice.slice(0, dice.indexOf("d")));
    var dieType = Number(dice.slice(dice.indexOf("d") + 1, dice.length));

    //need 1d20 for attack
    var attackRoll = Math.floor((Math.random() * 20) + 1);
    attackTotal += attackRoll;
    var damageRolls = [];
    if (!Number.isNaN(diceCount) && !Number.isNaN(dieType)) {
        for (var i=0;i<diceCount;i++) {
            var roll = Math.floor((Math.random() * dieType) + 1);
            damageRolls.push(roll);
            damageTotal += roll;
        }
        var alertString = "Roll for " + name.toUpperCase() + " : " + "\n"
            + "Attack: " + attackTotal + "\n"
            + "(" + attackRoll + ") + " + attackBonus + "\n"
            + "Damage: " + damageTotal + "\n"
            + "(" + damageRolls.toString() + ") + " + damageBonus;
        alert(alertString);
    } else {
        alert("invalid dice pattern: " + dice);
    }
}

function copyStatBlock() {
    //console.log("copyStatBlock()");
    var statBlock = document.getElementsByName("attr_Size")[0].value + " " + document.getElementsByName("attr_species")[0].value + " " + document.getElementsByName("attr_rank")[0].value + "\n" +
    "Force Points " + document.getElementsByName("attr_FP")[0].value + "; Dark Side " + document.getElementsByName("attr_DSP")[0].value + "\n" +
    "Init +" + document.getElementsByName("attr_Initiative")[0].value + "; Senses Perception +" + document.getElementsByName("attr_Perception")[0].value + "\n" +
    "Languages " + document.getElementsByName("attr_Language")[0].value + "\n" +
    "\n" +
    "Defenses Ref " + document.getElementsByName("attr_Reflex")[0].value + " (flat-footed " + document.getElementsByName("attr_ReflexFlatFooted")[0].value + "), Fort " + document.getElementsByName("attr_Fortitude")[0].value + ", Will " + document.getElementsByName("attr_Will")[0].value + "\n" +
    "hp " + document.getElementsByName("attr_HP_max")[0].value + "; Threshold " + document.getElementsByName("attr_DT")[0].value + "\n" +
    "\n" +
    "Speed " + document.getElementsByName("attr_Speed")[0].value + " squares" + "\n";
    var unarmedAtk = parseInt(document.getElementsByName("attr_BAB")[0].value) + parseInt(document.getElementsByName("attr_STR_max")[0].value);
    statBlock += "Melee Unarmed +" + unarmedAtk + " (1d4+" + (parseInt(document.getElementsByName("attr_level_max")[0].value) + parseInt(document.getElementsByName("attr_STR_max")[0].value)) + ")" + "\n";
    for (var i=0;i<document.getElementsByName("attr_AttackCount")[0].value;i++) {
        statBlock += "Weapon " + document.getElementsByName("attr_WeaponName_" + i)[0].value + " +" + document.getElementsByName("attr_AttackTotal_max_" + i)[0].value + " (" + document.getElementsByName("attr_damage_" + i)[0].value + "+" + document.getElementsByName("attr_DamageTotal_max_" + i)[0].value + ")" + "\n";
    }
    statBlock += "Base Atk +" + document.getElementsByName("attr_BAB")[0].value + "; Grp +" + document.getElementsByName("attr_Grapple")[0].value + "\n" +
    "Atk Options " + document.getElementsByName("attr_AttackOptions")[0].value + "\n" +
    "Special Actions " + document.getElementsByName("attr_SpecialActions")[0].value + "\n" +
    "Force Powers Known (Use the Force +" + document.getElementsByName("attr_UsetheForce")[0].value + ") " + document.getElementsByName("attr_ForcePowers")[0].value + "\n" +
    "\n" +
    "Abilities Str " + document.getElementsByName("attr_STR")[0].value + ", Dex " + document.getElementsByName("attr_DEX")[0].value + ", Con " + document.getElementsByName("attr_CON")[0].value + ", Int " + document.getElementsByName("attr_INT")[0].value + ", Wis " + document.getElementsByName("attr_WIS")[0].value + ", Con " + document.getElementsByName("attr_CON")[0].value + "\n" +
    "Talents " + document.getElementsByName("attr_Talents")[0].value + "\n" +
    "Feats " + document.getElementsByName("attr_Feats")[0].value + "\n" +
    "Skills ";
    for (var j=0;j<Skills.length;j++) {
        if (document.getElementsByName("attr_" + Skills[j] + "Feat")[0].checked) {
            if (j != 0) {
                statBlock += ", ";
            }
            statBlock += Skills[j] + " +" + document.getElementsByName("attr_" + Skills[j])[0].value;
        }
    }

    statBlock += "\n";
    statBlock += "Possessions ";
    for (var k=0;k<document.getElementsByName("attr_ItemCount")[0].value;k++) {
        if (k != 0) {
            statBlock += ", ";
        }
        statBlock += document.getElementsByName("attr_EquipmentItem_" + k)[0].value;
    }

    var copyBlock = document.createElement("textarea");
    copyBlock.value = statBlock;
    document.body.appendChild(copyBlock);
    copyBlock.select();
    document.execCommand("copy");
    document.body.removeChild(copyBlock);

    alert("Copied statblock for " + CHARSHEETS[CUR_CHARSHEETS_INDEX]);
}

/************************************
* ITEM LIST METHODS - ATTACKS AND EQUIPMENT
************************************/

function addAttack() {
    var attackCount = parseInt(document.getElementsByName("attr_AttackCount")[0].value) + 1;
    document.getElementsByName("attr_AttackCount")[0].value = attackCount;

    appendAttackHTML(attackCount - 1);
    calcAttack(attackCount - 1);
    calcDamage(attackCount - 1);
}

function deleteAttack(index) {
    index = parseInt(index);
    confirm("Are you sure you want to delete this attack?");

    var attackCount = parseInt(document.getElementsByName("attr_AttackCount")[0].value);


    for (var i=index;i<attackCount-1;i++) {
        for (var j=0;j<AttackProperties.length;j++) {
            //console.log("i: " + i + ", j: " + j);

            var anElement = document.getElementsByName(AttackProperties[j] + i)[0];
            anElement.value = document.getElementsByName(AttackProperties[j] + parseInt(i + 1))[0].value;
        }
    }

    document.getElementById("attacksContainer").removeChild(document.getElementById("attacksContainer").lastChild);
    document.getElementsByName("attr_AttackCount")[0].value = attackCount - 1;
}

function modifyAttacks(toggle) {
    var controls = document.getElementsByClassName("attackControls");
    //console.log("controls length: " + controls.length);
    if (toggle == "show") {
        document.getElementById("attacksModifyShow").style = "display:none";
        document.getElementById("attacksModifyHide").style = "";

        for (var i=0;i<controls.length;i++) {
            controls[i].style = "display:block";
        }
    }
    else if (toggle == "hide") {
        document.getElementById("attacksModifyHide").style = "display:none";
        document.getElementById("attacksModifyShow").style = "";

        for (var j=0;j<controls.length;j++) {
            controls[j].style = "display:none";
        }
    }
}

function dragAttack(event, index) {
    //console.log("drag started");
    //event.dataTransfer.setData("text/html", index);

    //DataTransfer.items order is reversed on OS X Chrome browser, for some damn reason
    if (!!window.chrome && !!window.chrome.webstore && navigator.platform.indexOf("Mac") != -1) {
        event.dataTransfer.setData("attack", "");
        event.dataTransfer.setData(index, "");
    } else {
        event.dataTransfer.setData(index, "");
        event.dataTransfer.setData("attack", "");
    }
    event.dataTransfer.setDragImage(document.getElementById("attackControls_" + index), 0, 0);
    event.dataTransfer.dropEffect = "move";
}

function dropAttack(event, index) {
    var droppedIndex = event.dataTransfer.types[0];
    var tempObject = {};

    for (var i=0;i<AttackProperties.length;i++) {
        tempObject[AttackProperties[i]] = document.getElementsByName(AttackProperties[i] + index)[0].value;
        document.getElementsByName(AttackProperties[i] + index)[0].value = document.getElementsByName(AttackProperties[i] + droppedIndex)[0].value;
        document.getElementsByName(AttackProperties[i] + droppedIndex)[0].value = tempObject[AttackProperties[i]];
    }

    document.getElementById("attackControls_" + index).style.backgroundColor = "";
}

function appendAttackHTML(index) {
    var node = document.getElementById("attackForm").children[0].cloneNode(true);
    var htmlString = node.innerHTML;
    htmlString = htmlString.replace(/\${INDEX}/gi, index);
    node.innerHTML = htmlString;
    document.getElementById("attacksContainer").appendChild(node);
}

function addItem() {
    var itemCount = parseInt(document.getElementsByName("attr_ItemCount")[0].value) + 1;
    document.getElementsByName("attr_ItemCount")[0].value = itemCount;

    appendItemHTML(itemCount - 1);
    calcItemWeight(itemCount - 1, false);
    calcItemValue(itemCount - 1, false);
}

function deleteItem(index) {
    index = parseInt(index);
    confirm("Are you sure you want to delete this item?");

    var itemCount = parseInt(document.getElementsByName("attr_ItemCount")[0].value);

    for (var i=index;i<itemCount-1;i++) {
        for (var j=0;j<ItemProperties.length;j++) {
            //console.log("i: " + i + ", j: " + j);
            document.getElementsByName(ItemProperties[j] + i)[0].value = document.getElementsByName(ItemProperties[j] + parseInt(i + 1))[0].value;

            if (document.getElementsByName(ItemProperties[j] + i)[0].type == "checkbox") {
                for (k=0;k<document.getElementsByName(ItemProperties[j] + parseInt(i + 1)).length;k++) {
                    document.getElementsByName(ItemProperties[j] + i)[k].checked = document.getElementsByName(ItemProperties[j] + parseInt(i + 1))[k].checked;
                }
            }
        }
    }

    document.getElementById("itemsContainer").removeChild(document.getElementById("itemsContainer").lastChild);
    document.getElementsByName("attr_ItemCount")[0].value = itemCount - 1;
}

function toggleItemNotes(toggle, index) {
    document.getElementById("itemNotesShow_" + index).checked = toggle ? "checked" : "";
}

function modifyItems(toggle) {
    var controls = document.getElementsByClassName("itemControls");
    //console.log("controls length: " + controls.length);
    if (toggle == "show") {
        document.getElementById("itemsModifyShow").style = "display:none";
        document.getElementById("itemsModifyHide").style = "";

        for (var i=0;i<controls.length;i++) {
            controls[i].style = "display:block";
        }
    }
    else if (toggle == "hide") {
        document.getElementById("itemsModifyHide").style = "display:none";
        document.getElementById("itemsModifyShow").style = "";

        for (var j=0;j<controls.length;j++) {
            controls[j].style = "display:none";
        }
    }
}

function dragItem(event, index) {
    //console.log("drag started");
    //event.dataTransfer.setData("text/html", index);

    //DataTransfer.items order is reversed on OS X Chrome browser, for some damn reason
    if (!!window.chrome && !!window.chrome.webstore && navigator.platform.indexOf("Mac") != -1) {
        event.dataTransfer.setData("item", "");
        event.dataTransfer.setData(index, "");
    } else {
        event.dataTransfer.setData(index, "");
        event.dataTransfer.setData("item", "");
    }

    event.dataTransfer.setDragImage(document.getElementById("itemControls_" + index), 0, 0);
    event.dataTransfer.dropEffect = "move";
}

function dropItem(event, index) {
    var droppedIndex = event.dataTransfer.types[0];
    var tempValue;

    for (var i=0;i<ItemProperties.length;i++) {
        tempValue = document.getElementsByName(ItemProperties[i] + index)[0].value;
        document.getElementsByName(ItemProperties[i] + index)[0].value = document.getElementsByName(ItemProperties[i] + droppedIndex)[0].value;
        document.getElementsByName(ItemProperties[i] + droppedIndex)[0].value = tempValue;

        if (document.getElementsByName(ItemProperties[i] + index)[0].type == "checkbox") {
            for (var j=0;j<document.getElementsByName(ItemProperties[i] + index).length;j++) {
                var tempCheck = document.getElementsByName(ItemProperties[i] + index)[j].checked;
                document.getElementsByName(ItemProperties[i] + index)[j].checked = document.getElementsByName(ItemProperties[i] + droppedIndex)[j].checked;
                document.getElementsByName(ItemProperties[i] + index)[j].checked = document.getElementsByName(ItemProperties[i] + droppedIndex)[j].checked;
                document.getElementsByName(ItemProperties[i] + droppedIndex)[j].checked = tempCheck;
            }
        }
    }

    document.getElementById("itemControls_" + index).style.backgroundColor = "";
}

function appendItemHTML(index) {
    var node = document.getElementById("itemForm").children[0].cloneNode(true);
    var htmlString = node.innerHTML;
    htmlString = htmlString.replace(/\${INDEX}/gi, index);
    node.innerHTML = htmlString;
    //console.log("node count: " + node.tagName);
    //console.log("new node: " + node.nodeName);
    document.getElementById("itemsContainer").appendChild(node);
}

function onDragOver(event, index, type) {
    var itemID = event.dataTransfer.types[0];
    var itemType = event.dataTransfer.types[1];
    //console.log("itemType: " + itemType + ", index: " + index);
    //console.log("event index: " + event.dataTransfer.getData("Text") + "index: " + index);
    if (itemID != index && itemType == type) {
        event.preventDefault();
        if (document.getElementById(type + "Controls_" + index).style.backgroundColor == "") {
            document.getElementById(type + "Controls_" + index).style.backgroundColor = "rgba(255, 201, 2, 0.5)";
        }
    }
}

function onDragLeave(event, index) {
    var itemType = event.dataTransfer.types[1];
    console.log("itemType: " + itemType + ", index: " + index);
    document.getElementById(itemType + "Controls_" + index).style.backgroundColor = "";
    document.getElementById(itemType + "Controls_" + index).style.backgroundColor = "";
}

/************************************
* FIELD EVENT LISTENERS
************************************/

function nameUpdate() {
    //console.log("nameUpdate()");
    var name = document.getElementsByName("charSheet_" + CUR_CHARSHEETS_INDEX)[0].value;

    if (name == null || name == "") {
        console.log("Error: character sheet name cannot be empty");
        document.getElementsByName("charSheet_" + CUR_CHARSHEETS_INDEX)[0].value = CHARSHEETS[CUR_CHARSHEETS_INDEX];
    } else if (CHARSHEETS.includes(name)) {
        console.log("Error: character sheet name must be unique");
        var count = 1;
        while (CHARSHEETS.includes(name + " " + count)) {
            count++;
        }
        name += " " + count;
        CHARSHEETS[CUR_CHARSHEETS_INDEX] = name;
    } else {
        //new name is all good
        CHARSHEETS[CUR_CHARSHEETS_INDEX] = name;
    }

    //localStorage.setItem("charSheets", CHARSHEETS);
    //console.log(CHARSHEETS);
}

function levelUpdate() {
    document.getElementsByName("attr_level_max")[0].value = Math.floor(getHeroicLevel() / 2);

    document.getElementsByName("attr_FortLevel")[0].value = getHeroicLevel();
    document.getElementsByName("attr_WillLevel")[0].value = getHeroicLevel();

    calcReflexDef();
    calcFortDef();
    calcWillDef();

    for (var i=0;i<Skills.length;i++) {
        calcSkill(Skills[i]);
    }

    var attackCount = parseInt(document.getElementsByName("attr_AttackCount")[0].value);
    for (var j=0;j<attackCount;j++) {
        calcDamage(j);
    }
}

function attributeUpdate(name) {
    calcAttributeMod(name);

    for (var i=0;i<Skills.length;i++) {
        //console.log(skill);
        if (document.getElementsByName("attr_" + Skills[i] + "Mod")[0].value == name) {
            calcSkill(Skills[i]);
        }
    }

    for (var j=0;j<parseInt(document.getElementsByName("attr_AttackCount")[0].value);j++) {
        if (document.getElementsByName("attr_AttackMod_" + j)[0].value == name) {
            calcAttack(j);
        }
        if (document.getElementsByName("attr_DamageMod_" + j)[0].value.slice(0, 3) == name) {
            calcDamage(j);
        }
    }

    if (name == "STR") {
        calcEquipmentCapacity();
        calcCarryCapacity();
        calcEncumbrance();
        calcGrapple();
    }

    if (document.getElementsByName("attr_GrpMod")[0].value == name) {
        calcGrapple();
    }
    if (document.getElementsByName("attr_RefMod")[0].value == name) {
        calcReflexDef();
    }
    if (document.getElementsByName("attr_FortMod")[0].value == name) {
        calcFortDef();
        if (document.getElementsByName("attr_DamageThresholdDefense")[0].value == "Fortitude") {
            calcThreshold();
        }
    }
    if (document.getElementsByName("attr_WillMod")[0].value == name) {
        calcFortDef();
        if (document.getElementsByName("attr_DamageThresholdDefense")[0].value == "Will") {
            calcThreshold();
        }
    }
}

function conditionUpdate(ct) {
    CONDITION = parseInt(ct);

    calcGrapple();
    calcReflexDef();
    calcFortDef();
    calcWillDef();

    for (var i=0;i<Skills.length;i++) {
        calcSkill(Skills[i]);
    }

    for (var j=0;j<parseInt(document.getElementsByName("attr_AttackCount")[0].value);j++) {
        calcAttack();
    }
}

function sizeUpdate() {
    calcReflexDef();
    calcGrapple();
    calcCarryCapacity();
    calcSkill("Stealth");
}

function babUpdate() {
    for (var i=0;i<parseInt(document.getElementsByName("attr_AttackCount")[0].value);i++) {
        calcAttack(i);
    }
    calcGrapple();
}

function armorUpdate() {
    calcReflexDef();
    calcFortDef();
    calcWillDef();
    calcThreshold();
}

function armorProfUpdate() {
    armorUpdate();
    armorTypeUpdate();
}

function armorTypeUpdate() {
    if (document.getElementsByName("attr_ArmorWornCheck")[0].checked && !document.getElementsByName("attr_ArmorProf")[0].checked) {
        for (var skill in ArmorCheckPenalties) {
            calcSkill(ArmorCheckPenalties[skill]);
        }
    }
}

function heavyLoadUpdate() {
    for (var skill in ArmorCheckPenalties) {
        calcSkill(ArmorCheckPenalties[skill]);
    }
}

/************************************
* STATIC FIELD CALCULATORS
************************************/

function calcAttributeMod(name) {
    document.getElementsByName("attr_" + name + "_max")[0].value = getAttributeMod(name);
}

function calcSkill(name) {
    //console.log("calcSkill: " + name);
    var trained = document.getElementsByName("attr_" + name + "Feat")[0].checked ? 5 : 0;
    var focused = document.getElementsByName("attr_" + name + "Feat_max")[0].checked ? 5 : 0;
    var misc = parseInt(document.getElementsByName("attr_" + name + "Misc")[0].value);
    var skillAttr = document.getElementsByName("attr_" + name + "Mod")[0].value;
    var attrMod = getAttributeMod(skillAttr);
    var levelMod = Math.floor(getHeroicLevel() / 2);
    var penalty = 0;

    if (document.getElementsByName("attr_ArmorWornCheck")[0].checked &&
        !document.getElementsByName("attr_ArmorProf")[0].checked &&
        ArmorCheckPenalties.includes(name)) {
        penalty += ArmorPenalty[document.getElementsByName("attr_ArmorType")[0].value];
    }

    if (name == "Stealth") {
        penalty += SizeStealth[document.getElementsByName("attr_Size")[0].value];
    }

    if (document.getElementsByName("attr_EquipmentLoad")[0].checked && HeavyLoadPenalties.includes(name)) {
        penalty += -10;
    }

    document.getElementsByName("attr_" + name)[0].value = trained + focused + misc + attrMod + levelMod + penalty + getCondition();
}

function calcThreshold() {
    //calc fort/will save first
    var defAttr = document.getElementsByName("attr_DamageThresholdDefense")[0].value;
    var def;
    switch (defAttr) {
        case "Fortitude":
            def = getFortDef();
            break;
        case "Will":
            def = getWillDef();
            break;
    }
    var misc = parseInt(document.getElementsByName("attr_DamageThresholdMisc")[0].value);
    var ct;
    if (document.getElementsByName("attr_CTIgnoreDT")[0].checked) {
        ct = 0;
    } else {
        ct = getCondition();
    }

    document.getElementsByName("attr_DT")[0].value = def + misc + ct;
}

function calcReflexDef() {
    var defAttr = document.getElementsByName("attr_RefMod")[0].value;
    var defMod = getAttributeMod(defAttr);

    //get char lvl or armor bonus, whichever is higher
    var charBonus = getHeroicLevel();
    var armorBonus = parseInt(document.getElementsByName("attr_ArmorRef")[0].value);
    var charArmorBonus = 0;//total amount from heroic lvl and/or armor
    if (armorBonus > 0 && document.getElementsByName("attr_ArmorWornCheck")[0].checked && document.getElementsByName("attr_ArmorProf")[0].checked) {
        if (document.getElementsByName("attr_ImpArmorDefense")[0].checked) {
            charArmorBonus = charBonus + Math.floor(armorBonus / 2);
        } else if (document.getElementsByName("attr_ArmorDefense")[0].checked) {
            charArmorBonus = Math.max(charBonus, armorBonus);
        } else {
            charArmorBonus = armorBonus;
        }
    } else if (armorBonus > 0 && document.getElementsByName("attr_ArmorWornCheck")[0].checked) {
        charArmorBonus = armorBonus;
    } else {
        //else just use char level for ref
        charArmorBonus = charBonus;
    }

    var classBonus = parseInt(document.getElementsByName("attr_RefClass")[0].value);
    var misc = parseInt(document.getElementsByName("attr_RefMisc")[0].value);
    var sizeMod = SizeReflex[document.getElementsByName("attr_Size")[0].value];
    var flatFootedMisc = parseInt(document.getElementsByName("attr_RefFlatFootedMisc")[0].value);

    //reflex = 10 + MOD + (lvl OR armor) + class + misc + sizeMod
    var reflex = 10 + charArmorBonus + classBonus + defMod + misc + sizeMod + getCondition();
    var flatFootedReflex = 10 + charArmorBonus + classBonus + Math.min(defMod, 0) + sizeMod + flatFootedMisc + getCondition();
    document.getElementsByName("attr_RefLevel")[0].value = charArmorBonus;
    document.getElementsByName("attr_Reflex")[0].value = reflex;
    document.getElementsByName("attr_ReflexFlatFooted")[0].value = flatFootedReflex;
}

function calcFortDef() {
    var fort = getFortDef();
    if (document.getElementsByName("attr_DamageThresholdDefense")[0].value == "Fortitude") {
        calcThreshold();
    }
    document.getElementsByName("attr_Fortitude")[0].value = fort + getCondition();
}

function calcWillDef() {
    var will = getWillDef();
    if (document.getElementsByName("attr_DamageThresholdDefense")[0].value == "Fortitude") {
        calcThreshold();
    }
    document.getElementsByName("attr_Will")[0].value = will + getCondition();
}

function calcGrapple() {
    var skillAttr = document.getElementsByName("attr_GrpMod")[0].value;
    var bab = parseInt(document.getElementsByName("attr_BAB")[0].value);
    var mod = getAttributeMod(skillAttr);
    var sizeMod = SizeGrapple[document.getElementsByName("attr_Size")[0].value];
    var misc = parseInt(document.getElementsByName("attr_GrpMod_max")[0].value);

    document.getElementsByName("attr_Grapple")[0].value = bab + mod + sizeMod + misc + getCondition();
}

function calcAttack(index) {
    var bab = parseInt(document.getElementsByName("attr_BAB")[0].value);
    var attackAttr = document.getElementsByName("attr_AttackMod_" + index)[0].value;
    var mod = getAttributeMod(attackAttr);
    var misc = parseInt(document.getElementsByName("attr_AttackModMisc_" + index)[0].value);

    document.getElementsByName("attr_AttackTotal_max_" + index)[0].value = bab + mod + misc + getCondition();
}

function calcDamage(index) {
    var dmgAttr = document.getElementsByName("attr_DamageMod_" + index)[0].value;
    var mod;
    switch(dmgAttr) {
        case "STR":
        case "DEX":
        case "CHA":
            mod = getAttributeMod(dmgAttr);
            break;
        case "STR_2":
        case "DEX_2":
        case "CHA_2":
            mod = getAttributeMod(dmgAttr.slice(0,3)) * 2;
            break;
        case "0":
            mod = 0;
            break;
    }

    var levelMod = Math.floor(getHeroicLevel() / 2);
    var misc = parseInt(document.getElementsByName("attr_DamageMisc_" + index)[0].value);

    document.getElementsByName("attr_DamageTotal_max_" + index)[0].value = levelMod + mod + misc;
}

function calcItemWeight(index, initCalc) {
    var weight = getAsFloat(document.getElementsByName("attr_EquipmentWt_" + index)[0].value);
    var qty = getAsFloat(document.getElementsByName("attr_EquipmentQty_" + index)[0].value);

    if (document.getElementsByName("attr_EquipmentCarry_" + index)[0].checked && !initCalc) {
        calcEncumbrance();
    }

    document.getElementsByName("attr_EquipmentTotalWt_" + index)[0].value = weight * qty;
}

function calcItemValue(index, initCalc) {
    var value = getAsFloat(document.getElementsByName("attr_EquipmentCost_" + index)[0].value);
    var qty = getAsFloat(document.getElementsByName("attr_EquipmentQty_" + index)[0].value);

    //console.log("total :" + total);
    document.getElementsByName("attr_EquipmentTotalCost_" + index)[0].value = value * qty;

    if (!initCalc) {
        calcEquipmentWorth();
    }
}

function calcEncumbrance() {
    var total = getEncumbrance();

    if (total > getEquipmentCapacity()) {
        document.getElementsByName("attr_EquipmentLoad")[0].checked = "true";
        heavyLoadUpdate();
    } else if (document.getElementsByName("attr_EquipmentLoad")[0].checked) {
        document.getElementsByName("attr_EquipmentLoad")[0].checked = "";
        heavyLoadUpdate();
    }

    document.getElementsByName("attr_TotalEquipmentWt")[0].value = total;
}

function calcEquipmentWorth() {
    var total = 0;
    for (var i=0;i<document.getElementsByName("attr_ItemCount")[0].value;i++) {
        var qty = getAsFloat(document.getElementsByName("attr_EquipmentQty_" + i)[0].value);
        var value = getAsFloat(document.getElementsByName("attr_EquipmentCost_" + i)[0].value);
        //console.log("qty: " + qty + ", value: " + document.getElementsByName("attr_EquipmentCost_" + i)[0].value);
        total += getAsFloat(qty * value);
    }
    total += getAsFloat(document.getElementsByName("attr_ArmorCost")[0].value);

    document.getElementsByName("attr_TotalEquipmentWorth")[0].value = total;
}

function calcEquipmentCapacity() {
    document.getElementsByName("attr_EquipmentCapacity")[0].value = getEquipmentCapacity();
}

function calcCarryCapacity() {
    document.getElementsByName("attr_CarryingCapacity")[0].value = Math.pow(document.getElementsByName("attr_STR")[0].value, 2) / 2 * SizeCarryCapacity[document.getElementsByName("attr_Size")[0].value];
}

/************************************
* FORMULA CALCULATORS
************************************/

function getAttributeMod(name) {
    var value = parseInt(document.getElementsByName("attr_" + name)[0].value);
    var mod = Math.floor(value/2 - 5);

    if (mod == "DEX" && document.getElementsByName("attr_ArmorWornCheck").checked) {
        return Math.min(mod, document.getElementsByName("attr_ArmorDex")[0].value);
    } else {
        return mod;
    }
}

function getHeroicLevel() {
    return Math.floor(document.getElementsByName("attr_level")[0].value);
}

function getFortDef() {
    var defAttr = document.getElementsByName("attr_FortMod")[0].value;
    var defMod = getAttributeMod(defAttr);
    var classBonus = parseInt(document.getElementsByName("attr_FortClass")[0].value);
    var misc = parseInt(document.getElementsByName("attr_FortMisc")[0].value);

    var armorBonus;
    if (document.getElementsByName("attr_ArmorWornCheck")[0].checked && document.getElementsByName("attr_ArmorProf")[0].checked) {
        armorBonus = parseInt(document.getElementsByName("attr_ArmorFort")[0].value);
    } else {
        armorBonus = 0;
    }

    return 10 + getHeroicLevel() + defMod + classBonus + misc + armorBonus;
}

function getWillDef() {
    var defAttr = document.getElementsByName("attr_WillMod")[0].value;
    var defMod = getAttributeMod(defAttr);
    var classBonus = parseInt(document.getElementsByName("attr_WillClass")[0].value);
    var misc = parseInt(document.getElementsByName("attr_WillMisc")[0].value);

    return 10 + getHeroicLevel() + defMod + classBonus + misc;
}

function getEncumbrance() {
    var total = 0;
    for (var i=0;i<document.getElementsByName("attr_ItemCount")[0].value;i++) {
        if (document.getElementsByName("attr_EquipmentCarry_" + i)[0].checked) {
            var qty = getAsFloat(document.getElementsByName("attr_EquipmentQty_" + i)[0].value);
            var weight = getAsFloat(document.getElementsByName("attr_EquipmentWt_" + i)[0].value);
            total += qty * weight;
        }
    }
    if (document.getElementsByName("attr_ArmorCarry")[0].checked) {
        total += getAsFloat(document.getElementsByName("attr_ArmorWt")[0].value);
    }
    return total;
}

function getEquipmentCapacity() {
    var str = parseInt(document.getElementsByName("attr_STR")[0].value);
    return 0.25 * str * str;
}

function getCondition() {
    return CONDITION;
}

window.onbeforeunload = function() {
    saveCharSheetList();
    saveCharSheet(CUR_CHARSHEETS_INDEX);
};
window.onload = function () {
    console.log("Initializing content: ");
    renderCharSheetList();
    loadCharSheet(CHARSHEETS[CUR_CHARSHEETS_INDEX], CUR_CHARSHEETS_INDEX);
};

//don't want those nasty NaN values sneaking in now, do we?
getAsFloat = function(str) {
    var value = parseFloat(str);
    return Number.isNaN(value) ? 0 : value;
};

//further anti-NaN protection
function validateInput(input) {
    if (input.value === "") {
        input.value = 0;
        console.log("Error! Input '" + input.name + "' cannot be empty");
    }
}