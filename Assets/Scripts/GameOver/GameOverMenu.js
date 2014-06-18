#pragma strict

private var highScoreLeaderboard : HighScoreLeaderboard;
private var tap : boolean = true;
var restartCollider : Collider;
var highscoresCollider: Collider;

function Start () {
	highScoreLeaderboard = GetComponent(HighScoreLeaderboard);
	if (highScoreLeaderboard == null) Debug.Log ("Cannot find 'HighScoreLeaderboard' script");
}

function Update() {
	if (Input.touchCount > 0){
		var touch : Touch = Input.GetTouch(0);
		var cursorRay : Ray = Camera.main.ScreenPointToRay(touch.position);
		var hit : RaycastHit;
		
		if (touch.phase == TouchPhase.Moved) {
			if (!collider.Raycast (cursorRay, hit, 50.0f)) tap = false;
		} else if (touch.phase == TouchPhase.Ended){
			if (tap && restartCollider.Raycast(cursorRay, hit, 50.0f)) {
				Application.LoadLevel("game");
			} else if (tap && highscoresCollider.Raycast(cursorRay, hit, 50.0f)) {
				if (highScoreLeaderboard != null)
					highScoreLeaderboard.ShowLeaderboard();
			}
			tap = true;
		}
	}
}