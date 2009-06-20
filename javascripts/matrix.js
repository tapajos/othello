/* Matrix.js
   * CREATED BY: Martin Paczynski
   * Copyright (c) 2002 Martin Paczynski. All Rights Reserved.
   * Originally published and documented at http://www.paczynski.net/
   * License to use is granted if and only if this entire copyright notice
   * is included.
   * This program is free software; you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation; either version 2 of the License, or
   * (at your option) any later version.
  */
// Version : Prototype
// CREATED : 09/08/02
// LAST MODIFIED: 

/*****************************************************************************
Matrix : prototype
This is an initial prototype of a Matrix object for JavaScript.
This Matrix object is based on the Math concept of a matrix and is not closely
related to the C++ Matrix object which is not particularly useful within 
JavaScript for reasons that one need not get into here.

A new matrix object can be created in one of the following three ways:

1.	The Matrix function is passed a row count (integer), a column count (integer)
	and an optional third argument giving the default value to be assigned to all
	cells in the Matrix (float). This will return a row x column matrix object
	
2.	Passing a Matrix object as a single parameter. This will return a copy of the
	Matrix object passed to the funciton.

3.	Passing a two dimensional array (or array literal) where the length of each
	level 2 array is the same.  This will copy the array contents into a Matrix 
	object were the row count is array_passed.length and column count is
	array_passed[0].length 

4.	Passing a string which uses new line characters ('\n') to delimit rows and
	commas (',') followed by an optional whitespace character (not new line) to
	delimit columns.  This would be used for creating Matrices from form input
	
Methods of Matrix object
1. 	toString()
2.	resize()
3. 	getRowSize()
4. 	getColSize()
5. 	setRowSize()
6. 	setColSize()
7. 	getRow()
8. 	getCol()
9. 	setRow()
10.	setCol()
11.	scale()
12. transpose()
13. plus()
14.	minus()
15. addOrSubtract()*
16. multiply()
17. determinant()

* Used internally


Known limitations:

The Matrix object as it stands is NOT fully encaplulated. Because JavaScript does not (yet)
allow for defining operators for objects, the [] operator has been borrowed from the Array
object to allow individual elements to be accessed using the format matrix[i][j]. Unfortunately
this means that one could pass an array into a cell or add non-numeric values.  

*****************************************************************************/

