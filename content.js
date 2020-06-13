console.log("This is content script running");

var superImportantText = document.body.innerText ;

chrome.storage.local.set({'content': superImportantText}, function() {
      console.log('Settings saved');
    });


chrome.storage.local.set({'word_selected': 'F'}, function() {
      console.log('waiting for the word to get word to get Selected');
    });


//Run() ;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.Message == "word has been selected"){

    chrome.storage.local.get(['word_selected'], function(items) {
			word_selected = items['word_selected'] ;
				hideHalfText(document.body ) ;

		});
	}else{
		console.log("we're here");
		reloadThePage();
		
		// showHalfText(document.body);
	}
    	sendResponse({});
    	return true;
      // sendResponse({farewell: "goodbye"});
  });


word_selected='-';


function hideHalfText(element){
	if(element.hasChildNodes()){
		element.childNodes.forEach(hideHalfText);
	}else if(element.nodeType === Text.TEXT_NODE){
		// to do something here that will also let me hide the text and also retrive it back

		if(element.textContent.match(/.*(word_selected).*/gi)==null && (Math.random()*10)<8 ){
		const newElement = document.createElement('span')
      	newElement.innerHTML = element.textContent.replace(/.*/gi, '<span style="background-color : white ; color: white ;">'+element.textContent+'</span>');
      	element.replaceWith(newElement)
      }
		
	}	//caesar cipher with random key everytime

}

// function showHalfText(element){
// 	if(element.hasChildNodes()){
// 		element.childNodes.forEach(showHalfText);
// 	}else if(element.tagName == 'SPAN'){
// 		// to do something here that will also let me hide the text and also retrive it back
// 		console.log('in here '+element.textContent);
// 		const newElement = document.createElement('span')
//       	newElement.innerHTML = element.textContent.replace(/.*/gi, '<span style="background-color : white ; color: black ;">'+element.textContent+'</span>');
//       	element.replaceWith(newElement)
      
		
// 	}	//caesar cipher with random key everytime

// }

function reloadThePage(){
	location.reload(true);
}