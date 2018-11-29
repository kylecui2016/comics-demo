/*
* @Author: lenovo
* @Date:   2018-11-26 16:38:51
* @Last Modified by:   lenovo
* @Last Modified time: 2018-11-29 17:04:33
*/

/*设置canvas宽高*/
$("#app").attr({
    width: config.clientWidth,
    height: config.clientHeight
});

/*创建舞台实例，并开启舞台的DOM事件响应*/
var stage = new Hilo.Stage({
	canvas: $("#app")[0],
    width: config.clientWidth,
    height: config.clientHeight
});
stage.enableDOMEvent(Hilo.event.POINTER_START, true);
stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true);
stage.enableDOMEvent(Hilo.event.POINTER_END, true);

/*将stage指定为定时器对象，并启动定时器，从而stage上的动画可以正常运行*/
var ticker = new Hilo.Ticker(60);
ticker.addTick(stage);
ticker.start();

(function () {

    var obj = {};//实例元素的集合

    /* 将元素实例化 */
    for (var i = 0; i < config.datas.length; i ++) {
        var data = config.datas[i];
        /* mask为可视元素的遮罩图形，
		  可在config文件的datas里按如下格式配置：
		  {
            id: "p2_girl2_mask",
            type: "Graphics",
            ...
            draw: function() {
                this.lineStyle(1, "rgba(0,0,0,0)").beginFill("rgba(0,0,0,0)").drawRect(0, 0, 299, 429).endFill()
            }
            ...
        }, {
            id: "p2_girl2",
            type: "Bitmap",
            ...
            propes: {
                ...
                mask: "p2_girl2_mask"
            },
            ...
        }
        */
        if(data.propes.mask) {
        	data.propes.mask = obj[data.propes.mask];
        }

        if(data.image) {//数据项里有image时，将image添加到propes属性，image值为图片路径
        	data.propes.image = data.image;
        }

        /* 实例化精灵动画Sprite（例：哒哒动画中“小女孩的眼泪”） 
		   精灵动画的帧数据对象，是从纹理集TextureAtlas的实例中取的
		   在config文件的datas里可按如下格式配置：
		   {
            id: "p1_tears",
            type: "TextureAtlas",
            image: "p1_tears",
            ...
            propes: {
                frames: [[0, 0, 100, 30], [100, 0, 100, 30], [200, 0, 100, 30], [300, 0, 100, 30], [0, 30, 100, 30], [100, 30, 100, 30], [200, 30, 100, 30], [300, 30, 100, 30], [0, 60, 100, 40], [100, 60, 100, 40], [200, 60, 100, 40], [300, 60, 100, 40], [0, 100, 100, 40], [100, 100, 100, 40], [200, 100, 100, 40], [300, 100, 100, 40]],
                sprites: {
                    p1_tear5: [0, 1, 2, 3, 4, 5, 6, 7],
                    p1_tear4: [8, 9, 10, 11, 12, 13, 14, 15]
                }
            },
            ...
        }, {
            id: "p1_tear5",
            type: "Sprite",
            frames: "p1_tears.p1_tear5",
            ...
            propes: {
                interval: 10,
                ...
            },
            ...
        }, {
            id: "p1_tear4",
            type: "Sprite",
            frames: "p1_tears.p1_tear4",
            ...
            propes: {
                interval: 10,
                ...
            },
            ...
        }
        */
        if(data.frames) {
        	var textureT = data.frames.split(".")[0];
        	var spriteT = data.frames.split(".")[1];
        	data.propes.frames = obj[textureT].getSprite(spriteT);
        }
        
        obj[data.id] = new Hilo[data.type](data.propes);//创建对应类型的实例

        if(data.type == "Graphics" && data.draw) {//type为Graphics时，执行draw方法
        	data.draw.call(obj[data.id]);
        }
        /*需要svg时可以指定type为Graphics，并且指定对应的drawSVGPath方法。
		  格式如下：
		  drawSVGPath: function (path,beginfill) {
        	  this.drawSVGPath(path).beginFill(beginfill).endFill()
          },
          svg: {
        	  path: 'M200 0 L150 100 L250 100 Z',
        	  beginfill: '#0ff'
          }
        */
        if(
        	data.type == "Graphics" &&
        	data.drawSVGPath &&
        	data.svg
        ) {
        	data.drawSVGPath.call(obj[data.id],data.svg.path,data.svg.beginfill);
        }

        if(data.touchend) {//为obj[data.id]添加touchend事件
        	obj[data.id].touchend = data.touchend;
        	obj[data.id].on("touchend", function() {
	            this.touchend()
	        });
        }
        /* 若元素实例属于某个父元素，将实例添加到父元素下；若元素本身为父元素，则添加到stage */
	    if(data.parent && data.parent !== "null") {
	    	obj[data.id].addTo(obj[data.parent]);
	    }else {
	    	obj[data.id].addTo(stage);
	    }
    }

    // if(config.frameDatas && config.frameDatas.length > 0) {
    //     var currentFrame = config.frameDatas[0];
    // }
    var currentFrame;
    var nextFrame;

    /*逐帧动画事件*/
    var frameEvents = {
    	initFrame: function () {//初始化逐帧动画，将逐帧动画逐个添加到frameContainer(逐帧动画容器)
    		obj.frames = [];
    		for(var i = 0; i < nextFrame.frameImgs.length; i ++) {
    			var img = new Hilo.Bitmap({
    				width: config.clientWidth,
	        		height: config.clientHeight,
	        		x: 0,
	        		y: 0,
	        		alpha: 0,
	        		image: nextFrame.frameImgs[i]
    			}).addTo(obj[nextFrame.frameContainer]);
    			obj.frames.push(img);
    		}
    	},
    	start: function () {//逐帧动画启动
			var i = 0;
    		function doFrame() {
    			if(i > currentFrame.frameImgs.length - 1) {// i大于逐帧动画资源数时，显示最后一张图片
    				return obj.frames[currentFrame.frameImgs.length - 1].alpha = 1;
    			}
				for(var j = 0;j < obj.frames.length; j++) {
    				obj.frames[j].alpha = 0;
    			}
				obj.frames[i].alpha = 1;
				i++;
    			requestAnimationFrame(doFrame);
    		}
			doFrame();
    	}
    };

    /* 缓动函数 */
	var tweenFunc = function(e, t, i, n, a) {
        return e + (t - e) / (n - i) * (a - i)
    };

     /* 从frameDatas获取当前逐帧动画数据 */
     var getCurrentFrame = function (scrollTop) {
        var target=[];
        target = config.frameDatas.filter(function (currentValue, index) {
            return scrollTop > currentValue.frameStart
        });
        return target[target.length - 1];
    }
    /* 从frameDatas获取下一个逐帧动画数据 */
    var getNextFrame = function (scrollTop) {
        var target=[];
        target = config.frameDatas.filter(function (currentValue, index) {
            return scrollTop < currentValue.frameStart
        });
        return target[0];
    }

    /* 滚动事件的回调 */
    var fallback = function(scrollLeft, scrollTop, zoomLevel) {

    	console.log("scrollTop: " + scrollTop);

        var currentY = scrollTop;

        for (var len = config.datas.length, i = 0; i < len; i ++) {

            for (//animations里配置动画的实现
            		var data = config.datas[i], 
        			animations = data.animations, 
        			j = 0; 
        			j < animations.length; 
        			j ++
        		) {
	                var animation = animations[j];
	                var value = animation.value;
	                var time = animation.time;
                	var delay = data.delay ? config.delay[data.delay] : 0;

                	if(
                		currentY < time[1] + delay &&
                		currentY > time[0] + delay
                	) {
                		obj[data.id][animation.prope] = value[0];
                	}else if(
                		currentY < time[time.length - 1] + delay &&
                		currentY > time[time.length - 2] + delay
                	) {
                		obj[data.id][animation.prope] = value[value.length - 1];
                	}
                	for (var k = 0; k < value.length - 1; k ++) {
                		if(
                			currentY < time[k + 2] + delay && 
                			currentY > time[k + 1] +delay
                		) {
                			obj[data.id][animation.prope] = 
                			tweenFunc(
                				value[k], 
                				value[k + 1], 
                				time[k + 1] + delay, 
                				time[k + 2] + delay, 
                				currentY
                			);
                		}
                    }
            }
        }

        if(config.frameDatas && config.frameDatas.length > 0) {
            for(var z = 0;z < config.frameDatas.length;z ++) {
                var frameData = config.frameDatas[z];
                currentFrame = getCurrentFrame(scrollTop);
                nextFrame = getNextFrame(scrollTop);
            }
        }

        /* 当逐帧动画图片资源及容器存在时，对逐帧动画进行初始化 */
        if(
            nextFrame &&
            nextFrame.frameContainer &&
            nextFrame.frameImgs &&
            nextFrame.frameImgs.length > 0
        ) {
            frameEvents.initFrame();
        }

        if(// 逐帧动画各个条件都存在时
            currentFrame &&
        	currentFrame.frameStart &&
        	currentFrame.frameEnd &&
        	currentFrame.frameVanish &&
        	currentFrame.frameContainer &&
        	currentFrame.frameImgs
        ) {
        	if( currentY < currentFrame.frameStart ) {//滚动位置在触发开始点之前，逐帧动画容器隐藏
                obj[currentFrame.moved] = false;
        		obj[currentFrame.frameContainer].alpha = 0;
        	}else if( currentY < currentFrame.frameEnd ) {//滚动位置在触发开始点和结束点之间，逐帧动画容器显示，并触发逐帧动画
        		obj[currentFrame.frameContainer].alpha = 1;
        		frameEvents.start();
        	}else if( currentY > currentFrame.frameVanish ) {//滚动位置在逐帧动画消失点之后，逐帧动画容器隐藏
        		obj[currentFrame.frameContainer].alpha = 0;
        	}else {//滚动位置在触发结束点和逐帧动画消失点之间，逐帧动画容器显示（显示为逐帧动画最后一张图片）
        		obj[currentFrame.frameContainer].alpha = 1;
        	}
        }
    }

    var scroller = new Scroller(fallback,{//实例化scroller
        zooming: false,
        animating: true,
        bouncing: false,
        animationDuration: 1000
    });

    /* 设置滚动尺寸 */
    scroller.setDimensions(
    	config.clientWidth, 
    	config.clientHeight, 
    	config.contentWidth, 
    	config.contentHeight
    );
    
    /* touch事件 */
    var touched;

    var touchstart = function(evt) {
        var event = evt;
        event.stopPropagation();
        event.preventDefault();
        touched = true;
        scroller.doTouchStart(event.touches, event.timeStamp);
    }

    var touchmove = function(evt) {
        if (touched) {
            var event = evt;
            event.stopPropagation();
            event.preventDefault();
            scroller.doTouchMove(event.touches, event.timeStamp, event.scale);
        }
    }

    var touchend = function(evt) {
        var event = evt;
        scroller.doTouchEnd(event.timeStamp);
        touched = false;
    }

    $("canvas")
    	.on("touchstart", touchstart)
    	.on("touchmove", touchmove)
    	.on("touchend", touchend);
})();