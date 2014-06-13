#pragma strict

function Start () {
	//Background scale relative to screen
	var scale : Vector3 = (Camera.main.ViewportToWorldPoint(Vector3.one)
						- Camera.main.ViewportToWorldPoint(Vector3.zero));
	scale.x = Mathf.Abs(scale.x);
	scale.z = Mathf.Abs(scale.z);
	if (scale.x >= scale.z) scale = new Vector3 (scale.x, scale.x, scale.x);
	else scale = new Vector3 (scale.z, scale.z, scale.z);
	transform.localScale = scale;
	
	//Background position relative to screen
	var position : Vector3 = Camera.main.ViewportToWorldPoint(new Vector3(0.5f,0.5f,0.5f));
	var bot : Vector3 = Camera.main.ViewportToWorldPoint(Vector3.zero);
	var top : Vector3 = Camera.main.ViewportToWorldPoint(Vector3.one);
	Debug.Log(bot +" "+ top);
	position.z = bot.z - (Mathf.Abs(bot.z)+Mathf.Abs(top.z))/2;
	position.y = -1.0f;
	transform.position = position;
}