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

function Start () {
	Debug.Log("Starting game");
	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
	gameOver = false;
	restart = false;
	score = 0;
	UpdateScore();
    SpawnWaves ();
    Debug.Log("GameController started");
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
	if (PlayerPrefs.HasKey("High score")){
		var highScore : int = PlayerPrefs.GetInt("High score");
	} else {
		PlayerPrefs.SetInt("High score", score);
		highScore = score;
		var post : boolean = true;
	} if (score > highScore || post){
		if (highScoreLeaderboard != null){ 
			highScoreLeaderboard.PostHighScore(score);
			// TODO Check if the Highscore has been submitted, if not
			PlayerPrefs.SetInt("High score", score);
		}
	}
	gameOver = true;
}