var urls = [];
browser.runtime.onMessage.addListener(notify);

browser.browserAction.onClicked.addListener(async (tab) => {
	browser.tabs.executeScript(tab.id, {
        code: `getlist()`
    })
	
	var i = 0;
	for (const url of urls) {
		if (!url) continue;
		const currentId = await download(url, i);
		const success = await onDownloadComplete(currentId);
		i++;
	}
})


function notify(message) {
	urls = message
}

function download(url, nb) {
  return new Promise(resolve => browser.downloads.download({
		url : url,
		filename : 'folder/result/pdf'+ nb + '.pdf',
		conflictAction : 'uniquify'
	}, resolve));
}

function onDownloadComplete(itemId) {
  return new Promise(resolve => {
    browser.downloads.onChanged.addListener(function onChanged({id, state}) {
      if (id === itemId && state && state.current !== 'in_progress') {
        browser.downloads.onChanged.removeListener(onChanged);
        resolve(state.current === 'complete');
      }
    });
  });
}