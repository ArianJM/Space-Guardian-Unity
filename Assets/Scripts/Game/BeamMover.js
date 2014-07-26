#pragma strict

var speed : float;
private var gameController : GameController;
private var lvl : int;

function Start () : void {
	lvl = PlayerPrefs.GetInt("lvl");
	speed += 0.07*Mathf.Floor(lvl/7);
	rigidbody.velocity = transform.forward * -speed;
}

function OnEnable () {
	
	PauseGame.OnPause += BeamPaused;
}
function OnDisable () {
	PauseGame.OnPause -= BeamPaused;
}

function BeamPaused () {
	if (PlayerPrefs.GetInt("Pause") == 0) rigidbody.velocity = transform.forward * -speed;
	else rigidbody.velocity = Vector3.zero;
}