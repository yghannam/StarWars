#pragma strict


function Start () {
	
}

function OnCollisionEnter(col:Collision){
	if(col.gameObject.tag == "Player"){
		clockScript.SCORE = clockScript.SCORE + 10;
		GameObject.Find("Player_Wrapper").SendMessage("PlayLaserCollision");
	}
	if(col.gameObject.tag == "wall"){
		clockScript.LIFE = clockScript.LIFE - 10;
		Destroy (gameObject);
	}
}