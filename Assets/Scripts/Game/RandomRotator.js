#pragma strict

var tumble : float;
private var randomRotation : Vector3;

function Start () {
	randomRotation = Random.insideUnitSphere * tumble;
	rigidbody.angularVelocity = randomRotation;
}

function RestartRotation (){
	rigidbody.angularVelocity = randomRotation;
}

function StopRotation (){
	rigidbody.angularVelocity = Vector3.zero;
}