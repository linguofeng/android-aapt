// http://pro.sr1.me/post/android-sdk-download-links

// for ubuntu 64-bit
// sudo apt-get install lib32z1

var https   = require('https');
var zlib = require('zlib');
var fs = require('fs');
var os = require('os');

var targetDir = __dirname + '/tools/';
try {
  fs.statSync(targetDir);
} catch (e) {
  fs.mkdirSync(targetDir);
}

var platform = null;
if (os.type() === 'Darwin') {
  platform = 'macosx';
} else if (os.type() === 'Linux') {
  platform = 'linux';
} else {
  throw new Error('Unknown OS!');
}

var options = {
  hostname  : 'raw.githubusercontent.com',
  port      : 443,
  path      : "/linguofeng/android-aapt/master/tools/" + platform + "/aapt.gz",
  method    : 'GET'
};

var aapt = targetDir + "aapt"
var file = fs.createWriteStream(aapt);

var req = https.request(options, function(res) {
  res.on('end', function() {
    fs.chmodSync(aapt, '755');
  });
  res
    .pipe(zlib.createGunzip())
    .pipe(file);
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
