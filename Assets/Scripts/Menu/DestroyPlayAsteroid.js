#pragma strict

var explosion : GameObject;

function Start () {
	rigidbody.angularVelocity = Vector3(0.3,0,0);
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Boundary") {
		return;
	}
	Instantiate(explosion, transform.position, transform.rotation);
	Destroy(other.gameObject);
	Destroy(gameObject);
}