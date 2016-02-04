require("babel-register")({
    ignore: function(path) {
        if ( /.*\/node_modules\/.*/.test(path) || /.*\/lib/.test(path) ) {
            return true;
        } else {
            return false;
        }
    }
});
