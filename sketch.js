const unit = 100;
const tfactor = 0.05;

const variables = [
  {name:'a', value:0.4, step: 0.1},
  {name:'b', value:2.0, step: 0.5},
  {name:'c', value:0.0, step: 0.5},
  {name:'d', value:1.0, step: 0.5}
]

let a = 0.4;
let b = 2.0;
let c = 0.0;
let d = 1.0;

let aLabel;

function setup() {
  createCanvas(500,500);  
  frameRate(30);

  createSpan('ángulo = t, magnitud = a * cos(b * t + c) + d').position(510, 10);

  let ypos = 30;
  for(let v of variables){
    let s = createSlider(-5, 5, v.value, v.step);
    s.position(510, ypos);
    s.style('width', '150px');
    s.input(resetCanvas);
    v.slider = s;
    v.label = createSpan(`${v.name} = ${v.value}`).position(670, ypos);
    ypos += 20;
  }

  translate(width/2, height/2);
  resetCanvas();
}

function resetCanvas(){
  background(0);

  fill(255);
  noStroke()
  ellipse(0,0,10,10);

  // Ejes
  strokeWeight(1.0);
  stroke(255);
  line(-width, 0, width, 0);
  line(0, -height, 0, height);

  // Referencia unidad  
  stroke(96);
  noFill();
  ellipse(0, 0, unit*2, unit*2);

  // Recalcula variables
  for(let v of variables){
    v.value = v.slider.value();
    v.label.html(`${v.name} = ${v.value}`);
  }
}

function draw() {
  
  // background(0);

  translate(width/2, height/2);

  
  strokeWeight(2);
  stroke(255,0,0);
  const v = fromPolar(fun(frameCount));
  // line(0,0, v.x, v.y);
  
  fill(0, 255, 0, 255);  
  noStroke();
  ellipse(v.x, v.y, 3, 3);
  
}

function fun(t){
  return {
    theta: t * tfactor, 
    m: variables[0].value * Math.cos(variables[1].value * t * tfactor + variables[2].value) + variables[3].value};
}

function fromPolar(v){
  return { 
    x: unit * v.m * Math.cos(v.theta), 
    y: -unit * v.m * Math.sin(v.theta)}
}