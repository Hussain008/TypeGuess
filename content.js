console.log("This is content script running");

var superImportantText = document.body.innerText ;

chrome.storage.local.set({'content': superImportantText}, function() {
      console.log('Settings saved');
    });
