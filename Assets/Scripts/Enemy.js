#pragma strict

var beam:GameObject;
var ratio: float;
var ini_x:float;
var ini_y:float;
var ini_z:float;
var lost_points:int = 5;
var LookAtPlayer: Transform;

var damp = 0.5;
var bullitPrefab: Transform;
var savedTime = 0;
var velocity: int = 200;
static var CANSHOOT = false;
static var CANDIE = false;

public var intentionalExplosion : GameObject;

var forceUsed:int = 0;

function Update () {
	//maxz = 1 - 4
	//maxx = -4 - 4
	//maxy = 4 - 5
	transform.position = Vector3(Mathf.PingPong(Time.time*1.5,9)-5,Mathf.PingPong(Time.time*1.5,1)+2,Mathf.PingPong(Time.time*1.5,3)+1);
	//always look to the player
	if(LookAtPlayer){
		var rotate = Quaternion.LookRotation(LookAtPlayer.position, transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotate, Time.deltaTime*damp);
		transform.LookAt(LookAtPlayer);
		
		var seconds:int = Time.time;
		var oddeven = (seconds % 2);
		if(oddeven && CANSHOOT){
			Shoot(seconds);
		}
	}
	if(forceUsed == 1 && CANDIE){
		Debug.Log("You have used the force");
		Explode ();
	}
	
}

function ForceUsed(){
	forceUsed = 1;
}
// Create the laser beams and shoot it to the player.
function Shoot(seconds){
	if(seconds != savedTime){
		var bullit = Instantiate(bullitPrefab, transform.Find("spawnPoint").transform.position, Quaternion.identity); // Enemy's spawnPoint instantiate
		bullit.rigidbody.AddForce(transform.forward * velocity); // speed of the beam
		savedTime = seconds;
	}
}

function Explode () {
	Spawner.Spawn (intentionalExplosion, transform.position, Quaternion.identity);
	Spawner.Destroy(gameObject);
	FirstLevel.GUION = false;
	SecondLevel.GUION = true;
}

/*  // This is for the random enemies.

	var newPosition : Vector2 = Random.insideUnitCircle * 5;
	transform.position.x = newPosition.x;
	transform.position.y = newPosition.y;
*/