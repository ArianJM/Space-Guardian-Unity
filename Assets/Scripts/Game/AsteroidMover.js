#pragma strict

var speed : float;
var tumble : float;
var alreadyPaused : boolean = false;
private var initialRotation : Quaternion;
private var randomRotation : Vector3;
private var gameController : GameController;
private var lvl : int;

function Start () : void {
	lvl = PlayerPrefs.GetInt("lvl");
	speed += 0.05*Mathf.Floor(lvl/7);

	initialRotation = transform.rotation;
	rigidbody.velocity = transform.forward * -speed;
	randomRotation = Random.insideUnitSphere * tumble;
	rigidbody.angularVelocity = randomRotation;
}

function OnEnable () {
	PauseGame.OnPause += AsteroidPaused;
}
function OnDisable () {
	PauseGame.OnPause -= AsteroidPaused;
}
function AsteroidPaused () {
	if (PlayerPrefs.GetInt("Pause") == 1) {
		rigidbody.velocity = Vector3.zero;
		StopRotation();
	} else {
		rigidbody.velocity = transform.forward * -speed;
		RestartRotation();
	}
}

function RestartRotation (){
	rigidbody.angularVelocity = randomRotation;
}

function StopRotation (){
	rigidbody.angularVelocity = Vector3.zero;
	rigidbody.rotation = initialRotation;
	//rigidbody.rotation = Quaternion.Euler(0,0,0);
}
