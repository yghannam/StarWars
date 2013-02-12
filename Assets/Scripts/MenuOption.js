#pragma strict

var level:String = "game";

function OnSelected(on:boolean){
	if(on){
		iTween.MoveTo(gameObject,{"x":-750, "time":0.5, "transition":"bounce"});
		iTween.RotateTo(gameObject, {"y":-30, "time":0.5});
	}else{
		iTween.MoveTo(gameObject,{"x":-853, "time":0.5, "transition":"bounce"});
		iTween.RotateTo(gameObject, {"y":0, "time":0.5});
	}
}

function Activate(){
	if(level == "exit"){
		Debug.Log("Level exit");
		Application.Quit();
	}else
		Application.LoadLevel(level);
}
