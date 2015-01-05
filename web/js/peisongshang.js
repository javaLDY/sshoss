Ext.define("js.peisongshang",{
    extend : "Ext.grid.Panel",
    statecombox : Ext.create("Ext.data.Store",{
        fields : [
            "abbr","name"
        ],
        data : [
            {"abbr" : 1,"name":"使用"},
            {"abbr" : 0,"name":"关闭"}
        ]
    }),
    initComponent : function(){
        var me = this;
        var store = Ext.create("Ext.data.Store",{
           pageSize : 10,
           proxy : {
               url : "/peisongselect",
               type : "ajax",
               reader : {
                   type : "json",
                   root : "listvalue",
                   totalProperty : "rows"
               }
           },
            fields : [
                "deliveryId","deliveryName","address","linkName","linkTel","qq","email","sortId","state"
            ],
            listeners: {
                beforeload: function (mystore, operation) {
                    if (Ext.getCmp("persongmohuid")) {
                        var name = Ext.getCmp("persongmohuid").getValue();
                        if (name) {
                            if (operation.params) {
                                operation.params.name = name;
                            }
                            else {
                                operation.params = {name:name};
                            }
                        }
                    }
                }
            },
            autoLoad : true
        });
        store.load({
           params : {
               start : 0,
               limit : 10
           }
        });
        var checkBox = Ext.create("Ext.selection.CheckboxModel");
        Ext.apply(this,{
           title : "配送商信息展示",
           store : store,
           id : "peisongshang",
           selModel : checkBox,
           disableSelection : false,
           columns : [
               {text : "配送商ID",dataIndex:"deliveryId",align:"center",flex:1},
               {text : "配送商名称",dataIndex:"deliveryName",align:"center",flex:1},
               {text : "配送商地址",dataIndex:"address",align:"center",flex:1},
               {text : "联系人",dataIndex:"linkName",align:"center",flex:1},
               {text : "联系电话",dataIndex:"linkTel",align:"center",flex:1},
               {text : "QQ",dataIndex:"qq",align:"center",flex:1},
               {text : "邮箱",dataIndex:"email",align:"center",flex:1},
               {text : "排序编码",dataIndex:"sortId",align:"center",flex:1},
               {text : "使用状态",dataIndex:"state",align:"center",flex:1}
            ],
            dockedItems: [
                {
                    xtype: "pagingtoolbar",
                    store: store,
                    dock: "bottom",
                    displayInfo: true
                }
            ],
            tbar : [{
                text : "添加",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/add.png",
                handler : function(){
                    me.peisonginsert(me)
                }
            },{
                text : "修改",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/xiugai.png",
                handler : function(){
                    me.persongupdate(me)
                }
            },{
                text : "删除",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/shanchu.png",
                handler : me.peisongdelete
            },{
                xtype : "panel",
                layout : "column",
                items : [{
                    fieldLabel : "配送商名称",
                    xtype : "textfield",
                    id : "persongmohuid",
                    labelWidth : 70,
                    labelAlign : "right"
                },{
                    text : "查询",
                    xtype : "button",
                    icon : "images/chakan.png",
                    style : {
                        borderColor : "#89CA49"
                    },
                    handler : me.persongselect
                }]
            }]
        });
        this.callParent();
    },
    peisonginsert : function(MSG){
      Ext.create("Ext.window.Window",{
          modal : true,
          frame : true,
          title : "配送商添加",
          titleAlign : "center",
          id : "peisonginsertwindow",
          layout : "fit",
          width : 300,
          items : [{
              xtype : "form",
              id : "peisongform",
              layout : "form",
              defaults : {
                  xtype : "textfield",
                  labelWidth : 70,
                  labelAlign : "right"
              },
              items : [{
                  fieldLabel : "配送商名称",
                  name : "pei.deliveryName"
              },{
                  fieldLabel : "地址",
                  name : "pei.address"
              },{
                  fieldLabel : "联系人",
                  name : "pei.linkName"
              },{
                  fieldLabel : "联系电话",
                  name : "pei.linkTel"
              },{
                  fieldLabel : "QQ",
                  name : "pei.qq"
              },{
                  fieldLabel : "邮箱",
                  name : "pei.email"
              },{
                  fieldLabel : "排序编码",
                  name : "pei.sortId"
              },{
                  fieldLabel : "状态",
                  name : "pei.state",
                  xtype : "combo",
                  queryMode: 'local',
                  store : MSG.statecombox,
                  displayField : "name",
                  valueField : "abbr"
              }]
          }],
          buttonAlign : "center",
          buttons : [{
              text : "提交",
              handler : MSG.realpeisonginsert
          },{
              text : "重置",
              handler : function(){
                  Ext.getCmp("peisongform").getForm().reset();
              }
          }]
      }).show().center()
    },
    realpeisonginsert : function(){
        var form = Ext.getCmp("peisongform").getForm();
        if(form.isValid()){
            form.submit({
                url : "/personginsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                    Ext.getCmp("peisongshang").store.reload();
                    Ext.getCmp("peisonginsertwindow").close();
                },
                failure : function(from,action){
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
    },
    persongupdate : function(MSG){
        var recode = Ext.getCmp("peisongshang").getSelectionModel().getSelection()[0];
        if(recode==null){
            Ext.Msg.show({
                title : "系统提示",
                msg : "请选择要更新的数据",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            })
        }
        Ext.create("Ext.window.Window",{
            title : "更新数据",
            titelAlign : "center",
            id : "peisongupdatewindow",
            width : 500,
            frame: true,
            modal : true,
            items : [{
                xtype : "form",
                id : "peisongupdateform",
                layout : "form",
                defaults : {
                    xtype : "textfield",
                    labelWidth : 70,
                    labelAlign : "right"
                },
                items : [{
                    fieldLabel : "配送商名称",
                    name : "pei.deliveryName",
                    value : recode.get("deliveryName")
                },{
                    fieldLabel : "配送商ID",
                    hidden : true,
                    name : "pei.deliveryId",
                    value : recode.get("deliveryId")
                },{
                    fieldLabel : "地址",
                    name : "pei.address",
                    value : recode.get("address")
                },{
                    fieldLabel : "联系人",
                    name : "pei.linkName",
                    value : recode.get("linkName")
                },{
                    fieldLabel : "联系电话",
                    name : "pei.linkTel",
                    value : recode.get("linkTel")
                },{
                    fieldLabel : "QQ",
                    name : "pei.qq",
                    value : recode.get("qq")
                },{
                    fieldLabel : "邮箱",
                    name : "pei.email",
                    value : recode.get("email")
                },{
                    fieldLabel : "排序编码",
                    name : "pei.sortId",
                    value : recode.get("sortId")
                },{
                    fieldLabel : "状态",
                    name : "pei.state",
                    xtype : "combo",
                    queryMode: 'local',
                    store : MSG.statecombox,
                    displayField : "name",
                    valueField : "abbr"
                }]
            }],
            buttonAlign : "center",
            buttons : [{
                text : "提交",
                handler : MSG.realpersongupdate
            },{
                text : "重置",
                handler : function(){
                    Ext.getCmp("peisongupdateform").getForm().reset();
                }
            }]
        }).center().show();
    },
    realpersongupdate : function(){
        var form = Ext.getCmp("peisongupdateform").getForm();
        if(form.isValid()){
            form.submit({
                url : "/peisongupdate",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                    Ext.getCmp("peisongshang").store.reload();
                    Ext.getCmp("peisongupdatewindow").close();
                },
                failure : function(from,action){
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
    },
    peisongdelete : function(){
        var record = Ext.getCmp("peisongshang").getSelectionModel().getSelection();
        var listvalue = "";
        for(var i = 0,len=record.length;i<len;i++){
            listvalue += record[i].get("deliveryId");
            if(i!=len-1){
                listvalue += ","
            }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定删除这【"+len+"】条数据吗?",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                        url : "/peisongdelete?arry="+listvalue,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YESNO
                            })
                        },
                        failure : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YESNO
                            });
                            Ext.getCmp("peisongshang").store.reload();
                        }
                    })
                }
            }
        });
    },
    persongselect : function(){
        Ext.getCmp("peisongshang").store.reload({
            params : {
                arry : Ext.getCmp("persongmohuid").getValue()
            }
        })
    }
});