<?php 

header("Content-Type: application/json");

    function selectdata()
    {
        $file = "key.json";
        $sdata = file_get_contents("$file", true);
        $obj = json_decode($sdata);
        
        $servername = $obj->Datenbank->servername;
        $user = $obj->Datenbank->user;
        $pass = $obj->Datenbank->password;
        $db = $obj->Datenbank->db;

        $sensor_daten = array();

        $days = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);
        date_default_timezone_set("Europe/Berlin");
        $timestamp = time();
        $year = date("y", $timestamp);
        $month = date("m",$timestamp);
        $day = date("d",$timestamp);
        $currentdate = $year.$month.$day;
        
        
    
        $con = new mysqli($servername, $user, $pass, $db);
        //$query = "SELECT * FROM Sensor_daten ORDER BY ID DESC LIMIT 960";
        //$query = "SELECT * FROM Sensor_daten WHERE Date BETWEEN '$date1 AND $date2";

        for($i=0;$i<=30;++$i)
        {
            $date1 = " 20".date("y-m-d",strtotime($currentdate) - (3600*24*$days[$i]))." 12:00:00";
            $date2 = " 20".date("y-m-d",strtotime($currentdate) - (3600*24*$days[$i]))." 12:14:00";
   
            $query = "SELECT * FROM Sensor_daten WHERE Date BETWEEN '$date1' and '$date2'";
            $result = mysqli_query($con, $query);
            

            while($row = mysqli_fetch_array($result))
            {
                $sensor_daten[] = array(
                    'temp_out'      => $row["temp_out"],
                    'temp_in'       => $row["temp_in"],
                    'Date'          => $row["Date"],
                );
        
            }

        }

        
        return json_encode($sensor_daten);
    }


print_r(selectdata());

?>