function Matrix( rowsOrMatrix, cols, defaultVal){
	
	// Because of certain JS limitations, expand the rows "array" to the maximum size with blanks
	for(x=0; x < Matrix.MAX_DIM ; x++)
		{
		this[x] = new Array();
		}

	//constructors
	switch(checkArgs(arguments))
		{
		// do to JS limitations, Matrix data type cannot be resized, therefore a no arguement Matrix construction yields a null object
		case -3 :
				 //set values for rows and cols
				 rows=0;
				 cols=0;
				 break;
		// because overloading is impossible in JS, we check if arguement is another Matrix object or an array 
		case -2 : 
				// if it is a Matrix object, than go about copying values from one to the other
				if(rowsOrMatrix.constructor == Matrix)
					{
					for(a=0; a < Math.min(rowsOrMatrix.getRowSize(),Matrix.MAX_DIM); a++)
						{
						for(b=0;b< Math.min(rowsOrMatrix.getColSize(),Matrix.MAX_DIM);b++)
							{
							this[a][b] = rowsOrMatrix[a][b];
							}
						}
					//set values for rows and cols	
					rows = (rowsOrMatrix.getRowSize() > 0)?rowsOrMatrix.getRowSize():0;
					cols = (rowsOrMatrix.getColSize() > 0)?rowsOrMatrix.getColSize():0;
					}
				// else if it is a String object...	
				else if(rowsOrMatrix.constructor == String || rowsOrMatrix.constructor == Array)
					{
					if(rowsOrMatrix.constructor == String)
						{
						// use "split" method of string to convert string into an array of strings
						// each element of which will represent a row
						// Note: rows must be new line character delimitted
						rowsOrMatrix = rowsOrMatrix.replace(/\r/g,'');
						rowsOrMatrix = rowsOrMatrix.split('\n');
						// cycle through this new array and split each string into an array
						// which will represent the column elements for that row
						// Note: columns must be delimmitted with a comma (',') followed by an
						// 		 optional white space character
						for(o=0; o < rowsOrMatrix.length; o++)
							{	
							rowsOrMatrix[o] = rowsOrMatrix[o].split(/,\s?/);
							}					
						}
						
					// allow the array to fall through to the code dealing with 2D array conversion to Matrix
					
					// cycle through and check if each element is also an Array object
					for(c=0; c  < Math.min(rowsOrMatrix.length,Matrix.MAX_DIM); c++)
						{
						// if it is not an Array object, return null
						if(rowsOrMatrix[c].constructor != Array && rowsOrMatrix[c].constructor != null)
							{return null;}
						// else if arrays are not of the same length, return null (Matrix must have same number of columns in each row)
						else if(c > 0 && Math.min(rowsOrMatrix[c].length,Matrix.MAX_DIM) != Math.min(rowsOrMatrix[c-1].length,Matrix.MAX_DIM))
							{;return null;}
						
						// fill Matrix with data
						for(d=0; d < Math.min(rowsOrMatrix[c].length,Matrix.MAX_DIM); d++)
							{
							// if a data element is not a number, data will how up as zero
							this[c][d] = isNaN(rowsOrMatrix[c][d])?0:rowsOrMatrix[c][d];
							}					
						}					
					 //set values for rows and cols
					rows=rowsOrMatrix.length;
				 	cols=rowsOrMatrix[0]?rowsOrMatrix[0].length:0;
					}
				// if argument was not Matrix, String or Array, return null
				else
					{
					return null;
					}
					
				break;
		case -1 :
		case  0 :
				// if 2 or 3 arguements passed, create
				rows = isNaN(rowsOrMatrix)?0:parseInt(Math.min(rowsOrMatrix,Matrix.MAX_DIM));
				cols = isNaN(cols)?0:parseInt(Math.min(cols,Matrix.MAX_DIM));
				defaultVal = isNaN(defaultVal)?0:defaultVal;
				
			    
				for(i=0; i<rows; i++)
					{
					this[i] = new Array(cols);
					
					for(j=0; j<cols; j++)
						{
						this[i][j] = defaultVal;
						}
					}
				 break;
		default : 
				 return null;
		}
	
	
	
	// These are the variables that hold the size of the matrix
	var rowLength = rows;
	var colLength = cols;
	
	// accessors
	this.getRowSize = function(){return rowLength;}
	this.getColSize = function(){return colLength;}
	
	// modifiers
	this.setRowSize = function(newRowLength){rowLength = newRowLength;}
	this.setColSize = function(newColLength){colLength = newColLength;}
}

// Set maximum dimension of matrices. Please note that because JS is not very good at number crunching, performing calculations on 100 x 100 matrices will crash most computers, at least when JS is being run from a browser
Matrix.MAX_DIM = 100;


// Method name 	: toString
// Function		: converts matrix to a string
//				  format: rows delimitted by new line character (\n), columns delimitted by space ( )
// Parameter	: none
// Returns		: String object representing Matrix
Matrix.prototype.toString = function (){
	var matStr = "";
	for(a=0; a < this.getRowSize(); a++)
		{
		matStr += this[a].join(", ") + "\n";
		}
	matStr = matStr.substring(0,matStr.length-1);
	return matStr;
}


// Method name 	: resize
// Function 	: resizes Matrix object
// Parameter	: rows, integer
//				  cols, integer
// Returns		: Boolean, true if resize successfull, otherwise false
Matrix.prototype.resize = function ( rows, cols){
	if(checkArgs(arguments) || isNaN(rows) || isNaN(cols))
		{
		return false;
		}
	
	this.setRowSize(Math.min(rows, Matrix.MAX_DIM));
	this.setColSize(Math.min(cols, Matrix.MAX_DIM));
	
	return true;
}

