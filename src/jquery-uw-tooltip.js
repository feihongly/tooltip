;(function($, window, document, undefined) {
    //定义uwTooltipOption的构造函数
    var uwTooltipOption = function(ele, opt) {
//        alert(ele.find("table").get(0))
        this.$elements = ele,
        this.defaults = {
            target: '',
            contents: '',
            offset: {
                x: 20,
                y: 10
            },
            positionFlag: false,
            events: {
                mouseenter: 'mouseenter',
                mouseleave: 'mouseleave',
                mousemove: 'mousemove'
            }
        },
        this.options = $.extend({}, this.defaults, opt);
        this.$tip = '<div class="uwTooltip"></div>';
    }
    //定义uwTooltipOption的方法
    uwTooltipOption.prototype = {
        init: function() {
            var tthis = this;
            return tthis.$elements.each(function(i){
                console.log('test');
                var $tip = $(tthis.$tip).appendTo('body');
                $tip.hide();
                $(this).on({
                    'mouseenter': function(event){
                        if(typeof tthis.options.contents == 'function'){
                            $tip.html(tthis.options.contents(this));
                        }else{
                            $tip.html(tthis.options.contents);
                        }
                        var bottom = 0,right = 0;
                        if(tthis.options.positionFlag){
                            if(event.pageY > $(window).height() - 100){
                                bottom = $tip.height();
                                $tip.addClass('bottom');
                            }else{
                                $tip.removeClass('bottom');
                            }
                            if(event.pageX > $(window).width() - 200){
                                right = $tip.width()+50;
                                $tip.addClass('right');
                            }else{
                                $tip.removeClass('right');
                            }
                        }

                        console.log('bottom',bottom);
                        $tip.css({
                            top: event.pageY - bottom + tthis.options.offset.y,
                            left: event.pageX - right + tthis.options.offset.x
                        }).stop(true,true).fadeIn();
                    },
                    'mouseleave': function(event){
                        $tip.stop(true,true).fadeOut();
                    },
                    'mousemove': function(event){
                        var bottom = 0,right = 0;
                        if(tthis.options.positionFlag){
                            if(event.pageY > $(window).height() - 100){
                                bottom = $tip.height();
                                $tip.addClass('bottom');
                            }else{
                                $tip.removeClass('bottom');
                            }
                            if(event.pageX > $(window).width() - 200){
                                right = $tip.width()+50;
                                $tip.addClass('right');
                            }else{
                                $tip.removeClass('right');
                            }
                        }
                        
                        $tip.css({
                            top: event.pageY - bottom + tthis.options.offset.y,
                            left: event.pageX - right + tthis.options.offset.x
                        })
                    }
                },tthis.options.target);
            });
        }
    }
    //在插件中使用uwTooltipOption对象
    $.fn.uwTooltip = function(options,args) {
        //创建uwTooltipOption的实体
        if(uto == undefined)
            var uto = new uwTooltipOption(this, options);
        //调用其方法
//        typeof method === 'object' || !method
        if (typeof options === 'object' || !options) {
            return uto.init();
        }else{
//            alert(args)
            return uto[options].apply(uto, args);
        }
    }
})(jQuery, window, document);

// $(function(){
//     $('body').on({
//         'mouseenter': function(event){
//             if(typeof tthis.options.contents == 'function'){
//                 tthis.$elements.html(tthis.options.contents(this));
//             }else{
//                 tthis.$elements.html(tthis.options.contents);
//             }
//             $(this).css({
//                 top: event.pageY + tthis.options.offset.y,
//                 left: event.pageX + tthis.options.offset.x
//             }).fadeIn();
//         },
//         'mouseleave': function(event){
//             $(this).fadeOut();
//         }
//     },'.uwTooltip');
// });