const imgNames = ["0","1","2"]
const randomImgName = imgNames[Math.floor(Math.random()*imgNames.length)]

bgImg = document.createElement('img');
bgImg.src = `./img/${randomImgName}.jpeg`;
console.log(bgImg);
document.body.appendChild(bgImg);
