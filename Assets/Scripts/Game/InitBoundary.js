#pragma strict

function Start () {
	//Boundary scale relative to screen
	var scale : Vector3 = (Camera.main.ViewportToWorldPoint(Vector3.one)
						- Camera.main.ViewportToWorldPoint(Vector3.zero));
	scale.x = Mathf.Abs(scale.x);
	scale.z = Mathf.Abs(scale.z);
	scale.y = 1.0f;
	//Debug.Log("Boundary scale: " + scale);
	transform.localScale = scale;
	//Background position relative to screen
	var position : Vector3 = Camera.main.ViewportToWorldPoint(new Vector3(0.5f,0.5f,0.5f));
	position.y = 0.0f;
	//Debug.Log("Boundary position: " + position);
	transform.position = position;
}

function OnTriggerExit(other : Collider){
	Destroy(other.gameObject);
}
