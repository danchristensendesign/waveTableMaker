 var coeffs = matrixSolver([[23,2],[24,7.7],[25,-.1],[26,3]]);
 var zeroX = rootSeek(25,24,60, coeffs);
 
 function matrixSolver(xyPts)
 {
	
	var height = xyPts.length;
	var coeffs = [];
	for(var i = 0; i < height; i += 1)
	{
		var tArr = [];
		for(var k = 0; k < height; k += 1)
		{
			tArr.push(Math.pow(xyPts[i][0],height-1-k));
		}
		tArr.push(xyPts[i][1]);
		coeffs.push(tArr);
	}
	
	for(var i = 0; i < height-1; i += 1)
	{
		if(coeffs[i][0] === 0)
		{
			var tArr = coeffs[i];
			coeffs.splice(i,1);
			//console.log(coeffs.length);
			coeffs.push(tArr);
			//console.log(coeffs.length);
			break;
		}
	}
/* 		for(var i = 0; i < height-1; i +=1)
	{
		
	} */
	//for(var i = 0; i < height; i += 1)
		//console.log(coeffs[i]);

	//lower diagonal
	for(var i = 0; i < height; i += 1)
	{
		
		//set first column to 1's
		for(var j = i; j < height; j += 1)
		{
			if(Math.abs(coeffs[j][i]) !== 0)
			{
				var mult = 1/coeffs[j][i];
				for(var k = i; k <= height; k += 1)
				{
					coeffs[j][k] *= mult;
				}
			}
			//console.log(coeffs[j]);
			
		}


		//set lower first columns to 0's
		for(var j=i+1; j < height; j+=1)
		{
			if(Math.abs(coeffs[j][i]) !== 0)
			{
				for(var k = i; k <= height; k += 1)
				{
					coeffs[j][k] = -coeffs[j][k] + coeffs[i][k];
				}
			}
			//console.log(coeffs[j]);
		}
		
	}
	
	//for(var i = 0; i < height; i += 1)
		//console.log(coeffs[i]);

	//upper diagonal
	for(var i = height-1; i > 0; i -= 1)
	{
		//set last column to 1's
		for(var j = i-1; j > -1; j -= 1)
		{
			if(Math.abs(coeffs[j][i]) !== 0)
			{
				var mult = -coeffs[j][i];
				for(var k = j+1; k <= height; k += 1)
				{
					coeffs[j][k] = coeffs[j][k] + mult * coeffs[i][k];
				}
			}
			//console.log(coeffs[j]);
		}

	}

	//for(var i = 0; i < height; i += 1)
		//console.log(coeffs[i]);
	
	var sol = [];
	for(var i = 0; i < height; i +=1)
		sol.push(coeffs[i][height]);
	
	//console.log(sol);
	return sol;
}

function getY(x, coeffs)
{
	var y=0;
	for(var i=0; i < coeffs.length; i +=1)
	{
		y += Math.pow(x,coeffs.length-1-i) * coeffs[i];
	}
	return y;
}

function rootSeek(lwrX, uprX, iterations, coeffs)
{
	var minY = .000000001;
	var uprY = getY(uprX,coeffs);
	var lwrY = getY(lwrX, coeffs);
	if(Math.abs(lwrY) < minY)
		return lwrY;
	else if(Math.abs(uprY) < minY)
		return uprY;
	else if(Math.sign(uprY) === Math.sign(lwrY))
	{
		console.log('no root, upry ' + uprY + ', lwry ' + lwrY);
		return false;
	}
	var midX;
	var midY;

	for(var i= 0; i < iterations; i += 1)
	{
		midX = (uprX + lwrX)/2;
		midY = getY(midX,coeffs);
		//console.log(i + ', ' + midX + ', ' + midY);
		if(Math.abs(midY) < 0.000000001)
			return midX;
		else if(Math.sign(midY) === Math.sign(lwrY))
		{
			lwrX = midX;
			lwrY = midY;
		}
		else
		{
			uprX = midX;
			uprY = midY;
		}
	}
}
