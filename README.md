# android-aapt

```base
$ npm install android-aapt
```

```js
var aapt = require('../');

aapt.badging('android.apk', function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
})
```
