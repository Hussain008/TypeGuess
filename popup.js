var definition='';
var pageText = 'hi';


chrome.storage.local.get(['content'], function(items) {

//need to replace all the <> tags from the text and replace all the next line characters of all types
var content = items['content'].replace(/<[^>]+>/g, '').replace(/(\r\n|\n|\r)/gm,"");

superImportantText = content;
pageText = content;

// this function will initate the api call and other callback functions
start();

});


function selectRandomWord ( words ) {
	//selecting a random word from the words array , using Math.floor to get an integer
	randomIndex = Math.floor((Math.random()*1000)%words.length) ;

	console.log(words);
	console.log(randomIndex);
	console.log(words[randomIndex]);

	return words[randomIndex];
}

function start(){
	//split words by space
	words = pageText.split(" ") ;
	word = selectRandomWord(words);

	//the api call
	$.ajax({
        url: 'https://owlbot.info/api/v4/dictionary/'+word,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Token e4df540ec3454d5faa14ccf851905a339615dbb3")
        }, success: function(data){
        	if(data['definitions']===undefined)
        		return;
        	definition =  data['definitions'][0]['definition'];
        	setDefinition();
        }})

}

function setDefinition(){
	document.getElementById('defitnition').innerHTML = 'Definition : <br>' + definition;
}




var distance = document.getElementById('Guess') ;
distance.addEventListener("keyup", calcDist);

function calcDist(){
	userInput  = distance.value ;
	document.getElementById('levisteinDist').innerHTML = 'You are  <b>  ' + levenshteinDist(userInput , word , 0, 0) + '  </b>  distance away' ;
}

function levenshteinDist(str1,str2){
	dp  = new Array(str1.length);
	for (var i = 0; i < str1.length; i++) {
		dp[i]=new Array(str2.length);
		for (var j = 0; j < str2.length; j++) {
			dp[i][j]=-1;
		}
	}
	return levenshteinDistHelper(str1,str2,0,0);
}

function levenshteinDistHelper(str1,str2,i,j){
	if(i==str1.length){
		return str2.length - j ;
	}else if(j==str2.length){
		return str1.length - i ;
	}

	console.log(str1+ ' '+ str2 + ' '+i+ ' '+j)

	if(dp[i][j]!=-1)
		return dp[i][j];

	var op1 = Number.MAX_SAFE_INTEGER , op2 = Number.MAX_SAFE_INTEGER , op3 = Number.MAX_SAFE_INTEGER , op4 = Number.MAX_SAFE_INTEGER ;

	if(str1[i]==str2[j])
		op1 = levenshteinDistHelper(str1,str2,i+1,j+1);

	op2 = 1 + levenshteinDistHelper(str1,str2,i+1,j);
	op3 = 1 + levenshteinDistHelper(str1,str2,i,j+1);
	op4 = 1 + levenshteinDistHelper(str1,str2,i+1,j+1);

	dp[i][j] = Math.min(op1,Math.min(op2,Math.min(op3,op4))) ;

	return dp[i][j];

}




