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
      margin-right: -20.5%;
      font-size: 2.5vw;
      color: aliceblue;
      margin-top: 16%;
      font-family: "Times New Roman";
      font-weight: 300;
  }
  `;
};

const generateHTML = (pageName) => {
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

switch (window.location.hostname) {
  case "www.youtube.com":
    document.head.innerHTML ='<style>'+ generateSTYLES() + "</style>";
    document.body.innerHTML = generateHTML("YOUTUBE");
    break;
  case "www.instagram.com":
    document.head.innerHTML ='<style>'+ generateSTYLES() + "</style>";
    document.body.innerHTML = generateHTML("INSTAGRAM");
    break;
}