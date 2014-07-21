#pragma strict

var shot : GameObject;
var playAsteroid : GameObject;
var playGamesIcon : Texture2D;
var creditsIcon : Texture2D;

private var socialInterface : SocialInterface;
private var tap : boolean = true;
private var moveCamera : MoveCamera;
private var w : float = Screen.width/5;
private var h : float = Screen.height/5;
private var starting : boolean = false;

function Start () {
	starting = false;
	moveCamera = Camera.main.GetComponent(MoveCamera);
	if (moveCamera == null) Debug.Log("Cannot find 'MoveCamera' script");
	socialInterface = GetComponent(SocialInterface);
	if (socialInterface == null) Debug.Log("Cannot find 'SocialInterface' script");
	
	shot.transform.position = Camera.main.ViewportToWorldPoint(Vector3(0.5f, -0.1f, 0.0f));
	shot.transform.position.y = 0.0;
}



function OnGUI () {
	if (!starting) {
		if (PlayerPrefs.HasKey("Logged") && PlayerPrefs.GetInt("Logged") != 1) {
			if (GUI.Button (Rect (w, h*3, w, w), playGamesIcon)) {
				Debug.Log("Login Google Play Games");
				socialInterface.LogIn ();
			}
			if (GUI.Button (Rect (w*3, h*3, w, w), creditsIcon)) {
				PlayerPrefs.SetInt("Credits", 1);
				Application.LoadLevel("credits");
			}
		} else {
			if (GUI.Button (Rect (w*2, h*3, w, w), creditsIcon)) {
				PlayerPrefs.SetInt("Credits", 1);
				Application.LoadLevel("credits");
			}
		}
	}
}

function Update () {
	if (Input.touchCount > 0){
		var touch : Touch = Input.GetTouch(0);
		var cursorRay : Ray = Camera.main.ScreenPointToRay(touch.position);
		var hit : RaycastHit;
		
		if (touch.phase == TouchPhase.Moved) {
			if (!playAsteroid.collider.Raycast (cursorRay, hit, 50.0f)) tap = false;
		} else if (touch.phase == TouchPhase.Ended){
			if (tap && playAsteroid.collider.Raycast(cursorRay, hit, 50.0f)) {
				Debug.Log( "Hit detected on object " + name + " at point " + hit.point );
				if (name == "MenuController") {
					if (moveCamera != null) StartGame (touch);
				}
			}
			tap = true;
		}
	}
}

function StartGame (touch : Touch) {
	starting = true;
	//shot.transform.position.x = touch.position.y;
	shot.rigidbody.velocity = transform.forward * 7;
	shot.audio.Play();
	yield WaitForSeconds (1);
	moveCamera.MoveCamera();
}