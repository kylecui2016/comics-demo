var config = {
	clientWidth: 750,//可视宽度
	clientHeight: 1334,//可视高度
	contentWidth: 750,//内容宽度
	contentHeight: 8500+1334,//内容高度，6500为scrollTop的值，内容高度应在6500基础上+屏幕高度
	delay: {//对应容器的绝对Y坐标
		p0: 0,
        p1: 3200
	},
    frameDatas: [{//逐帧动画数组
        moving: false,//防止逐帧动画多次触发，初始值设置为false
        moved: false,//防止逐帧动画多次触发，初始值设置为false
        frameStart: 3700,//逐帧动画触发开始的Y坐标
        frameEnd: 3800,//逐帧动画触发结束的Y坐标
        frameVanish: 4000,//逐帧动画所在容器消失的Y坐标
        frameContainer: "p1",//逐帧动画所在的容器
        frameImgs: [//逐帧动画的图片资源
            "./images/frame_0.png",
            "./images/frame_1.png",
            "./images/frame_2.png",
            "./images/frame_3.png",
            "./images/frame_4.png",
            "./images/frame_5.png"
        ]
    },{
        moving: false,
        moved: false,
        frameStart: 6500,//逐帧动画触发开始的Y坐标
        frameEnd: 6600,//逐帧动画触发结束的Y坐标
        frameVanish: 7100,//逐帧动画所在容器消失的Y坐标
        frameContainer: "p1",//逐帧动画所在的容器
        frameImgs: [//逐帧动画的图片资源
            "./images/frame_0.png",
            "./images/frame_1.png",
            "./images/frame_2.png",
            "./images/frame_3.png",
            "./images/frame_4.png",
            "./images/frame_5.png"
        ]
    },{
        moving: false,
        moved: false,
        frameStart: 7600,//逐帧动画触发开始的Y坐标
        frameEnd: 7700,//逐帧动画触发结束的Y坐标
        frameVanish: 8000,//逐帧动画所在容器消失的Y坐标
        frameContainer: "p1",//逐帧动画所在的容器
        frameImgs: [//逐帧动画的图片资源
            "./images/frame_0.png",
            "./images/frame_1.png",
            "./images/frame_2.png",
            "./images/frame_3.png",
            "./images/frame_4.png",
            "./images/frame_5.png"
        ]
    }],
	datas: [{//容器、位图、几何图像等具体的配置数据
        id: "p0",
        type: "Container",
        propes: {},
        delay: "p0",
        animations: [{
            prope: "alpha",
            time: [0, 3300, 3700, 3800],
            value: [1, 1, 0]
        }, {
            prope: "alpha",
            time: [3800, 3850, 3890, 6000],
            value: [1, 1, 1]
        }]
    }, {
        id: "p0_bg",
        type: "Graphics",
        parent: "p0",
        delay: "p0",
        propes: {},
        draw: function() {
            this.lineStyle(1, "rgba(0,0,0,1)").beginFill("rgba(0,0,0,1)").drawRect(0, 0, 750, 1334).endFill()
        },
        animations: []
    },{
        id: "rect",//元素id
        type: "Graphics",//生成元素的类型
        parent: "p0",//元素的父容器
        delay: "p0",//容器的绝对Y坐标
        propes: {//生成元素属性
            x: 0,
            y: 0,
            scaleX: 3,
            scaleY: 3,
            alpha: 0
        },
        draw: function() {//正方形
            this.lineStyle(1, "rgba(255,0,0,1)").beginFill("rgba(255,0,0,1)").drawRect(0, 0, 100, 100).endFill()
        },
        animations: [{//元素动画
        	prope: "alpha",//是否可见
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,1]
        },{
        	prope: "x",//x坐标值
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,350]
        },{
        	prope: "y",//y坐标值
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,600]
        },{
        	prope: "rotation",//元素旋转角度
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,90]
        },{
        	prope: "scaleX",//元素在x轴的缩放值
        	time: [2e3, 2400, 3e3, 3600],
        	value: [3,1]
        },{
        	prope: "scaleY",//元素在y轴的缩放值
        	time: [2e3, 2400, 3e3, 3600],
        	value: [3,1]
        }, {
        	prope: "x",
        	time: [4900, 5000, 5500],
        	value: [250, 298]
        }, {
        	prope: "y",
        	time: [4900, 5000, 5500],
        	value: [600, 300]
        }, {
        	prope: "alpha",
        	time: [4900, 5000, 5500, 6200],
        	value: [1, 1, 0]
        }, {
        	prope: "rotation",
        	time: [4900, 5000, 5500],
        	value: [0, 90, 0]
        }, {
        	prope: "scaleX",
        	time: [4900, 5000, 5500],
        	value: [1, 3]
        }, {
        	prope: "scaleY",
        	time: [4900, 5000, 5500],
        	value: [1, 3]
        }]
    }, {
        id: "triangle",
        type: "Graphics",
        parent: "p0",
        delay: "p0",
        propes: {
            x: 750,
            y: 0,
            scaleX: 3,
            scaleY: 3,
            alpha: 0
        },
        drawSVGPath: function (path,beginfill) {//根据svg的值画对应的svg图像，如三角形等
        	this.drawSVGPath(path).beginFill(beginfill).endFill();
        },
        svg: {
        	path: 'M200 0 L150 100 L250 100 Z',
        	beginfill: '#0ff'
        },
        animations: [{
        	prope: "alpha",
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,1]
        },{
        	prope: "x",
        	time: [2e3, 2400, 3e3, 3600],
        	value: [550,255]
        },{
        	prope: "y",
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,500]
        },{
        	prope: "rotation",
        	time: [2e3, 2400, 3e3, 3600],
        	value: [0,10,24]
        },{
        	prope: "scaleX",
        	time: [2e3, 2400, 3e3, 3600],
        	value: [3,1]
        },{
        	prope: "scaleY",
        	time: [2e3, 2400, 3e3, 3600],
        	value: [3,1]
        }, {
        	prope: "x",
        	time: [4900, 5000, 5500],
        	value: [258, 50]
        }, {
        	prope: "y",
        	time: [4900, 5000, 5500],
        	value: [500, 600]
        }, {
        	prope: "alpha",
        	time: [4900, 5000, 5500, 6200],
        	value: [1, 1, 0]
        }, {
        	prope: "rotation",
        	time: [4900, 5000, 5500],
        	value: [24, 0]
        }, {
        	prope: "scaleX",
        	time: [4900, 5000, 5500],
        	value: [1, 3]
        }, {
        	prope: "scaleY",
        	time: [4900, 5000, 5500],
        	value: [1, 3]
        }]
    }, {
        id: "p1",
        type: "Container",
        propes: {
        	width: 750,
        	height: 1334,
        	alpha: 0
        },
        delay: "p1",
        animations: []
    }, {
        id: "p1_bg",
        type: "Graphics",
        parent: "p1",
        delay: "p1",
        propes: {},
        draw: function() {
            this.lineStyle(1, "rgba(0,0,0,1)").beginFill("rgba(0,0,0,1)").drawRect(0, 0, 750, 1334).endFill()
        },
        animations: []
    }]
}