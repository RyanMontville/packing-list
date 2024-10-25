<?php
//run composer require bcosca/fatfree-core in terminal
require(__DIR__.'/vendor/autoload.php');

$fw = Base::instance();
$fw->set('AUTOLOAD', '/app/');
require(__DIR__.'/services.php');

$fw->route('GET /', function() { echo 'fatfree is running'; });

//--------------------------users--------------------------
//get all users
$fw->route('GET /users', function($fw, array $args = []): void {
    $data = $fw->DB->exec("SELECT * FROM users");
    $json = array();
    foreach($data as $row) {
        $item = array();
        foreach($row as $key => $value) {
            $item[$key] = $value;
        }
        array_push($json, $item);
    }
    http_response_code(200);
    echo json_encode($json);
});

//get user_id from username
$fw->route('GET /users/@username', function($fw, array $args = []): void {
    $username = $args['username'];
    $data = $fw->DB->exec("SELECT user_id FROM users WHERE username = ?", [$username]);
    $lengthOfData = count($data);
    if ($lengthOfData > 0) {
        $user_id = 0;
        foreach($data as $row) {
            foreach($row as $key => $value) {
            $user_id = $value;
            }
        }
        http_response_code(200);
        echo json_encode($user_id);
    } else {
        http_response_code(200);
        echo json_encode(0);
    }
});

//new user
$fw->route('POST /users', function($fw, array $args = []): void {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $fw->DB->exec("INSERT INTO users(username) VALUES (?)", [$username]);
});

//--------------------------lists--------------------------
//get all lists for user_id
$fw->route('GET /lists/@userid', function($fw, array $args = []): void {
    $userid = $args['userid'];
    $data = $fw->DB->exec("SELECT * FROM lists WHERE user_id = ?", [$userid]);
    $json = array();
    foreach($data as $row) {
        $item = array();
        foreach($row as $key => $value) {
            $item[$key] = $value;
        }
        array_push($json, $item);
    }
    http_response_code(200);
    echo json_encode($json);
});

//get list by list_id
$fw->route('GET /list/@listid', function($fw, array $args = []): void {
    $listid = $args['listid'];
    $data = $fw->DB->exec("SELECT * FROM lists WHERE list_id = ?", [$listid]);
    $json = array();
    foreach($data as $row) {
        foreach($row as $key => $value) {
            $json[$key] = $value;
        }
    }
    http_response_code(200);
    echo json_encode($json);
});

//create new list
$fw->route('POST /lists', function($fw, array $args = []): void {
    $data = json_decode(file_get_contents('php://input'), true);
    $userid = $data['user_id'];
    $listname = $data['list_name'];
    $dateleaving = $data['date_leaving'];
    $fw->DB->exec("INSERT INTO lists(user_id, list_name, date_leaving) VALUES (:userid, :listname, :dateleaving)", [':userid' => $userid, ':listname' => $listname, ':dateleaving' => $dateleaving]);
});

//update date leaving
$fw->route('PUT /lists', function($fw, array $args = []): void {
    $data = json_decode(file_get_contents('php://input'), true);
    $listid = $data['list_id'];
    $dateleaving = $data['date_leaving'];
    $fw->DB->exec("UPDATE lists SET date_leaving = :dateleaving WHERE list_id = :listid", [':dateleaving' => $dateleaving, ':listid' => $listid]);
});

//--------------------------items--------------------------
//get all items for list_id
$fw->route('GET /items/@listid', function($fw, array $args = []): void {
    $listid = $args['listid'];
    $data = $fw->DB->exec("SELECT item_id, list_id, item_name, is_item_checked FROM items WHERE list_id = :listid AND is_item_deleted = FALSE", [':listid' => $listid]);
    $json = array();
    foreach($data as $row) {
        $item = array();
        foreach($row as $key => $value) {
            $item[$key] = $value;
        }
        array_push($json, $item);
    }
    http_response_code(200);
    echo json_encode($json);
});

//add new item to list
$fw->route('POST /items', function($fw, array $args = []): void {
    $data = json_decode(file_get_contents('php://input'), true);
    $listid = $data['list_id'];
    $itemname = $data['item_name'];
    $fw->DB->exec("INSERT INTO items(list_id, item_name) VALUES (:listid, :itemname)", [':listid' => $listid, ':itemname' => $itemname]);
});

//update completed boolean for item
$fw->route('PUT /items', function($fw, array $args = []): void {
    $data = json_decode(file_get_contents('php://input'), true);
    $itemid = $data['item_id'];
    $isitemchecked = $data['is_item_checked'];
    $fw->DB->exec("UPDATE items SET is_item_checked = :isitemchecked WHERE item_id = :itemid", [':isitemchecked' => $isitemchecked, ':itemid' => $itemid]);
});

//change delete boolean for item
$fw->route('PUT /delete_item', function($fw, array $args = []): void {
    $data = json_decode(file_get_contents('php://input'), true);
    $itemid = $data['item_id'];
    $isitemdeleted = $data['is_item_deleted'];
    $fw->DB->exec("UPDATE items SET is_item_deleted = :isitemdeleted WHERE item_id = :itemid", [':isitemdeleted' => $isitemdeleted, ':itemid' => $itemid]);
});

$fw->run();