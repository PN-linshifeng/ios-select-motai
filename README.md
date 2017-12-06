# select-motai
当select下拉框文字过多，使用模态窗口插件代替

HTML 
<select class="select select1" event="blur" name="acsc">
event：监听派发事件blur click change
name：必写

CSS
引用app.css

JS
引用modai.js 和 SelectModai.js，modai.js是模态窗口插件，SelectModai.js是重写select插件

 document.addEventListener("DOMContentLoaded", function() {
    new SelectModai('select', 640);//select 是重写select 的选择器，640是max-width：640，窗口必须小于max-width

    //事件
    document.querySelector(".select1").addEventListener("blur",function(){
        console.log(this.value);
    },false)
}, false);



