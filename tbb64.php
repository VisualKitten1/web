<?php

// Get the encoded string from the URL
$encoded_string = $_GET['decode'];

// Decode the string from base64
$decoded_string = base64_decode($encoded_string);

// Display the decoded string
echo $decoded_string;

?>
