var superImportantText='lol';
chrome.storage.local.get(['content'], function(items) {
	var content = items['content'].replace(/<[^>]+>/g, '');
	superImportantText = content;
	
      console.log( "Here is the superImportant Text " + content);
    });
