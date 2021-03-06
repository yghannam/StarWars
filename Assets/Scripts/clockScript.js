#pragma strict

static var ISPAUSED:boolean = true;
var startTime:float; //(in seconds)
var timeRemaining:float; //(in seconds)
var percent:float;
static var LIFE: float = 100.0;
static var ISPRESSED:float;

// textures to hold life variable.
var clockBG:Texture2D;
var clockFG:Texture2D;
var clockFGMaxWidth:float; // the starting width of the foreground bar

// textures to hold time.
var rightSide:Texture2D;
var leftSide:Texture2D;
var back:Texture2D;
var blocker:Texture2D;
var shiny:Texture2D;
var finished:Texture2D;

// textfield to hold the score and score variable
private var textfield:GUIText;
static var SCORE:int;

function UpdateScoreText()
{
    // update textfield with score
    textfield.text = SCORE.ToString();
}

function Start () {
	startTime = 60.0;
	clockFGMaxWidth = clockFG.width;
	textfield = GameObject.Find("GUI/txt-score").GetComponent(GUIText);
	SCORE = 0;
	UpdateScoreText();
	
}

function Update () {
	if(!ISPAUSED){
		//make sure the timer is not paused
		DoCountdown();
		UpdateScoreText();
	}
	if(LIFE <= 0)
		Debug.Log("Game Over");
}

function UpdateLife(amount:float){
	LIFE +=  amount;
}

function OnGUI(){
	
	var pieClockX:int = 100;
	var pieClockY:int = 10;
	var pieClockW:int = 96; // clock width
	var pieClockH:int = 96; // clock height
	var pieClockHalfW:int = pieClockW * 0.5; // half the clock  width
	var pieClockHalfH:int = pieClockH * 0.5; // half the clock height
	
	var newBarWidth:float = (LIFE/100) * clockFGMaxWidth; // this is the width that the foreground bar should be


	var gap:int = 20; // a spacing variable to help us position the clock
	
	GUI.BeginGroup(new Rect(Screen.width-clockBG.width-gap, gap, clockBG.width, clockBG.height));
	GUI.DrawTexture(Rect(0,0,clockBG.width, clockBG.height-gap),clockBG);
	
	GUI.BeginGroup(new Rect(5,6,newBarWidth, clockFG.height));
	GUI.DrawTexture(Rect(0,0,clockFG.width, clockFG.height),clockFG);
	GUI.EndGroup();
	
	GUI.EndGroup();
	
	var isPastHalfway:boolean = percent < 50;
	var clockRect:Rect = Rect(pieClockX,pieClockY,pieClockW,pieClockH);

	var rot:float = (percent/100) * 360;
	var centerPoint:Vector2 = Vector2(pieClockX+pieClockHalfW,pieClockY+pieClockHalfH);
	var startMatrix:Matrix4x4 = GUI.matrix;

	GUI.DrawTexture(clockRect, back, ScaleMode.StretchToFill, true, 0);
	
	if(isPastHalfway){
		GUIUtility.RotateAroundPivot(-rot-180, centerPoint);
		GUI.DrawTexture(clockRect, leftSide, ScaleMode.StretchToFill, true, 0);
		GUI.matrix = startMatrix;
		GUI.DrawTexture(clockRect,blocker,ScaleMode.StretchToFill, true, 0);
	}else{
		GUIUtility.RotateAroundPivot(-rot, centerPoint);
		GUI.DrawTexture(clockRect,rightSide, ScaleMode.StretchToFill,true,0);
		GUI.matrix = startMatrix;
		GUI.DrawTexture(clockRect, leftSide, ScaleMode.StretchToFill,true,0);
	}
	
	GUI.DrawTexture(clockRect, shiny, ScaleMode.StretchToFill, true, 0);
	if(percent<0){
		GUI.DrawTexture(clockRect,finished,ScaleMode.StretchToFill,true,0);
	}
	GUI.DrawTexture(clockRect,shiny,ScaleMode.StretchToFill,true,0);
}

function DoCountdown(){
	timeRemaining = startTime - Time.time + ISPRESSED;
	Debug.Log(Time.time);
	percent = timeRemaining/startTime * 100;
	if(timeRemaining < 0){
		timeRemaining = 0;
		ISPAUSED =true;
		TimeIsUp();
	}
}

function PauseClock(){
	ISPAUSED = true;
}

function UnpauseClock(){
	ISPAUSED = false;
}

function TimeIsUp(){
	Enemy.CANSHOOT = false;
	if(LIFE > 0 && !SecondLevel.attack){
		GameObject.Find("Player_Wrapper").SendMessage("TrainerCanDie");
		FirstLevel.GUION = true;
		Enemy.CANDIE = true;
		SecondLevel.ready = 0;
	}
}

