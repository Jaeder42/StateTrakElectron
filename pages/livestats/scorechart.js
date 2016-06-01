var ctx = document.getElementById("teamScoreChart");
var winloss = document.getElementById("teamScore");

//var win = Math.random(0,16);
//var loss = Math.random(0,16);
loss = 0;
win = 0;

//setInterval(drawChart,10);
var myDoughnutChart;
drawChart();


ipcRenderer.on('scorechart', (event, message) => {
      jobject = JSON.parse(message);
      win = jobject.win;
      loss = jobject.loss;
      console.log(message)
      drawChart();
    });

function drawChart() {




    winloss.innerHTML = win + ":" + loss;
    if (loss == 0 && win == 0){
      loss = 1;
      win = 1;
    }
    var data = {
    labels: [],
    datasets: [
      {
          data: [loss, win],
          backgroundColor: [
              "#e94835",
              "#12f9d8"
          ],
          hoverBackgroundColor: [
            "#e94835",
            "#12f9d8"
          ],
          borderColor: [
            "#e94835",
            "#12f9d8"
          ]
      }]
    };


  myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {

        cutoutPercentage:85,
        animation:{
          animateRotate: false
        }

      }
  });


}
