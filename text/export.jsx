//---------------------------------------
// レイヤー名をテキストに保存
//---------------------------------------
var CR = String.fromCharCode(13);
var savename = File.saveDialog("csvを保存する");
if (savename) {
	var fileObj = new File(savename);
	var flag = fileObj.open("w");
	if (flag == true) {
		writeLayerName(activeDocument);
		fileObj.close();
	} else {
		alert("ファイルが開けませんでした");
	}
}
//---------------------------------------
// 指定のテキストレイヤー名をｃｓｖに書き出し
//---------------------------------------
function writeLayerName(layObj) {
	var _title = 'title';
	var str = prompt("エクスポートするレイヤー名", _title);
	//var str = _title;
	var regObj = new RegExp(str, "g");
	var txtObj = activeDocument.artLayers;
	var n = layObj.artLayers.length;
	for (var i = 0; i < n; i++) {
		if (txtObj[i].kind == LayerKind.TEXT) {
			var txt = txtObj[i].textItem.contents;
			var layName = layObj.artLayers[i].name;
			var result = layName.match(regObj);
			if (result) {
				fileObj.write(txt+','+CR);
			}
		}
	}
alert("Done!!!");
}