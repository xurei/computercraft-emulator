<?php

require('./S3.php');

if (isset($_POST)) {
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	
	if (isset($data['sessid'])) {
		$sessid = $data['sessid'];
		unset($data['sessid']);
		$json = json_encode($data, JSON_PRETTY_PRINT);
		
		$s3 = new S3('AKIAJDYCFSM3MEIF6GVA', '8/GBBm6SSSJEwtZsRMsLqQ8L8raL2dg+j9XliWuI', '', 's3.eu-west-1.amazonaws.com');
		
		$filename = $sessid . '-' . time() . '.json';
		
		$s3->putObject($json, 'ccemu-logs', $filename);
	}
	else {
		http_response_code(500);
	}
}
