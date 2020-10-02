var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    try{
        let file = files.upload;	// 获取上传文件
        const reader = fs.createReadStream(file.path);	// 创建可读流
        const upStream = fs.createWriteStream(`upload/About.docx}`);		// 创建可写流
        reader.pipe(upStream);	// 可读流通过管道写入可写流
    }catch(e){
        console.log(e)
        if(e.toString().match("'path' of undefined"))
        console.log('666')
    }

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received:<br/>");
    response.write('<iframe src="/show"></iframe>');
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {"Content-Type": "multipart/mixed"});
  fs.createReadStream("upload/About.docx").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;