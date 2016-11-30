# tooltip

A Tooltip for H5, need jQuery

1. Match any site of screen
2. Can bind to dynamic elements
3. Get tips from element by callback function

Use like:
```javascript
$(function(){
    $('body').gfTooltip({
        target: '.tooltip',
        contents: function(elem){
            return $(elem).attr('data-tips');
        }
    });
});
```

More details, please click [Project Site](http://www.gogofeel.cn/works/work/1 "tooltip by gogofeel.cn")
