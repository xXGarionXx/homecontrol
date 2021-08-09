//window.onload = draw();
$(function(){
	getweather();
});
const api_url = '//192.168.188.30/homecontrol/php/json.php';

async function getweather()
{
    const response = await fetch(api_url);
    const data = await response.json();
    const temp_out = data[0].temp_out;
    //console.log(data);

	// Mit den daten arbeiten 

    draw(data);
}

function draw(data)
{
	// ---- function setup ---------------------------------------------------------------------
	
	var canvas = document.getElementById('weather');

	
	var day = [30]; 									// array für die Wochentage wird erstellt und im Anschluss mit der Schleife befüllt 
	for(var i=0; i<=30;i++)
	{
		day[i] = i+1 + "th";
	}
	

	
	// ---- function main ----------------------------------------------------------------------

	if(canvas.getContext)
	{
		var context = canvas.getContext('2d');
		
		//Rechteck
		
		context.fillStyle = "rgba(255,255,255,0)";		// Definition Farbe
		context.fillRect(0,0,600,650);					// abmaße Reckteck 
		
		//draw coordinatsystem

		context.strokeStyle = "rgba(255,255,255,0.5)";	// color and transparents
		context.lineWidth = 2;							
		context.beginPath();	
		
		// ---- Y achse --------------
		
		context.moveTo(60, 30);							// Start
		context.lineTo(60, 620);						// Ende
		
		// ---- X achse --------------
		
		context.moveTo(30, 390);						// Start
		context.lineTo(570, 390);						// Ende
		
		context.stroke(); 								// definierten linien werden gezeichnet
		context.closePath();							// beendet pfad erstellung 
		
		
		
		// ---- coordinates in Y --------------------------------------------
		
		var temp = [];
		var Y = -20;
	
		for(var d=0; d<=14; d++)
		{
			temp[d] = Y;
			Y+=5;
		}
		
		context.font = '100%/1.3 Verdana, Arial, Helvetica, sans-serif';
		context.lineWidth = 1;							// neue Linienstärke wird erstellt
		context.beginPath();							// neuer Pfad wird angefangen
		
		for(var i=590; i>30; i-=10)						// Schleife für Scalaabstände 
		{
			context.moveTo(55, i);
			context.lineTo(550, i);
		}
		context.fillStyle="rgba(255,255,255,0.5)";
		
		// Y-achse Beschriftung 
		
		for(var i=0; i<14; ++i)							// Schleife für beschriftung
		{
			var y = 595-(i*50);							// abstandsberechnung
			context.fillText(temp[i],5,y);				// schreiben der beschriftung
		}
		context.stroke(); 								// definierten linien werden gezeichnet
		context.closePath();							// beendet pfad erstellung 

		// ---- coordinates in X ---------------------------------------------

		context.beginPath();

		for(var i=0; i<=9;++i)
		{
			var x = 510;									// Grundabstand setzt den Nullpunkt
			x-=(i*50);									// Abstand(60) * Tag(i) ergibt das maß  
			context.moveTo(x,395);						// start
			context.lineTo(x,385);						// Ende
			//context.fillText(day[i], x, 620);			// Schreibt die Tage in Scala
			context.fillText(weatherDay(i)+"th",x,620);
		}
		context.stroke();								// definierten linien werden gezeichnet
		context.closePath();							// Beendet Pfad erstellung 
		
		// ---- Display_weather ----------------------------------------------------------------

		context.strokeStyle="rgba(118,238,0,0.5)";		// Farbe für Wetterlinie
		context.lineWidth = 3;							// Stärke der Wetterlinie
		context.beginPath();							
		context.moveTo(510, 390-(10*data[0].temp_out));

		for(var i=1; i<=9; ++i)
		{
			context.lineTo(510-(i*50), 390-(10*data[i].temp_out));
		}
		

		context.stroke();
		context.closePath();
		
	}
}

function weatherDay(retro)
{
	var date = new Date();
    Date.prototype.subtractDays = function(d){
        this.setTime(this.getTime()-(d*24*60*60*1000));
        return this;
    }
    date.subtractDays(retro);
	return date.getDate();
}
	