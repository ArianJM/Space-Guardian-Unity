#pragma strict

var explosion : GameObject;
var playerExplosion : GameObject;

function OnTriggerEnter(other : Collider){
	if(other.tag == "Boundary") return;
	Instantiate(explosion, transform.position, transform.rotation);
	if (other.tag == "Player") Instantiate(playerExplosion, other.transform.position, other.transform.rotation);
	Destroy(other.gameObject);
	Destroy(gameObject);
}