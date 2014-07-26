using UnityEngine;
using System.Collections;

public class PauseGame : MonoBehaviour {

	public delegate void PauseAction();
	public static event PauseAction OnPause;

	public Texture2D pauseIcon;

	void OnGUI () {
		float w = Screen.width/5;
		if (GUI.Button (new Rect (w*4-10, 10, w, w), pauseIcon)) {
			if (PlayerPrefs.GetInt("Pause") == 0)
				PlayerPrefs.SetInt("Pause", 1);
			else PlayerPrefs.SetInt("Pause", 0);
			if (OnPause != null) OnPause();
		}
	}

	// Use this for initialization
	void Start () {
		PlayerPrefs.SetInt ("Pause", 0);
	}
}
