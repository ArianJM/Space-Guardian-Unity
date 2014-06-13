#pragma strict

var explosion : GameObject;
var playerExplosion : GameObject;
var scoreValue : int;

private var gameController : GameController;

function Start() {
	var gameControllerObject : GameObject = GameObject.FindWithTag("GameController");
	if (gameControllerObject != null)
		gameController = gameControllerObject.GetComponent(GameController);
	if (gameController == null)
		Debug.Log ("Cannot find 'GameController' script");
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Boundary") return;
	Instantiate(explosion, transform.position, transform.rotation);
	if (other.tag == "Player"){
		Instantiate(playerExplosion, other.transform.position, other.transform.rotation);
		gameController.GameOver();
	}
	else gameController.AddScore(scoreValue);
	Destroy(other.gameObject);
	Destroy(gameObject);
}

function OnTriggerExit(other : Collider){
	if(other.tag == "Boundary" && !gameController.IsGameOver()){
		gameController.AddScore(scoreValue/2);
	}
}