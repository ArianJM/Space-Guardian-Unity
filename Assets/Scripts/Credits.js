#pragma strict

var backIcon : Texture2D;
private var w : float = Screen.width/5;
private var h : float = Screen.height/5;

function OnGUI () {
	if (GUI.Button (Rect (w*2, h*4, w, w), backIcon)) {
		if (PlayerPrefs.GetInt("Credits") == 1) Application.LoadLevel("startMenu");
		else Application.LoadLevel("gameOver");
	}
}