<?php 
/*
header("content-Type: text/html; charset=utf-8");
echo "<b>hallo ihr arschgeigen</b>"
*/
$ausgabe;
$file = "config.json";

if(isset($_GET["test"]))
{
    $ausgabe = array();
    $ausgabe['switch'] =  $_GET["test"];
    echo file_put_contents($file, json_encode($ausgabe));
    
    //$test = "test_check";
    //print_r(json_encode($switch));
}

/*if($switch == false)
{
    //print_r(json_encode($switch));
}
elseif($switch == false)
{
    return(json_encode($switch));
}
else
{
    print_r(json_encode($switch));
}
*/
//print_r(json_encode($ausgabe));
$array = file_get_contents("$file", true);
print_r($array);


?>

