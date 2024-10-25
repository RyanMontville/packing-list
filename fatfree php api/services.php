<?php

$db = new DB\SQL(
    'mysql:host=localhost;port=3306;dbname=[databasename];charset=utf8',
    '[username]',
    '[password]',
    [
		PDO::ATTR_EMULATE_PREPARES => false,
		PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
	]
);

$db->log(false);

$fw->set('DB', $db);