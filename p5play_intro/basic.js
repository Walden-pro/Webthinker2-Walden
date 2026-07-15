

function setup() {
  // write your codes here
  new Canvas(800, 400);
  background(250); //background color

  // console.log("hello.");

  // let a = 1;
  // let b = 2;
  // let sum = a + b;
  // console.log("Sum : " + sum );

  // --- Exercise: Area of Triangle ---
  // write your codes here
  let base = 10;
  let height = 5;
  let area = 0.5 * base * height;
  console.log("Area: " + area);
  textSize(24);
   
  fill( "#000000");
  text(area,400,200);

  // --- Exercise: Sum of first 10 even numbers ---
  // write your codes here
  for (let i = 0 ; i <= 20 ; i += 2){
    console.log(i)
    fill( "#000000");
    text(area,400,200);
    
  }
  // --- Exercise: Age category classification ---
  // write your codes here

  // --- Exercise: Display odd numbers backward using while loop ---
  // write your codes here

  // --- Exercise: Array operations (groceries) ---
  // write your codes here
}

