Ext.define("js.ProStatusInfo",{
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
                url : "/prostatusinfoselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "prostatuslist",
                    totalProperty : "rows"
                }
            },
            fields : [
                "proStatusName","remark","status","proStatusId"
            ],
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
            closable : true,
            title : "商品促销状态信息",
            id : "ProStatusInfo",
            selModel:checkBox,
            disableSelection: false,
            store : store,
            tbar : [{
                xtype : "button",
                text : "添加",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/add.png",
                handler : function(){me.prostatusinfoinsert(me)}
            },{
                xtype : "button",
                text : "修改",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/xiugai.png",
                handler : function(){me.prostatusinfoupdate(me)}
            },{
                xtype : "button",
                text : "删除",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/shanchu.png",
                handler : me.prostatusinfodelete
            },{
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
                        name : "proselectdata",
                        id : "prostatusinfoselect",
                        fieldLabel : "促销状态名称"
                    },{
                        xtype: "button",
                        text: "查询",
                        icon : "images/chakan.png",
                        handler : me.prostatusinfoselect
                    }]
                }]
            }],
            columns : [
                {text : "促销状态名称",dataIndex:"proStatusName",flex:1},
                {text : "状态",dataIndex:"status",flex:1},
                {text : "备注",dataIndex:"remark",flex:1}
            ],
            dockedItems : [{
                xtype : "pagingtoolbar",
                store : store,
                dock : "bottom",
                displayInfo : true,
                plugins: new Ext.ux.SlidingPager()
            }]
        });
        this.callParent();
    },
    afterRender: function(){
        this.callParent(arguments);
        this.getStore().load();
    },
    prostatusinfoinsert : function(MSG){
        var me = this;
        Ext.create("Ext.window.Window",{
            title : "商品促销状态信息",
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
                    labelWidth : 70,
                    labelAlign : "right"
                },items : [{
                    fieldLabel : "促销状态名称",
                    name : "pro.proStatusName"
                },{
                    fieldLabel : "状态",
                    xtype : "combo",
                    store : me.statestore,
                    queryMode : "local",
                    displayField : "name",
                    valueField : "abbr",
                    name : "pro.status"
                },{
                    fieldLabel : "备注",
                    name : "pro.remark"
                }],
                buttonAlign : "center",
                buttons : [{
                    text : "提交",
                    handler : me.realprostatusinfoinsert
                },{
                    text : "重置",
                    handler : function(){
                        Ext.getCmp("formid").getForm().reset();
                    }
                }]
            }]
        }).show();
    },
    realprostatusinfoinsert : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/prostatusinsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                    Ext.getCmp("ProStatusInfo").store.reload();
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
    prostatusinfoupdate : function(MSG1){
        var me = this;
        var record = Ext.getCmp("ProStatusInfo").getSelectionModel().getSelection()[0];
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
                        blankText : "必填项不能为空",
                        border : false
                    },
                    items : [{
                        fieldLabel : "商品单位id",
                        value : record.get("proStatusId"),
                        name : "pro.proStatusId",
                        hidden : true
                    },{
                        fieldLabel : "名称",
                        value : record.get("proStatusName"),
                        name : "pro.proStatusName"
                    },{
                        fieldLabel : "状态",
                        value : record.get("status"),
                        name : "pro.status"
                    },{
                        fieldLabel : "备注",
                        value : record.get("remark"),
                        xtype: "combo",
                        store: me.statestore,
                        queryMode: "local",
                        displayField: "name",
                        valueField: "abbr",
                        name: "pro.remark"
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : me.realprostatusinfoupdate
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
    realprostatusinfoupdate : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/prostatusinfoupdate",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg :msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                    Ext.getCmp("ProStatusInfo").store.reload();
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
    prostatusinfodelete : function(){
        var record = Ext.getCmp("ProStatusInfo").getSelectionModel().getSelection();
        var list = "";
        for(var i = 0,len=record.length;i<len;i++){
            list += record[i].get("proStatusId")
            if(i !=len-1){
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
                        url : "/prostatusinfodelete?arry="+list,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                            Ext.getCmp("ProStatusInfo").store.reload();
                            Ext.getCmp("mydelete").close();
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
    prostatusinfoselect : function(){
        Ext.getCmp("ProStatusInfo").store.reload({params : {proselectdata:Ext.getCmp("prostatusinfoselect").getValue()}})
    }
});