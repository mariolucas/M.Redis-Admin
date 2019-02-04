<?php 

$data = '{
	"servers":[
		{
			"name":"Localhost",
			"host":"redis",
			"port":6379,
			"timeout":0,
			"persistent_id":null,
			"pass":null
		}
	]
}';

return json_decode($data, true);