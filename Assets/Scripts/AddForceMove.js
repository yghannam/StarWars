#pragma strict

var radius = 100.0;
var power = 100000.0;

function Start () {

}

function Update () {
	if(Input.GetButtonDown("Fire1")){
		Debug.Log("You have pushed the objects away");
		AddImpulseToTheDroid();
	}
}

function AddImpulseToTheDroid(){
	
	//gameObject.transform.rigidbody.AddForce(0,0,velocity);
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius);
	for (var hit : Collider in colliders) {
		if (!hit)
			continue;
		if (hit.rigidbody)
			hit.rigidbody.AddExplosionForce(power, explosionPos, radius, 0.5);
	}
}