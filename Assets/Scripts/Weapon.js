#pragma strict

function Start () {
	
}

function Update () {

}

function Enable(){
	gameObject.SetActiveRecursively(true);
}

function Disable(){
	gameObject.SetActiveRecursively(false);
}