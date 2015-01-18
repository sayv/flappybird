// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = -1;
var score_label;
var main_player;
var pipes;
var pipe_interval = 3;
var b;
var c;
var d;
var f;
var g;
var player;


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
    game.load.image("brick","assets/brick1.jpg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#00FFFF");
    game.add.text(30,20,"Wanna play?",
        {font:"50px Calibri",fill:"#FF0000"});
    b =game.add.sprite(15,320,"player_pic_right_stand");
    c =game.add.sprite(90,320,"player_pic_right_walk");
    d =game.add.sprite(160,320,"player_pic_oh");
    f =game.add.sprite(230,320,"player_pic_left_walk");
    g =game.add.sprite(300,320,"player_pic_left_stand");
    pipes = game.add.group();

    score_label = game.add.text(10,10,"0");

    player = game.add.sprite(500,200,"player_pic_oh");




    make_pipe();
    game.time.events.loop(pipe_interval*Phaser.Timer.SECOND,make_pipe);


    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);



    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
   // game.physics.arcade.enable(a);
    game.physics.arcade.enable(b);
    game.physics.arcade.enable(c);
    game.physics.arcade.enable(d);
    //game.physics.arcade.enable(e);
    game.physics.arcade.enable(f);
    game.physics.arcade.enable(g);


    //player.body.velocity.x = 100;
    player.body.gravity.y = 200;
    //a.body.velocity.x=-100;
    b.body.velocity.x=-100;
    c.body.velocity.x=-100;
    d.body.velocity.x=-100;
    //e.body.velocity.x=-100;
    f.body.velocity.x=-100;
    g.body.velocity.x=-100;

}

function make_pipe(){
    var gap_start = game.rnd.integerInRange(2,7)
    for (var count = 0; count<10; count++){
        if(count != gap_start && count != gap_start + 1 && count != gap_start + 2){
            //game.add.sprite(500,40*count,"brick");
            add_pipes(900,count*40);

            //game.add.sprite(800,400-40*(count+1),"brick");
            //game.add.sprite(550 + 40*count,250,"brick" );
            //game.add.sprite(900,40*count,"brick");
        }

    }
    changeScore();
}

function add_pipes (x,y){
    var pipe = pipes.create(x,y,"brick");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -100;
}

function clickHandler(event){
    //alert("press 'OK' to play",

    //game.add.sprite(event.x,event.y,"player_pic_oh");
}

function spaceHandler() {
    game.sound.play("mystery");
    //changeScore();
    player_jump();
}

function player_jump(){
    player.body.velocity.y= -100;
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

function game_over() {
    game.destroy();
    alert("GAMEOVER! You got " + score + "points");
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player,pipes,game_over);
}