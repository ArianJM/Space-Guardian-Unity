#pragma strict

class Boundary{
	var xMin : float;
	var xMax : float;
	var zMin : float;
	var zMax : float;
}

var shot : GameObject;
var shotSpawn : Transform;
var fireRate : float;
private var nextFire : float;
private var pixelHeight : int;
private var shipMoveMargin : int;

function Update() {
	if (PlayerPrefs.GetInt("Pause") == 1) return;
	if (Input.touchCount > 0 && Time.time > nextFire){
		nextFire = Time.time + fireRate;
		Instantiate (shot, shotSpawn.position, shotSpawn.rotation);
	}
}
function Start() {
	 pixelHeight = Mathf.RoundToInt(Camera.main.pixelHeight*0.075);
	 shipMoveMargin = Mathf.RoundToInt(Camera.main.pixelHeight*0.015);
	//Scale to a size relative to the screen
	var scale : Vector3 = (Camera.main.ViewportToWorldPoint(Vector3.one)
						- Camera.main.ViewportToWorldPoint(Vector3.zero));
	scale.x = Mathf.Abs(scale.x);
	scale.z = Mathf.Abs(scale.z);
	if (scale.x >= scale.z) scale = new Vector3 (scale.x, scale.x, scale.x);
	else scale = new Vector3 (scale.z, scale.z, scale.z);
	scale = scale/5;
	Debug.Log("Ship scale: " + scale);
	transform.localScale = scale;
	//Move to the correct starting place
	var position : Vector3 = Camera.main.ViewportToWorldPoint(new Vector3(0.5f,0.2f,0.5f));
	position.y = 0.0f;
	Debug.Log("Start Ship position: " + position);
	transform.position = position;

	initShipBoundary();
}

var boundary : Boundary;

function initShipBoundary(){
	//Boundary scale relative to screen
	var scale : Vector3 = (Camera.main.ViewportToWorldPoint(Vector3.one)
						- Camera.main.ViewportToWorldPoint(Vector3.zero));
	scale.x = Mathf.Abs(scale.x);
	scale.z = Mathf.Abs(scale.z);
	boundary.xMin = ((-1)*scale.x)/2;	//Real boundary
	boundary.xMin -= boundary.xMin/5;	//A bit of margin
	boundary.xMax = scale.x/2;
	boundary.xMax -= boundary.xMax/5;
	boundary.zMin = ((-1)*scale.z)/2;
	boundary.zMin -= boundary.zMin/4 -2;	//-2 to center, camera is not in (0,0,0)
	boundary.zMax = scale.z/2;
	boundary.zMax -= boundary.zMax/4 -2;
	Debug.Log("Ship boundary: " + boundary.xMin+" "+boundary.xMax+" "+boundary.zMin+" "+boundary.zMax);
}

var speed : float;
var tilt : float;
private var previousTilt : float = 0.0f;
var tiltIncrement : float;

function FixedUpdate () {
	if (PlayerPrefs.GetInt("Pause") == 1){
		rigidbody.velocity = Vector3.zero;
		return;
	}
	if (Input.touchCount > 0) {
		var moveTouch : Touch = Input.GetTouch(0);
		var moveHorizontal : float = moveTouch.position.x;
		var moveVertical : float = moveTouch.position.y+pixelHeight;
		var shipInScreen : Vector3 = Camera.main.WorldToScreenPoint(transform.position);

		var vecX : float = moveHorizontal - shipInScreen.x;
		var vecY : float = moveVertical - shipInScreen.y;
		var total : float = Mathf.Abs(vecX) + Mathf.Abs(vecY);
		if (Mathf.Abs(vecX) < shipMoveMargin){
			vecX = 0.0f;
			total -= Mathf.Abs(vecX);
		} else vecX = vecX/total;
		if (Mathf.Abs(vecY) < shipMoveMargin){
			vecY = 0.0f;
			total -= Mathf.Abs(vecY);
		} else vecY = vecY/total;

		var movement : Vector3 = new Vector3(vecX, 0.0f, vecY);
		movement *= speed;
		rigidbody.velocity = movement;
		rigidbody.position = new Vector3 (
	        Mathf.Clamp (rigidbody.position.x, boundary.xMin, boundary.xMax), 
	        0.0f, 
	        Mathf.Clamp (rigidbody.position.z, boundary.zMin, boundary.zMax)
    	);
    	
	   	if (vecX > 0 && previousTilt < 0) previousTilt = 0.0f;
	   	else if (vecX > 0 && previousTilt < tilt) previousTilt += tiltIncrement;
	   	else if (vecX < 0 && previousTilt > 0) previousTilt = 0.0f;
	   	else if (vecX < 0 && previousTilt > -tilt) previousTilt -= tiltIncrement;
   	} else {
   		if (previousTilt > 0) previousTilt -= tiltIncrement;
   		else if (previousTilt < 0) previousTilt += tiltIncrement;
   	}
   	rigidbody.rotation = Quaternion.Euler (0.0f, 180.0f, previousTilt);
	if (Input.touchCount == 0) rigidbody.velocity = Vector3.zero;
}