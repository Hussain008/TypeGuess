var superImportantText='';
var pageText = 'hi';


chrome.storage.local.get(['content'], function(items) {

var content = items['content'].replace(/<[^>]+>/g, '').replace(/(\r\n|\n|\r)/gm,"");
superImportantText = content;
pageText = content;

start();

});


function selectRandomWord ( words ) {
	randomIndex = Math.floor((Math.random()*1000)%words.length) ;
	console.log(words);
	console.log(randomIndex);
	console.log(words[randomIndex]);
	return words[randomIndex];
}

function start(){
	words = pageText..split(" ") ;
	word = selectRandomWord(words);

	$.ajax({
        url: 'https://owlbot.info/api/v4/dictionary/'+word,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Token e4df540ec3454d5faa14ccf851905a339615dbb3")
        }, success: function(data){
        	if(data['definitions']===undefined)
        		return;
        	superImportantText =  data['definitions'][0]['definition'];
        	test(superImportantText);
        }})

}

function test(loll){
	document.write(loll);
}




