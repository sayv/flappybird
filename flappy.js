// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var score_label;
var main_player;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1000, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.image("player_pic_oh","assets/man.png");
    game.load.image("player_pic_left_stand","assets/stand_left.png");
    game.load.image("player_pic_left_walk","assets/walk_left.png");
    game.load.image("player_pic_right_stand","assets/stand_right.png");
    game.load.image("player_pic_right_walk","assets/walk_right.png");
    game.load.audio("mystery","assets/lift.wav");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#00FFFF");
    game.add.text(30,20,"Wanna play?",
        {font:"50px Calibri",fill:"#FF0000"});
    game.add.text(30,120,"Get ready then...");
    game.add.sprite(15,320,"player_pic_right_stand");
    game.add.sprite(90,320,"player_pic_right_walk");
    game.add.sprite(160,320,"player_pic_oh");
    game.add.sprite(230,320,"player_pic_left_walk");
    game.add.sprite(300,320,"player_pic_left_stand");

    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    score_label = game.add.text(10,10,"0");

    player = game.add.sprite(300,200,"player_pic_oh");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
}

function clickHandler(event){
    //alert("press 'OK' to play",

    //game.add.sprite(event.x,event.y,"player_pic_oh");
}

function spaceHandler() {
    game.sound.play("mystery");
    changeScore();
}

function changeScore() {
    score = score + 1;
    score_label.setText(score.toString());
}

function moveRight() {
    player.x = player.x+10;
}

function moveLeft() {
    player.x = player.x - 10;
}

function moveUp() {
    player.y = player.y - 10;
}

function moveDown() {
    player.y = player.y+10;
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}