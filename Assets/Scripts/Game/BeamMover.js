#pragma strict

var speed : float;
private var pauseGame : PauseGame;
var randomRotator : RandomRotator;

function Start () : void {
	rigidbody.velocity = transform.forward * -speed;
}

function Update() : void {
	if (PlayerPrefs.GetInt("Pause") == 0) rigidbody.velocity = transform.forward * -speed;
	else rigidbody.velocity = Vector3.zero;
}