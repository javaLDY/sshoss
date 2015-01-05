Ext.define("js.menu",{
    extend : "Ext.grid.Panel",
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    menustate : Ext.create("Ext.data.Store",{
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
            pageSize : 30,
            proxy : {
                url : "/menuselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listmenu",
                    totalProperty : "rows"
                }
            },
            fields : [
                "menuId","text","id","moudle","parentNode","tag","src","state"
            ],
            listeners: {
                beforeload: function (mystore, operation) {
                    if (Ext.getCmp("menumohuid")) {
                        var name = Ext.getCmp("menumohuid").getValue();
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
                limit : 30
            }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this,{
            title : "角色信息",
            titleAlign : "center",
            id : "menuid",
            selModel:checkBox,
            disableSelection: false,
            store : store,
            columns : [
                {text : "菜单编码",dataIndex : "menuId",align : "center",flex : 1},
                {text : "菜单名称",dataIndex : "text",align : "center",flex : 1},
                {text : "排序编码",dataIndex : "id",align : "center",flex : 1},
                {text : "对应父节点",dataIndex : "parentNode",align : "center",flex : 1},
                {text : "对应路径",dataIndex : "moudle",align : "center",flex : 1},
                {text : "对应路径ID",dataIndex : "tag",align : "center",flex : 1},
                {text : "对应路径图片",dataIndex : "src",align : "center",flex : 1},
                {text : "使用状态",dataIndex : "state",align : "center",flex : 1}
            ],
            dockedItems : [{
                xtype : "pagingtoolbar",
                store : store,
                dock : "bottom",
                displayInfo : true,
                plugins: new Ext.ux.ProgressBarPager()
            }],
            tbar : [{
                text : "添加",
                icon : "images/add.png",
                style : {
                    borderColor : "#89CA49"
                },
                handler : function(){
                    me.menuinsert(me);
                }
            },{
                text : "修改",
                icon : "images/xiugai.png",
                style : {
                    borderColor : "#89CA49"
                },
                handler : function(){
                    me.menuupdate(me)
                }
            },{
                text : "删除",
                icon : "images/shanchu.png",
                style : {
                    borderColor : "#89CA49"
                },
                handler : me.menudelete
            },{
                xtype : "panel",
                layout : "column",
                items : [{
                    fieldLabel : "菜单名称",
                    xtype : "textfield",
                    id : "menumohuid",
                    labelWidth :60,
                    labelAlign : "right"
                },{
                    xtype : "button",
                    icon : "images/chakan.png",
                    text : "查询",
                    style : {
                        borderColor : "#89CA49"
                    },
                    handler : me.menuselect
                }]
            }]
        });
        this.callParent();
    },
    menuinsert : function(MSG){
        Ext.create("Ext.window.Window",{
            title : "角色录入",
            layout : "fit",
            frame : true,
            id : "menuwindowid",
            items : [{
                xtype : "form",
                id : "menuformid",
                defaults : {
                    xtype : "textfield",
                    margin : "5 5 5 5",
                    labelWidth : 65,
                    labelAlign : "right"
                },

                items : [{
                    fieldLabel : "菜单名称",
                    name : "menu.text"
                },{
                    fieldLabel : "状态编码",
                    name : "menu.id"
                },{
                    fieldLabel : "状态",
                    xtype : "combo",
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    store : MSG.menustate,
                    name : "menu.state"
                },{
                    fieldLabel : "对应路径",
                    name : "menu.moudle"
                },{
                    fieldLabel : "集成父节点",
                    name : "menu.parentNode"
                },{
                    fieldLabel : "对应路径ID",
                    name : "menu.tag"
                },{
                    fieldLabel : "路径图片",
                    name : "menu.src"
                }],
                buttonAlign : "center",
                buttons : [{
                    text : "提交",
                    handler : function(){
                        var form = Ext.getCmp("menuformid").getForm();
                        if(form.isValid()){
                            form.submit({
                                url : "/menuinsert",
                                success : function(form,action){
                                    var msg = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.show({
                                        title : "系统提示",
                                        msg : msg.message,
                                        icon : Ext.Msg.WARNING,
                                        buttons : Ext.Msg.YES
                                    });
                                    Ext.getCmp("menuwindowid").close();
                                    Ext.getCmp("menuid").store.reload();
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
                            });
                        }
                    }
                },{
                    text : "重置",
                    handler : function(){
                        Ext.getCmp("menuformid").getForm().reset();
                    }
                }]
            }]
        }).show().center()
    },
    menuupdate : function(MSG){
        var record = Ext.getCmp("menuid").getSelectionModel().getSelection()[0];
        if(record==null){
            Ext.Msg.show({
                title : "系统提示",
                msg :"请选择你要修改的数据",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
            Ext.create("Ext.window.Window",{
                title : "菜单更新",
                layout : "fit",
                frame : true,
                id : "menuupdatewindowid",
                items : [{
                    xtype : "form",
                    id : "menuupdateformid",
                    defaults : {
                        xtype : "textfield",
                        margin : "5 5 5 5",
                        labelWidth : 65,
                        labelAlign : "right"
                    },
                    items : [{
                        fieldLabel : "菜单编码",
                        name : "menu.menuId",
                        value : record.get("menuId"),
                        readOnly : true
                    },{
                        fieldLabel : "菜单名称",
                        name : "menu.text",
                        value : record.get("text")
                    },{
                        fieldLabel : "状态",
                        xtype : "combo",
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        store : MSG.menustate,

                        name : "menu.state",
                        value : record.get("state")
                    },{
                        fieldLabel : "排序编码",
                        name : "menu.id",
                        value : record.get("id")
                    },{
                        fieldLabel : "对应路径",
                        name : "menu.moudle",
                        value : record.get("moudle")
                    },{
                        fieldLabel : "继承的父节点",
                        name : "menu.parentNode",
                        value : record.get("parentNode")
                    },{
                        fieldLabel : "对应图片",
                        name : "menu.src",
                        value : record.get("src")
                    },{
                        fieldLabel : "路径ID",
                        name : "menu.tag",
                        value : record.get("tag")
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : function(){
                            var form = Ext.getCmp("menuupdateformid").getForm();
                            if(form.isValid()){
                                form.submit({
                                    url : "/menuupdate",
                                    success : function(form,action){
                                        var msg = Ext.JSON.decode(action.response.responseText);
                                        Ext.Msg.show({
                                            title : "系统提示",
                                            msg : msg.message,
                                            icon : Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES
                                        });
                                        Ext.getCmp("menuupdatewindowid").close();
                                        Ext.getCmp("menuid").store.reload();
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
                                });
                            }
                        }
                    },{
                        text : "重置",
                        handler : function(){
                            Ext.getCmp("menuupdateformid").getForm().reset();
                        }
                    }]
                }]
            }).show().center()
        }

    },
    menudelete : function(){
        var deleterecord = Ext.getCmp("menuid").getSelectionModel().getSelection();
        var listvalue="";
        for(var i = 0,len=deleterecord.length;i<len;i++){
            listvalue += deleterecord[i].get("menuId");
            if(i!=len-1){
                listvalue += ","
            }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定删除这【"+len+"】条吗？",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                        url : "/menudelete?arry="+listvalue,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg :msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                            Ext.getCmp("menuid").store.reload();
                        },
                        failure : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg :msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                        }
                    })
                }
            }
        })
    },
    menuselect : function(){
        Ext.getCmp("menuid").store.reload({
            params : {
                arry : Ext.getCmp("menumohuid").getValue()
            }
        })
    }
});