var filename = "Macintosh HD:texttext_export.txt";
var fileObj = new File(filename);
var flg = fileObj.open("r");
alert(flg);
if (flg == true) {
	var text = fileObj.read();
	alert(text);
	fileObj.close();
} else {
	alert("ファイルが開けませんでした");
}