#pragma strict

var explosion : GameObject;
var playerExplosion : GameObject;
var astBasic : GameObject;
var destroyValue : int;
var avoidValue : int;
var type : int;		// Asteroid type
private var gameController : GameController;

function Start() {
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	if (gameControllerObject != null)
		gameController = gameControllerObject.GetComponent(GameController);
	if (gameController == null)
		Debug.Log ("Cannot find 'GameController' script");
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Boundary") {
		return;
	}
	Instantiate(explosion, transform.position, transform.rotation);
	if (other.tag == "Player") {
		Instantiate(playerExplosion, other.transform.position, other.transform.rotation);
		HazardPass(false);
		gameController.GameOver();
	}
	else gameController.AddScore(destroyValue);
	if (other.tag == "Beam") HazardPass (true);
	switch (type){
		case 2:
			transform.rotation = Quaternion.Euler(0, Random.value*30-15, 0);
			var ast1 : GameObject = Instantiate(astBasic, transform.position, transform.rotation);
			ast1.transform.position.x -= 0.2;
			ast1.transform.Rotate(0.0, 10, 0.0);
			var ast2 : GameObject = Instantiate(astBasic, transform.position, transform.rotation);
			ast2.transform.position.x += 0.2;
			ast2.transform.Rotate(0.0, -10, 0.0);
			break;
	}
	Destroy(other.gameObject);
	Destroy(gameObject);
}

function HazardPass (destroyed : boolean) {
	if (destroyed) gameController.PassedHazard (destroyed, 1);
	else {
		switch (type) {
			case 0:
				gameController.PassedHazard(destroyed, 1);
				break;
			case 2:
				gameController.PassedHazard(destroyed, 3);
				break;
			default:
				Debug.Log("Error in HazardPass (DestroyByContact.js), asteroid type not recognized");
				break;
		}
	}
}

function OnTriggerExit(other : Collider){
	if(other.tag == "Boundary"){
		if (!gameController.IsGameOver()) gameController.AddScore(avoidValue);
		HazardPass (false);
	}
}