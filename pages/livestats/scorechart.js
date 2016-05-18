var ctx = document.getElementById("teamScoreChart");
var winloss = document.getElementById("teamScore");

//var win = Math.random(0,16);
//var loss = Math.random(0,16);
loss = 1;
win = 0;
drawChart();
setInterval(drawChart,10);
var myDoughnutChart;


function drawChart() {
  



    winloss.innerHTML = win + ":" + loss;
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
