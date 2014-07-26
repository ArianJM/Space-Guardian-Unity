#pragma strict

var explosion : GameObject;

function Start () {
	rigidbody.angularVelocity = Vector3(0.3,0,0);
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Boundary") {
		return;
	}
	var pos : Vector3 = transform.position;
	pos.x = other.transform.position.x;
	Instantiate(explosion, pos, transform.rotation);
	Destroy(other.gameObject);
	Destroy(gameObject);
}