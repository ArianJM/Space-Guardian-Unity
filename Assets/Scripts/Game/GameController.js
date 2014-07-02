#pragma strict

var astBasic : GameObject;
var astDiv : GameObject;
var hazardCount : int;	// Not counting divided asteroids
var spawnWait : float;
var startWait : float;
var waveWait : float;
var scoreText : GUIText;

private var passedHazards : int = 0;
private var asteroidsInWave : int = 0; // Counting divided asteroids
private var gameOver : boolean = false;
private var restart : boolean = false;
private var score : int = 0;
private var asteroidsDestroyed : int = 0;
private var highScoreLeaderboard : HighScoreLeaderboard;
private var achievements : Achievements;

function Start () {
	Debug.Log("Starting game");
	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	achievements = GetComponent(Achievements);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
	
	UpdateScore();
    SpawnWave ();
    Debug.Log("GameController started");
}
function Update(){
	if (restart) Application.LoadLevel("gameOver");
}

private var type2Positions : Array = new Array ();
function SpawnWave () {
	if (gameOver) {
		restart = true;
		return;
	}
	asteroidsInWave = 0;
	var lvl : int = Mathf.Floor((score+50)/50);
	type2Positions.Clear();
	for (var j : int = 1 ; j < lvl ; j++) type2Positions.Push(Mathf.Floor(Random.Range(0.0f, 5.99f)));
	if (type2Positions.length > 0) {
		type2Positions.Sort();
		Debug.Log("Posiciones ordenadas: " + type2Positions);
		var nextType2Pos = type2Positions.Shift();
	}
	for (var i : int = 0 ; i < hazardCount ; i++) {
		var randX = Random.Range(0.1f, 0.9f);
		var vecPos = new Vector3(randX, 1.1f+i/5f, 1.0f);
		var spawnPosition : Vector3 = Camera.main.ViewportToWorldPoint(vecPos);
		spawnPosition.y = 0.0f;
	    var spawnRotation : Quaternion = Quaternion.identity;
	    if (lvl > 1 && i == nextType2Pos) {
	    	Instantiate (astDiv, spawnPosition, spawnRotation);
	    	lvl = lvl - 1;
	    	asteroidsInWave += 3;
	    	if (type2Positions.length > 0) {
	    		Debug.Log("Posiciones que quedan: " + type2Positions);
				nextType2Pos = type2Positions.Shift();
			}
	    } else {
	    	Instantiate (astBasic, spawnPosition, spawnRotation);
	    	asteroidsInWave += 1;
	    }
	}
}


public function AddScore (addScore : int){
	score += addScore;
	UpdateScore();
}
public function PassedHazard (destroyed : boolean, countsAs : int) {
	if (destroyed) asteroidsDestroyed += 1;
	passedHazards += countsAs;
	if (passedHazards >= asteroidsInWave) {
		Debug.Log (passedHazards+"/"+asteroidsInWave);
		passedHazards = 0;
		SpawnWave ();
	}
}
function UpdateScore () {
	scoreText.text = "Score: " + score;
}
function IsGameOver (){
	return gameOver;
}
function GameOver (){
	PlayerPrefs.SetInt("Final Score", score);
	var highScore : int = 0;
	if (PlayerPrefs.HasKey("High score")) highScore = PlayerPrefs.GetInt("High score");
	
	if (PlayerPrefs.HasKey("Logged")) {
		if (PlayerPrefs.GetInt("Logged") == 1) {
			if (score > highScore){
				if (highScoreLeaderboard != null){ 
					highScoreLeaderboard.PostHighScore(score);
					// TODO Check if the Highscore has been submitted, if not try later
					PlayerPrefs.SetInt("High score", score);
				}
			}
			UnlockAchievements ();
		}
	}
	gameOver = true;
}

function UnlockAchievements () {
	if (!PlayerPrefs.HasKey("Warming up"))
		if (asteroidsDestroyed >= 20) achievements.UnlockWarmingUp();
	if (!PlayerPrefs.HasKey("Getting started"))
		if (asteroidsDestroyed >= 50) achievements.UnlockGettingStarted();
	if (!PlayerPrefs.HasKey("Getting serious"))
		if (asteroidsDestroyed >= 200) achievements.UnlockGettingSerious();
	if (!PlayerPrefs.HasKey("We're talking"))
		if (asteroidsDestroyed >= 500) achievements.UnlockWereTalking();
	if (!PlayerPrefs.HasKey("Something else"))
		if (asteroidsDestroyed >= 1000) achievements.UnlockSomethingElse();
	if (asteroidsDestroyed > 0) achievements.IncrementSpaceDuster(asteroidsDestroyed);
	if (asteroidsDestroyed > 0) achievements.IncrementSpaceSweeper(asteroidsDestroyed);
}