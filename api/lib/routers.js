const path=require('path');
const fs=require('fs');
const Router=require('koa-router');


function findRouterFiles(dir){
    dir=path.resolve(__dirname,dir);
    var files=fs.readdirSync(dir);
    var list=[];

    for(var file of files){
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            list = list.concat(walk(dir + '/' + file));
        } else {
            list.push(dir + '/' + file);
        }
    }
    return list;
}

module.exports=function(options){
    console.log("base..");
    let router= new Router();

    if (!options || typeof options.root === 'string') {
        if (!path.isAbsolute(options.root)) {
            options.root = path.resolve(process.cwd(), options.root);
        }
    } else {
        throw Error('root must be specified');
    }

    options.suffix = options.suffix || '.js';
    options.prefix = options.prefix || '';

    var paths = findRouterFiles(options.root);
    paths.forEach(function (value, index) {
        var _path = path.relative(options.root, value);
        _path = '/' + _path.slice(0,  _path.lastIndexOf(options.suffix));
        console.log(options.prefix + _path)
        router.use(options.prefix + _path, require(value).routes());
    });

    return router;

    // return function* router(next){
    //     yield* next;
    // };
}

