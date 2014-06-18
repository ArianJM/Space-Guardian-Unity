#pragma strict

private var tap : boolean;
private var paused : boolean;

function Start () : void {
	tap = true;
	paused = false;
	PlayerPrefs.SetInt("Pause", 0);
}

function Update () : void {
	IsPaused();
}

function IsPaused () : boolean {
	if (Input.touchCount > 0){
		var hit : RaycastHit;
		var cursorRay : Ray;
		var touch : Touch;
		for(var i : int = 0 ; i < Input.touchCount ; i++){
			touch = Input.GetTouch(i);
			cursorRay = Camera.main.ScreenPointToRay(touch.position);
			
			if (touch.phase == TouchPhase.Moved) {
				if (!collider.Raycast (cursorRay, hit, 50.0f)) tap = false;
			} else if (touch.phase == TouchPhase.Ended){
				if (tap && collider.Raycast(cursorRay, hit, 50.0f)) {
					if(!paused){
						paused = true;
						PlayerPrefs.SetInt("Pause", 1);
					} else {
						paused = false;
						PlayerPrefs.SetInt("Pause", 0);
					}
				}
				tap = true;
			}
		}
	}
	return paused;
}