#pragma strict

private static var instance : SoundtrackSingleton;

public static function GetInstance () : SoundtrackSingleton {
	return instance;
}

function Awake () {
	if (instance != null && instance != this) {
		Destroy (this.gameObject);
		return;
	} else {
		instance = this;
	}
	DontDestroyOnLoad (this.gameObject);
}