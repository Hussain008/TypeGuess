var definition='hmm';
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
	word='-'
	//using regex to check if the current word only consists of alphabets
	var letters = /^[A-Za-z]+$/
	console.log(word);
	while(word.length<=1 ||  word.match(/^[A-Za-z]+$/)==null ){
	word = selectRandomWord(words);
	console.log(word);
	}

	chrome.storage.local.set({'word_selected': word }, function() {
      console.log('word has been Selected');
    });

 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id,{Message: "word has been selected"}, function (response) {
            ;
        })
	}) ;


	console.log('beforeAPICALL')
	//the api call
	$.ajax({
        url: 'https://owlbot.info/api/v4/dictionary/'+word,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Token e4df540ec3454d5faa14ccf851905a339615dbb3")
        }, success: function(data){
        	if(data['definitions']===undefined)
        		{
        			start();
        			return;
        		}
        	definition =  data['definitions'][0]['definition'];
        	console.log(definition);
        	setDefinition();
        },error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
        start();
    }  
    })
    console.log('afterAPIcALL')

}

function setDefinition(){
	document.getElementById('defitnition').innerHTML = 'Definition : <br>' + definition;
}




var distance = document.getElementById('Guess') ;
distance.addEventListener("keyup", calcDist);

function calcDist(){
	userInput  = distance.value ;
	var editDist = levenshteinDist(userInput.toLowerCase() , word.toLowerCase() , 0, 0)
	document.getElementById('levisteinDist').innerHTML = 'You are  distance away : <b>'+editDist+'</b>' ;
	if(editDist==0){
		alert('CORRECT');
		distance.value='';
		
		chrome.storage.local.set({'word_selected': 'F' }, function() 
		{
      	console.log('word has reset');
  		});

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id,{Message: "word has been de-selected"}, function (response) {
            ;
        })
	}) ;

		window.close();

		// start();

	}
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