// Method name	: getRow
// Function		: retrieves indicated row from Matrix
// Parameter	: rowIndex, integer
// Returns		: Array, with values of indicated row if successful, otherwise null
Matrix.prototype.getRow = function ( rowIndex){
	if(isNaN(rowIndex) || rowIndex >= this.getRowSize())
		{
		return null;
		}
	
	return this[rowIndex];
}


// Method name	: getCol
// Function		: retrieves indicated column from Matrix
// Parameter	: colIndex, integer
// Returns		: Array, with values of indicated column if successful, otherwise null
Matrix.prototype.getCol = function ( colIndex){
	if(isNaN(colIndex) || colIndex >= this.getColSize())
		{
		return null
		}
	
	var tmpCol = new Array();
	
	for(a=0; a < this.getRowSize() ; a++)
		{
		tmpCol[a] = this[a][colIndex];
		}	
		
	return tmpCol;
		
}



// Method name 	: setRow
// Function 	: replaces row of data
// Parameter	: rowIndex, integer
//				  newVals, Array of numbers
// Returns		: Array, containing values in row replaced if successful , otherwise null
Matrix.prototype.setRow = function ( rowIndex, newVals){
	if(checkArgs(arguments) || isNaN(rowIndex) || rowIndex >= this.getRowSize() || newVals.constructor != Array || newVals.length >= this.getColSize())
		{
		return null;
		}
	
	var tmpRow = this[rowIndex]
	
	for(a=0; a < newVals.length ; a++)
		{
		this[rowIndex][a] = isNaN(newVals[a])?0:newVals[a];
		}
	
	return tmpRow;
}


// Method name 	: setCol
// Function 	: replaces column of data
// Parameter	: colIndex, integer
//				  newVals, Array of numbers
// Returns		: Array, containing values in column replaced if successful , otherwise null
Matrix.prototype.setCol = function ( colIndex, newVals){
	if(checkArgs(arguments) || isNaN(colIndex) || colIndex >= this.getColSize() || newVals.constructor != Array || newVals.length >= this.getRowSize())
		{
		return null;
		}
	
	var tmpCol = new Array();
	
	for(a=0; a < newVals.length ; a++)
		{
		tmpCol[a] = this[a][colIndex];
		this[a][colIndex] = isNaN(newVals[a])?0:newVals[a];
		}
		
	return tmpCol;
}


// Method name 	: scale
// Function		: Increase values of all elements in the Matrix by value passed
// Parameter	: scaleBy, double
// Returns		: Copy of original Matrix if successful, otherwise null
Matrix.prototype.scale = function ( scaleBy){
		var tmpMat = new Matrix(this);
		
		if(isNaN(scaleBy))
			{
			return null;
			}
			
		for(a=0; a < this.getRowSize() ; a++)
			{
			for(b=0; b < this.getColSize() ; b++)
				{
				this[a][b] = scaleBy * this[a][b];
				}
			}
			
		return tmpMat;
}

// Method name 	: transpose
// Function		: switches rows with columns
// Parameter	: none
// Returns		: Copy of original Matrix
Matrix.prototype.transpose = function (){
	var tmpMat = new Matrix(this);
	
	this.setRowSize(tmpMat.getColSize());
	this.setColSize(tmpMat.getRowSize());
	
	for(a=0; a < tmpMat.getColSize(); a++)
		{
		for(b=0; b < tmpMat.getRowSize(); b++)
			{
			this[a][b] = tmpMat[b][a];
			}
		}
		
	return tmpMat;
}


// Method name 	: plus
// Function		: adds matrix to another
// Parameter	: toMatrix, Matrix
// Returns		: Matrix, sum of the two matrices if successful, otherwise null
Matrix.prototype.plus = function ( toMatrix){
	return this.addOrSubtract( toMatrix, "+");
}


