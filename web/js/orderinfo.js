Ext.define("js.orderinfo",{
    extend : "Ext.panel.Panel",
    gycombox : [],
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    ordertopgridrecod: {},
    Array :{},
initComponent : function(){
        var me = this;
        var curdate=new Date();
        var curtime=Ext.Date.format(curdate,'Y-m-d');
        this.createMenuList();
    //入库明细的store
        var store1 = Ext.create("Ext.data.Store", {
        pageSize: 5,
        proxy: {
            type: "ajax",
            url: "/instockinfodetailselect?",
            reader: {
                type: "json",
                root: "listinstock",
                totalProperty: "rows"
            }
        },
        fields: [
            "id", "num", "TMeInStockInfoByBillCode.billCode", "price","TMeMerchandiseInfoByMerchandiseId.merchandiseId"
        ],
        autoLoad: false
    });
        store1.load({
        params : {
            start : 0,
            limit : 5
        }
    });
    //入库单查询的store
        var store =  Ext.create("Ext.data.Store",{
        pageSize : 5,
        proxy : {
            type : "ajax",
            url : "/inStockInfoselect",
            reader : {
                type : "json",
                root : "listinstock",
                totalProperty : "rows"
            }
        },
        fields : [
        "billCode","inType","inTime","handler","totalMoney","remark","TAuOperInfoByOperId.operId","TBaSupplierInfoBySupplierId.supplierId"
        ],
        autoLoad :false

            });
        store.load({
            params : {
                start : 0,
                limit : 5
            }
        });
        var opername = Ext.create("Ext.data.Store",{
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
        });//操作软编码combox
        var mycombox = Ext.create("Ext.data.Store",{
            fields : [
              "abbr","name"
            ],
            data : [
                {abbr : 1,name : "正常入库"},
                {abbr : 2,name : "报溢"},
                {abbr : 3,name : "盘盈"}
            ]
        });//入库方式combox
        var mygyscmobobm = Ext.create("Ext.data.Store",{
            proxy : {
                url : "/supergyselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listone"
                }
            },
            fields : [
                "supplierId"
             ],
            autoLoad : true
        });//供应商编码combox
    //手动输入grid录入入库明细以及计算总金额的具体细节
        var cellEditing = new Ext.grid.plugin.CellEditing(
        {
            clicksToEdit: 1,
            listeners:{
                edit:function(editor, context){
                    if (context.value)
                    {
                        var myStore = Ext.data.StoreManager.lookup('myStore');
                        if (context.field === 'inStockMerName')
                        {
                            context.record.data.inStockMerNameHidden = me.myCode;
                            context.record.data.inStockMerName = me.myName;
                            myStore.remove(context.record);
                            myStore.insert(context.rowIdx, context.record);
                        }
                        if (context.field === "num")
                        {
                            if (context.record.data.price)
                            {
                                context.record.data.totalprice = context.record.data.price * context.value;
                                myStore.remove(context.record);
                                myStore.insert(context.rowIdx, context.record);
                            }
                        }
                        if (context.field === "price")
                        {
                            if (context.record.data.num)
                            {
                                context.record.data.totalprice = context.record.data.number * context.value;
                                myStore.remove(context.record);
                                myStore.insert(context.rowIdx, context.record);
                            }
                        }
                        if (context.record.data.num && context.record.data.price)
                            {
                                myStore.add({});
                            }
                        me.totalmoney = 0;
                        for(var i=0;i<myStore.data.items.length;i++){
                            if (!isNaN(myStore.data.items[i].data.totalprice) && myStore.data.items[i].data.totalprice != "")
                            {
                                me.totalmoney += myStore.data.items[i].data.totalprice;
                            }
                        }
                        Ext.getCmp('intotalmoney').setValue(me.totalmoney);
                    }
                }
            }

        }

        );
        var merchanname = Ext.create("Ext.data.Store",{
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
        });//商品编码的combox
    var checkBox1 = Ext.create('Ext.selection.CheckboxModel');
    var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this,{
           layout : "border",
           width :1920,
           id : "orderinfo",
           height : 740,
           defaults : {
                bodyStyle : {
                    backgroundColor : "#901d78"
                }
            },
           items : [{
               region : "center",
               xtype : "tabpanel",
               id : "stockcenter",
               border : false,
               height : 740,
               items : [{
                   xtype : "panel",
                   title : "入库信息录入",
                   titleAlign : "center",

                   items : [{
                       header : {
                           title : "入库单录入",
                           titleAlign : "center",
                           height : 25,
                           border : false
                       },
                       xtype : "form",
                       id : "fuck",
                       layout : "column",
                       height : 200,

                       defaults : {
                           xtype : "textfield",
                           margin : "35 35 35 35",
                           labelWidth : 70,
                           labelAlign : "right"
                       },
                       items : [{
                           fieldLabel : "操作员",
                           xtype : "combo",
                           store : opername,
                           editable : false,
                           queryMode : "local",
                           displayField : "operName",
                           valueField : "operId",
                           name : "instock.TAuOperInfoByOperId.operId"
                       },{
                           fieldLabel : "供应商编码",
                           xtype : "combo",
                           store : mygyscmobobm,
                           id : "mygyscmobobmid",
                           editable : false,
                           queryMode : "local",
                           displayField : "supplierId",
                           valueField : "supplierId",
                           name : "instock.TBaSupplierInfoBySupplierId.supplierId"
                       }, {
                           fieldLabel : "入库方式",
                           xtype : "combo",
                           store: mycombox,
                           queryMode: 'local',
                           displayField: 'name',
                           editable : false,
                           valueField: 'abbr',
                           name : "instock.inType"
                       }, {
                           anchor: '100%',
                           fieldLabel : "入库时间",
                           editable : false,
                           name : "instock.inTime",
                           value:curtime
                       },{
                           fieldLabel : "经手人",
                           name : "instock.handler"
                       },{
                           fieldLabel : "入库金额",
                           id : "intotalmoney",
                           value : me.totalmoney,
                           readOnly : true,
                           name : "instock.totalMoney"
                       },{
                           fieldLabel : "备注",
                           name : "instock.remark"
                       }]
                   },{
                       xtype : "grid",
                       header : {
                           title : "入库明细录入",
                           titleAlign : "center",
                           height : 25,
                           border : false
                       },
                       id : "instockinfogrid",
                       plugins: cellEditing,
                       bbar: [
                           "->",
                           {
                               text: '提交',
                               width : 100,
                               icon : "images/accept.png",
                               style : {
                                   borderColor : "#89CA49"
                               },
                               handler: function(){
                                   var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                                   var instockdetail = '';
                                   Ext.each(mydata, function(item, index){
                                       if (!item.data.totalprice)
                                       {
                                           return;
                                       }
                                       instockdetail += 'instockdetail['+index+'].num=' + item.data.num + '&instockdetail['+index+'].price=' +  item.data.price + '&instockdetail['+index+'].TMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.inStockMerNameHidden;
                                       if (index != mydata.length - 1)
                                       {
                                           instockdetail += '&';
                                       }
                                   });
                                   Ext.getCmp('fuck').submit({
                                       url: '/instockinfoinsert?'+instockdetail,
                                       success : function(form,action){
                                           var msg = Ext.JSON.decode(action.response.responseText);
                                            Ext.Msg.show({
                                                title : "系统提示",
                                                msg : msg.message,
                                                icon : Ext.Msg.WARNING,
                                                buttons : Ext.Msg.YES
                                            });
                                           Ext.getCmp("instockinfogrid").store.reload();
                                           Ext.getCmp("mygrid1").store.reload();
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
                                   });
                               }
                           }
                       ],
                       store : Ext.create("Ext.data.ArrayStore",{
                           id : "myStore",
                           fields : [
                               'inStockMerNameHidden',"TMeMerchandiseInfoByMerchandiseId","num","price","totalprice","inStockMerName"
                           ],
                           data : [
                               {}
                           ]
                       }),
                       columns : [
                           {
                               dataIndex: 'inStockMerNameHidden',
                               hidden:true
                           },
                           {text : "商品名称",dataIndex : "inStockMerName",flex : 1,editor : {
                               xtype : "combo",
                               store : merchanname,
                               queryMode : "local",
                               displayField : "merchandiseName",
                               editable : false,
                               valueField : "merchandiseId",
                               listeners:{
                                   select: function(combo, records){
                                       me.myCode = this.value;
                                       me.myName = records[0].data.merchandiseName;
                                   }
                               }
                           }},
                           {text : "价格",dataIndex : "price",flex : 1,editor : {
                               regex : /^[0-9]*$/,
                               blankText : "只能输入数字"
                           }},
                           {text : "数量",dataIndex : "num",flex : 1,editor : {
                               regex : /^[0-9]*$/,
                               blankText : "只能输入数字"
                           }},
                           {text : "总价",dataIndex : "totalprice",flex : 1}
                       ]
                   }]
               },{//入库单的数据信息grid
                   xtype : "panel",
                   layout : "border",
                   title : "入库信息展示",
                   titleAlign : "center",
                   items : [{
                       region : "north",
                       header : {
                           title : "入库单信息",
                           titleAlign : "center",
                           height : 25
                       },
                       bodyStyle : {
                           borderColor : "#901d78"
                       },
                           xtype : "grid",
                           id : "mygrid1",
                           store : store,
                           cls : "onlion",
                           selModel:checkBox,
                           disableSelection: false,
                           stripeRows:true,
                           columns : [
                               {
                                   text : "入库单号",
                                   dataIndex:"billCode",
                                   flex : 1,
                                   align : "center",
                                   locked: true,
                                   sortable: true
                               },
                               {text : "入库方式",dataIndex:"inType",flex : 1,align : "center"},
                               {text : "入库时间",dataIndex:"inTime",flex : 1,align : "center"},
                               {text : "经手人",dataIndex:"handler",flex : 1,align : "center"},
                               {text : "总金额",dataIndex:"totalMoney",flex : 1,align : "center"},
                               {text : "操作员编码",dataIndex:"TAuOperInfoByOperId.operId",flex : 1,align : "center"},
                               {text : "供应商编码",dataIndex:"TBaSupplierInfoBySupplierId.supplierId",flex : 1,align : "center"},
                               {text : "备注",dataIndex:"remark",flex : 1,align : "center"}
                               ],
                           dockedItems : [{
                               xtype : "pagingtoolbar",
                               store : store,
                               dock : "bottom",
                               plugins: new Ext.ux.ProgressBarPager(),
                               displayInfo : true,
                               cls : "pageingtoobar",
                               style : {
                                   borderColor : "#901d78"
                               }
                           }],
                       tbar : [{
                          text : "查看统计图"
                       }],
                       listeners : {//入库单数据的绑定事件
                       itemcontextmenu:function(view,record,item,index,e){
                           //禁用浏览器的右键相应事件
                           e.preventDefault();
                           e.stopEvent();
                           me.ordertopgridrecod = record;//Ext.getCmp("mygrid1").getSelectionModel().getSelection()[0];

                           var menu = new Ext.menu.Menu({
                               //控制右键菜单位置
                               float:true,
                               items:[{
                                   text:"查看",
                                   iconCls:'leaf',
                                   icon : "images/chakan.png",
                                   handler:function(){
                                       //当点击时隐藏右键菜单
                                       this.up("menu").hide();
                                       //alert(record.get('billCode'));
                                       Ext.getCmp('instockdetatils').store.reload({
                                           params:{
                                               arry:record.get('billCode')
                                           }
                                       });
                                   }
                               },{
                                   text:"删除",
                                   iconCls:'leaf',
                                   icon : "images/shanchu.png",
                                   handler:function(){
                                       this.up("menu").hide();
                                       var record = Ext.getCmp("mygrid1").getSelectionModel().getSelection();
                                       var list="";
                                       for(var i = 0,len=record.length;i<len;i++){
                                           list += record[i].get("billCode");
                                           if(i != len-1){
                                               list += ","
                                           }
                                       }
                                       Ext.Msg.show({
                                          title : "系统信息",
                                          msg : "确定要删除这【"+len+"】条入库单吗？并且入库信息也会跟着删除的，确定？",
                                          icon : Ext.Msg.WARNING,
                                          buttons : Ext.Msg.YESNO,
                                          fn : function(btn){
                                              if(btn==="yes"){
                                                  Ext.Ajax.request({
                                                      url : "/instockinfodetaildelete?arry="+list,
                                                      success : function(response){
                                                          var msg = Ext.JSON.decode(response.responseText);
                                                          Ext.Msg.show({
                                                              title : "系统提示",
                                                              msg : msg.message,
                                                              icon : Ext.Msg.WARNING,
                                                              buttons : Ext.Msg.YES
                                                          });
                                                          Ext.getCmp("mygrid1").store.reload();
                                                          Ext.getCmp("instockdetatils").store.reload();
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
                                                  })
                                              }
                                          }
                                       });
                                   }
                               }
                               ]
                           }).showAt(e.getXY());//让右键菜单跟随鼠标位置
                       }}
                   },{//入库明细数据信息grid
                       region : "center",
                       id : "instockdetatils",
                       xtype : "grid",
                       height : 610,
                       selModel:checkBox1,
                       disableSelection: false,
                       header : {
                           title : "入库明细信息",
                           titleAlign : "center",
                           height : 25
                       },
                       bodyStyle : {
                           borderColor : "#901d78"
                       },
                       store : store1,
                       columns : [
                           {
                               text : "入库单号",
                               dataIndex : "TMeInStockInfoByBillCode.billCode",
                               flex : 1,
                               align:"center"
                           },
                           {text : "入库明细码",dataIndex : "id",flex : 1,align:"center"},
                           {text : "数量",dataIndex : "num",flex : 1,align:"center"},
                           {text : "价格",dataIndex : "price",flex : 1,align:"center"},
                           {text : "商品编码",dataIndex : "TMeMerchandiseInfoByMerchandiseId.merchandiseId",flex : 1,align:"center"}
                       ],
                       dockedItems : [{
                           xtype : "pagingtoolbar",
                           store : store1,
                           dock : "bottom",
                           displayInfo : true
                       }],
                       listeners : {//入库明细的绑定事件
                           itemcontextmenu: function (view, record, item, index, e) {
                           //右击隐藏浏览器的右击功能
                               e.preventDefault();
                               e.stopEvent();
                               var menu = new Ext.menu.Menu({
                                   float: true,
                                   items: [
                                       {
                                           text: "查看",
                                           icon : "images/chakan.png",
                                           handler: function () {
                                               //当点击时隐藏右键菜单
                                               this.up("menu").hide();
                                               Ext.getCmp('instockdetatils').store.reload({
                                                   params: {
                                                       arry: record.get('billCode')
                                                   }

                                               });
                                           }
                                       },
                                       {
                                           text: "删除",
                                           iconCls : "leaf",
                                           icon : "images/shanchu.png",
                                           handler : function(){
                                               this.up("menu").hide();
                                               var list="";
                                               var listbillcode = "";
                                               var record1 = Ext.getCmp("instockdetatils").getSelectionModel().getSelection();
                                               var record5 = Ext.getCmp("mygrid1").getSelectionModel().getSelection()[0];
                                               for(var i = 0,len=record1.length;i<len;i++){
                                                   list += record1[i].get("id");
                                                   listbillcode += record1[i].get("TMeInStockInfoByBillCode.billCode");
                                                   if(i != len-1){
                                                       list += ",";
                                                       listbillcode +=","
                                                   }
                                               }
                                               var price =record5.data.totalMoney-record.data.num*record.data.price;
                                               //删除选中的明细以及当时最后一条明细的时候让他同时删除入库单
                                               Ext.Msg.show({
                                                   title : "系统提示",
                                                   msg : "你确定要删除入库明细单号为【"+list+"】的明细吗?",
                                                   icon : Ext.Msg.WARNING,
                                                   buttons : Ext.Msg.YESNO,
                                                   fn : function(btn){
                                                       if(btn==="yes"){
                                                           Ext.Ajax.request({
                                                               url : "/instockdetailsdelete?arry="+list,
                                                               success : function(response){
                                                                   var msg = Ext.JSON.decode(response.responseText);
                                                                   Ext.Msg.show({
                                                                       title: "系统提示",
                                                                       msg: msg.message,
                                                                       icon: Ext.Msg.WARNING,
                                                                       buttons: Ext.Msg.YES
                                                                   });
                                                                   Ext.getCmp("instockdetatils").store.reload();
                                                                   Ext.Ajax.request({
                                                                       url : "/singleinstockinfoupdatetotalmoney?arrytotalmoney="+price+"&arryid="+record5.get("billCode"),
                                                                       success : function(){
                                                                           Ext.getCmp("mygrid1").store.reload();
                                                                       }
                                                                   });

                                                                   //当明细删除成功后查看是否还存在对应的入库单，如果没有就提示删除对应的入库单
                                                                   Ext.Ajax.request({
                                                                      url : "/instockinfodetailselect?arry="+listbillcode,
                                                                      success : function(response){
                                                                          var msg = Ext.JSON.decode(response.responseText);
                                                                              me.Array = msg.listinstock;
                                                                          if(me.Array.length==0){
                                                                              Ext.Msg.show({
                                                                                  title: "系统提示",
                                                                                  msg: "由于库存单号为【"+listbillcode+"】的明细不存在是否删除对应的入库单",
                                                                                  icon: Ext.Msg.WARNING,
                                                                                  buttons: Ext.Msg.YESNO,
                                                                                  //结果如果不存在就提示删除
                                                                                  fn : function(btn){
                                                                                      if(btn==="yes"){
                                                                                          Ext.Ajax.request({
                                                                                              url : "/singledeleteinstockinfo?arry="+listbillcode,
                                                                                              success : function(response){
                                                                                                  var msg = Ext.JSON.decode(response.responseText);
                                                                                                  Ext.Msg.show({
                                                                                                      title: "系统提示",
                                                                                                      msg: msg.message,
                                                                                                      icon: Ext.Msg.WARNING,
                                                                                                      buttons: Ext.Msg.YES
                                                                                                  });
                                                                                                  Ext.getCmp("instockdetatils").store.reload();
                                                                                                  Ext.getCmp("mygrid1").store.reload();
                                                                                              },
                                                                                              failure : function(response){
                                                                                                  var msg = Ext.JSON.decode(response.responseText);
                                                                                                  Ext.Msg.show({
                                                                                                      title: "系统提示",
                                                                                                      msg: msg.message,
                                                                                                      icon: Ext.Msg.WARNING,
                                                                                                      buttons: Ext.Msg.YES
                                                                                                  })
                                                                                              }
                                                                                          });
                                                                                      }
                                                                                  }
                                                                              })
                                                                          }else{
                                                                              Ext.getCmp("instockdetatils").store.reload();
                                                                          }
                                                                      }
                                                                   });
                                                               },
                                                               failure : function(response){
                                                                   var msg = Ext.JSON.decode(response.responseText);
                                                                   Ext.Msg.show({
                                                                       title: "系统提示",
                                                                       msg: msg.message,
                                                                       icon: Ext.Msg.WARNING,
                                                                       buttons: Ext.Msg.YES
                                                                   })
                                                               }
                                                           });
                                                       }
                                                   }
                                               });
                                           }
                                       },
                                       {
                                           text : "修改",
                                           icon : "images/xiugai.png",
                                           handler : function(){
                                               this.up("menu").hide();
                                               var recordbb = record;
                                                   Ext.create("Ext.window.Window",{
                                                        id : "updatewindow",
                                                       modal : true,
                                                       header : {
                                                           title : "修改入库信息",
                                                           titleAlign : "center",
                                                           height : 25,
                                                           border : false,
                                                           style : {
                                                               background : "#901d78"
                                                           }
                                                       },
                                                       border : false,
                                                       style : {
                                                           borderColor : "#901d78"
                                                       },
                                                       height : 450,
                                                       width : 500,
                                                       layout : "fit",
                                                       frame : true,
                                                       maximizable: true,//让窗口最大化
                                                       items : [{
                                                           xtype : "form",
                                                           layout : "border",
                                                           id : "myform2",
                                                           items : [{
                                                               region : "west",
                                                               flex : 1,
                                                               header : {
                                                                   title : "入库信息",
                                                                   titleAlign : "center"
                                                               },
                                                               defaults : {
                                                                   xtype : "textfield",
                                                                   labelWidth : 70,
                                                                   labelAlign : "right",
                                                                   margin : "20 0 20 0"
                                                               },
                                                               items : [{
                                                                   fieldLabel : "入库单号",
                                                                   readOnly : true,
                                                                   value : me.ordertopgridrecod.get("billCode"),
                                                                   name : "inStockInfo.billCode"
                                                               },{
                                                                   fieldLabel : "操作员编码",
                                                                   xtype : "combo",
                                                                   store : opername,
                                                                   editable : false,
                                                                   queryMode : "local",
                                                                   displayField : "operName",
                                                                   valueField : "operId",
                                                                   value :me.ordertopgridrecod.get("TAuOperInfoByOperId.operId"),
                                                                   name : "inStockInfo.TAuOperInfoByOperId.operId"
                                                               },{
                                                                   xtype : "combo",
                                                                   fieldLabel : "供应商编码",
                                                                   store : mygyscmobobm,
                                                                   editable : false,
                                                                   queryMode : "local",
                                                                   displayField : "supplierId",
                                                                   valueField : "supplierId",
                                                                   value : me.ordertopgridrecod.get("TBaSupplierInfoBySupplierId.supplierId"),
                                                                   name : "inStockInfo.TBaSupplierInfoBySupplierId.supplierId"
                                                               },{
                                                                   fieldLabel : "入库方式",
                                                                   xtype : "combo",
                                                                   store: mycombox,
                                                                   queryMode: 'local',
                                                                   displayField: 'name',
                                                                   editable : false,
                                                                   valueField: 'abbr',
                                                                   value : me.ordertopgridrecod.get("inType"),
                                                                   name : "inStockInfo.inType"
                                                               },{
                                                                   fieldLabel : "入库时间",
                                                                   value : me.ordertopgridrecod.get("inTime"),
                                                                   name : "inStockInfo.inTime",
                                                                   readOnly : true
                                                               },{
                                                                   fieldLabel : "经手人",
                                                                   value : me.ordertopgridrecod.get("handler"),
                                                                   name : "inStockInfo.handler"
                                                               },{
                                                                   fieldLabel : "入库金额",
                                                                   id : "totalmoney1",
                                                                   value : me.ordertopgridrecod.get("totalMoney"),
                                                                   name : "inStockInfo.totalMoney",
                                                                   readOnly : true
                                                               },{
                                                                   fieldLabel : "备注",
                                                                   value : me.ordertopgridrecod.get("remark"),
                                                                   name : "inStockInfo.remark"
                                                               }]
                                                           },{
                                                               region : "center",
                                                               flex : 1,
                                                               header : {
                                                                   title : "入库明细信息",
                                                                   titleAlign : "center"
                                                               },
                                                               defaults : {
                                                                   xtype : "textfield",
                                                                   labelWidth : 70,
                                                                   labelAlign : "right",
                                                                   margin : "20 0 20 0"
                                                               },
                                                               items : [{
                                                                   fieldLabel : "入库单号",
                                                                   value : recordbb.get("TMeInStockInfoByBillCode.billCode"),
                                                                   name : "inStockDetailsInfo.TMeInStockInfoByBillCode.billCode",
                                                                   readOnly : true
                                                               },{
                                                                   fieldLabel : "入库明细码",
                                                                   value : recordbb.get("id"),
                                                                   name : "inStockDetailsInfo.id"
                                                               },{
                                                                   fieldLabel : "入库数量",
                                                                   value : recordbb.get("num"),
                                                                   name : "inStockDetailsInfo.num",
                                                                   id : "num",
                                                                   listeners : {
                                                                       blur : function(){
                                                                           var num = Ext.getCmp("num").getValue();
                                                                           var price = Ext.getCmp("price").getValue();
                                                                           var totalmoney = me.ordertopgridrecod.get("totalMoney");
                                                                           var totalmoney1 = totalmoney-recordbb.get("num")*recordbb.get("price")+num*price;
                                                                           Ext.getCmp('totalmoney1').setValue( totalmoney1);
                                                                       }
                                                                   }
                                                               },{
                                                                   fieldLabel : "进价",
                                                                   value : recordbb.get("price"),
                                                                   name : "inStockDetailsInfo.price",
                                                                   id : "price",
                                                                   listeners : {
                                                                       blur : function(){
                                                                           var num = Ext.getCmp("num").getValue();
                                                                           var price = Ext.getCmp("price").getValue();
                                                                           var totalmoney = me.ordertopgridrecod.get("totalMoney");
                                                                           var totalmoney1 = totalmoney-recordbb.get("num")*recordbb.get("price")+num*price;
                                                                           Ext.getCmp('totalmoney1').setValue( totalmoney1);
                                                                       }
                                                                   }
                                                               },{
                                                                   fieldLabel : "商品编码",
                                                                   value : recordbb.get("TMeMerchandiseInfoByMerchandiseId.merchandiseId"),
                                                                   name : "inStockDetailsInfo.TMeMerchandiseInfoByMerchandiseId.merchandiseId",
                                                                   xtype : "combo",
                                                                   store : merchanname,
                                                                   queryMode : "local",
                                                                   displayField : "merchandiseName",
                                                                   editable : false,
                                                                   valueField : "merchandiseId"
                                                               }]
                                                           }],
                                                           buttonAlign : "center",
                                                           buttons : [{
                                                               text : "提交",
                                                               icon : "images/accept.png",
                                                               handler : function(){
                                                                   var form = Ext.getCmp("myform2").getForm();
                                                                   if(form.isValid()){
                                                                       form.submit({
                                                                           url : "/instockinfodetailupdate",
                                                                           success : function(form,action){
                                                                               var msg = Ext.JSON.decode(action.response.responseText);
                                                                               Ext.Msg.show({
                                                                                   title : "系统提示",
                                                                                   msg : msg.message,
                                                                                   icon : Ext.Msg.WARNING,
                                                                                   buttons : Ext.Msg.YES
                                                                               });
                                                                               Ext.getCmp("instockdetatils").store.reload();
                                                                               Ext.getCmp("mygrid1").store.reload();
                                                                               Ext.getCmp("updatewindow").close();
                                                                           },
                                                                           failure : function(from,action){
                                                                               var msg = Ext.JSON.decode(action.response.responseText);
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
                                                           },{
                                                               text : "重置",
                                                               icon : "images/reset.png",
                                                               handler : function(){
                                                                   Ext.getCmp("myform2").getForm().reset();
                                                               }
                                                           }]
                                                       }]
                                               }).show();
                                           }
                                       }
                                   ]
                               }).showAt(e.getXY());
                           }
                       }
                   }]
               }]

           }]
        });
        this.callParent()
    },
    menulist : new Array(),
    createMenuList : function(){
        var menudata={}, tpl , me=this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01">',
            '<div id="box5">{remark}</div>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url : "js/StockInfo.json",
            async : false,
            success : function(response){
                menudata = Ext.JSON.decode(response.responseText)
            }
        });
        for(var i = 0,len = menudata.stockinfolist.length; i<len; i++){
            var storeID = "store_" +i, item, title = menudata.stockinfolist[i].name;
            Ext.create("Ext.data.Store",{
                id : storeID,
                data : menudata.stockinfolist[i].child,
                fields : [
                    {name : "name",type : "String"},
                    {name : "remark",type : "String"}
                ]
            });
            item = {
                xtype : "panel",
                title : title,
                layout : "fit",
                items : [
                    {
                        xtype : "dataview",
                        tpl : tpl,
                        store : Ext.data.StoreManager.lookup(storeID),
                        itemCls : "background : red",
                        itemSelector : "div.part01",
                        listeners : {
                            itemclick: function () {
                                Ext.require("js.gysdata", function () {
                                    var obj = Ext.create("js.gysdata");
                                    var center = Ext.getCmp("stockcenter");
                                    var tag = center.items.get("eastload");
                                    if (!tag) {
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
                    }
                ]
            };
            me.menulist.push(item);
        }
    }
});
