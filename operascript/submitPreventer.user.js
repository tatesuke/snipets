/*
プロジェクト用のトラックでは送信系のボタンの色を黄色くする。
ボタンをクリックすると確認ダイアログを表示され、キャンセルを押せば送信を中止する。
ローカルトラックの場合は送信系のボタンの色を緑色に変わるが普通にクリックできる。 
*/
(function() {

	var ignoreValueList = [
			"検索",
			"複製",
			"削除",
			"ファイルを添付します",
			"プレビュー",
			"新しいマイルストーンの登録"];
	var confirmMessage = "この操作はDBのデータを書き換える可能性があります。実行しますか?";

	if (location.href.indexOf("example.com") != -1) {
		preventSubmit("#FFFF00", true);
	} else if(location.href.indexOf("localhost") != -1) {
		preventSubmit("#00FF00", true);
	}

	function preventSubmit(buttonColor, isPrevent) {
		var preventButtonList = [];

		var ignoreValueMap = getIgnoreValueMap();
		var inputElementList = document.getElementsByTagName("input");
		for (var i = 0; i < inputElementList.length; i++) {
			var inputElement = inputElementList[i];
			var type = inputElement.getAttribute("type");
			var value = inputElement.getAttribute("value");
			if ((type == "submit") && !ignoreValueMap[value]) {
				preventButtonList.push(inputElement);
			}
		}
		
		for (var i = 0; i < preventButtonList.length; i++) {
			var preventButton = preventButtonList[i];
			var value = preventButton.getAttribute("value");
			preventButton.style.backgroundColor = buttonColor;
			preventButton.setAttribute("value", value + "(！)");
			if (isPrevent) {
				preventButton.addEventListener("click", function(event){
					var confirm = window.confirm(confirmMessage);
					if (confirm == false) {
						event.preventDefault();
					}
				}, true);
			}
		}
	}
	
	function getIgnoreValueMap() {
		var ignoreValueMap = {};
		for (var i = 0; i < ignoreValueList.length; i++) {
			var ignoreValue = ignoreValueList[i];
			ignoreValueMap[ignoreValue] = true;
		}
		return ignoreValueMap;
	}

})();