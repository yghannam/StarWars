#pragma strict

public var icon : Texture2D;

var halfScreenW:float = Screen.width*0.5;
var BoxW:int = 400;
var BoxH:int = 200;
var savedTime = 0;
var countdroids = 50;

var bigdroid: GameObject;

var bullitPrefab: Transform;

static var GUION = false;
static var attack = false;

var myTimer : float = 5.0;


static var ready:int = 0;

function Start(){
	bigdroid.SetActiveRecursively(false);
}

//Those 2 fcts are just to change the color of your word when you hover the mouse over them

function OnMouseEnter(){
	renderer.material.color = Color.green;
}

function OnMouseExit(){
	renderer.material.color = Color.white;
}

function OnGUI(){
	if(GUION){//check if gui should be on. If false, the gui is off, if true, the gui is on
		GUI.skin.box.fontSize = 15;
		GUI.skin.button.fontSize = 20;
		// Make a background box
		GUI.Box(Rect (halfScreenW-200,50,BoxW,BoxH), GUIContent("Congratulations!! A Padawan now you are.\nSeveral droids attack you will.\nAll them destroy you should ! \nMay the force be with you.", icon) );
		// Make the first button. If pressed, quit game
		if (ready == 1){//GUI.Button (Rect (halfScreenW-50,200,120,40), "Ready !")) {
			clockScript.ISPAUSED = false;
			attack = true;
			GUION=false;
		}
	}
}

function Update(){
	
	if(myTimer > 0){
		myTimer -= Time.deltaTime;
	}
	if(myTimer <= 0){
		if(attack){
			if(countdroids > 0)
				CreateDroids();
		}
		myTimer = 5.0;
	}	
}

function ShowFuture(enable:boolean){

	if(countdroids > 0){
		bigdroid.SetActiveRecursively(enable);
		bigdroid.transform.position = Vector3(2, 0, 10);
	}
}


function CreateDroids(){
	var spawnpoints = ["droid_fact1","droid_fact2"];
	var bullit = Instantiate(bullitPrefab, GameObject.FindWithTag(spawnpoints[0]).transform.position, Quaternion.identity); // Enemy's spawnPoint instantiate
	var bullit2 = Instantiate(bullitPrefab, GameObject.FindWithTag(spawnpoints[1]).transform.position, Quaternion.identity); // Enemy's spawnPoint instantiate
	countdroids -= 2;
	Debug.Log("Droids " + countdroids);
	if(countdroids <= 0){
		bigdroid.SetActiveRecursively(true);
	}
	//bullit.rigidbody.AddForce(transform.forward * velocity); // speed of the beam
}

function Ready(){
	ready = 1;
}