(function(global,factory){
    global.Template = factory;
})(this,function(opts){
    var el = document.querySelector(opts.el);
    var temp = document.querySelector(opts.tem).innerHTML;
    
    var data = opts.data;
    // 正则+替换 
    var template = function(text,data){
        var index = 0;
        var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2028/g;
        var escapes = {
            "'":"‘",
            "\r":"r",
            "\n":"n",
            "\t":"t",
            "\u2028":"2028",
            "\u2029":"2029"
        }
        var functionMain = "var dataHtml = '';";
        functionMain += "dataHtml+='";
        //需要替换的字符，普通语法（obj[i].text）,特殊语法for,截取位置
        text.replace(matcher,function(macth,interpolate,eveluate,offset){//mactch匹配的子串。中间两个括号内匹配的内容，最后一个偏移
            functionMain+= text.slice(index,offset).replace(escaper,function(macth){
                return "\\"+escapes[macth];
            });
            if(eveluate){
                functionMain+="';"+eveluate+"dataHtml+='";
            }
            if(interpolate){
                functionMain += "'+"+interpolate+"+='";
            }
            index = offset + macth.length;//叠加位置的索引
            return macth; //函数的返回值作为替换字符串
        })
        functionMain += "';return dataHtml";
        var render = new Function('obj',functionMain); //最后一个参数是函数体，前面参数都为参数；
        return render(data);
    }

    el.innerHTML = template(temp,data);
})