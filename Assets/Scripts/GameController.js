#pragma strict

var hazard : GameObject;
var hazardCount : int;
var spawnWait : float;
var startWait : float;
var waveWait : float;

var scoreText : GUIText;
var restartText : GUIText;
var gameOverText : GUIText;

private var gameOver : boolean;
private var restart : boolean;
private var score : int;

function Start () {
	gameOver = false;
	restart = false;
	restartText.text = "";
	gameOverText.text = "";
	score = 0;
	UpdateScore();
    SpawnWaves ();
}

function Update(){
	if (restart && Input.touchCount >= 1) Application.LoadLevel(Application.loadedLevel);
}

function SpawnWaves () {
	yield WaitForSeconds (startWait);
	while (true){
		for ( var i : int = 0 ; i < hazardCount ; i++){
			var randX = Random.Range(0.1f, 0.9f);
			var spawnPosition : Vector3 = Camera.main.ViewportToWorldPoint(new Vector3(randX, 1.1f, 1.0f));
			spawnPosition.y = 0.0f;
		    var spawnRotation : Quaternion = Quaternion.identity;
		    Instantiate (hazard, spawnPosition, spawnRotation);
		    yield WaitForSeconds (spawnWait);
		}
		yield WaitForSeconds (waveWait);
		if (gameOver){
			restartText.text = "Tap to restart";
			restart = true;
			break;
		}
	}
}

function AddScore (addScore : int){
	score += addScore;
	UpdateScore();
}

function UpdateScore () {
	scoreText.text = "Score: " + score;
}

function IsGameOver (){
	return gameOver;
}
function GameOver (){
	gameOverText.text = "Game Over!";
	gameOver = true;
}