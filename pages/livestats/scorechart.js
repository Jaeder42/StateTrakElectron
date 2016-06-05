var ctx = document.getElementById("roundScoreChart");
var winloss = document.getElementById("teamScore");

//var win = Math.random(0,16);
//var loss = Math.random(0,16);
loss = 0;
win = 0;

//setInterval(drawChart,10);
var roundBarChart;
var rounds = [];
var round = 20;

drawChart();



ipcRenderer.on('scorechart', (event, message) => {
      jobject = JSON.parse(message);
      console.log(jobject);
      win = jobject.wins;
      loss = jobject.losses;
      rounds = jobject.rounds;
      round = jobject.round;
      drawChart();
    });

function drawChart() {

  var labels =[];
  for(i = 0; i < 31; i++){
    labels.push(i);
  }

    winloss.innerHTML = win + ":" + loss;

    var datarray = [];

    if(rounds != null){
    for(i = rounds.length; i>0; i--){
      datarray.push(rounds[i]);
    }

  }
  if(round > 30){
    labels.push(round);
  }

/*  for(i = 0; i < 5; i++){
    datarray.push(i);
    console.log(datarray);
  }*/
    var data = {
    labels: labels,
    datasets:[
      {
          data: datarray,
          backgroundColor: "#999999",
          hoverBackgroundColor: "#999999",
          borderColor:"#999999"

      }
    ]
    };


  roundScoreChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
                xAxes: [{
                  ticks:{
                    min: 0,

                  }
                }],
                yAxes: [{
                  display: false,
                  ticks: {
                    min: 0,
                    max: 5
                  }
                }]
            }
        }

  });


}
