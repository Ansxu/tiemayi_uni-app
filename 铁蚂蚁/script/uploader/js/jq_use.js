$.extend({
    load: function (e, c, t)
    {
        var isin = function () {
            for (var i in ListofCache) {
                if (ListofCache[i][0] == e) { return ListofCache[i]; }
            }
            return null;
        }
        var dt=isin();
        if (!dt) {
            $.ajax({
                url: e,
                type: 'get',
                dataType: t,
                ifModified: true,
                cache: true,
                success: function (data) {
                    var narray = new Array(e,data);
                    ListofCache.push(narray);
                    if (c && typeof (c) == "function") {
                        c(data);
                    }
                }
            });
        }
        else {
            if (c && typeof (c) == "function") {
                c(dt[1]);
            }
        }
    }
    , use: function (e, c) {
        if (Array.isArray(e))
        {
            var arr = new Array();
            e.forEach(function (v) {
                $.load(v, function () {
                    arr.push(true);
                    if (arr.length == e.length) { c(); }
                }, "script");
            });
        }
        else
        {
            this.load(e, c, "script");
        }
        
    }
    , tpl: function (tpl, data) //模版渲染
    {
        return tppl(tpl, data);
    }
})
var ListofCache = typeof (ListofCache) ? new Array() : ListofCache;

var tppl = function (tpl, data) {
    var fn = function (d) {
        var i, k = [], v = [];
        for (i in d) {
            k.push(i);
            v.push(d[i]);
        };
        return (new Function(k, fn.mobnp)).apply(d, v);
    };
    if (!fn.mobnp) {
        var tpls = tpl.split('{{');
        fn.mobnp = "var vo_tpl=''";
        for (var t = 0; t < tpls.length; t++) {
            var p = tpls[t].split('}}');
            if (t != 0) {
                fn.mobnp += '=' == p[0].charAt(0)
                  ? "+(" + p[0].substr(1) + ")"
                  : ";" + p[0].replace(/\r\n/g, '') + "vo_tpl=vo_tpl"
            }
            // 支持 <pre> 和 [::] 包裹的 js 代码
            fn.mobnp += "+'" + p[p.length - 1].replace(/\'/g, "\\'").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n') + "'";
        }
        fn.mobnp += ";return vo_tpl;";
        //console.log(fn.mobnp);
    }
    return data ? fn(data) : fn;
}
