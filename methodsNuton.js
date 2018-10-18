//import * as math from 'mathjs'

//let gradient = [];
//let derivativies = [];
const xOne = 'x1';
const xTwo = 'x2';

class Function {

    constructor(funString, x1, x2, e, m) {
        this.funString = funString;
        this.x1 = x1;
        this.x2 = x2;
        this.elipson = e;
        this.m = m;
        this.k = 0;
    }

    get getFuncion() {
        return this.funString;
    }

    get getElipson() {
        return this.elipson;
    }

    get GetX1() {
        return this.x1;
    }

    get GetX2() {
        return this.x2;
    }

    get Elipson() {
        return this.elipson;
    }

    get GetK() {
        return this.k;
    }

    IncreaseK() {
        k++;
    }

    get GetM() {
        return this.m;
    }
}

class Matrix {
    static AdjugateMatrix(array) // союзная матрица
    {
        var N = array.length,
            adjA = [];
        for (var i = 0; i < N; i++) {
            adjA[i] = [];
            for (var j = 0; j < N; j++) {
                var B = [], sign = ((i + j) % 2 == 0) ? 1 : -1;
                for (var m = 0; m < j; m++) {
                    B[m] = [];
                    for (var n = 0; n < i; n++) B[m][n] = array[m][n];
                    for (var n = i + 1; n < N; n++) B[m][n - 1] = array[m][n];
                }
                for (var m = j + 1; m < N; m++) {
                    B[m - 1] = [];
                    for (var n = 0; n < i; n++) B[m - 1][n] = array[m][n];
                    for (var n = i + 1; n < N; n++) B[m - 1][n - 1] = array[m][n];
                }
                adjA[i][j] = sign * this.Determinant(B);
            }
        }
        return adjA;
    }

    static Determinant(array) // детерминант
     {
        var N = array.length, B = [],
            denom = 1,
            exchanges = 0;
        for (var i = 0; i < N; ++i) {
            B[i] = [];
            for (var j = 0; j < N; ++j) B[i][j] = array[i][j];
        }
        for (var i = 0; i < N - 1; ++i) {
            var maxN = i, maxValue = Math.abs(B[i][i]);
            for (var j = i + 1; j < N; ++j) {
                var value = Math.abs(B[j][i]);
                if (value > maxValue) {
                    maxN = j;
                    maxValue = value;
                }
            }
            if (maxN > i) {
                var temp = B[i];
                B[i] = B[maxN];
                B[maxN] = temp;
                ++exchanges;
            } else {
                if (maxValue == 0) return maxValue;
            }
            var value1 = B[i][i];
            for (var j = i + 1; j < N; ++j) {
                var value2 = B[j][i];
                B[j][i] = 0;
                for (var k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
            }
            denom = value1;
        }
        if (exchanges % 2) return -B[N - 1][N - 1];
        else return B[N - 1][N - 1];
    }

    static InverseMatrix(array) { // обратная матрица
        
        	let inverse=array;
          // var det = this.Determinant(inverse);
             let det=math.det(inverse);
            if (det == 0) return false;
            var N = array.length;
                inverse = this.AdjugateMatrix(inverse);
            for (var i = 0; i < N; i++) {
                for (var j = 0; j < N; j++) {
                    inverse[i][j] /= det;
                }
            }
            return inverse;
    }

}

class AlgoritmNewton {

    static gradient(funString) {
        let derivate = [];
        if (funString != '') {
            derivate.push(this.Devitive(funString, xOne));
            derivate.push(this.Devitive(funString, xTwo));
        }
        return derivate;
    }


    // method for step 3
    static gradientInPoint(gradient, x11, x22) {
        let grad = [];
        let point = { x1: x11, x2: x22 };

        grad.push(math.eval(gradient[0], point));
        grad.push(math.eval(gradient[1], point));
        return grad;
    }

    //матрица гессе
    static rawGesse(derivate) {
        let derivateTwo = [];
        derivateTwo[0]=[this.Devitive(derivate[0], xOne),this.Devitive(derivate[0], xTwo)];
        derivateTwo[1]=[this.Devitive(derivate[1], xOne),this.Devitive(derivate[1], xTwo)];
        return derivateTwo;
    }

    static gesse(derivate) {
        let derivateTwo = this.rawGesse(derivate);
      //  kPoint={x1:point[0], x2: point[1]};
        derivateTwo[0][0] = math.eval(derivateTwo[0][0], kPoint);
        derivateTwo[0][1] = math.eval(derivateTwo[0][1], kPoint);
        derivateTwo[1][0] = math.eval(derivateTwo[1][0], kPoint);
        derivateTwo[1][1] = math.eval(derivateTwo[1][1], kPoint);

        return derivateTwo;
    }

