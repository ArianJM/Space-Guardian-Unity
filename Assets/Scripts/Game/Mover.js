#pragma strict

var speed : float;

function Start () : void {
	rigidbody.velocity = transform.forward * -speed;
}