#pragma strict

static var GUION = false;
var halfScreenW:float = Screen.width*0.5;
var halfScreenH:float = Screen.height*0.5;
var BoxW:int = 400;
var BoxH:int = 200;

var icon : Texture2D;

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
		GUI.Box(Rect (halfScreenW+350,50,BoxW,BoxH), GUIContent("Now use the force to destroy the droid !!", icon) );
	}
}