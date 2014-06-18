#pragma strict

private var move : boolean = false;

function Update() {
	if (move) {
		if (transform.position.z <= -4) {
			rigidbody.velocity = Vector3(0,0,0);
			Debug.Log("Loading game");
			Application.LoadLevel("game");
		}
	}
}

function MoveCamera() {
	move = true;
	rigidbody.velocity = transform.up * -2;
}