#pragma strict

private var highScoreLeaderboard : HighScoreLeaderboard;
private var achievements : Achievements;
private var w : float = Screen.width/5;
private var h : float = Screen.height/5;
private var score : int;

var highScoreText : GUIText;
var scoreText : GUIText;
var achievementsIcon : Texture2D;
var leaderboardsIcon : Texture2D;
var creditsIcon : Texture2D;
var restartIcon : Texture2D;

function Start () {
	score = PlayerPrefs.GetInt("Final Score");
	highScoreText.text = "High Score: "+PlayerPrefs.GetInt("High score");
	scoreText.text = "Score: " + score;
	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
	achievements = GetComponent (Achievements);
	if (achievements == null) Debug.Log ("Cannot find 'Achievements' script");
}

function Update(){
	if (Input.GetKeyDown(KeyCode.Escape)) Application.LoadLevel("startMenu"); 
}

function OnGUI () {
	if (GUI.Button (Rect (w, h*2, w, w), restartIcon)) {
		Application.LoadLevel("game");
	}
	if (GUI.Button (Rect (w*3, h*2, w, w), leaderboardsIcon)) {
		highScoreLeaderboard.ShowHighScoreLeaderboard();
	}
	if (GUI.Button (Rect (w, h*3, w, w), achievementsIcon)) {
		achievements.ShowAchievements ();
	}
	if (GUI.Button (Rect (w*3, h*3, w, w), creditsIcon)) {
		PlayerPrefs.SetInt("Credits", 0);
		Application.LoadLevel("credits");
	}
}