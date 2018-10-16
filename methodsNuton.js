//import * as math from 'mathjs'

let gradient=[];
let derivativies=[];
 const xOne='x1';
 const xTwo='x2';

 class Function{

   constructor(funString, x1,x2, e, m){
     this.funString=funString;
     this.x1=x1;
     this.x2=x2;
     this.elipson=e;
     this.k=m;
   }

   get getFuncion(){
     return this.funString;
   }

   get getElipson(){
     return this.elipson;
   }

   get X1(){
      return this.x1;
   }

   get X2(){
    return this.x2;
   }

   get Elipson(){
    return this.elipson;
   }

   get GetK(){
    return this.k;
   }

 }

 class AlgoritmNewton{

  static gradient(funString) {
     let derivate=[];
     if(funString!='')
     {  derivate.push(this.Devitive(funString,xOne));
        derivate.push(this.Devitive(funString, xTwo));
     }
     return derivate;
   }


   // method for step 3
  static gradientInPoint(gradient, x11,x22){
     let grad=[];
     let point={x1:x11, x2: x22};

     grad.push(math.eval(gradient[0], point));
     grad.push(math.eval(gradient[1], point));
     return grad;
   }

  //матрица гессе
  static gesse(derivate){
      let derivateTwo=[];
      derivateTwo.push(this.Devitive(derivate[0], xOne));
      derivateTwo.push(this.Devitive(derivate[1], xTwo));
      derivateTwo.push(this.Devitive(derivate[1], xOne));
      derivateTwo.push(this.Devitive(derivate[0], xTwo));
      return derivateTwo;
   }

  static Devitive(funct, arg){
    return math.derivative(funct, arg).toString();
   }

   //вторая производная
   static TwoDevitive(funct, arg){
     let f=math.derivative(funct, arg).toString();
     return math.derivative(f,arg).toString();
   }

  static  getValueFunction(funct, arg){
      return math.eval(funct, arg);
   }

   // method for step 4
  static checkWithElopson(gradInPoint, elipson){
    return math.sqrt(math.pow(gradInPoint[0],2)+math.pow(gradInPoint[1],2))<elipson;
   }

 }


const funt=new Function("x1^2-x2^2-2*x1^2*x2^2+10",1,1,0.5,2);
let f=AlgoritmNewton.gradient(funt.getFuncion);
console.log("gradient:\n "+f[0]+"\n"+f[1]);
let gradInPoint=AlgoritmNewton.gradientInPoint(f, funt.X1, funt.X2);
console.log("gradietn in ("+funt.X1+","+funt.X2+") = "+gradInPoint);
let chek=lgoritmNewton.checkWithElopson(gradInPoint, funt.elipson);
console.log("step 4 check whith elopson: "+check);
if(!check){
  //step 5
}


