#pragma strict

private var tap : boolean = true;
private var moveCamera : MoveCamera;

function Start() {
	moveCamera = Camera.main.GetComponent(MoveCamera);
	if (moveCamera == null) Debug.Log("Cannot find 'MoveCamera' script");
}

function Update() {
	if (Input.touchCount > 0){
		var touch : Touch = Input.GetTouch(0);
		var cursorRay : Ray = Camera.main.ScreenPointToRay(touch.position);
		var hit : RaycastHit;
		
		if (touch.phase == TouchPhase.Moved) {
			if (!collider.Raycast (cursorRay, hit, 50.0f)) tap = false;
		} else if (touch.phase == TouchPhase.Ended){
			if (tap && collider.Raycast(cursorRay, hit, 50.0f)) {
				Debug.Log( "Hit detected on object " + name + " at point " + hit.point );
				if (name == "Play Text"){
					if (moveCamera != null) moveCamera.MoveCamera();
				}
			}
			tap = true;
		}
	}
}