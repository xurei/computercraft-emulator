<?php

require('./S3.php');
require_once('./keys.php');

global $KEYS;

if (isset($_POST)) {
	$json = file_get_contents('php://input');
	$data = json_decode($json, true);
	
	if (isset($data['sessid'])) {
		$sessid = $data['sessid'];
		unset($data['sessid']);
		$json = json_encode($data, JSON_PRETTY_PRINT);
		
		$s3 = new S3($KEYS['AWS_KEY'], $KEYS['AWS_SECRET'], '', 's3.eu-west-1.amazonaws.com');
		
		$filename = $sessid . '-' . time() . '.json';
		
		$s3->putObject($json, 'ccemu-logs', $filename, S3::ACL_PRIVATE, array(), array('Content-Type' => 'application/json'));
	}
	else {
		http_response_code(500);
	}
}
