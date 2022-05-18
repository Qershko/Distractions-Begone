const generateSTYLES = () => {
    return `
    .container {
        height: 300px;
        width: 240px;
        background-color: red;
        float: left;
        overflow: hidden;
        margin: 20px;
    }
    .container img {
        display: block;
    }
    
    .portrait img {
        width: 100%;
    }
    .landscape img {
        height: 100%;
    }
    `;
  };
  
  const generateHTML = (pageName) => {
    return `
    <div class="container portrait">
        <h4>Portrait Style</h4>
        <img src="https://media2.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif?cid=790b76112430cebfabecbb5e9d46ca43d234183c49fc9ef4&rid=giphy.gif&ct=g">
    </div>
    `;
  };
  
  switch (window.location.hostname) {
    case "www.youtube.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("YOUTUBE");
      break;
    case "www.instagram.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("INSTAGRAM");
      break;
  }