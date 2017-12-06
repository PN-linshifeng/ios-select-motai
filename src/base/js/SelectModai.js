;
(function(win, doc) {
    /*
     @method SelectModai
     @param node 重构的select class节点
     @param screenWidth 窗口宽度小于screenWidth，开启modai
     */
    var SelectModai = function(node, screenWidth) {
        this.node = node;
        this.selectAll = document.querySelectorAll(node) || document.getElementsByName(node);
        this.screenWidth = screenWidth; //插件激活条件
        this.selectList = []; //被转化的select
        this.init(); //初始化插件
    };
    SelectModai.prototype = {
        init: function() {
            //如果网页宽度大于定义宽度，则不用插件
            if (document.body.clientWidth >= this.screenWidth) {
                return;
            }

            //获取有效的select
            this.selectAll.forEach(function(item, index) {
                if (!item.disabled) {
                    this.createDiv(item, index); //创建点击div 并替换select
                    this.createModai(item, index); //创建模态窗口
                }
            }, this);

            //重新获取select
            this.selectAll = document.querySelectorAll(this.node) || document.getElementsByName(this.node);

            //获取有效的select
            this.selectAll.forEach(function(item, index) {
                if (!item.disabled) {
                    this.selectList.push(item)
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
    window.SelectModai = SelectModai;

})(window, document);