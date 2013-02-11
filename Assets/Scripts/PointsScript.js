#pragma strict


function Start () {
	
}

function OnCollisionEnter(col:Collision){
	if(col.gameObject.tag == "lightsaber"){
		clockScript.SCORE = clockScript.SCORE + 10;
	}
	if(col.gameObject.tag == "wall"){
		clockScript.LIFE = clockScript.LIFE - 10;
		if(clockScript.LIFE < 0)
			clockScript.LIFE = 0;
		Debug.Log(clockScript.LIFE);
	}
}

function Update () {

}