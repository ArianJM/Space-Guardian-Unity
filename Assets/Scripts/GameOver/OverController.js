#pragma strict

var scoreText : GUIText;
var gameOverText : GUIText;

private var gameOver : boolean;
private var restart : boolean;
private var score : int;
private var highScoreLeaderboard : HighScoreLeaderboard;

function Start () {
	score = PlayerPrefs.GetInt("Final Score");
	scoreText.text = "Score: " + score;
	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
}