var ctx = document.getElementById("teamScoreChart");
var winloss = document.getElementById("teamScore");

//var win = Math.random(0,16);
//var loss = Math.random(0,16);
loss = 1;
win = 0;
drawChart();
setInterval(drawChart,1000);



function drawChart() {
    win++;
    if(win > 16)
      win = 0;


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


  var myDoughnutChart = new Chart(ctx, {
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
