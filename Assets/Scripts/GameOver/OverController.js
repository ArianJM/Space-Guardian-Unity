#pragma strict

var scoreText : GUIText;
private var score : int;

function Start () {
	score = PlayerPrefs.GetInt("Final Score");
	scoreText.text = "Score: " + score;
}