// Method name 	: minus
// Function		: subtracts matrix from another
// Parameter	: toMatrix, Matrix
// Returns		: Matrix, result of subtracting the two matrices if successful, otherwise null
Matrix.prototype.minus = function ( toMatrix){
	return this.addOrSubtract( toMatrix, "-");
}


// Method name 	: addOrSubtract
// Function		: adds or subtracts two matrices
// Parameter	: toMatrix, Matrix
// Returns		: Matrix, result of operation if successful, otherwise null
Matrix.prototype.addOrSubtract = function ( toMatrix, sign){
	if((sign != "+" && sign != "-") || toMatrix.constructor != Matrix || toMatrix.getRowSize() != this.getRowSize() || toMatrix.getColSize() != this.getColSize())
		{
		return null;
		}
	
	var tmpMat = new Matrix( this.getRowSize(), this.getColSize());
	
	for(a=0; a < tmpMat.getRowSize(); a++)
		{
		for(b=0; b < tmpMat.getColSize(); b++)
			{
			tmpMat[a][b] = eval("this[a][b]" + sign + "toMatrix[a][b]");
			}
		}
	
	return tmpMat;
}


// Method name 	: multiply
// Function		: multiplies matrix by another matrix
//				  Ex: A.multiply(B) equivalent to A times B
// Parameters	: byMatrix, matrix
// Returns		: Matrix produced by multiblication if successful, otherwise null
Matrix.prototype.multiply = function ( byMatrix){
		if(byMatrix.constructor != Matrix || byMatrix.getRowSize() != this.getColSize() || byMatrix.getColSize() != this.getRowSize())
			{
			return null;
			}
		
		var tmpMat = new Matrix( this.getRowSize(), byMatrix.getColSize());

		for(i=0 ; i < tmpMat.getRowSize() ; i++)
			{
			for(j=0 ; j < tmpMat.getColSize(); j++)
				{
				tmpMat[i][j] = dotProduct(this.getRow(i), byMatrix.getCol(j));
				}
			}	

		return tmpMat;		
		
		function dotProduct( arrOne, arrTwo){
			var sum = 0;
			
			for(x=0 ; x < arrOne.length; x++)
				{
				sum += arrOne[x] * arrTwo[x];
				}
			
			return sum;
		}
		
}


// Method name	: determinant
// Function		: finds the determinant of the matrix
// Parameters	: none
// Returns		: float determinant of Matrix if it is square, null otherwise
Matrix.prototype.determinant = function(){
	// dim will hold the dimensions of the n x n Matrix this function will work on
	var dim = this.getRowSize();
	
	// Check whether Matrix is indeed an n x x Matrix
	// If it is not, return null
	if(dim != this.getColSize())
		{
		return null;
		}
	
	
	// to reduce memory + calculation overhead, first see if Matrix is 
	// one of three sizes for which the determinant is easier to find
	switch(dim)
		{
		case 0:
		case 1:	return 1;

		case 2: return this[0,0]*this[1,1] - this[1,0]*this[0,1];
		}

		
	// if n > 2, then declare the following variables:
	var det = 0;
	var toAdd;
	var toSub;
	var tmpCounter;
	
	
	// cycle throught the Matrix to find the determinant 
	// Note: for details of how this works see a Matrices textbook or site
	for(i=0; i < dim; i++)
		{
		toAdd = 1;
		toSub = 1;
		tmpCounter = i;
		
		for(j=0, k=dim-1; j < dim; j++,k--)
			{
			toAdd *= this[j][tmpCounter%dim];
			toSub *= this[k][tmpCounter++%dim];
			}

		det += toAdd - toSub;
		
		}
		
	return	det;
	
}



//************* Function is used to compare the number of arguements passed to a function with the number expected.
//************* If too few are passed, function return negative number. If too many, function returns positive number.
//************* If passed equal to expected, function returns zero.

function checkArgs(args){
		var passed = args.length;
		var needed = args.callee.length;
		return (passed - needed);
	}