    static Devitive(funct, arg) {
        return math.derivative(funct, arg).toString();
    }

    //вторая производная
    static TwoDevitive(funct, arg) {
        let f = math.derivative(funct, arg).toString();
        return math.derivative(f, arg).toString();
    }

    static getValueFunction(funct, arg) {
        return math.eval(funct, arg);
    }

    // method for step 4
    static checkWithElopson(gradInPoint, elipson) {
        return math.sqrt(math.pow(gradInPoint[0], 2) + math.pow(gradInPoint[1], 2)) < elipson;
    }

    //step 9
    static descentDirection(inverseGesse, derivate){
    	return math.multiply(-1,math.multiply(inverseGesse,derivate));
    }

    static newPoint(pastPont, tk, dk){
    	let d=math.multiply(tk,dk);
    	let newX={x1:pastPont.x1+d[0], x2:pastPont.x2+d[1]};
    	return newX;
    }
}



function writeArray(str,array){
 console.log(str+array[0][0]+" | "+ array[0][1]+"\n"+ array[1][0]+" | "+ array[1][1]);
}

function writeOneArray(str, arr){
	 console.log(str+arr[0]+" | "+ arr[1]);
}

const funt = new Function("x1^2-x2^2-2*x1^2*x2^2+10", 1, 1, 0.5, 2);

let kPoint= { x1: funt.GetX1, x2: funt.GetX2 };
let globalPoint;
let tk;
let dk;
let x=[];

//автоматический запуск алгоритма
(function algoritm(funt){

	x=[funt.X1, funt.X2];
	//kPoint={ x1: x[0], x2: x[1] };

   //step1-2
	let f = AlgoritmNewton.gradient(funt.getFuncion);
	console.log("gradient:\n " + f[0] + "\n" + f[1]);
    let matrixGesse = AlgoritmNewton.rawGesse(f);
	writeArray("common matrix gesse\n ",matrixGesse);




  //  function step3(f){
    	let gradInPoint = AlgoritmNewton.gradientInPoint(f, kPoint.x1, kPoint.x2);
		console.log("gradietn in (" + kPoint.x1 + "," + kPoint.x2 + ") = " + gradInPoint);

    	let check = AlgoritmNewton.checkWithElopson(gradInPoint, funt.elipson);
		console.log("step 4 check whith elopson: " + check);
		if (!check) {
			//step 6
			 
		   let gesse = AlgoritmNewton.gesse(f);
		 console.log("Matrix gesse for X1 = " + kPoint.x1 + ", X2 = " + kPoint.x2+"\n");
		 writeArray("",gesse);
		    //step 7
		    let inverseMatrixGesse=Matrix.InverseMatrix(gesse);
		 writeArray("Matrix gesse inverse:\n ",inverseMatrixGesse);

		    //step 8
		    if(math.det(inverseMatrixGesse)>0)
		    	{
		    		//step 9
		          console.log("step 9")
		          let dk=AlgoritmNewton.descentDirection(inverseMatrixGesse,gradInPoint);
				  tk=1;
		    	}
		    	else{
		    		dk=math.multiply(-1,gradInPoint);
		    	}
		      //step 10
		    	writeOneArray("Направление спуска\n",dk);
		    	console.log('step 10')
		    	//исправить, непавильно находит точку
		    	kPoint=AlgoritmNewton.newPoint(kPoint,1,dk);
				console.log("New point:"+kPoint.x1+" | "+ kPoint.x2 );

				//step 11
				
		}
		else {
		    globalPoint.X1 = kPoint.X1;
		    globalPoint.X2 = kPoint.X2;
		}
   // }

  //  function step5(k,m,matrixGesse){
 //   }

 //  //  function step6(point){
 //    	let gesse = AlgoritmNewton.gesse(f, point);
	// 	 console.log("Matrix gesse for X1 = " + point[0] + ", X2 = " + point[1]+"\n");
	// 	 writeArray("",gesse);
	// //	 return gesse;

 // //   }

 // //   function step7(gesse){
 //         let inverseMatrixGesse=Matrix.InverseMatrix(gesse);
	// 	 writeArray("Matrix gesse inverse:\n ",inverseMatrixGesse);
	// //	 return inverseMatrixGesse;
 //  //  }


 //   function step9(inverseGesse,gradInPoint){
   //  	 let dk=AlgoritmNewton.descentDirection(inverseMatrixGesse,gradInPoint);
   //  	 writeArray("Направление спуска\n",dk);
		 // tk=1;
	//	 tep10(tk,dk);
  //  }

   // function step10(pastX, tk,dk){
    	
		// x=AlgoritmNewton.newPoint(pastPont,tk,dk);
		// writeOneArray("New point:",x );
	//	return x;
  //  }


})(funt);


    
