#pragma strict

var savedTime = 0;
private var min_x: float = -1.5;
private var max_x: float = 1.5;
private var min_y: float = 3.0;
private var max_y: float = 3.5;


function Start () {

}

function Update () {
	var seconds:int = Time.time;
	var oddeven = (seconds % 2);
	
	if(oddeven){
		changeSpawnPoint(seconds);
	}
}

// Change Dinamically the spawnPoint in order to make send random beams to the player.
function changeSpawnPoint(seconds){
	if(seconds != savedTime){
		transform.position.x = Random.Range(min_x, max_x);
		transform.position.y = Random.Range(min_y, max_y);
		savedTime = seconds;	
	}
}