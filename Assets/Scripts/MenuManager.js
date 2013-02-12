#pragma strict

var menuItems:MenuOption[];
var currentMenuItem:int = 0;
var keyDelay:float = 0.25;
var lastMenuItem:int;

function Start () {
	menuItems[currentMenuItem].OnSelected(true);
	lastMenuItem = currentMenuItem;
	gameObject.SendMessage("EnableMenu");
	
	while(true){
		if(Input.GetAxisRaw("Vertical") > 0.9){
			lastMenuItem = currentMenuItem;
			currentMenuItem--;
			if(currentMenuItem < 0) currentMenuItem = 0;
			if(lastMenuItem != currentMenuItem){
				menuItems[lastMenuItem].OnSelected(false);
				menuItems[currentMenuItem].OnSelected(true);
			}
			yield new WaitForSeconds(keyDelay);
		}else if(Input.GetAxisRaw("Vertical") < -0.9){
			lastMenuItem = currentMenuItem;
			currentMenuItem++;
			if(currentMenuItem >= menuItems.length ) currentMenuItem = menuItems.length - 1;
			if(lastMenuItem != currentMenuItem){
				menuItems[lastMenuItem].OnSelected(false);
				menuItems[currentMenuItem].OnSelected(true);
			}
			yield new WaitForSeconds(keyDelay);
		}
		yield;
		if(Input.GetButtonDown("Jump")){
			Debug.Log("You activated MenuItem #"+currentMenuItem);
			menuItems[currentMenuItem].Activate();
		} 
	}
}

function MoveDown(){
lastMenuItem = currentMenuItem;
			currentMenuItem++;
			if(currentMenuItem >= menuItems.length ) currentMenuItem = menuItems.length - 1;
			if(lastMenuItem != currentMenuItem){
				menuItems[lastMenuItem].OnSelected(false);
				menuItems[currentMenuItem].OnSelected(true);
			}
}

function MoveUp(){
	Debug.Log("move up");
	lastMenuItem = currentMenuItem;
			currentMenuItem--;
			if(currentMenuItem < 0) currentMenuItem = 0;
			if(lastMenuItem != currentMenuItem){
				menuItems[lastMenuItem].OnSelected(false);
				menuItems[currentMenuItem].OnSelected(true);
			}
}

function Select(){
Debug.Log("You activated MenuItem #"+currentMenuItem);
			menuItems[currentMenuItem].Activate();
}

function Update(){

}