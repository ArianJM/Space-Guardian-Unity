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
					string userInfo = "Username: " + Social.localUser.userName +
						"\nUser ID: " + Social.localUser.id +
						"\nIs under age: " + Social.localUser.underage;
					Debug.Log(userInfo);
				}else Debug.Log("Authentication failed");
			});
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
