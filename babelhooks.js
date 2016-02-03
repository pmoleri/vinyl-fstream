require("babel-register")({
    /*ignore: function(path) {
        if ( /node_modules/.exec(path) && (!/node_modules\/indigo-codegen-engine/.exec(path) || /node_modules\/indigo-codegen-engine\/node_modules/.exec(path)) ) {
            return true;
        } else {
            return false;
        }
    }*/
});
