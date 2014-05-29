#pragma strict

var hazard : GameObject;
var hazardCount : int;
var spawnWait : float;
var startWait : float;
var waveWait : float;

function Start () {
    SpawnWaves ();
}

function SpawnWaves () {
	yield WaitForSeconds (startWait);
	while (true){
		for ( var i : int = 0 ; i < hazardCount ; i++){
			var randX = Random.Range(0.1f, 0.9f);
			var spawnPosition : Vector3 = Camera.main.ViewportToWorldPoint(new Vector3(randX, 1.3f, 1.0f));
			spawnPosition.y = 0.0f;
		    var spawnRotation : Quaternion = Quaternion.identity;
		    Instantiate (hazard, spawnPosition, spawnRotation);
		    yield WaitForSeconds (spawnWait);
		}
		yield WaitForSeconds (waveWait);
	}
}