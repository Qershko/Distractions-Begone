const generateSTYLES = () => {
  return `
    body{
      background: url(https://media0.giphy.com/media/LRKET0Syb0rDO/giphy.gif?cid=ecf05e47b2kw9v0yuxsytbsd2zaz52fhsp6rxbcvh91ynrd3&rid=giphy.gif&ct=g);
      background-size: 100vw 100vh;
    }
    h1 {
      float: right;
      margin-right: 4%;
      font-size: 7vw;
      color: aliceblue;
      margin-top: 7%;
      text-shadow: 2px 6px 9px black;
      font-family: sans-serif;
      font-weight: bold;
  }
    h2 {
      float: right;
      margin-right: -20.90%;
      font-size: 2.5vw;
      color: aliceblue;
      margin-top: 16%;
      font-family: "Times New Roman";
      font-weight: 300;
      text-shadow: 1px 2px black;
  }
  `;
};

const generateHTML = () => {
  return `
    <h1> 
      Nice Try...
    </h1>

    <h2>
    <em>
      If you need a break,<br> 
      try reading a book, <br>
      getting some fresh <br>
      air, or maybe a little <br>
      bit of exercise.</em>🙃
    </h2>
  `;
};


var port = chrome.runtime.connect({ name: "db_content_messaging" });

port.onMessage.addListener(function (msg) {
  console.log(msg)

  // port.postMessage({ answer: "Madame" });
  if (msg.alarm) {
    let message = `You have been on ${msg.alarm.site} for ${msg.alarm.time} minutes`
    alert(message);
    //console.log(message)
  }
});

document.addEventListener('visibilitychange', function (e) {
  if (document.hidden)
    port.postMessage({ pauseAlarm: true });
  else {
    readAllBlockedSites();
  }

});

window.onload = function () {
  readAllBlockedSites();
  console.log(document.hidden)
}


function readAllBlockedSites() {
  try {
    chrome.storage.sync.get('db_blocked_sites', (d) => {
      let sites = []
      if ('db_blocked_sites' in d) {
        sites = d['db_blocked_sites']
      }

      sites.forEach(e => {

        if (window.location.hostname == e.site || window.location.hostname == e.site.replace("www.", "") || window.location.hostname == "www." + e.site) {
          if (e.time == undefined) { //block
            block();
            return;
          } else {//timer
            port.postMessage({ alarm: e });
          }
        }
      });

      function block() {
        document.head.innerHTML = '<style>' + generateSTYLES() + "</style>";
        document.body.innerHTML = generateHTML();
      }
    });
  } catch (e) {
    //alert(e);
  }
}


