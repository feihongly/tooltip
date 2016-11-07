;(function($, window, document, undefined) {
    //定义gfTooltipOption的构造函数
    var gfTooltipOption = function(ele, opt) {
//        alert(ele.find("table").get(0))
        this.$elements = ele,
        this.defaults = {
            target: '',
            contents: '',
            offset: {
                x: 20,
                y: 10
            },
            // position: 'left',
            autoPosition: true
        },
        this.options = $.extend({}, this.defaults, opt);
        this.$tip = '<div class="gfTooltip"></div>';
    }
    
    //定义gfTooltipOption的方法
    gfTooltipOption.prototype = {
        init: function() {
            var tthis = this;
            return tthis.$elements.each(function(i){
                var $tip = $(tthis.$tip).appendTo('body');
                $tip.hide();
                $(this).on({
                    'mouseenter': function(event){
                        if(typeof tthis.options.contents == 'function'){
                            $tip.html(tthis.options.contents(this));
                        }else{
                            $tip.html(tthis.options.contents);
                        }
                        var bottom = 0,right = 0,bottomOffset = 0;
                        if(tthis.options.autoPosition){
                            if(event.pageY > $(window).height() - 100){
                                bottom = $tip.height();
                                bottomOffset = -tthis.options.offset.y;
                                $tip.addClass('bottom').removeClass('top');
                            }else if(event.pageY < 100){
                                $tip.removeClass('bottom').addClass('top');
                            }else{
                                $tip.removeClass('bottom').removeClass('top');
                            }
                            if(event.pageX > $(window).width() - 200){
                                right = $tip.width()+50;
                                $tip.addClass('right');
                            }else{
                                $tip.removeClass('right');
                            }
                            if($tip.hasClass('right') && $tip.hasClass('bottom')){
                                $tip.addClass('right-bottom');
                            }else{
                                $tip.removeClass('right-bottom');
                            }
                        }else{
                            if(tthis.options.position == 'top'){
                                $tip.addClass('top');
                            }
                        }

                        $tip.css({
                            top: event.pageY - bottom + bottomOffset,
                            left: event.pageX - right + tthis.options.offset.x
                        }).stop(true,true).fadeIn();
                    },
                    'mouseleave': function(event){
                        $tip.stop(true,true).fadeOut();
                        
                    },
                    'mousemove': function(event){
                        var bottom = 0,right = 0,bottomOffset = 0;
                        if(tthis.options.autoPosition){
                            if(event.pageY > $(window).height() - 100){
                                bottom = $tip.height();
                                bottomOffset = -tthis.options.offset.y;
                                $tip.addClass('bottom').removeClass('top');
                            }else if(event.pageY < 100){
                                $tip.removeClass('bottom').addClass('top');
                            }else{
                                $tip.removeClass('bottom').removeClass('top');
                            }
                            if(event.pageX > $(window).width() - 200){
                                right = $tip.width()+50;
                                $tip.addClass('right');
                            }else{
                                $tip.removeClass('right');
                            }
                            if($tip.hasClass('right') && $tip.hasClass('bottom')){
                                $tip.addClass('right-bottom');
                            }else{
                                $tip.removeClass('right-bottom');
                            }
                        }
                        
                        $tip.css({
                            top: event.pageY - bottom + bottomOffset,
                            left: event.pageX - right + tthis.options.offset.x
                        })
                    }
                },tthis.options.target);
            });
        }
    }
    //在插件中使用gfTooltipOption对象
    $.fn.gfTooltip = function(options,args) {
        //创建gfTooltipOption的实体
        if(uto == undefined)
            var uto = new gfTooltipOption(this, options);
        //调用其方法
        if (typeof options === 'object' || !options) {
            return uto.init();
        }else{
            return uto[options].apply(uto, args);
        }
    }
})(jQuery, window, document);