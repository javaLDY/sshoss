Ext.define("index",{
   extend : "Ext.container.Viewport",
    //入库整体操作处
   orderinfo : function(){
       Ext.require("js.orderinfo", function () {
           var tabs = Ext.getCmp("center");
           var tag = tabs.items.get("orderinfo");
           if(!tag){
               var obj = Ext.create("js.orderinfo");
               tabs.add(obj);
               tabs.setActiveTab(obj);
           }else{
               if(tabs.setActiveTab()!==tag){
                   tabs.setActiveTab(tag)
               }
           }
       },this);
    },
    //出库信息整体操作处
    chuku : function(){
      Ext.require("js.chuku",function(){
        var tabs = Ext.getCmp("center");
        var tag = Ext.getCmp("chuku");
        if(!tag){
            var obj = Ext.create("js.chuku");
            tabs.add(obj);
            tabs.setActiveTab(obj)
        }else{
            if(tabs.setActiveTab()!=tag){
                tabs.setActiveTab(tag)
            }
        }
      },this);
    },
    //商品信息整体操作处
    merchaninfo : function(){
        Ext.require("js.merchaninfo", function () {
            var tabs = Ext.getCmp("center");
            var tag = tabs.items.get("merchaninfo");
            if(!tag){
                var obj = Ext.create("js.merchaninfo");
                tabs.add(obj);
                tabs.setActiveTab(obj);
            }else{
                if(tabs.setActiveTab()!==tag){
                    tabs.setActiveTab(tag)
                }
            }
        },this);
    },
    main : function(){
        var tabs = Ext.getCmp("center");
        tabs.setActiveTab(Ext.getCmp("center1"));
    },
   initComponent : function(){
       var me = this;
       var opername = document.getElementById("aa").value;
       Ext.apply(this,{
           border : false,
           id : "show",
           layout : {
               xtype : "vbox"
           },
           items : [{
               xtype : "panel",
               layout:{
                   type:'table',
                   columns: 11
               },
               border: false,
               height : 84,
               items : [{
                   border: false,
                   width : 500
                   //html : "<div style='height : 82px;background: url(images/logo.jpg) no-repeat;'>&nbsp;</div>"
               },{
                   xtype: 'button',
                   text: '首页',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button1',
                   handler : me.main
               },{
                   xtype: 'button',
                   text: '入库管理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button2',
                   name : "js.orderinfo",
                   handler : me.orderinfo
               },{
                   xtype: 'button',
                   text: '出库管理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button3',
                   handler : me.chuku
               },{
                   xtype: 'button',
                   text: '宝贝管理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button4',
                   handler : me.merchaninfo
               },{
                   xtype: 'button',
                   text: '包裹跟踪',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button5'
               },{
                   xtype: 'button',
                   text: '客户管理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button6'
               },{
                   xtype: 'button',
                   text: '运费管理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button7'
               },{
                   xtype: 'button',
                   text: '发货管理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button8'
               },{
                   xtype: 'button',
                   text: '短信处理',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button9'
               },{
                   xtype: 'button',
                   text: '基础设置',
                   scale: 'large',
                   iconAlign: 'top',
                   iconCls:'button0'
               }]
           },{
               xtype : "tabpanel",
               width : 1920,
               id : "center",
               scope   : this,
               items : [{
                   xtype : "panel",
                   id : "center1",
                   layout : {
                       type : "table",
                       columns: 2
                   },
                   defaults : {
                       width : 1100,
                       height : 590,
                       padding : "10 10 10 30",
                       titleAlign : "center"
                   },
                   items : [{
                       header : {
                           title : "待办事项",
                           titleAlign : "center"
                       },
                       html :
                           "<div style='margin-left: 100px;' class='box4'>" +
                           "<h2 class='title'>交易处理</h2>" +
                           "<ul class='list' style='font-size: 20px;'>" +
                           "<li>在线支付快递(0)&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='去选快递' /></li>" +
                           "<li>货到付款快递(0)&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='去选快递'/></li>" +
                           "</ul>" +
                           "</div>"+
                           "<div style='margin-left: 100px;'class='box4'>" +
                           "<h2 class='title'>打印管理</h2>" +
                           "<ul class='list' style='font-size: 20px;'>" +
                           "<li>在线支付订单打印(0)&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='去打印' /></li>" +
                           "<li>货到付款订单打印(0)&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='去打印' /></li>" +
                           "<li>装箱打印(0)&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='去打印' style='margin-left: 49px;'/></li>"+
                           "</ul>" +
                           "</div>",
                       width : 950
                   },{
                       header : {
                           title : "客户服务",
                           titleAlign : "center"

                       },
                       width :950,
                       html :
                           "<div style='margin: 50px 0 0 180px;'>" +
                           "<ul class='list1'>" +
                           "<li>客服时间:周一到周五，早7:00至晚7:00</li>" +
                           "<li>QQ客服:<img src='images/qq.png'/>1039236687</li>" +
                           "<li>咨询电话:<img src='images/phone.png'/>0315-5581897</li>" +
                           "</ul>" +
                           "</div>"
                   },{
                       header : {
                           title : "新手指导",
                           titleAlign : "center"

                       },
                       width : 1900,
                       height : 240,
                       html :
                           "<div class='box'>"+
                           "<div class='box1'>"+
                           "<img class='img' src='images/tdjp.png'/>"+
                           "<div style='clear:both' ></div>"+
                           "<p>添加店铺</p>"+
                           "</div>"+
                           "<div class='box2'>"+
                           "<img class='img1' src='images/zhixiang.png'/>"+
                           "</div>"+
                           "<div class='box1'>"+
                           "<img class='img' src='images/wdqd.png'/>"+
                           "<div style='clear:both'></div>"+
                           "<p>设置我的快递</p>"+
                           "</div>"+
                           "<div class='box2'>"+
                           "<img class='img1' src='images/zhixiang.png'/>"+
                           "</div>"+
                           "<div class='box1'>"+
                           "<img class='img' src='images/dyxx.png'/>"+
                           "<div style='clear:both'></div>"+
                           "<p>设置打印版</p>"+
                           "</div>"+
                           "<div class='box2'>"+
                           "<img class='img1' src='images/zhixiang.png'/>"+
                           "</div>"+
                           "<div class='box1'>"+
                           "<img class='img' src='images/dxcl.png'/>"+
                           "<div style='clear:both'></div>"+
                           "<p>短信发动设置</p>"+
                           "</div>"+
                           "</div>",
                       colspan:2
                   }]
               }]

           },{
               xtype : "panel",
               width : 1920,
               items : [{
                   html :
                       "<table style= 'border=1px;height=22px;width:1336px;margin: 0 0 4px 0'>"+
                       "<tr>"+
                       "<td valign='middle'>"+
                       "<marquee id='marqueea' direction=left scrollamount=3  onmouseover='this.stop()' onmouseout='this.start()'><img src='images/kehu.png' style='width: 20px;float: left'/><div style='float: left;margin:2px 0 0 0;font-weight:bold;text-shadow:1px 0 0 #8B4513, 0 1px 0 #8B4513,0 -1px 0 #8B4513, -1px 0 0 #8B4513,1px 0 1px #8B4513, 0 1px 1px #8B4513,0 -1px 1px #8B4513, -1px 0 1px #8B4513; '>欢迎<span style='color: mediumvioletred'>"+opername+"</span>，今天是双十一<span style='color: mediumvioletred'>"+opername+"</span>一定要监控好物流订单哦！要不然会赔钱的哦!</div></MARQUEE>"+
                       "</td>"+
                       "</tr>"+
                       "</table>"
               }]
           }]
      });
       this.callParent();

       window.setTimeout(function(){
           Ext.getCmp('center').getTabBar().hide();
       },300);
   }
});