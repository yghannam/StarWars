#pragma strict

public var motor : MovementMotor;
private var player : Transform;
private var character : Transform;
public var proximityDistance : float = 4.0;
public var proximityBuildupTime : float = 2.0;
public var damageRadius : float = 5.0;

public var animationBehaviour : MonoBehaviour;
var health:int = 100;

public var audioSource : AudioSource;
public var blinkComponents : SelfIlluminationBlink[];
public var blinkPlane : GlowPlane;
public var proximityRenderer : Renderer;

public var intentionalExplosion : GameObject;

private var proximityLevel : float = 0;
private var lastBlinkTime : float = 0;

var velocity: int = 10000;
var radius = 5.0;
var power = 10000.0;

function Awake () {
	character = motor.transform;
	player = GameObject.FindWithTag("Player").transform;
	if (!blinkComponents.Length)
		blinkComponents = transform.parent.GetComponentsInChildren.<SelfIlluminationBlink> ();
}

function OnCollisionEnter(col:Collision){
	if(col.gameObject.tag == "Player"){
		clockScript.SCORE = clockScript.SCORE + 10;
		health =0;
		GameObject.Find("Player_Wrapper").SendMessage("PlayDroidCollision");
	}
	if(col.gameObject.tag == "thrown"){
		clockScript.SCORE = clockScript.SCORE + 10;
		health =0;
	}
	//Implement the other colliders for the force.
}


function Lightning(){
	if(transform.position.magnitude < 3.0f)
		health = health - 25; 
}

function Update () {

	if (audioSource.enabled)
	{
		audioSource.Play ();
	}

	var playerDirection : Vector3 = (player.position - character.position);
	playerDirection.y = 0;
	var playerDist : float = playerDirection.magnitude;
	playerDirection /= playerDist;
	animationBehaviour.enabled = true;
	//motor.movementDirection = Vector3.zero;
	motor.movementDirection = playerDirection;
	
	if (playerDist < proximityDistance)
		proximityLevel += Time.deltaTime / proximityBuildupTime;
	else
		proximityLevel -= Time.deltaTime / proximityBuildupTime;
	
	proximityLevel = Mathf.Clamp01 (proximityLevel);
	proximityRenderer.material.color = Color.Lerp (Color.blue, Color.red, proximityLevel);
	if (proximityLevel == 1)
		Explode ();
	
	var deltaBlink = 1 / Mathf.Lerp (2, 15, proximityLevel);
	if (Time.time > lastBlinkTime + deltaBlink) {
		lastBlinkTime = Time.time;
		//proximityRenderer.material.color = Color.red;
		if (audioSource.enabled)
		{
			audioSource.Play ();
		}
		for (var comp : SelfIlluminationBlink in blinkComponents) {
			comp.Blink ();	
		}
		if (blinkPlane) 
			blinkPlane.renderer.enabled = !blinkPlane.renderer.enabled;
	}
	if (Time.time > lastBlinkTime + 0.04) {
		proximityRenderer.material.color = Color.white;
	}
	
	//Debug.Log(playerDirection);
	if(playerDirection.magnitude < 1.0f)
		clockScript.LIFE -= Time.deltaTime;
	
	if(health <= 0)
		Explode();//Spawner.Destroy (character.gameObject);
	
//	if(Input.GetButtonDown("Fire1")){
//		Debug.Log("You have pushed the objects away");
//		AddImpulseToTheDroid();
//	}
	
}

function Explode () {
	Spawner.Spawn (intentionalExplosion, transform.position, Quaternion.identity);
	//clockScript.LIFE = clockScript.LIFE - 15;
	Spawner.Destroy (character.gameObject);
}