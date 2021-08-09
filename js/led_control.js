/*var rq;

function anfordern()
{
    rq = new XMLHttpRequest();
    rq.open("GET", "//192.168.188.30/homecontrol/php/led_control.php/button1=true", true);
    rq.send(null);
    rq.onreadystatechange = auswerten; 
}

function auswerten()
{
    if(rq.readyState == 4 && rq.status == 200)
        document.getElementById("ausgabe").innerHTML = rq.responseText; 
}*/

$(function(){
    dipswitches();
    


    $("#button1").click(function(){

        // ----------------------------------------------------------------

        if($(this).prop("checked") == true)
        {
            sendtoserver(true);
        }
        else if($(this).prop("checked") == false)
        {
            sendtoserver(false);
        }
        else
        {
            sendtoserver();
        }
    });

});

function sendtoserver(status)
{
    $.ajax({
        type: "Get",
        url: "//192.168.188.30/homecontrol/php/led_control.php",
        data: {test: status},
        success: function (response) {
            $("#ausgabe").html(response);
        }
    });
}

async function dipswitches()
{
    const api_url = "//192.168.188.30/homecontrol/php/led_control.php";
    const response = await fetch(api_url);
    const data = await response.json();
    //const temp_out = data[0].switch;
    

    setbutton(data);
	// Mit den daten arbeiten 
}

function setbutton(data)
{
    var buttonauswahl = [1,2,3,4,5];
    var buttonzustand = [1,0,0,0,1];
    
    
        var zustand;

        if(data.switch == "true")
        {
            zustand = true; 
        }
        else
        {
            zustand = false;
        }
        console.log(zustand);
        $("#button1").prop("checked", zustand);
    
}