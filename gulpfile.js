var gulp = require("gulp");

gulp.task('travis',['bulid', 'testServerJS'], function(){
    process.exit(0);
});