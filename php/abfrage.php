
<?php

    $file = "key.json";
    $sdata = file_get_contents("$file", true);
    $obj = json_decode($sdata);
    
    $servername = $obj->Datenbank->servername;
    $user = $obj->Datenbank->user;
    $pass = $obj->Datenbank->password;
    $db = $obj->Datenbank->db;
    $buffer     = array(10);
    $counter    = 0;

    $con = new mysqli($servername, $user, $pass, $db);

    if($con->connect_error)
    {
        die("not connected".$con->connect_error);
    }
    $query1 = "SELECT * FROM Sensor_daten ORDER BY ID DESC LIMIT 5";
    $ergebnis1 = $con->query($query1);

    if($ergebnis1->num_rows > 0)
    {
        while($row = $ergebnis1->fetch_assoc())
        {
            $buffer[$counter] = $row["Date"];
            $counter=$counter + 1;
        }
    }  
    else
    {
        echo "data not found";
    }
    
            
    $jsarray = json_encode($buffer);
    echo($jsarray);

    $con->close();

?>
