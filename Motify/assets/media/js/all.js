jQuery(document).ready(function($){
          $("photos img").each(function(){
              var _a = $("<a></a>").attr("href",this.src);
              $(this).wrap("<div class='photo'></div>").wrap(_a);
          })
          $("figure img").each(function(){
              var _b = $("<a></a>").attr("href",this.src);
              $(this).wrap(_b);
          })
          isImgLoad(function(){
            var photos = document.querySelector('photos');
            if(photos){
              waterfall(photos);
            }
            $(window).resize(function() {
             if(photos){
                  waterfall(photos);
            }
          });
});
        var t_img;
        var isLoad = true;
        function isImgLoad(callback){
          $('photos img').each(function(){
            if(this.height === 0){
              isLoad = false;
              return false;
            }
          });
          if(isLoad){
            clearTimeout(t_img);
            callback();
          }else{
            isLoad = true;
            t_img = setTimeout(function(){
              isImgLoad(callback);
            },500);
          }
        }
      });

jQuery(document).ready(function($) {
    //灯箱
    $(".post-hentry a[rel!=link]:has(img)").slimbox();
    //返回顶部
    var bt;
    bt = $('#back_to_top');
    if ($(document).width() > 480) {
      $(window).scroll(function() {
        var st;
        st = $(window).scrollTop();
        if (st > 30) {
          bt.css('display', 'block');
        } else {
          bt.css('display', 'none');
        }
      });
      bt.click(function() {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    }
    //相对时间
    $.lately({'target' : 'time.date span,.author-date small'});
    //外链新窗口
    var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var location_href = window.location.href.replace(parse_url,'$3');
    $('.post-content a:not(:has(img)),.author-name a').hover(function() {
        var this_href = $(this).attr('href');
        var replace_href = this_href.replace(parse_url,'$3');
        if ( this_href != replace_href && location_href != replace_href){$(this).attr('target','_blank');}
    });
    //外链加图标
        function urlIconlize(url) {
        var domain,
            _output;
        var iconFontTag = 'iconfont';
        var iconMap = {
            'twitter': iconFontTag + '-twitter',
            'wechat': iconFontTag + '-wechat',
            'qzone': iconFontTag + '-qzone',
            'weibo': iconFontTag + '-weibo',
            'facebook': iconFontTag + '-facebook',
            'github': iconFontTag + '-github',
            'douban': iconFontTag + '-douban',
            'google': iconFontTag + '-google',
            'luolei': iconFontTag + '-luolei',
            'dribble': iconFontTag + '-dribble',
            'v2ex': iconFontTag + '-v2ex',
            'zhihu': iconFontTag + '-zhihu',
            'wikipedia': iconFontTag + '-wikipedia',
            'jianshu': iconFontTag + '-jianshu',
            'youku': iconFontTag + '-youku',
            'youtube': iconFontTag + '-youtube'
        }
        for (var name in iconMap) {
            if (typeof iconMap[name] !== 'function') {
                var MapKey = name;
                if (url.indexOf(MapKey) >= 0) {
                    domain = MapKey;
                    _output = iconMap[MapKey];
                }
            }
        }
        return _output;
    };
    function addIcons() {
      $('.post-content  a:not(:has(img))').each(function(i) {
            var _src = $(this).attr('href');
            var tmp = document.createElement('a');
            tmp.href = _src;
            _selfDomain = tmp.hostname;
            urlIconlize(_selfDomain);
            $(this).prepend('<i class="iconfont ' + urlIconlize(_selfDomain) + '"></i>');

      });
    }
    addIcons();
    //豆瓣图书电影条目
    $(".post-content a[href*='douban']").each(function () {
        var _this = $(this);
        var str = _this.attr("href");
        var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
        if (db_reg.test(str)) {
            var db_type = str.replace(db_reg, "$1");
            var db_id = str.replace(db_reg, "$2").toString();
            var db_api = "https://bm.weajs.com/api/";
            if (db_type == 'movie') {
                var url = db_api + "movies/" + db_id + "/";
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: "json",
                    success: function (data) {
                        var db_star = Math.ceil(data.rating);
                        $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.directors + " / 类型：" + data.genres + " / " + data.pubdate + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this)
                    }
                });
            } else if (db_type == 'book') {
                var url = db_api + "books/" + db_id;
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        var db_star = Math.ceil(data.rating);
                        $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this)
                    }
                });
            } else {
                console.log("error")
            }
        }
    });

});