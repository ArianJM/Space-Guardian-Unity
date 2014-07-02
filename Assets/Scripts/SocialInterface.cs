using GooglePlayGames;
using UnityEngine.SocialPlatforms;
using UnityEngine;
using System.Collections;

public class SocialInterface : MonoBehaviour {
	bool playGamesInit = false;
	// Use this for initialization
	void Start () {
		if( !playGamesInit ){
			PlayGamesPlatform.DebugLogEnabled = true;
			PlayGamesPlatform.Activate();
			playGamesInit = true;
			Debug.Log("Play Games initted");
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
}
