Ext.define("js.chuku",{
    extend : "Ext.panel.Panel",
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    //操作员的conbox
    opercode : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/operinfoselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "operlist"
            }
        },
        fields : [
            "operId","operName"
        ],
        autoLoad : true
    }),
//商品编码的combox
    productcode : Ext.create("Ext.data.Store",{
    proxy : {
        url : "/promerchaninfoselect",
        type : "ajax",
        reader : {
            type : "json",
            root : "listman"
        }
    },
    fields : [
        "merchandiseId","merchandiseName"
    ],
    autoLoad : true
}),
//出库方式的combox
    chukufashicombox : Ext.create("Ext.data.Store",{
    fields : [
        "abbr","name"
    ],
    data : [
        {"abbr":1,"name":"正常出库"},
        {"abbr":2,"name":"盘亏"},
        {"abbr":3,"name":"报损"}
    ]
}),
    initComponent : function(){
        var me = this;
        var curent = new Date();
        var curtime = Ext.Date.format(curent,"Y-m-d");
        //操作员combox

        //gird可编辑管理判断
        var cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners : {
                edit : function(editor,context){
                    var myStore = Ext.data.StoreManager.lookup('myStore');
                    if(context.field==="inStocknamedisplay"){
                        context.record.data.inStockhiddenid = me.myCode;
                        context.record.data.inStocknamedisplay = me.myName;
                        myStore.remove(context.record);
                        myStore.insert(context.rowIdx,context.record);
                        var menudata={};
                        Ext.Ajax.request({
                            url : "/singleinstockinfo?arry="+me.myCode,
                            async : false,
                            success : function(response){
                                menudata = Ext.JSON.decode(response.responseText);
                            }
                        });
                       me.iddata=0;
                        for(var i = 0;i<menudata.stockInfoList.length;i++){
                            context.record.data.stockPrice = menudata.stockInfoList[i].avgPrice;
                            context.record.data.num = menudata.stockInfoList[i].num;
                            me.maxnum = context.record.data.num;
                            myStore.remove(context.record);
                            myStore.insert(context.rowIdx,context.record);
                        }

                    }
                    if(context.field==="num"){
                        if(context.record.data.price){
                            context.record.data.totalmoney = context.record.data.price*context.value;
                            myStore.remove(context.record);
                            myStore.insert(context.rowIdx,context.record);
                        }
                    }
                    if(context.field === "price"){
                        if(context.record.data.num){
                            context.record.data.totalmoney = context.record.data.num * context.value;
                            myStore.remove(context.record);
                            myStore.insert(context.rowIdx,context.record);
                        }
                    }

                    if((context.record.data.num)&&(context.record.data.price)&&(context.record.data.totalmoney)&&(context.record.data.stockPrice)&&(context.record.data.inStockhiddenid)){
                        myStore.add({})
                    }
                    me.totalmoney=0;
                    for(var i=0;i<myStore.data.items.length;i++){
                       if((!isNaN(myStore.data.items[i].data.totalmoney)&&(myStore.data.items[i].data.totalmoney!=""))){
                           me.totalmoney += myStore.data.items[i].data.totalmoney
                       }

                    }
                    Ext.getCmp("inittotalmoney").setValue(me.totalmoney);
                }
            }
        });
        //插入grid的store数据
        var gridstore = Ext.create("Ext.data.ArrayStore",{
            id : "myStore",
            fields : [
                "num","price","stockPrice","merchandiseId","totalmoney","inStockhiddenid","inStocknamedisplay"
            ],
            data : [
                {}
            ]
        });
        //查询出库信息的store数据
        var chukuoutstore = Ext.create("Ext.data.Store",{
            proxy : {
                url : "/chukuoutstockselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "outstocklist",
                    totalProperty:"rows"
                }
            },
            fields : [
                "outBillCode","outTime","handler","outType","totalMoney","remark","TAuOperInfoByOperId.operId"
            ],
            autoLoad : true
        });
        //查询出库明细的store的数据
        var chukuoutstoredetails = Ext.create("Ext.data.Store",{
            proxy : {
                url : "/chukuoutstockdetailselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "outstockdetailslist",
                    totalProperty:"rows"
                }
            },
            fields : [
                "id","num","stockPrice","price","TMeOutStockInfoByOutBillCode.outBillCode","TMeMerchandiseInfoByMerchandiseId.merchandiseId"
            ],
            autoLoad : false
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        var checkBox1 = Ext.create("Ext.selection.CheckboxModel");
        Ext.apply(this,{
            id : "chuku",
            items : [{
                xtype : "tabpanel",
                layout : "border",
                height : 740,
                items : [{
                    xtype : "panel",
                    title : "出库信息录入",
                    items : [{//出库信息表录入
                        xtype : "form",
                        region : "north",
                        header : {
                            title : "出库信息录入",
                            titleAlign : "center",
                            style : {
                                background : "#E0A15D"
                            },
                            height : 25,
                            border : false
                        },
                        layout : "column",
                        id : "chukuform",
                        defaults : {
                            xtype : "textfield",
                            labelWidth : 70,
                            labelAlign : "right",
                            margin : "20 20 20 80"
                        },
                        items : [{
                            fieldLabel : "操作员编码",
                            flex : 1,
                            xtype : "combo",
                            store : me.opercode,
                            editable : false,
                            queryMode : "local",
                            displayField : "operName",
                            valueField : "operId",
                            name : "outStockInfo.TAuOperInfoByOperId.operId"
                        },{
                            fieldLabel : "出库时间",
                            value : curtime,
                            flex : 1,
                            name : "outStockInfo.outTime"
                        },{
                            fieldLabel : "经手人",
                            flex : 1,
                            name : "outStockInfo.handler"
                        },{
                            fieldLabel : "出库方式",
                            flex : 1,
                            xtype : "combo",
                            store : me.chukufashicombox,
                            editable : false,
                            queryMode : "local",
                            displayField : "name",
                            valueField : "abbr",
                            name : "outStockInfo.outType"
                        },{
                            fieldLabel : "出库金额",
                            flex : 1,
                            id : "inittotalmoney",
                            value : me.totalmoney,
                            readOnly : true,
                            name : "outStockInfo.totalMoney"
                        },{
                            fieldLabel : "备注",
                            flex : 1,
                            name : "outStockInfo.remark"
                        }]
                    },{/////出库明细表录入
                        xtype : "grid",
                        region : "center",
                        header : {
                            titleAlign : "center",
                            title : "出库明细",
                            height : 25,
                            border : false
                        },
                        titleAlign : "center",
                        plugins: cellEditing,
                        id : "chukugrid",
                        store : gridstore,
                        columns : [
                            {
                                dataIndex : "inStockhiddenid",
                                hidden : true
                            },
                            {text : "商品编码",dataIndex : "inStocknamedisplay",flex : 1,align : "center",
                                editor : {
                                    fieldLabel : "商品名称",
                                    flex : 1,
                                    xtype : "combo",
                                    store : me.productcode,
                                    editable : false,
                                    queryMode : "local",
                                    displayField :  "merchandiseName",
                                    valueField : "merchandiseId",
                                    labelWidth : 70,
                                    labelAlign : "right",
                                    listeners : {
                                        select : function(combox,record){
                                            me.myCode=this.value;
                                            me.myName = record[0].data.merchandiseName;
                                        }
                                    }
                                }},
                            {text : "数量",dataIndex : "num",flex : 1,align : "center",editor : new Ext.form.field.Number({
                                maxValue : me.maxnum,
                                minValue : 1
                            })
                            },
                            {text : "单价",dataIndex : "price",flex : 1,align : "center",editor : {
                                xtype : "textfield"
                            }},
                            {text : "出库总价",dataIndex : "totalmoney",flex : 1,align : "center",editor : {
                                xtype : "textfield"
                            }},
                            {text : "出库成本价",dataIndex : "stockPrice",flex : 1,align : "center",editor : {
                                xtype : "textfield",
                                id : "ckprice",
                                value : me.iddata
                            }}
                        ],
                        dockedItems : [{
                            xtype : "pagingtoolbar",
                            store : gridstore,
                            dock : "bottom",
                            displayInfo : true,
                            style : {
                                borderColor : "#901d78"
                            }
                        }],
                        bbar : ["->",{
                            text : "提交",
                            xtype : "button",
                            style : {
                                borderColor : "#89CA49"
                            },
                            icon : "images/accept.png",
                            handler : function(){
                                var mydata = Ext.data.StoreManager.lookup("myStore").data.items;
                                var listvalue="";
                                Ext.each(mydata,function(item,index){
                                    if(!item.data.totalmoney){
                                        return ;
                                    }
                                    listvalue += "listvalue["+index+"].TMeMerchandiseInfoByMerchandiseId.merchandiseId=" + item.data.inStockhiddenid + "&listvalue["+index+"].num=" + item.data.num + "&listvalue["+index+"].price=" + item.data.price + "&listvalue["+index+"].stockPrice=" + item.data.stockPrice;
                                    if(index!=listvalue.length-1){
                                        listvalue += "&"
                                    }
                                });
                                Ext.getCmp("chukuform").submit({
                                    url : "/chukuinsert?"+listvalue,
                                    success : function(form,action){
                                        var msg = Ext.JSON.decode(action.response.responseText);
                                        Ext.Msg.show({
                                            title : "系统提示",
                                            msg : msg.message,
                                            icon : Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES
                                        });
                                        Ext.getCmp("orderstockinfoid").store.reload();
                                        Ext.getCmp("chukuform").getForm().reset();
                                    },
                                    failure : function(form,action){
                                        var msg = Ext.JSON.decode(action.response.responseText);
                                        Ext.Msg.show({
                                            title : "系统提示",
                                            msg : msg.message,
                                            icon : Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES
                                        });
                                    }
                                })
                            }
                        }]
                    }]
                },{
                    title : "出库信息展示",
                    xtype : "panel",
                    layout : "border",
                    titleAlign : "center",
                    items : [{
                        region : "north",
                        title : "出库信息展示",
                        titleAlign : "center",
                        xtype : "grid",
                        selModel : checkBox,
                        disableSelection : false,
                        id : "orderstockinfoid",
                        store : chukuoutstore,
                        columns : [
                            {text:"出库单号",dataIndex:"outBillCode",align:"center",flex:1},
                            {text:"操作员编码",dataIndex:"TAuOperInfoByOperId.operId",align:"center",flex:1},
                            {text:"出库时间",dataIndex:"outTime",align:"center",flex:1},
                            {text:"经手人",dataIndex:"handler",align:"center",flex:1},
                            {text:"出库方式",dataIndex:"outType",align:"center",flex:1},
                            {text:"出库金额",dataIndex:"totalMoney",align:"center",flex:1},
                            {text:"备注",dataIndex:"remark",align:"center",flex:1}
                        ],
                        dockedItems : [{
                            xtype : "pagingtoolbar",
                            store : chukuoutstore,
                            dock : "bottom",
                            plugins: new Ext.ux.ProgressBarPager(),
                            displayInfo : true
                        }],
                        listeners : {
                            itemcontextmenu : function(chukudan,record,item,index,e){
                                e.preventDefault();
                                e.stopEvent();
                                var menu = new Ext.menu.Menu({
                                    float : true,
                                    items : [{
                                        text : "查看明细",
                                        iconCls:'leaf',
                                        icon : "images/chakan.png",
                                        handler : function(){
                                            this.up("menu").hide();
                                            Ext.getCmp("chukumingxiid").store.reload({
                                                params : {
                                                    arry : record.data.outBillCode
                                                }
                                            })
                                        }
                                    },{
                                        text : "删除",
                                        icon : "images/shanchu.png",
                                        handler : function(){
                                            this.up("menu").hide();
                                            var listbillcode = "";
                                            var recordoutstockinfo = Ext.getCmp("orderstockinfoid").getSelectionModel().getSelection();
                                            for(var i = 0,len=recordoutstockinfo.length;i<len;i++){
                                                listbillcode += recordoutstockinfo[i].get("outBillCode");
                                                if(i != len-1){
                                                    listbillcode += ","
                                                }
                                            }
                                            Ext.Msg.show({
                                               title : "系统提示",
                                               msg : "确定删除这【"+len+"】条吗?明细也会跟着删除，确定?",
                                               icon : Ext.Msg.WARNING,
                                               buttons : Ext.Msg.YESNO,
                                               fn : function(btn){
                                                   if(btn==="yes"){
                                                       Ext.Ajax.request({
                                                           url : "/chukudoubledelete?arry="+listbillcode,
                                                           success : function(response){
                                                               var msg = Ext.JSON.decode(response.responseText);
                                                               Ext.Msg.show({
                                                                   title : "系统提示",
                                                                   msg : msg.message,
                                                                   icon : Ext.Msg.WARNING,
                                                                   buttons : Ext.Msg.YES
                                                               });
                                                               Ext.getCmp("orderstockinfoid").store.reload();
                                                               Ext.getCmp("chukumingxiid").store.reload();
                                                           },
                                                           failure : function(response){
                                                               var msg = Ext.JSON.decode(response.responseText);
                                                               Ext.Msg.show({
                                                                   title : "系统提示",
                                                                   msg : msg.message,
                                                                   icon : Ext.Msg.WARNING,
                                                                   buttons : Ext.Msg.YES
                                                               });
                                                           }
                                                       });
                                                   }
                                               }
                                            });
                                        }
                                    }]
                                }).showAt(e.getXY())
                            }
                        }
                    },{
                        region : "center",
                        title : "出库明细信息展示",
                        titleAlign : "center",
                        xtype : "grid",
                        id : "chukumingxiid",
                        selModel : checkBox1,
                        disableSelection : false,
                        store : chukuoutstoredetails,
                            columns : [
                            {text:"出库明细码",dataIndex:"id",align:"center",flex:1},
                            {text:"商品编号",dataIndex:"TMeMerchandiseInfoByMerchandiseId.merchandiseId",align:"center",flex:1},
                            {text:"出库单号",dataIndex:"TMeOutStockInfoByOutBillCode.outBillCode",align:"center",flex:1},
                            {text:"数量",dataIndex:"num",align:"center",flex:1},
                            {text:"单价",dataIndex:"price",align:"center",flex:1},
                            {text:"出库时的成本金额",dataIndex:"stockPrice",align:"center",flex:1}
                        ],
                        dockedItems : [{
                            xtype : "pagingtoolbar",
                            store : chukuoutstoredetails,
                            dock : "bottom",
                            plugins: new Ext.ux.ProgressBarPager(),
                            displayInfo : true
                        }],
                        listeners : {
                            itemcontextmenu : function(chukumingxi,record,item,index,e){
                                e.preventDefault();
                                e.stopEvent();
                                var menu = new Ext.menu.Menu({
                                    float : true,
                                    items : [{
                                        text : "修改",
                                        icon : "images/xiugai.png",
                                        handler : me.chukumingxiupdata
                                    },{
                                        text : "删除",
                                        icon : "images/shanchu.png",
                                        handler : me.chukumingxidelete
                                    }]
                                }).showAt(e.getXY())
                            }
                        }
                    }]
                }]
            }]
        });
        this.callParent()
    },
    chukumingxiupdata : function(){
        this.up("menu").hide();
        var me = this;
        var chukufashicombox = Ext.create("Ext.data.Store",{
            fields : [
                "abbr","name"
            ],
            data : [
                {"abbr":1,"name":"正常出库"},
                {"abbr":2,"name":"盘亏"},
                {"abbr":3,"name":"报损"}
            ]
        });
        var productcode = Ext.create("Ext.data.Store",{
            proxy : {
                url : "/promerchaninfoselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listman"
                }
            },
            fields : [
                "merchandiseId","merchandiseName"
            ],
            autoLoad : true
        });
        var recordoutstockinfo2 = Ext.getCmp("orderstockinfoid").getSelectionModel().getSelection()[0];
        var chukumingxirecord1 = Ext.getCmp("chukumingxiid").getSelectionModel().getSelection()[0];
        Ext.create("Ext.window.Window",{
           title : "修改操作",
           modal : true,
           id : "chukuwindowid",
           titleAlign : "center",
           width : 500,
           height : 500,
           layout : "fit",
           frame : true,
           items : [{
               xtype : "form",
               layout : "border",
               id : "updateform",
               items : [{
                   region : "west",
                   defaults : {
                       xtype : "textfield",
                       labelWidth : 65,
                       labelAlign : "right",
                       margin : "35 20 20 20"
                   },
                   flex : 1,
                   items : [{
                       fieldLabel : "出库单号",
                       value : recordoutstockinfo2.get("outBillCode"),
                       readOnly : true,
                       name : "outStockInfo.outBillCode"
                   },{
                       fieldLabel : "操作员编码",
                       editable : false,
                       value : recordoutstockinfo2.get("TAuOperInfoByOperId.operId"),
                       readOnly : true,
                       name : "outStockInfo.TAuOperInfoByOperId.operId"
                   },{
                       fieldLabel : "出库时间",
                       name : "outStockInfo.outTime",
                       readOnly : true,
                       value : recordoutstockinfo2.get("outTime")
                   },{
                       fieldLabel : "经手人",
                       value : recordoutstockinfo2.get("handler"),
                       name : "outStockInfo.handler"
                   },{
                       fieldLabel : "出库方式",
                       xtype : "combo",
                       store : chukufashicombox,
                       editable : false,
                       queryMode : "local",
                       displayField : "name",
                       valueField : "abbr",
                       value : recordoutstockinfo2.get("outType"),
                       name : "outStockInfo.outType"
                   },{
                       fieldLabel : "出库金额",
                       readOnly : true,
                       name : "outStockInfo.totalMoney",
                       value : recordoutstockinfo2.get("totalMoney"),
                       id : "chukutotalmoney"
                   },{
                       fieldLabel : "备注",
                       value : recordoutstockinfo2.get("remark"),
                       name : "outStockInfo.remark"
                   }]
               },{
                   region : "center",
                   flex : 1,
                   stripeRows : true,
                   items : [{
                       defaults : {
                           xtype : "textfield",
                           labelWidth : 65,
                           labelAlign : "right",
                           margin : "35 20 20 20"
                       },
                       flex : 1,
                       border : false,
                       items : [{
                           fieldLabel : "出库明细码",
                           readOnly : true,
                           value : chukumingxirecord1.get("id"),
                           name : "outStockDetailsInfo.id"
                       },{
                           fieldLabel : "商品编号",
                           value : chukumingxirecord1.get("TMeMerchandiseInfoByMerchandiseId.merchandiseId"),
                           xtype : "combo",
                           store : productcode,
                           editable : false,
                           queryMode : "local",
                           id : "productid",
                           displayField :  "merchandiseName",
                           valueField : "merchandiseId",
                           name : "outStockDetailsInfo.TMeMerchandiseInfoByMerchandiseId.merchandiseId",
                           listeners : {
                               blur : function(){
                                   Ext.Ajax.request({
                                      url : "/singleinstockinfo?arry="+Ext.getCmp("productid").getValue(),
                                      success : function(response){
                                          var mydata = Ext.JSON.decode(response.responseText);
                                          for(var i = 0;i<mydata.stockInfoList.length;i++){
                                              var average = Ext.getCmp("average").getValue;
                                              average= mydata.stockInfoList[i].avgPrice;
                                              Ext.getCmp("average").setValue(average);
                                          }
                                      }
                                   });
                               }
                           }
                       },{
                           fieldLabel : "出库单号",
                           readOnly : true,
                           value : chukumingxirecord1.get("TMeOutStockInfoByOutBillCode.outBillCode"),
                           name : "outStockDetailsInfo.TMeOutStockInfoByOutBillCode.outBillCode"
                       },{
                           fieldLabel : "数量",
                           id : "chukunum",
                           value : chukumingxirecord1.get("num"),
                           name : "outStockDetailsInfo.num",
                           listeners : {
                               blur : function(){
                                   var num = Ext.getCmp("chukunum").getValue();
                                   var price = Ext.getCmp("chukuprice").getValue();
                                   var totalmoney = recordoutstockinfo2.data.totalMoney-chukumingxirecord1.data.num*chukumingxirecord1.data.price+num*price;
                                   Ext.getCmp("chukutotalmoney").setValue(totalmoney);
                               }
                           }
                       },{
                           fieldLabel : "单价",
                           id : "chukuprice",
                           value : chukumingxirecord1.get("price"),
                           name : "outStockDetailsInfo.price",
                           listeners : {
                               blur : function(){
                                   var num = Ext.getCmp("chukunum").getValue();
                                   var price = Ext.getCmp("chukuprice").getValue();
                                   var totalmoney = recordoutstockinfo2.data.totalMoney-chukumingxirecord1.data.price*chukumingxirecord1.data.num+num*price;
                                   Ext.getCmp("chukutotalmoney").setValue(totalmoney);
                               }
                           }
                       },{
                           fieldLabel : "出库时的成本金额",
                           readOnly : true,
                           id : "average",
                           value : chukumingxirecord1.get("stockPrice"),
                           name : "outStockDetailsInfo.stockPrice"
                       }]
                   }]
               }]
               }],
            buttonAlign : "center",
            buttons : [{
                text : "提交",
                icon : "images/accept.png",

                handler : function(){
                    var form = Ext.getCmp("updateform").getForm();
                    if(form.isValid()){
                        form.submit({
                            url : "/doublechukudanupdate",
                            success : function(form,action){
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg : msg.message,
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                });
                                Ext.getCmp("orderstockinfoid").store.reload();
                                Ext.getCmp("chukumingxiid").store.reload();
                                Ext.getCmp("chukuwindowid").close();
                            },
                            failure : function(form,action){
                                var msg = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg : msg.message,
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                })
                            }
                        })
                    }
                }
            },{
                text : "重置",
                icon : "images/reset.png",
                handler : function(){
                    Ext.getCmp("updateform").getForm().reset();
                }
            }]
        }).show().center();
    },
    chukumingxidelete : function(){
        this.up("menu").hide();
        var listvalue="";
        var listprice="";
        var listnum="";
        var listbillcode="";
        var chukumingxirecord = Ext.getCmp("chukumingxiid").getSelectionModel().getSelection();
        var recordoutstockinfo1 = Ext.getCmp("orderstockinfoid").getSelectionModel().getSelection()[0];
        var totalmoney = recordoutstockinfo1.get("totalMoney");
            listbillcode = recordoutstockinfo1.get("outBillCode");
        for(var i= 0,len=chukumingxirecord.length;i<len;i++){
            listvalue += chukumingxirecord[i].get("id");
            listprice += chukumingxirecord[i].get("price");
            listnum += chukumingxirecord[i].get("num");
            if(i!=len-1){
                listvalue += ","
            }
        }
        Ext.Msg.show({
           title : "系统提示",
           msg : "确定删除这【"+len+"】条数据吗？",
           icon : Ext.Msg.WARNING,
           buttons : Ext.Msg.YESNO,
           fn : function(btn){
               if(btn==="yes"){
                   Ext.Ajax.request({
                      url : "/singlechukudetailsdelete?arry="+listvalue,
                      success : function(response){
                          var msg = Ext.JSON.decode(response.responseText);
                          Ext.Msg.show({
                              title : "系统提示",
                              msg : msg.message,
                              icon : Ext.Msg.WARNING,
                              buttons : Ext.Msg.YES
                          });
                          Ext.getCmp("chukumingxiid").store.reload();
                          var totalmoney1 = totalmoney-listprice*listnum;
                          Ext.Ajax.request({
                             url : "/singlechukudanupdatemoney?arryid="+listbillcode+"&arrytotalmoney="+totalmoney1,
                              success : function(){
                                  Ext.getCmp("orderstockinfoid").store.reload();
                              }
                          });
                      },
                       failure : function(response){
                           var msg = Ext.JSON.decode(response.responseText);
                           Ext.Msg.show({
                               title : "系统提示",
                               msg : msg.message,
                               icon : Ext.Msg.WARNING,
                               buttons : Ext.Msg.YES
                           })
                       }
                   });
               }
           }
        });
    }
});