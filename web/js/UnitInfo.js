Ext.define("js.UnitInfo",{
    extend : "Ext.grid.Panel",
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    statestore : Ext.create("Ext.data.Store",{
        fields : [
            "abbr","name"
        ],
        data : [
            {abbr : "true",name:"使用"},
            {abbr : "false",name:"停用"}
        ]
    }),

    initComponent : function(){
        var me = this;
        var store = Ext.create("Ext.data.Store",{
                pageSize : 5,
                proxy : {
                  url : "/unitinfoselect",
                  type : "ajax",
                  reader : {
                      type : "json",
                      root : "unitlist",
                      totalProperty : "rows"
                  }
                },
            fields : [
                "name","remark","status","unitId"
            ],
            listeners: {
                beforeload: function (mystore, operation) {
                    if (Ext.getCmp("selectdatato")) {
                        var name = Ext.getCmp("selectdatato").getValue();
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
            autoLoad : false
        });
        store.load({
           params : {
               start : 0,
               limit : 5
           }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this,{
                title : "商品单位信息",
                id : "UnitInfo",
                closable : true,
                selModel:checkBox,
                disableSelection: false,
                store : store,
                tbar : [{
                    xtype : "button",
                    text : "添加",
                    icon : "images/add.png",
                    style : {
                        borderColor : "#89CA49"
                    },
                    handler : function(){me.unitinfoinsert(me)}
                },{
                    xtype : "button",
                    text : "修改",
                    style : {
                        borderColor : "#89CA49"
                    },
                    icon : "images/xiugai.png",
                    handler : function(){me.unitinfoupdate(me)}
                },{
                    xtype : "button",
                    text : "删除",
                    style : {
                        borderColor : "#89CA49"
                    },
                    icon : "images/shanchu.png",
                    handler : me.unitinfodelete
                },{
                    xtype : "panel",

                    defaults : {
                      width :240,
                        border : false
                    },
                    items : [{
                        xtype : "panel",
                        layout : "column",

                        defaults : {
                            labelWidth : 35,
                            labelAlign : "right",
                            border : false
                        },
                        items : [{
                            fieldLabel : "名称",
                            xtype : "textfield",
                            id : "selectto",
                            name : "unitselect"
                        },{
                            xtype : "button",
                            text : "查询",
                            icon : "images/chakan.png",
                            handler : me.unitinfoselect
                        }]
                    }]
                }],
            columns : [
                {text : "名称",dataIndex:"name",flex:1},
                {text : "状态",dataIndex:"status",flex:1},
                {text : "备注",dataIndex:"remark",flex:1}
            ],
            dockedItems : [{
                xtype : "pagingtoolbar",
                store : store,
                dock : "bottom",
                plugins: new Ext.ux.ProgressBarPager(),
                displayInfo : true
            }]
        });
        this.callParent();
    },
    unitinfoinsert : function(MSG){
        var me = this;
        Ext.create("Ext.window.Window",{
            title : "商品单位",
            titleAlign : "center",
            id : "myinsert",
            frame : true,
            modal : true,
            items : [{
                xtype : "form",
                id : "formid",
                defaults : {
                    xtype : "textfield",
                    allowBlank : false,
                    blankText : "必填字段不允许为空",
                    labelWidth : 50,
                    labelAlign : "right"
                },items : [{
                    fieldLabel : "名称",
                    name : "unit.name"
                },{
                    fieldLabel : "状态",
                    xtype : "combo",
                    store : me.statestore,
                    queryMode : "local",
                    displayField : "name",
                    valueField : "abbr",
                    name : "unit.status"
                },{
                    fieldLabel : "备注",
                    name : "unit.remark"
                }],
                buttonAlign : "center",
                buttons : [{
                    text : "提交",
                    handler : me.realunitinfoinsert
                },{
                    text : "重置",
                    handler : function(){
                        Ext.getCmp("formid").getForm().reset();
                    }
                }]
            }]
        }).show();
    },
    realunitinfoinsert : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/unitinfoinsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                    Ext.getCmp("UnitInfo").store.reload();
                    Ext.getCmp("myinsert").close();
                },
                failure : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                }
            });
        }
    },
    unitinfoupdate : function(MSG1){
        var me = this;
        var record = Ext.getCmp("UnitInfo").getSelectionModel().getSelection()[0];
        if(record==null){
            Ext.Msg.show({
                title : "系统提示",
                msg : "请选择你要更新的数据",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
            Ext.create("Ext.window.Window",{
                title : "请查看",
                titleAlign : "center",
                layout : "fit",
                id : "myupdate",
                frame : true,
                modal : true,
                items : [{
                    xtype : "form",
                    defaults : {
                        xtype : "textfield",
                        allowBlank : false,
                        blankText : "必填项不能为空"
                       // border : falsemn.k
                    },
                    items : [{
                        fieldLabel : "商品单位id",
                        value : record.get("unitId"),
                        name : "unit.unitId",
                        hidden : true
                    },{
                        fieldLabel : "名称",
                        value : record.get("name"),
                        name : "unit.name"
                    },{
                        fieldLabel : "状态",
                        value : record.get("status"),
                        name : "unit.status"
                    },{
                        fieldLabel : "备注",
                        value : record.get("remark"),
                        xtype: "combo",
                        store: me.statestore,
                        queryMode: "local",
                        displayField: "name",
                        valueField: "abbr",
                        name: "unit.remark"
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : me.realunitinfoupdate
                    },{
                        text : "重置",
                        handler : function(){
                            this.up("form").getForm().reset();
                        }
                    }]
                }]
            }).show();
        }

    },
    realunitinfoupdate : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/unitinfoupdate",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg :msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                    Ext.getCmp("UnitInfo").store.reload();
                    Ext.getCmp("myupdate").close();
                },
                failure : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg :msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                }
            });
        }
    },
    unitinfodelete : function(){
        var record = Ext.getCmp("UnitInfo").getSelectionModel().getSelection();
        var list = "";
        for(var i = 0,len=Ext.getCmp("UnitInfo").getSelectionModel().getSelection().length;i<len;i++){
            list += record[i].get("unitId");
            if(i != len-1){
                list += ","
            }
        }
        Ext.Msg.show({
           title : "系统提示",
           msg : "确定要删除【"+len+"】条吗?",
           icon : Ext.Msg.WARNING,
           buttons : Ext.Msg.YESNO,
           id : "mydelete",
           fn : function(btn){
               if(btn==="yes"){
                   Ext.Ajax.request({
                       url : "/unitinfodelete?arry="+list,
                       success : function(response){
                           var msg = Ext.JSON.decode(response.responseText)
                           Ext.Msg.show({
                               title : "系统提示",
                               msg : msg.message,
                               icon : Ext.Msg.WARNING,
                               buttons : Ext.Msg.YES
                           });
                           Ext.getCmp("UnitInfo").store.reload();
                           Ext.getCmp("mydelete").close();
                       },
                       failure : function(response){
                           var msg = Ext.JSON.decode(response.responseText)
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
    },
    unitinfoselect : function(){
        Ext.getCmp("UnitInfo").store.reload({params : {unitselect:Ext.getCmp("selectto").getValue()}});
    }
});