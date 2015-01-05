Ext.define("js.dingdan",{
   extend : "Ext.panel.Panel",
    //出库store
    outstockstore : Ext.create("Ext.data.Store",{
       proxy : {
           url : "/outstockselect",
           type : "ajax",
           reader : {
               type : "json",
               root : "outstocklist"
           }
       },
        fields : [
           "OutBillCode"
        ],
        autoLoad : true
    }),
    //配送商store
    peisongstore : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/deliveryselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "deliverylist"
            }
        },
        fields : [
            "DeliveryName","DeliveryID"
        ],
        autoLoad : true
    }),
    //操作员store
    operinfostore : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/dingdanoperinfoselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "operinfolist"
            }
        },
        fields : [
            "OperID","OperName"
        ],
        autoLoad : true
    }),
    //会员store
    merberstore : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/merberselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "operinfolist"
            }
        },
        fields : [
            "id","userName"
        ],
        autoLoad : true
    }),
    //商品名称store
    merchanstore : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/merchanselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "merchanlist"
            }
        },
        fields : [
            "MerchandiseID","MerchandiseName"
        ],
        autoLoad : true
    }),
    //单位store
    unitstore : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/unitselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "unitlist"
            }
        },
        fields : [
            "UnitID","Name"
        ],
        autoLoad : true
    }),
    //订单状态store
    dingdanstore : Ext.create("Ext.data.Store",{
       fields : [
           "abbr","name"
       ],
        data : [
            {"abbr":0,"name":"未发货"},
            {"abbr":1,"name":"已发货"},
            {"abbr":2,"name":"交易完成"},
            {"abbr":3,"name":"客户取消订单"}
        ]
    }),
    initComponent : function(){
        var me = this;
        var currenttime = new Date();
        var time = Ext.Date.format(currenttime,"Y-m-s");
        var cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1,
            listeners : {
                edit : function(editor,context){
                    if(context.value){
                        var mystore = Ext.data.StoreManager.lookup("myStore");
                        if(context.field==="digndaninstockname"){
                            context.record.data.dingdaninstockhide = me.myCode;
                            context.record.data.digndaninstockname = me.myName;
                            mystore.remove(context.record);
                            mystore.insert(context.rowIdx,context.record);
                        }
                        if(context.field==="unitname"){
                            context.record.data.unithidden = me.myCode;
                            context.record.data.unitname = me.myName;
                            mystore.remove(context.record);
                            mystore.insert(context.rowIdx,context.record);
                        }
                        if(context.field==="num"){
                            if(context.record.data.price){
                                context.record.data.totalmoney = context.record.data.num*context.record.data.price;
                                mystore.remove(context.record);
                                mystore.insert(context.rowIdx,context.record);
                            }
                        }
                        if(context.field==="price"){
                            if(context.record.data.num){
                                context.record.data.totalmoney =  context.record.data.num*context.record.data.price;
                                mystore.remove(context.record);
                                mystore.insert(context.rowIdx,context.record);
                            }
                        }
                        me.totalmoney=0;
                        for(var i= 0,len=mystore.data.items.length;i<len;i++){
                           if(!isNaN(mystore.data.items[i].data.totalmoney)&&mystore.data.items[i].data.totalmoney!=""){
                               me.totalmoney += mystore.data.items[i].data.totalmoney
                           }
                        }
                        Ext.getCmp("foemtotalprice").setValue(me.totalmoney);
                        if(context.record.data.num && context.record.data.price){
                            mystore.add({});
                        }
                    }
                }
            }
        });
        var dingdanstore = Ext.create("Ext.data.ArrayStore",{
            id : "myStore",
            fields : [
                "unitname","unithidden","num","price","TMeMerchandiseInfoByMerchandiseId.merchandiseId","TMeOrderInfoByBillCode.billCode","TMeUnitInfoByUnitId.unitId","totalmoney","digndaninstockname","dingdaninstockhide"
            ],
            data : [{}]
        });
        Ext.apply(this,{
           id : "dingdanid",
           items : [{
               xtype : "tabpanel",
               width : 1508,
               autoScroll : true,
               height : 743,
               items : [{
                   xtype : "panel",
                   layout : "border",
                   title : "订单录入",
                   items : [{
                       region : "north",
                       xtype : "form",
                       title : "订单信息",
                       id : "dingdanform",
                       titleAlign : "center",
                       border : false,
                       defaults : {
                         xtype : "textfield",
                         labelWidth : 70,
                         labelAlign : "right",
                         margin : "10 10 10 10"
                       },
                       layout : "column",
                       items : [{
                           fieldLabel : "订单号",
                           name : "ding.BillCode",
                           readOnly : true,
                           id : "billcode",
                           listeners : {
                               focus : function(form,The){
                                   Ext.Ajax.request({
                                       url : "/generatBillCode",
                                       success : function(response){
                                           var mydata  = Ext.JSON.decode(response.responseText);
                                           var billcode = mydata.str;
                                           Ext.getCmp("billcode").setValue(billcode)
                                       }
                                   })
                               }
                           }
                       },{
                           fieldLabel : "用户名",
                           xtype : "combo",
                           value : "刘董杨",
                           name : "ding.TBaMemberInfoByUserName.userName"
                       },{
                           fieldLabel : "配送商",
                           xtype : "combo",
                           queryMode : "local",
                           displayField : "DeliveryName",
                           valueField : "DeliveryID",
                           store : me.peisongstore,
                           name : "ding.TBaDeliveryInfoByDeliveryId.deliveryId"
                       },{
                           fieldLabel : "操作员",
                           xtype : "combo",
                           queryMode : "local",
                           displayField : "OperName",
                           valueField : "OperID",
                           store : me.operinfostore,
                           name : "ding.TAuOperInfoByOperId.operId"
                       },{
                           fieldLabel : "出库单号",
                           xtype : "combo",
                           queryMode : "local",
                           displayField : "OutBillCode",
                           valueField : "OutBillCode",
                           store : me.outstockstore,
                           name : "ding.TMeOutStockInfoByOutBillCode.outBillCode"
                       },{
                           fieldLabel : "快递单号",
                           name : "ding.postBillCode"
                       },{
                           fieldLabel : "订单状态",
                           name : "ding.billStatus",
                           xtype : "combo",
                           queryMode : "local",
                           store : me.dingdanstore,
                           displayField : "name",
                           valueField : "abbr"
                       },{
                           fieldLabel : "订购时间",
                           name : "ding.orderTime",
                           value : time
                       },{
                           fieldLabel : "收货人",
                           name : "ding.recMan"
                       },{
                           fieldLabel : "联系电话",
                           name : "ding.linkTel"
                       },{
                           fieldLabel : "配送地址",
                           name : "ding.recAddress"
                       },{
                           fieldLabel : "邮编",
                           name : "ding.postCode"
                       },{
                           fieldLabel : "金额",
                           id : "foemtotalprice",
                           name : "ding.totalMoney"
                       },{
                           fieldLabel : "备注",
                           name : "ding.remark"
                       }]
                   },{
                       xtype : "grid",
                       region : "center",
                       title : "订单明细",
                       id : "dingdangrid",
                       plugins : cellEditing,
                       autoScroll : true,
                       titleAlign : "center",
                       store : dingdanstore,
                       columns : [
                           {
                               dataIndex : "dingdaninstockhide",hidden : true
                           },
                           {
                               dataIndex : "unithidden",hidden : true
                           },
                           {text : "商品编码",dataIndex : "digndaninstockname",align : "center",flex:1,editor : {
                               xtype : "combo",
                               store : me.merchanstore,
                               queryMode : "local",
                               displayField : "MerchandiseName",
                               editable : false,
                               valueField : "MerchandiseID",
                               listeners : {
                                   select : function(combo, records){
                                       me.myCode = this.value;
                                       me.myName = records[0].data.MerchandiseName
                                   }
                               }
                           }},
                           {text : "单位编码",dataIndex:"unitname",align : "center",flex:1,editor : {
                               xtype : "combo",
                               editable : false,
                               store : me.unitstore,
                               queryMode : "local",
                               displayField : "Name",
                               valueField : "UnitID",
                               listeners : {
                                   select : function(combo,records){
                                       me.myCode = this.value;
                                       me.myName = records[0].data.Name
                                   }
                               }
                           }},
                           {text : "数量",dataIndex:"num",align : "center",flex:1,editor : {
                               name : "3"
                           }},
                           {text : "售价",dataIndex:"price",align : "center",flex:1,editor : {
                               name : "4"
                           }},
                           {text : "总价",dataIndex : "totalmoney",align : "center",flex : 1,editor : {
                               name : "5",
                               readOnly : true
                           }}
                       ],
                       bbar : ["->",{
                           text : "提交",
                           icon : "images/accept.png",
                           style : {
                               borderColor : "#89CA49"
                           },
                           handler : function(){
                               var mydata = Ext.data.StoreManager.lookup("myStore").data.items;
                               var listvalue = "";
                               Ext.each(mydata,function(item,index){
                                   if(!item.data.totalmoney)
                                   {
                                       return;
                                   }else{
                                       listvalue += "listvalue["+index+"].TMeMerchandiseInfoByMerchandiseId.merchandiseId="+item.data.dingdaninstockhide + "&listvalue["+index+"].TMeUnitInfoByUnitId.unitId=" + item.data.unithidden + "&listvalue["+index+"].num=" + item.data.num + "&listvalue["+index+"].price=" + item.data.price
                                       if(index!=mydata.length-1){
                                           listvalue += "&"
                                       }
                                   }
                               });
                               Ext.getCmp("dingdanform").submit({
                                   url : "/dingdaninsert?"+listvalue,
                                   success : function(form,action){
                                       var msg = Ext.JSON.decode(action.response.responseText);
                                       Ext.Msg.show({
                                           title : "系统提示",
                                           msg : msg.message,
                                           icon : Ext.Msg.WARNING,
                                           buttons : Ext.Msg.YES
                                       })
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
                       }]
                   }]
               }]
           }]
        });
        this.callParent()
    }
});