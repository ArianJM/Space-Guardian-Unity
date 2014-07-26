using GooglePlayGames;
using UnityEngine;
using System.Collections;

/* This file is in this folder because it has to be compiled early */

public class HighScoreLeaderboard : MonoBehaviour {
	public void PostHighScore (int score) {
		Social.ReportScore(score, "CgkIpuWIg6AaEAIQBg", (bool success) => {
			if (success) PlayerPrefs.SetInt("GoogleHighScore", score);
			else Debug.Log (score + " could not be submited to the high score leaderboard");
		});
	}

	public void ShowLeaderboard (){
		Social.ShowLeaderboardUI();
	}

	public void ShowHighScoreLeaderboard () {
		((PlayGamesPlatform) Social.Active).ShowLeaderboardUI("CgkIpuWIg6AaEAIQBg");
	}
}