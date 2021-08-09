$(function(){
	getweather_data();
});
const api_url1 = '//192.168.188.30/homecontrol/php/weather_history.php';

async function getweather_data()
{
    const response = await fetch(api_url1);
    const data = await response.json();
    //const temp_out = data[0].temp_out;
    console.log(data);
    $(".temp_out").html("Outside Temperature: " + data[1].temp_out);
	$(".temp_in").html("Inside Temperature: " + data[1].temp_in);
	// Mit den daten arbeiten 
    fill_table(data);
}

function fill_table(data)
{
    for(var i=1; i<=15; ++i)
    {
        $("tbody").append("<tr><td>"+ data[i].date +"</td><td>"+ data[i].temp_out +"</td><td>"+
         data[i].humidity_out +"</td><td>"+ data[i].temp_in +"</td><td>"+ data[i].humidity_in +"</td></tr>");
    }
}


	
	

 
 
 
