;
(function(win, doc) {
    /*
     @method SelectModai
     @param node 重构的select class节点
     @pn 245810159@qq.com
     */
    var SelectModai = function(node) {
        this.node = node;
        this.selectAll = document.querySelectorAll(node) || document.getElementsByName(node);
        this.screenWidth = screen.width;
        this.selectList = []; //被转化的select
        this.iPhoneList = {
            iPhone5: 12,
            iPhone6: 14,
            iPhone6P: 16,
        }
        this.init(); //初始化插件
    };
    SelectModai.prototype = {
        init: function() {
            //必须是iPhone
            var isIOS = /iPhone/g.test(navigator.appVersion);
            if (!isIOS) {
                return;
            }
            //获取有效的select
            this.selectAll.forEach(function(item, index) {
                if (item.disabled) {
                    return;
                }
                var options = item.options;
                for (var i = 0; i < options.length; i++) {
                    var len = options[i].text.length;
                    if (len > 12 && this.screenWidth <= 320 || len > 15 && this.screenWidth <= 375 || len > 18 && this.screenWidth <= 414) {
                        this.createDiv(item, index); //创建点击div 并替换select
                        this.createModai(item, index); //创建模态窗口
                        break;
                    }
                }

            }, this);

            //重新获取select
            this.selectAll = document.querySelectorAll(this.node) || document.getElementsByName(this.node);

            //获取有效的select
            this.selectAll.forEach(function(item, index) {
                if (item.disabled) {
                    return;
                }
                var options = item.options;
                for (var i = 0; i < options.length; i++) {
                    var len = options[i].text.length;
                    if (len > 12 && this.screenWidth <= 320 || len > 15 && this.screenWidth <= 375 || len > 18 && this.screenWidth <= 414) {
                        this.selectList.push(item)
                        break;
                    }
                }
            }, this);

            this.clickSelect(); //监听点击select div
            this.radioChange(); //监听选择radio选项
        },
        //创建点击div
        createModai: function(item, j) {
            if (!item.name) {
                console.warn(item + "select 缺少name属性值")
            }
            var hh = "";
            for (var i = 0; i < item.options.length; i++) {
                var checked = i == item.options.selectedIndex ? "checked" : ""
                hh += "<div class='item'><label><input type='radio' name='" + item.name + "' value='" + item.options[i].value + "' " + checked + " />" + item.options[i].text + "</label></div>";
            }
            var cla = item.options.length < 6 ? "item-middle" : "";
            var html = '<span class="close"></span><div class="page-warp"><div class="' + cla + '">' + hh + '</div></div>';
            var createDiv = document.createElement("div");
            createDiv.className = "select-modai page-view";
            createDiv.id = "SelectModai" + j
            createDiv.innerHTML = html;
            document.querySelector("body").appendChild(createDiv);
            this.selectModai = document.querySelectorAll(".select-modai");
        },
        //创建模态窗口
        createDiv: function(item, index) {
            var parent = item.parentNode;
            var newSelect = item.cloneNode(true);
            var createDiv = document.createElement("div");
            var createSpan = document.createElement("span");
            createSpan.className = "select-click";
            createSpan.setAttribute("modai", index)
            createDiv.style.position = "relative";
            createDiv.appendChild(newSelect);
            createDiv.appendChild(createSpan)
            parent.replaceChild(createDiv, item)
                // parent.appendChild(createDiv)
        },
        clickSelect: function() {
            var selectDiv = document.querySelectorAll(".select-click");
            for (var i = 0; i < selectDiv.length; i++) {
                (function(i) {
                    selectDiv[i].addEventListener("click", function() {
                        var index = this.getAttribute("modai")
                        location.hash = "SelectModai" + index; //显示对应div#id
                    }, false)
                })(i)
            }
        },
        radioChange: function() {
            var selectModai = document.querySelectorAll(".select-modai");
            for (var i = 0; i < selectModai.length; i++) {
                (function(i, that) {
                    selectModai[i].addEventListener("click", function(e) {
                        if (e.target.tagName === "INPUT") {
                            var handle = that.selectList[i].getAttribute("event") || "blur";
                            var value = e.target.value;
                            that.selectList[i].value = value;
                            var e = document.createEvent("MouseEvents");
                            e.initEvent(handle, true, true);
                            that.selectList[i].dispatchEvent(e);
                            history.back();
                        };
                    }, false)
                })(i, this)
            }
        }
    };
    win.SelectModai = SelectModai;
})(window, document);
document.addEventListener("DOMContentLoaded", function() {
    new SelectModai('select');
}, false);