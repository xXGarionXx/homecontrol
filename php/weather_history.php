<?php



    function selectdata()
    {
        $file = "key.json";
        $sdata = file_get_contents("$file", true);
        $obj = json_decode($sdata);
        
        $servername = $obj->Datenbank->servername;
        $user = $obj->Datenbank->user;
        $pass = $obj->Datenbank->password;
        $db = $obj->Datenbank->db;
        $buffer     = array(15);
    
        $con = new mysqli($servername, $user, $pass, $db);
    
        if($con->connect_error)
        {
            die("failed !!!  not connectet").$con->connect_error;
        }
       
    
        $query = "SELECT * FROM Sensor_daten ORDER BY ID DESC LIMIT 15";
        $result = mysqli_query($con, $query);
    
        while($row = mysqli_fetch_array($result))
        {
            $buffer[] = array(
                'date'          => $row["Date"],
                'temp_out'      => $row["temp_out"],
                'humidity_out'  => $row["humidity_out"],
                'temp_in'       => $row["temp_in"],
                'humidity_in'   => $row["humidity_in"]
            );
        }
        return json_encode($buffer);
    }

print_r(selectdata());

?>