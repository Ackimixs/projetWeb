<?php

require_once('database.php');

// Database connection.
$db = dbConnect();
if (!$db)
{
    header('HTTP/1.1 503 Service Unavailable');
    exit;
}

?>
