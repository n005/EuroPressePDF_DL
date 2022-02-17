document.body.style.border = "5px solid green";

var urlList = [];
function getlist() {
	var total = window.wrappedJSObject.document.querySelectorAll("[target=Doc]").length
	for (let i = 0; i < total; i++) { 
		urlList.push(window.wrappedJSObject.document.getElementById("pagepdf_"+i).href);
	}
	browser.runtime.sendMessage(urlList);
}