#pragma strict

var GuiOn = false;
var halfScreenW:float = Screen.width*0.5;
var halfScreenH:float = Screen.height*0.5;
var BoxW:int = 400;
var BoxH:int = 200;
var halfBoxW:float = BoxW*0.5;
var halfBoxH:float = BoxH*0.5;
var ready:int = 0;

var icon : Texture2D;

//Those 2 fcts are just to change the color of your word when you hover the mouse over them

function OnMouseEnter(){
	renderer.material.color = Color.green;
}

function OnMouseExit(){
	renderer.material.color = Color.white;
}

function OnGUI(){
	if(GuiOn){//check if gui should be on. If false, the gui is off, if true, the gui is on
		GUI.skin.box.fontSize = 15;
		GUI.skin.button.fontSize = 20;
		// Make a background box
		GUI.Box(Rect (halfScreenW,50,BoxW,BoxH), GUIContent(" You start your training as a Jedi Youngling you will learn \nhow to control the Force and wield a lightsaber.\nThe title of Youngling is the first part of Jedi training.\nAvoid laser beams from the droid.", icon) );
		// Make the first button. If pressed, quit game
		if (ready == 1){//GUI.Button (Rect (halfScreenW+200,200,120,40), "Ready !")) {
			clockScript.ISPAUSED = false;
			clockScript.ISPRESSED = Time.time;
			Enemy.CANSHOOT = true;
			GuiOn=false;
		}
	}
}

function Ready(){
	ready = 1;
}