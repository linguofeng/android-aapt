var aapt = require('../');

aapt.badging('./test/android.apk', function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
})
