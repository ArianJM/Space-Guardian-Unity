using GooglePlayGames;
using UnityEngine.SocialPlatforms;
using UnityEngine;
using System.Collections;

public class SocialInterface : MonoBehaviour {
	void Start () {
		if (PlayerPrefs.HasKey("Logged")) {
			if (PlayerPrefs.GetInt("Logged") == 1) {
				LogIn ();
			}
		} else PlayerPrefs.SetInt("Logged", 0);
	}

	public void LogIn () {
		PlayGamesPlatform.DebugLogEnabled = true;
		PlayGamesPlatform.Activate();
		Social.localUser.Authenticate((bool success) => {
			if (success){
				Debug.Log("Authentication successful");
				PlayerPrefs.SetInt("Logged", 1);
				/*string userInfo = "Username: " + Social.localUser.userName +
						"\nUser ID: " + Social.localUser.id +
						"\nIs under age: " + Social.localUser.underage;*/
			} else {
				Debug.Log("Authentication failed");
				PlayerPrefs.SetInt("Logged", 0);
			}
		});
	}
}
