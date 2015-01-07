var _title = 'Title';
var str = prompt("調べる文字を入れて下さい（正規表現）", _title);
var regObj = new RegExp(str, "g");

var txtObj = activeDocument.artLayers;
for (i = 0; i < txtObj.length; i++) {
	if (txtObj[i].kind == LayerKind.TEXT) {
		var txt = txtObj[i].textItem.contents;
		var result = txt.match(regObj);
		if (result) {
			alert("レイヤー名「" + txtObj[i].name.substr(0, 5) + "...」に該当文字があります。");
		}
	}
}