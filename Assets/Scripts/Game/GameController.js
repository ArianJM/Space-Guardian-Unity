#pragma strict

var astBasic : GameObject;
var astDiv : GameObject;
var fasteroid : GameObject;
var hazardCount : int;	// Not counting divided asteroids
var spawnWait : float;
var startWait : float;
var waveWait : float;
var scoreText : GUIText;
var highScoreText : GUIText;
var timeToLvlUp : float;

private var lvl : int = 0;
private var initTimer : float;
private var passedHazards : int = 0;
private var asteroidsInWave : int = 0; // Counting divided asteroids
private var gameOver : boolean = false;
private var restart : boolean = false;
private var score : int = 0;
private var highScore : int = 0;
private var asteroidsDestroyed : int = 0;
private var highScoreLeaderboard : HighScoreLeaderboard;
private var achievements : Achievements;
private var proportion : float;

function Start () {
	if (PlayerPrefs.HasKey("High score")) highScore = PlayerPrefs.GetInt("High score");
	highScoreText.text = "High Score: "+highScore;
	scoreText.text = "Score: " + score;
	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	achievements = GetComponent(Achievements);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
	
	proportion = Camera.main.pixelHeight/Camera.main.pixelWidth;
	
	UpdateScore();
    SpawnWave ();
    initTimer = timeToLvlUp;
}

function Update (){

	if (PlayerPrefs.GetInt("Pause") == 0) timeToLvlUp -= Time.deltaTime;
	if (timeToLvlUp < 0) {
		timeToLvlUp = initTimer;
		lvl += 1;
	}
	
	if (gameOver) StartCoroutine("FinishGame");
	if (restart) Application.LoadLevel("gameOver");
}

private var type2Positions : Array = new Array ();
private var type3Positions : Array = new Array ();

function SpawnWave () {
	if (gameOver) {
		restart = true;
		return;
	}
	asteroidsInWave = 0;
	lvl = Mathf.Floor((score+50)/50);
	PlayerPrefs.SetInt("lvl", lvl);
	hazardCount = 10 + Mathf.Floor (lvl/10.0);
	//Debug.Log("hazard: "+hazardCount+" lvl: "+lvl);
	type2Positions.Clear();
	type3Positions.Clear();
	for (var j : int = 1 ; j < Mathf.Floor(hazardCount/2.0) && lvl > 2 ; j++)
		type2Positions.Push(Mathf.Floor(Random.Range(0.0f, hazardCount*0.3)));
	for (var k : int = 1 ; k < Mathf.Floor(hazardCount/5.0) && lvl > 10 ; k++)
		type3Positions.Push(Mathf.Floor(Random.Range(2.0f, hazardCount*0.7)));

	if (type2Positions.length > 1) {
		type2Positions.Sort();
		var nextType2Pos = type2Positions.Shift();
	}
	if (type3Positions.length > 0) {
		type3Positions.Sort();
		var nextType3Pos = type3Positions.Shift();
	}
	
	
	for (var i : int = 0 ; i < hazardCount ; i++) {
		var randX = Random.Range(0.1f, 0.9f);
		var vecPos = new Vector3(randX, 1.1f+i/5f, 1.0f);
		var spawnPosition : Vector3 = Camera.main.ViewportToWorldPoint(vecPos);
		spawnPosition.y = 0.0f;
	    var spawnRotation : Quaternion = Quaternion.identity;
	    var control : int = lvl-1;
	    if (control > 1 && i == nextType2Pos) {
	    	Instantiate (astDiv, spawnPosition, spawnRotation);
	    	control = control - 1;
	    	asteroidsInWave += 3;
	    	while (nextType2Pos == i && type2Positions.length > 0)
	    		nextType2Pos = type2Positions.Shift();
	    } else {
	    	Instantiate (astBasic, spawnPosition, spawnRotation);
	    	asteroidsInWave += 1;
	    }
	    if (control >= 0 && i == nextType3Pos) {
	    	if (Random.value >= 0.5) {
	    		spawnRotation = Quaternion.Euler( Vector3(0, 300, 0));
	    		spawnPosition = Vector3(-proportion * i, 0.0f, i+4);
	    	} else {
	    		spawnRotation = Quaternion.Euler( Vector3(0, 60, 0));
	    		spawnPosition = Vector3(proportion * i, 0.0, i+4);
	    	}
	    	Instantiate (fasteroid, spawnPosition, spawnRotation);
	    	asteroidsInWave += 1;
	    	while (nextType3Pos == i && type3Positions.length > 0)
	    		nextType3Pos = type3Positions.Shift();
	    } 
	}
}

public function GetLvl () : int {
	return lvl;
}

public function AddScore (addScore : int){
	score += addScore;
	UpdateScore();
}
public function PassedHazard (destroyed : boolean, countsAs : int) {
	if (destroyed) asteroidsDestroyed += 1;
	passedHazards += countsAs;
	if (passedHazards >= asteroidsInWave) {
		//Debug.Log (passedHazards+"/"+asteroidsInWave);
		passedHazards = 0;
		SpawnWave ();
	}
}
function UpdateScore () {
	scoreText.text = "Score: " + score;
	if (score > highScore) highScoreText.text = "High Score: "+score;
}
function IsGameOver () {
	return gameOver;
}
function GameOver () {
	PlayerPrefs.SetInt("Final Score", score);
	PlayerPrefs.SetInt("lvl", 0);
	var googleHighScore : int = 0;
	if (PlayerPrefs.HasKey("GoogleHighScore")) googleHighScore = PlayerPrefs.GetInt("GoogleHighScore");
	
	if (score > highScore) {
		Debug.Log("Score > highscore");
		PlayerPrefs.SetInt("High score", score);
		highScore = score;
	}
	
	if (PlayerPrefs.HasKey("Logged")) {
		if (PlayerPrefs.GetInt("Logged") == 1) {
			if (highScore > googleHighScore){
				// A lo mejor la puntuacion mas alta no esta en Google, enviamos esa,
				// no necesariamente la actual, sino la mas alta
				if (highScoreLeaderboard != null){
					highScoreLeaderboard.PostHighScore(highScore);
				}
			}
			UnlockAchievements ();
		}
	}
	gameOver = true;
}

private var finishing : boolean = false;
function FinishGame () {
	if (!finishing) {
		if (PlayerPrefs.HasKey("DestAst")) {
			var destAst : int = PlayerPrefs.GetInt("DestAst")+asteroidsDestroyed;
			PlayerPrefs.SetInt("DestAst", destAst);
		} else PlayerPrefs.SetInt("DestAst", asteroidsDestroyed);
		finishing = true;
		yield WaitForSeconds (3);
		Application.LoadLevel("gameOver");
	}
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
	if (asteroidsDestroyed > 0) achievements.IncrementSpaceJanitor(asteroidsDestroyed);
	if (asteroidsDestroyed > 0) achievements.IncrementSpaceShield(Mathf.Round(asteroidsDestroyed/2));
	if (asteroidsDestroyed > 0) achievements.IncrementSpaceGuardian(Mathf.Round(asteroidsDestroyed/5));
}