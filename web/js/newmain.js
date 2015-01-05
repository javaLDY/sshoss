Ext.define("newmain",{
    extend : "Ext.container.Viewport",
    require:[
        'Ext.chart.*',
        'Ext.layout.container.Fit',
        'Ext.grid.Panel'
    ],
    main : function(){
        var tabs = Ext.getCmp("center");
        tabs.setActiveTab(Ext.getCmp("center1"));
    },
    orderinfo : function(){
//        Ext.Ajax.request({
//           url : "/buttonselect",
//           success : function(response){
//               var buttondata = Ext.JSON.decode(response.responseText);
//               if(buttondata.buttonlist.length<0){
//                   Ext.getCmp("button2").setDisabled(true);
//               }
//           }
//        });
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
    merchaninfo : function(){
        // Ext.getCmp('newmainwest').getLayout().getLayoutItems()[0].expand();
//        Ext.Ajax.request({
//            url : "/buttonselect",
//            success : function(response){
//                var buttondata = Ext.JSON.decode(response.responseText);
//                if(buttondata.success!=true){
//                    Ext.getCmp("button4").setDisabled(true);
//                }
//            }
//        });
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
    chuku : function(){
        // Ext.getCmp('newmainwest').getLayout().getLayoutItems()[2].expand();
//        Ext.Ajax.request({
//            url : "/buttonselect",
//            success : function(response){
//                var buttondata = Ext.JSON.decode(response.responseText);
//                if(buttondata.success!=true){
//                    Ext.getCmp("button3").setDisabled(true);
//                }
//            }
//        });
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
    oper : function(){
        //Ext.getCmp("newmainwest").getLayout().getLayoutItems()[3].expand();
//        Ext.Ajax.request({
//            url : "/buttonselect",
//            success : function(response){
//                var buttondata = Ext.JSON.decode(response.responseText);
//                if(buttondata.success!=true){
//                    Ext.getCmp("button0").setDisabled(true);
//                }
//            }
//        });
        Ext.require("js.operinfo",function(){
            var tabs = Ext.getCmp("center");
            var tag = Ext.getCmp("operinfo");
            if(!tag){
                var obj = Ext.create("js.operinfo");
                tabs.add(obj);
                tabs.setActiveTab(obj)
            }else{
                if(tabs.setActiveTab()!=tag){
                    tabs.setActiveTab(tag)
                }
            }
        },this);
    },
    jsonData : {},
    initComponent : function(){
        var me = this;
        var opername = document.getElementById("aa").value;
        Ext.Ajax.request({
            url : "/mainquanxianselect",
            async : false,
            success : function(response){
                me.jsonData=response.responseText;
                if(typeof(me.jsonData)==="string"){
                    me.jsonData = Ext.JSON.decode(response.responseText);
                }
            }
        });
        var treestore = Ext.create("Ext.data.TreeStore",{
            fields : [
                {name : "text",type : "String",mapping : "menu.text"}
            ],
            root: {
                expanded: true,
                text: opername,
                id: '-1',
                children: me.jsonData.treenode.children
            }
        });
        var rolename = document.getElementById("bb").value;
        var currenttime = new Date();
        var realtime = Ext.Date.format(currenttime,"Y-m-d");
        this.createMenuList();
        Ext.apply(this,{
            layout : "border",
            items : [{
                region : "north",
                items : [{
                    xtype : "panel",
                    id:"aaaa",
                    bodyStyle :{
                        background: "url(images/ldyy.jpg) no-repeat center top "
                    },
                    html :
                        "<div style='float:right;width: 200px; height: 98px; background:url(images/newzhishi.png) no-repeat right;'>" +
                        "<div class='xingming' style='height: 15px; line-height: 15px; margin-top: 33px; margin-left: 105px;color: orangered'>欢迎:"+opername+"</div>" +
                        "<div class='shijian' style='height: 20px; line-height: 30px; margin-left: 105px;color: orangered'>"+rolename+"</div>"+
                        "<div class='juese' style='height: 20px; line-height: 35px; margin-left: 105px;color: orangered'>"+realtime+"</div>"+
                        "</div>"+
                        "<div>",
//                        "<iframe allowtransparency='true' frameborder='0' width='290' height='96' scrolling='no' src='http://tianqi.2345.com/plugin/widget/index.htm?s=1&z=2&t=0&v=0&d=2&bd=0&k=000000&f=&q=1&e=1&a=1&c=70184&w=290&h=96&align=left'></iframe>"+
//                        "</div>",
                    items : [{

                    }]
                }]
            },{
                region : "west",
                id:'newmainwest',
                width : 200,
                collapsible : true,
                split : true,
                header : {
                    title : "菜单栏",
                    titleAlign : "center",
                    style : {
                        background : "#89CA49"
                    },
                    border :false
                },

                layout: {
                    type: 'accordion',
                    animate: true,
                    activeOnTop: true
                },
                items : me.menuList
            },{
                region : "center",
                xtype : "panel",
                width : 1854,
                id : "center12",
                layout : "border",
                items : [{
                    xtype : "panel",
                    region : "north",
                    autoScroll : true,
                    width : 1854,
                    defaults : {
                        margin : "20 40 5 40"
                    },
                    bodyStyle :{
                        backgroundImage : "url(images/muban1.jpg)!important"
                    },
                    layout : "table",
                    columns : 10,
                    items : [{
                        xtype: 'button',
                        text: '首页',
                        scale: 'large',
                        id : "shouyeid",
                        flex : 1,
                        margin : "20 60 5 71",
                        iconAlign: 'top',
                        iconCls:'button1',
                        width : 62,
                        handler : me.main
                    },{
                        xtype: 'button',
                        text: '入库管理',
                        scale: 'large',
                        iconAlign: 'top',
                        flex : 1,
                        iconCls:'button2',
                        id : "button2",
                        name : "js.orderinfo",
                        handler : me.orderinfo
                    },{
                        xtype: 'button',
                        text: '出库管理',
                        scale: 'large',
                        iconAlign: 'top',
                        id : "button3",
                        flex : 1,
                        iconCls:'button3',
                        handler : me.chuku
                    },{
                        xtype: 'button',
                        text: '宝贝管理',
                        scale: 'large',
                        iconAlign: 'top',
                        iconCls:'button4',
                        flex : 1,
                        id : "button4",
                        handler : me.merchaninfo
                    },{
                        xtype: 'button',
                        text: '包裹跟踪',
                        scale: 'large',
                        iconAlign: 'top',
                        iconCls:'button5',
                        flex : 1,
                        id : "button5"
                    },{
                        xtype: 'button',
                        flex : 1,
                        text: '客户管理',
                        scale: 'large',
                        iconAlign: 'top',
                        iconCls:'button6',
                        id : "button6"
                    },{
                        xtype: 'button',
                        text: '运费管理',
                        scale: 'large',
                        flex : 1,
                        iconAlign: 'top',
                        iconCls:'button7',
                        id : "button7"
                    },{
                        xtype: 'button',
                        text: '发货管理',
                        flex : 1,
                        scale: 'large',
                        iconAlign: 'top',
                        iconCls:'button8',
                        id : "button8"
                    },{
                        xtype: 'button',
                        text: '短信处理',
                        scale: 'large',
                        flex : 1,
                        iconAlign: 'top',
                        iconCls:'button9',
                        id : "button9"
                    },{
                        xtype: 'button',
                        text: '基础设置',
                        scale: 'large',
                        iconAlign: 'top',
                        flex : 1,
                        iconCls:'button0',
                        handler : me.oper,
                        id : "button0"
                    }]
                },{
                    xtype: "tabpanel",
                    id : "center",
                    border : false,
                    region : "center",
                    defaults :{
                        bodyStyle: {
                            background: "url(images/shouyeb.jpg) no-repeat"
                        }
                    },
                    items : [{
                        id : "center1"
                    }]
                }]
            },{
                region : "east",
                xtype : "panel",
                id : "east",
                collapsible : true,
                bodyStyle :{
                    backgroundImage : "url(images/muban1.jpg)!important"
                },
                split : true,
                width : 200,
                border : false,
                header : {
                    title : "权限展示",
                    titleAlign : "center",
                    style : {
                        background : "#89CA49"
                    },
                    border :false
                },
                defaults : {
                    bodyStyle :{
                        backgroundImage : "url(images/muban1.jpg)!important"
                    }
                },
                items : [{
                    xtype : "treepanel",
                    id : "treeid",
                    collapsible: false,
                    border : false,
                    autoScroll:true,
                    store: treestore
                }],
                dockedItems : [{
                   xtype : "toolbar",
                   dcok : "top",
                   displayInfo : true,
                    style :{
                        background: "#89CA49"
                    },
                   items : ["->",{
                       text : "控制菜单",
                       style : {
                           borderColor : "#89CA49"
                       },
                       icon : "images/kongzhi.png",
                       displayInfo : true,
                       menu : [{
                           text : "注销",
                           style : {
                               borderColor : "#89CA49"
                           },
                           icon : "images/zhuxiao.png",
                           handler : function(){
                               window.location="/zhuxiaopanduan"
                           }
                       },{
                           text : "查看出库统计图",
                           style : {
                               borderColor : "#89CA49"
                           },
                           icon : "images/tongjitu.png",
                           handler : me.chukutongjitu
                       },{
                           text : "查看入库统计图",
                           style : {
                               borderColor : "#89CA49"
                           },
                           icon : "images/tongjitu.png",
                           handler : me.rukutongjitu
                       }]
                   }]
                }]
            },{
                region : "south",
                xtype : "panel",
                border : false,
                height : 50,
                bodyStyle :{
                    backgroundImage : "url(images/muban1.jpg)!important"
                },
                items : [{
                    html :
                        "<table style= 'border=none;height:50px;width:2132px;margin: 0 0 4px 0;background-image:url(images/muban1.jpg)!important'>"+
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
        Ext.getCmp("treeid").expandAll();

        window.setTimeout(function(){
            Ext.getCmp('center').getTabBar().hide();
        },300);
    },
    menuList: new Array(),
    createMenuList: function () {
        var tpl, me = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01">',
            '<img src="{src}">',
            '<div class="con">',
            '<span style="margin-top: 10px;border-color:#83cbff">{text}</span>',
            '</div>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url: '/menulistselect',
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string'){
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }
        });
        for (var i = 0, len = me.jsonData.menulist.children.length; i < len; i++) {
            var storeID = 'store_' + i, item, title = me.jsonData.menulist.children[i].menu.text;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: me.jsonData.menulist.children[i].children,
                fields: [
                    { name: 'src', type: 'string',mapping : "menu.src"},
                    { name: 'text', type: 'string',mapping : "menu.text"},
                    { name: 'tag', type: 'string',mapping : "menu.tag"},
                    { name: 'module', type: 'string',mapping : "menu.moudle" }
                ]
            });
            // }
            item = {
                xtype: 'panel',
                header : {
                    title: title,
                    titleAlign : "center",
                    height : 35,
                    style : {
                        background : "#89CA49"
                    }
                },
                layout: 'fit',
                bodyStyle :{
                    backgroundImage : "url(images/muban1.jpg)!important"
                    //background : "#D49551"
                },
                items: [{
                    xtype: 'dataview',
                    store: Ext.data.StoreManager.lookup(storeID),
                    tpl: tpl,
                    itemSelector: 'div.part01',
                    listeners: {
                        itemclick: function (view, record) {
                            Ext.require(record.get("module"), function () {
                                var center = Ext.getCmp("center");
                                var tag = center.items.get(record.get("tag"));
                                if (!tag) {
                                    var obj = Ext.create(record.get("module"));
                                    center.add(obj);
                                    center.setActiveTab(obj);
                                } else {
                                    if (center.setActiveTab() !== tag) {
                                        center.setActiveTab(tag);

                                    }
                                }
                            }, this);
                        }
                    }
                }]
            };

            me.menuList.push(item);
        }
    },
    rukutongjitu : function(){
        var pieStore = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/dayinstocknumselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listvalue"
                }
            },
            fields : [
                "detail",
                "MerchandiseName",
                "InTime"
            ],
            autoLoad : true
        });

        var pieChart = Ext.create('Ext.chart.Chart', {
            width: 100,
            height: 100,
            animate: false,
            store: pieStore,
            shadow: false,
            insetPadding: 0,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'detail',
                showInLegend: false,
                label: {
                    field: 'MerchandiseName',
                    display: 'rotate',
                    contrast: true,
                    font: '9px Arial'
                }
            }]
        });

        var gridStore = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/dayinstocknumselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listvalue"
                }
            },
            fields : [
                "detail",
                "MerchandiseName",
                "InTime"
            ],
            autoLoad : true
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            height: 130,
            width: 480,
            columns: [
                {
                    text   : 'name',
                    dataIndex: 'MerchandiseName'
                },
                {
                    text   : 'data',
                    dataIndex: 'detail'
                }
            ]
        });

        var store1 = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/dayinstocknumselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listvalue"
                }
            },
            fields : [
                "detail",
                "MerchandiseName",
                "InTime"
            ],
            autoLoad : true
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['detail'],
                title: false,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['InTime'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'InTime',
                yField: ['detail'],
                tips: {
                    trackMouse: true,
                    width: 580,
                    height: 170,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [pieChart, grid]
                    }
                }
            }]
        });
        Ext.create("Ext.window.Window",{
            title : "入库统计",
            titleAlign : "center",
            layout : "fit",
            items : [{
                    width: 800,
                    height: 400,
                    title: 'Line Chart',
                    layout: 'fit',
                    items: chart
            }]
        }).show().center();
    },
    chukutongjitu : function(){
        var pieStore = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/maxchukupriceselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "newlist"
                }
            },
            fields : [
                "datail",
                "MerchandiseName",
                "OutTime"
            ],
            autoLoad : true
        });

        var pieChart = Ext.create('Ext.chart.Chart', {
            width: 100,
            height: 100,
            animate: false,
            store: pieStore,
            shadow: false,
            insetPadding: 0,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'datail',
                showInLegend: false,
                label: {
                    field: 'MerchandiseName',
                    display: 'rotate',
                    contrast: true,
                    font: '9px Arial'
                }
            }]
        });

        var gridStore = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/maxchukupriceselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "newlist"
                }
            },
            fields : [
                "datail",
                "MerchandiseName",
                "OutTime"
            ],
            autoLoad : true
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            height: 130,
            width: 480,
            columns: [
                {
                    text   : '商品名称',
                    dataIndex: 'MerchandiseName'
                },
                {
                    text   : '总价',
                    dataIndex: 'datail'
                }
            ]
        });

        var store1 = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/maxchukupriceselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "newlist"
                }
            },
            fields : [
                "datail",
                "MerchandiseName",
                "OutTime"
            ],
            autoLoad : true
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['datail'],
                title: false,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['OutTime'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'OutTime',
                yField: ['datail'],
                tips: {
                    trackMouse: true,
                    width: 580,
                    height: 170,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [pieChart, grid]
                    }
                }
            }]
        });
        Ext.create("Ext.window.Window",{
            title : "出库统计",
            titleAlign : "center",
            layout : "fit",
            items : [{
                width: 800,
                height: 400,
                title: 'Line Chart',
                layout: 'fit',
                items: chart
            }]
        }).show().center();
    }
});