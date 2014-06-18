#pragma strict

var hazard : GameObject;
var hazardCount : int;
var spawnWait : float;
var startWait : float;
var waveWait : float;

var scoreText : GUIText;

private var gameOver : boolean;
private var restart : boolean;
private var score : int;
private var highScoreLeaderboard : HighScoreLeaderboard;
private var pauseGame : PauseGame;

function Start () {
	var pauseGameObject : GameObject = GameObject.FindGameObjectWithTag("PauseText");
	if (pauseGameObject != null)
		pauseGame = pauseGameObject.GetComponent(PauseGame);
	if (pauseGame == null)
		Debug.Log ("Cannot find 'PauseGame' script");

	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
	gameOver = false;
	restart = false;
	score = 0;
	UpdateScore();
    SpawnWaves ();
}

function Update(){
	if (restart) Application.LoadLevel("gameOver");
}

function SpawnWaves () {
	yield WaitForSeconds (startWait);
	var waitAsteroid : boolean = false;
	var waitWave : boolean = false;
	while (true){
		for ( var i : int = 0 ; i < hazardCount ; i++){
			if (PlayerPrefs.GetInt("Pause") == 0){
				var randX = Random.Range(0.1f, 0.9f);
				var spawnPosition : Vector3 = Camera.main.ViewportToWorldPoint(new Vector3(randX, 1.1f, 1.0f));
				spawnPosition.y = 0.0f;
			    var spawnRotation : Quaternion = Quaternion.identity;
			    Instantiate (hazard, spawnPosition, spawnRotation);
			    while(!waitAsteroid){
					if (PlayerPrefs.GetInt("Pause") == 0){
			    		yield WaitForSeconds (spawnWait+((Random.value*spawnWait)-(spawnWait/2)));
			    		waitAsteroid = true;
			    	}
			    	yield WaitForSeconds (0.3);
			    }
			    waitAsteroid = false;
		    }
		}
		while(!waitWave){
			if (PlayerPrefs.GetInt("Pause") == 0) {
				yield WaitForSeconds (waveWait+((Random.value*waveWait)-(waveWait/2)));
				waitWave = true;
			}
			yield WaitForSeconds (0.3);
		}
		waitWave = false;
		if (gameOver){
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
	PlayerPrefs.SetInt("Final Score", score);
	gameOver = true;
	if (highScoreLeaderboard != null){ 
		Debug.Log("Request to post high score: "+score);
		highScoreLeaderboard.PostHighScore(score);
	}
}