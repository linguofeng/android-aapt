var readline = require('readline');
var child_process = require("child_process");

var aapt = module.exports = {
    tool: __dirname + "/tools/aapt"
}

aapt.badging = function(apk_file, callback) {
    var manifest = null
    var proc = child_process.spawn(this.tool, ["d", "badging", apk_file]);
    readline.createInterface({
        input: proc.stdout,
        terminal  : false
    }).on('line', function(line) {
        var r = parse_package(line);
        if (r) {
            manifest = r
        }
        name = parse_application_label(line)
        if (name) {
            manifest.name = name
        }
    }).on('close', function() {
        callback(null, manifest)
        process.exit(0);
    });
}

// parse packageName versionName versionCode
function parse_package(package_str) {
    var package_reg = /package:/;
    if (package_reg.test(package_str)) {
        var manifest = {}
        package_str.split(/ /).forEach(function(str) {
            var kv = str.split(/=/);
            ['name', 'versionName', 'versionCode'].forEach(function(key) {
                if (key == kv[0]) {
                    manifest[key == 'name' ? 'packageName' : key] = kv[1]
                }
            })
        })
        return manifest
    }
}

// parse Application Name
function parse_application_label(application_label_str) {
    var application_label_reg = /application-label/;
    if (application_label_reg.test(application_label_str)) {
        return application_label_str.split(/:/)[1]
    }
}
