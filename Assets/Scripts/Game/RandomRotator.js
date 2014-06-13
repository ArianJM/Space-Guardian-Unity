#pragma strict

var tumble : float;

function Start () {
	rigidbody.angularVelocity = Random.insideUnitSphere * tumble;
}