var _layers = [];
var lang = {};

$.writeln("-------------------------------");
main();

function main(){
  var document = activeDocument;
	var layers = document.layers;
    loadCSV(function(lang){
        $.writeln('レイヤー検索開始');
        getLayer(layers);
        $.writeln('レイヤー検索終了');
        var num = _layers.length;
		for(var i = 0; i < num; i++){
			var layer = _layers[i];
			var layerName = layer.name;
//			var original = layer.textItem.contents;
			var original = layer.textItem.contents.replace(/\s/g, '');
			var replace = lang[original];
			$.writeln('----------');
			$.writeln(original + 'の' + 'フォント名:' + layer.textItem.font);

			// マッチしたら置換する
			if (replace) {
				$.writeln(original.toString());
				var reg = new RegExp(original.toString(), "g");
				layer.textItem.font = "Meiryo-Bold"; //　書体（フォント）を指定
				layer.textItem.contents = original.replace(reg, replace);
			}
		}
	});
}

function loadCSV(callback) {
	var dataFile  = File.openDialog("テキストファイルを指定してください。");
	var fileObj = new File(dataFile);
	var flag = fileObj.open("r");
	var fileData;
	var Line;
	var data;
	if (flag) {
		fileData = fileObj.read();
		Line = fileData.split("\n");
		for (var i=0, l=Line.length; i < l-1; ++i){
			data = Line[i].split(",");
			lang[data[0]] = data[1];
		}
		callback(lang);
		fileObj.close();
	}else{
		alert("データファイルが見つかりません");
	}
}

function getLayer(layers){
	var num = layers.length;
	for(var i = 0; i < num; i++){
		var layer = layers[i];
		if(layer.typename == "LayerSet"){
			getLayer(layer.layers);
		}
		if (layer.kind === LayerKind.TEXT) {
			_layers.push(layer);
		}
	}
}