#pragma strict

var speed : float;
var tumble : float;
var alreadyPaused : boolean = false;
private var randomRotation : Vector3;

function Start () : void {
	rigidbody.velocity = transform.forward * -speed;
	randomRotation = Random.insideUnitSphere * tumble;
	rigidbody.angularVelocity = randomRotation;
}

function Update() : void {
	if (alreadyPaused && PlayerPrefs.GetInt("Pause") == 0){
		alreadyPaused = false;
		rigidbody.velocity = transform.forward * -speed;
		RestartRotation();
	}else if (PlayerPrefs.GetInt("Pause") == 1 && !alreadyPaused){
		alreadyPaused = true;
		rigidbody.velocity = Vector3.zero;
		StopRotation();
	}
}

function RestartRotation (){
	rigidbody.angularVelocity = randomRotation;
}

function StopRotation (){
	rigidbody.angularVelocity = Vector3.zero;
	rigidbody.rotation = Quaternion.Euler(0,0,0);
}
