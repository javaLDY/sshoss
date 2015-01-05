Ext.define("js.MerChanCinfo", {
    extend: "Ext.grid.Panel",
    statestore : Ext.create("Ext.data.Store", {
        fields: [
            "abbr", "mername"
        ],
        data: [
            {abbr: "true", mername: "使用"},
            {abbr: "false", mername: "停用"}
        ]
    }),
    initComponent: function () {
        var me = this;
        var store = Ext.create("Ext.data.Store", {
            pageSize: 5,
            proxy: {
                url: "/merchenselect",
                type: "ajax",
                reader: {
                    type: "json",
                    root: "listmerCinfo",
                    totalProperty: "rows"
                }
            },
            fields: [
                "merchandiseCName", "sortId", "state","merchandiseCid"
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
            autoLoad: false
        });
        store.load({
            params: {
                start: 0,
                limit: 5
            }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this, {
            title: "商品类别信息",
            id : "MerChanCinfo",
            closable : true,
            store : store,
            selModel:checkBox,
            disableSelection: false,
            tbar: [
                {
                    xtype: "button",
                    text: "添加",
                    style : {
                        borderColor : "#89CA49"
                    },
                    icon : "images/add.png",
                    handler: function () {
                        me.mercheninfoinsert(me)
                    }
                },
                {
                    xtype: "button",
                    text: "修改",
                    style : {
                        borderColor : "#89CA49"
                    },
                    icon : "images/xiugai.png",
                    handler : function(){me.updatemerchaninfo(me)}
                },
                {
                    xtype: "button",
                    text: "删除",
                    style : {
                        borderColor : "#89CA49"
                    },
                    icon : "images/shanchu.png",
                    handler : me.deletemerchencinfo
                },
                {
                    xtype : "panel",
                    defaults : {
                        width : 285,
                        border :false
                    },
                    items : [{
                        xtype : "panel",
                        layout : "column",
                        defaults : {
                            labelWidth : 79,
                            labelAlign : "right",
                            border :false
                        },
                        items : [{
                          xtype : "textfield",
                          name : "selectdata",
                          id : "selectdatato",
                          fieldLabel : "商品类别名称"
                        },{
                                xtype: "button",
                                text: "查询",
                                icon : "images/chakan.png",
                                handler : me.selectmercheninfo
                        }]
                    }]
                }
            ],
            columns: [
                {text: "商品类别名称", dataIndex: "merchandiseCName", flex: 1},
                {text: "排序编码", dataIndex: "sortId", flex: 1},
                {text: "状态", dataIndex: "state", flex: 1}
            ],
            dockedItems: [
                {
                    xtype: "pagingtoolbar",
                    store: store,
                    dock: "bottom",
                    displayInfo: true
                }
            ]
        });
        this.callParent();
    },
    mercheninfoinsert: function (MSG) {
        var me = this;
        Ext.create("Ext.window.Window", {
            id : "myinsert",
            title: "添加商品类别",
            titleAlign: "center",
            frame: true,
            modal: true,
            items: [
                {
                    xtype: "form",
                    id: "formid",
                    defaults: {
                        xtype: "textfield",
                        allowBlank: false,
                        blankText: "必填字段不允许为空",
                        labelWidth: 70,
                        labelAlign: "right"
                    }, items: [
                    {
                        fieldLabel: "商品类别名称",
                        name: "mer.merchandiseCName"
                    },
                    {
                        fieldLabel: "排序编码",
                        name: "mer.sortId",
                        vtype: 'alphanum',
                        blankText : "该项只能输入数字"
                    },
                    {
                        fieldLabel: "状态",
                        xtype: "combo",
                        store: me.statestore,
                        queryMode: "local",
                        displayField: "mername",
                        valueField: "abbr",
                        name: "mer.state"
                    }
                ],
                    buttonAlign: "center",
                    buttons: [
                        {
                            text: "提交",
                            handler: me.realinsertmcCinfo
                        },
                        {
                            text: "重置",
                            handler: function () {
                                Ext.getCmp("formid").getForm().reset();
                            }
                        }
                    ]
                }
            ]
        }).show();
    },
    realinsertmcCinfo: function () {
        var form = Ext.getCmp("formid").getForm();
        if (form.isValid()) {
            form.submit({
                url: "/mercheninsert",
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                    Ext.getCmp("MerChanCinfo").store.reload();
                    Ext.getCmp("myinsert").close();
                },
                failure: function (form, action) {
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
    updatemerchaninfo : function(MSG1){
        var me = this;
        var record = Ext.getCmp("MerChanCinfo").getSelectionModel().getSelection()[0];
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
                id : "merupdate",
                frame : true,
                modal : true,
                items : [{
                    xtype : "form",
                    defaults : {
                        xtype : "textfield",
                        allowBlank : false,
                        blankText : "必填项不能为空",
                        border : false
                    },
                    items : [{
                        fieldLabel : "商品类别id",
                        value : record.get("merchandiseCid"),
                        name : "mer.merchandiseCid",
                        hidden : true
                    },{
                        fieldLabel : "商品类别名称",
                        value : record.get("merchandiseCName"),
                        name : "mer.merchandiseCName"
                    },{
                        fieldLabel : "排序编码",
                        value : record.get("sortId"),
                        name : "mer.sortId"
                    },{
                        fieldLabel : "状态",
                        value : record.get("state"),
                        xtype: "combo",
                        store: me.statestore,
                        queryMode: "local",
                        displayField: "mername",
                        valueField: "abbr",
                        name: "mer.state"
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : me.realupdatemerchaninfo
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
    realupdatemerchaninfo : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/merchenupdate",
               success : function(form,action){
                   var msg = Ext.JSON.decode(action.response.responseText);
                   Ext.Msg.show({
                      title : "系统提示",
                      msg :msg.message,
                      icon : Ext.Msg.WARNING,
                      buttons : Ext.Msg.YES
                   });
                   Ext.getCmp("MerChanCinfo").store.reload();
                   Ext.getCmp("merupdate").close();
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
    deletemerchencinfo : function(){
        var list = "";
        var record = Ext.getCmp("MerChanCinfo").getSelectionModel().getSelection();
        for(var i = 0,len=Ext.getCmp("MerChanCinfo").getSelectionModel().getSelection().length;i<len;i++){
            list += record[i].get("merchandiseCid");
            if(i != len-1){
                list += ","
            }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定要删除【"+len+"】条吗?",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            id : "merdelete",
            fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                        url : "/merchendelete?arry="+list,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                               title : "系统提示",
                               msg : msg.message,
                               icon : Ext.Msg.WARNING,
                               buttons : Ext.Msg.YES
                            });
                            Ext.getCmp("MerChanCinfo").store.reload();
                            Ext.getCmp("merdelete").close();
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
    },
    selectmercheninfo : function(){
        Ext.getCmp("MerChanCinfo").store.reload({params : {selectdata:Ext.getCmp("selectdatato").getValue()}})
    }
});