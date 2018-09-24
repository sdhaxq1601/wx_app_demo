// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

/*
**路径       var _path
**高度(像素) var p
**注意 _name,_path 命名的原因
*/
var _path="C:/Users/SOO/Desktop/re/的/";
var p=200;//px

if (app.documents.length == 0)
{
  //app.documents.add(7, 5, 72, null, NewDocumentMode.RGB, DocumentFill.WHITE);
  throw "Not activeDocument"
}
var strtRulerUnits = app.preferences.rulerUnits;
if (strtRulerUnits != Units.PIXELS)
{
  app.preferences.rulerUnits = Units.PIXELS;
}

// Make sure the active layer is not a text layer, which cannot be copied
// to the clipboard
  var _name=activeDocument.info['parent'].name.split('.');
  _name.pop();
  _name=_name.join(".");
  //for(x in activeDocument.info){alert(x+">>"+activeDocument.info[x])}
  //throw 'wrr'
  var srcDoc = app.activeDocument.duplicate(_name,true);
  srcDoc.trim();
  var h=srcDoc.height,w=srcDoc.width,r=srcDoc.resolution;

  var _w=w*p/h;//px
  srcDoc.resizeImage(_w);
  
  var t = new Date();
  var fn=_path+_name+"__"+t.getTime()+".pad";
  var fi = new File(fn);
  srcDoc.saveAs(fi);
  srcDoc.close();
  //throw "ERR"

srcDoc = null;

if (strtRulerUnits != app.preferences.rulerUnits)
{
  app.preferences.rulerUnits = strtRulerUnits;
}



