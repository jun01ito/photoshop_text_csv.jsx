//---------------------------------------
//レイヤー名をテキストに保存
//---------------------------------------
CR = String.fromCharCode(13);
savename = File.saveDialog("保存するファイル名を入れてください");
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
//　レイヤーセット内にレイヤーが含まれる限り書き出し（再帰）
function writeLayerName(layObj) {
    var n = layObj.artLayers.length;
    for (var i = 0; i < n; i++) {
        var layName = layObj.artLayers[i].name;
        fileObj.write(i+':'+ layName + CR);
    }
    var ns = layObj.layerSets.length;
    for (var i = 0; i < ns; i++) {
        writeLayerName(layObj.layerSets[i])
    }
}

