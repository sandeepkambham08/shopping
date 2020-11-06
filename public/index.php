<?php
echo 'hello world';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
}