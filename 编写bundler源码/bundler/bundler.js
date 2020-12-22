const fs = require('fs');
const path = require('path');
const paser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 分析模块
const moduleAnalyser = (filename) => {
    // 读取文件内容
    const content = fs.readFileSync(filename, 'utf-8');
    // 获取抽象语法树
    const ast = paser.parse(content, {
        sourceType: 'module'
    });
    
    const dependencies = {};
    // 遇到声明语法时执行，获取依赖
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename);
            const newFile = './' + path.join(dirname, node.source.value)

            dependencies[node.source.value] = newFile;
        }
    });
    // 将抽象语法树转化为浏览器能够识别的代码
    const {code} = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    });
    
    return {
        filename,
        dependencies,
        code
    }
}
// 依赖图谱 分析项目所有模块的依赖
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalyser(entry);
    const graphArr = [entryModule]
    for(let i = 0; i < graphArr.length; i++) {
        const item = graphArr[i];
        const { dependencies } = item;
        if(dependencies) {
            for(let j in dependencies) {
                graphArr.push(moduleAnalyser(dependencies[j]));
            }
        }
    }
    const graph = {};
    graphArr.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })
    
    return graph;
}

// 生成代码
const generateCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath]);
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports;
            }
            require('${entry}');
        })(${graph});
    `
}

const code = generateCode('./src/index.js');
console.log(code);
