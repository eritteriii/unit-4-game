// Define Variables
var baseAttackPower = "";
var player;
var defender;
var characters = [];
var defenderPick = false;
var playerPick = false;

// Constructor Function
function Char(name, hp, ap, counter, image) {
    this.name = name;
    this.hitPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.image = image;
}



// Stacking Attack Power Function
Char.prototype.increaseAttack = function () {
    this.attackPower += baseAttackPower
}

// Attack Function
Char.prototype.attack = function (Obj) {
    Obj.hitPoints -= this.attackPower
    //$('#msg').html(""You attacked " +
        //Obj.name + "for " + this.attackPower + " damage points."")
    this.increaseAttack()
}

// Counter Attack Function
Char.prototype.counterAttack = function (Obj) {
    Obj.hitPoints -= this.counterAttackPower
    //$('#PLACEHOLDERMESSAGEDIV').append("MESSAGE CONCATENATED TEXT")
}
//var vader = new Char("Darth Vader", "180", "25", "5", "")

// Initialize Characters Function
function initChar() {
    var yoda = new Char("Grand Master Yoda", "220", "20", "40", "./assets/images/yoda.png")
    var plo = new Char("Plo Koon", "160", "15", "10", "./assets/images/plo.png")
    var kit = new Char("Kit Fisto", "120", "10", "15", "./assets/images/kit.png")
    var ahsoka = new Char("Ahsoka Tano", "100", "30", "5", "./assets/images/ahsoka.png")
    var vader = new Char("Darth Vader", "180", "25", "5", "./assets/images/vader.png")
    characters.push(yoda, plo, kit, ahsoka, vader);
}


function setBaseAttackPower(Obj) {
    baseAttackPower = Obj.attackPower;
}

function isUp(Obj) {
    if (Obj.hitPoints > 0) {
        return true;
    }
    return false;
}

function success() {
    if (characters.length == 0 && player.hitPoints > 0)
        return true;
    else return false;
}

function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < 4; i++) {
        $(divID).append("<div />");
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<img />");
        $(divID + " img:last-child").attr("id", characters[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", characters[i].image);
        $(divID + " img:last-child").attr("width", 150);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + " div:last-child").append(characters[i].name + "<br>");
        $(divID + " div:last-child").append("HP: " + characters[i].hitPoints);
        $(divID + " idv:last-child").append();
    }
}

function moveImg(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < characters.length; i++) {
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", characters[i].name);
        $(toDivID + " img:last-child").attr("src", characters[i].pic);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}

function screenChange() {
    $('#homeScreen').empty();
    $('#selectScreen').show();
}

$('#execute').on("click", function () {
    screenChange();
    $("#msg").html("Who will you hunt first?");
})

$(document).on("click", "img", function () {
    
    if (playerPick && !defenderPick && (this.id != player.name)) {
        for (var j = 0; j < characters.length; j++) {
            if (characters[j].name == (this).id) {
                defender = characters[j];
                characters.splice(j, 1);
                defenderPick = true;
                $("#msg").html("Click the button to attack!");
            }
        }

        $("#enemyDiv").append(this);
        $("#enemyDiv").append("<br>" + defender.name);
        $("#enemyHealthDiv").append("HP: " + defender.hitPoints);

    }

    if (!playerPick) {
        //for (var i = 0; i < characters.length; i++) {
          //  if (characters[i].name == (this).id) {
                player = characters["vader"]; // sets current player
                
                setBaseAttackPower(player);
                characters.splice("vader", 1);
                playerPick = true;
               // $("#msg").html("Pick an enemy to fight!");
            }
        
        


    //$('#execute').on("click", function() {
    //setAttack(player);
    //screenChange();
    




moveImg("#cards", "#defendersLeftDiv");
$("#vaderDiv").append(this);

$("#vaderDiv").append(player.name);
$("#vaderHealthDiv").append("HP: " + player.healthPoints);
    
});



$(document).on("click", "#attackBtn", function () {
    if (defenderPick) {
        if (isUp(player) && isUp(defender)) {
            player.attack(defender);
            defender.counterAttack(player);
            $("#vaderHealthDiv").html("HP: " + player.hitPoints);
            $("#enemyHealthDiv").html("HP: " + defender.hitPoints);
            if (!isUp(defender)) {
                $("#enemyHealthDiv").html("DEFEATED!");
                $("#vaderHealthDiv").html("Enemy defeated!");
                $("#msg").html("Pick another enemy to battle...");
            }
            if (!isUp(player)) {
                $("#vaderHealthDiv").html("YOU LOST!");
                $("#msg").html("Try again...");
                $("#attackBtn").html("Restart Game");
                $(document).on("click", "#attackBtn", function () { // restarts game
                    location.reload();
                });
            }
        }
        if (!isUp(defender)) {


            $("#enemyDiv").children().remove();
            $("#enemyDiv").html("");
            $("#enemyHealthDiv").html("");
            defenderPick = false;
            if (isWinner()) {
                $("#secondScreen").hide();
                $("#globalMsg").show();
            }
        }
    }

});
// EXECUTE
$(document).ready(function () {
    $("#selectScreen").hide();
    //$("#globalMsg").hide();
    initChar();
    characterCards("#cards");
});

