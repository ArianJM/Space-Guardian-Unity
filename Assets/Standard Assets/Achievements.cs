using GooglePlayGames;
using UnityEngine;
using System.Collections;

/* This file is in this folder because it has to be compiled early */

public class Achievements : MonoBehaviour {
	public void ShowAchievements () {
		Social.ShowAchievementsUI();
	}

	public void UnlockWarmingUp () {
		Social.ReportProgress("CgkIpuWIg6AaEAIQAQ", 100.0f, (bool success) => {
			if (success) {
				Debug.Log ("Warming up unlocked!");
				PlayerPrefs.SetInt("Warming up", 1);
			}
			else Debug.Log ("Could not unlock Warming up");
		});
	}
	public void UnlockGettingStarted () {
		Social.ReportProgress("CgkIpuWIg6AaEAIQAg", 100.0f, (bool success) => {
			if (success) {
				Debug.Log ("Just Getting Started unlocked!");
				PlayerPrefs.SetInt("Getting started", 1);
			}
			else Debug.Log ("Could not unlock Just Getting Started");
		});
	}
	public void UnlockGettingSerious () {
		Social.ReportProgress("CgkIpuWIg6AaEAIQAw", 100.0f, (bool success) => {
			if (success) {
				Debug.Log ("This is getting serious unlocked!");
				PlayerPrefs.SetInt("Getting serious", 1);
			}
			else Debug.Log ("Could not unlock This is getting serious");
		});
	}
	public void UnlockWereTalking () {
		Social.ReportProgress("CgkIpuWIg6AaEAIQBA", 100.0f, (bool success) => {
			if (success) {
				Debug.Log ("Now we're talking unlocked!");
				PlayerPrefs.SetInt("We're talking", 1);
			}
			else Debug.Log ("Could not unlock Now we're talking");
		});
	}
	public void UnlockSomethingElse () {
		Social.ReportProgress("CgkIpuWIg6AaEAIQBQ", 100.0f, (bool success) => {
			if (success) {
				Debug.Log ("This is something else unlocked!");
				PlayerPrefs.SetInt("Something else", 1);
			}
			else Debug.Log ("Could not unlock this is something else");
		});
	}
	public void IncrementSpaceDuster (int increment) {
		((PlayGamesPlatform) Social.Active).IncrementAchievement(
			"CgkIpuWIg6AaEAIQCQ", increment, (bool success) => {
			if (success) Debug.Log ("Space Duster incremented!"+increment);
			else Debug.Log ("Could not increment Space Duster");
		});
	}
	public void IncrementSpaceSweeper (int increment) {
		((PlayGamesPlatform) Social.Active).IncrementAchievement(
			"CgkIpuWIg6AaEAIQCA", increment, (bool success) => {
			if (success) Debug.Log ("Space sweeper incremented! "+increment);
			else Debug.Log ("Could not increment Space Sweeper");
		});
	}
	public void IncrementSpaceJanitor (int increment) {
		((PlayGamesPlatform) Social.Active).IncrementAchievement(
			"CgkIpuWIg6AaEAIQCg", increment, (bool success) => {
			if (success) Debug.Log ("Space sweeper incremented! "+increment);
			else Debug.Log ("Could not increment Space Sweeper");
		});
	}
	public void IncrementSpaceShield (int increment) {
		((PlayGamesPlatform) Social.Active).IncrementAchievement(
			"CgkIpuWIg6AaEAIQDA", increment, (bool success) => {
			if (success) Debug.Log ("Space sweeper incremented! "+increment);
			else Debug.Log ("Could not increment Space Sweeper");
		});
	}
	public void IncrementSpaceGuardian (int increment) {
		((PlayGamesPlatform) Social.Active).IncrementAchievement(
			"CgkIpuWIg6AaEAIQCw", increment, (bool success) => {
			if (success) Debug.Log ("Space sweeper incremented! "+increment);
			else Debug.Log ("Could not increment Space Sweeper");
		});
	}
}
