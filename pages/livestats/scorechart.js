var ctx = document.getElementById("teamScoreChart");
var winloss = document.getElementById("teamScore");

//var win = Math.random(0,16);
//var loss = Math.random(0,16);
loss = 7;
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
              "#60c0be"
          ],
          hoverBackgroundColor: [
            "#e94835",
            "#60c0be"
          ],
          borderColor: [
            "#e94835",
            "#60c0be"
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
