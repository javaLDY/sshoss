Ext.define("js.gysdata",{
    extend : "Ext.panel.Panel",
    initComponent : function(){
        var me = this;
        me.gycombox = Ext.create("Ext.data.Store",{
            fields : ["id","name"],
            data : [
                {id : true,name : "使用"},
                {id : false,name : "关闭"}
            ]
        });
        var store = Ext.create("Ext.data.Store",{
            pageSize :6,
            id : "gysstore",
            proxy : {
                type : "ajax",
                url : "/supergyselect",
                reader : {
                    type : "json",
                    root : "listone",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name : "supplierName",type : "String"},
                {name : "supplierAb",type : "String"},
                {name : "address",type : "String"},
                {name : "linkName",type : "String"},
                {name : "linkTel",type : "String"},
                {name : "qq",type : "String"},
                {name : "email",type : "String"},
                {name : "sortId",type : "String"},
                {name : "state",type : "boolean"},
                {name : "supplierId",type : "int"}
            ],
            listeners: {
                beforeload: function (mystore, operation) {
                    if (Ext.getCmp("important")) {
                        var name = Ext.getCmp("important").getValue();
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
                limit : 6
            }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this,{
            title : "供应商管理",
            titleAlign : "center",
            split : true,
            //jheight : 745,
            closable : true,
            autoScroll : true,
            id : "eastload",
            items : [{
                xtype : "panel",
                height : 200,
                layout : "column",
                defaults :{
                  bodyStyle : {
                      backgroundColor : "#dee9e9"
                  }
                },
                items : [{
                    layout : "column",
                    xtype : "form",
                    border : false,
                    id : "gsyform",
                    height : 200,
                    title : "供应商信息录入",
                    titleAlign : "center",
                    defaults : {
                        xtype : "textfield",
                        labelWidth : 80,
                        labelAlign : "right",
                        margin : "30 10 10 10",
                        allowBlank : false,
                        //frame : true,
                        blankText : "必选项不能为空"
                    },
                    items : [{
                        fieldLabel : "供应商名称",
                        name : "supper.supplierName"
                    },{
                        fieldLabel : "供应商助记码",
                        name : "supper.supplierAb"
                    },{
                        fieldLabel : "地址",
                        name : "supper.address"
                    },{
                        fieldLabel : "联系人",
                        name : "supper.linkName"
                    },{
                        fieldLabel : "联系电话",
                        name : "supper.linkTel"
                    },{
                        fieldLabel : "QQ",
                        name : "supper.qq"
                    },{
                        fieldLabel : "Email",
                        name : "supper.email"
                    },{
                        fieldLabel : "排序编码",
                        name : "supper.sortId"
                    },{
                        fieldLabel : "状态",
                        xtype : "combo",
                        store: me.gycombox,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name : "supper.state"
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "录入",
                        icon : "images/accept.png",
                        handler : me.gysreg
                    },{
                        text : "重置",
                        icon : "images/reset.png",
                        handler : function(){
                            this.up("form").getForm().reset();
                        }
                    }]
                }]
            },{
                id : "mygridone",
                xtype : "grid",
                //height : 610,
                titleAlign : "center",
                store :store,
                selModel:checkBox,
                disableSelection: false,
                columns : [
                    {text : "供应商编码",dataIndex : "supplierId"},
                    {text : "供应商名称",dataIndex : "supplierName"},
                    {text : "供应商助记码",dataIndex : "supplierAb"},
                    {text : "地址",dataIndex : "address"},
                    {text : "联系人",dataIndex : "linkName"},
                    {text : "QQ",dataIndex : "qq"},
                    {text : "邮箱",dataIndex : "email"},
                    {text : "联系电话",dataIndex : "linkTel"},
                    {text : "排序编码",dataIndex : "sortId"},
                    {text : "状态",dataIndex : "state",flex:1}
                ],
                dockedItems : [{
                    xtype : "pagingtoolbar",
                    store : store,
                    dock : "bottom",
                    displayInfo : true
                }],
                tbar : [{
                    xtype : "panel",
                    border : false,
                    padding : "0 0 0 0 ",
                    layout : "hbox",
                    width : 410,
                    defaults : {
                        height : 23,
                        margin : "0 0 0 0",
                        labelAlign : "right",
                        labelWidth : 70
                    },
                    items : [{
                        fieldLabel : "供应商名称",
                        xtype : "textfield",
                        name : "name",
                        id : "important"
                    },{
                        text : "快捷查询",
                        icon : "images/chakan.png",
                        xtype : "button",
                        handler :me.gysmohuselect
                    },{
                        text : "修改",
                        icon : "images/xiugai.png",
                        xtype : "button",
                        handler : function(){me.updategys(me)}
                    },{
                        text : "删除",
                        icon : "images/shanchu.png",
                        xtype : "button",
                        handler : me.deletegys
                    }]
                }]
            }]
        });
        this.callParent();
    },
    gysreg : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/supergyinsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                    Ext.getCmp("gsyform").getForm().reset();
                    Ext.getCmp("mygridone").store.reload();
                },
                failure : function(form,action){
                    var mag = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : mag.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                }
            });
        }
    },
    gysmohuselect : function(){
        Ext.getCmp("mygridone").store.load({params : {name : Ext.getCmp("important").getValue()}})

    },
    updategys : function(MSG){
        var me = this;
        var record= Ext.getCmp("mygridone").getSelectionModel().getSelection()[0]
        if(record==null){
            Ext.Msg.show({
                title : "系统提示",
                msg : "请选择你要修改的记录",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
            Ext.create("Ext.window.Window",{
                title : "修改数据",
                titleAlign : "center",
                id : "windowupdate",
                layout : "fit",
                modal : true,
                frame : true,
                items : [{
                    xtype : "form",
                    defaults : {
                        xtype : "textfield",
                        labelWidth : 70,
                        labelAlign : "right",
                        margin : "5 5 5 5"
                    },
                    items : [{
                        hidden : true,
                        fieldLabel : "供应商编码",
                        value : record.get("supplierId"),
                        name : "supper.supplierId"
                    },{
                        fieldLabel : "供应商名称",
                        value : record.get("supplierName"),
                        name : "supper.supplierName"
                    },{
                        fieldLabel : "供应商助记码",
                        value : record.get("supplierAb"),
                        name : "supper.supplierAb"
                    },{
                        fieldLabel : "地址",
                        value : record.get("address"),
                        name : "supper.address"
                    },{
                        fieldLabel : "联系人",
                        value : record.get("linkName"),
                        name : "supper.linkName"
                    },{
                        fieldLabel : "联系电话",
                        value : record.get("linkTel"),
                        name : "supper.linkTel"
                    },{
                        fieldLabel : "QQ",
                        value : record.get("qq"),
                        name : "supper.qq"
                    },{
                        fieldLabel : "Email",
                        value : record.get("email"),
                        name : "supper.email"
                    },{
                        fieldLabel : "排序编码",
                        value : record.get("sortId"),
                        name : "supper.sortId"
                    },{
                        fieldLabel : "状态",
                        xtype : "combo",
                        store: me.gycombox,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'id',
                        name : "supper.state"
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "确认",
                        handler : me.relupdate
                    },{
                        text : "重置",
                        handler : function(){
                            this.up("window").down("form").getForm().reset();
                        }
                    }]
                }]
            }).show();
        }
    },
    relupdate : function(){
        var form = this.up("window").down("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/supergyupdate",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);

                    if(msg.isno){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.message,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });
                        Ext.getCmp("mygridone").store.reload();
                        Ext.getCmp("windowupdate").close();
                    }else{
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.message,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });
                    }
                },
                failure : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if(msg.isno){
                        Ext.Msg.show({
                            title : "系统提示",
                            msg : msg.message,
                            icon : Ext.Msg.WARNING,
                            buttons : Ext.Msg.YES
                        });
                    }
                }
            });
        }
    },
    deletegys : function(){
        var me = this;
        var record= Ext.getCmp("mygridone").getSelectionModel().getSelection();
        if(record==null){
            Ext.Msg.show({
                title : "系统提示",
                msg : "请选择你要修改的记录",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
            var list = "";
            for(var i=0,len = Ext.getCmp("mygridone").getSelectionModel().getSelection().length;i<len;i++){
                list += record[i].get('supplierId');
                if (i != len - 1) {
                    list += ',';
                }
            }
            Ext.Msg.show({
                title : "系统提示",
                id : "deletewindow",
                msg : "确定要删除【"+Ext.getCmp("mygridone").getSelectionModel().getSelection().length+"】条吗？",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES,
                fn : function(btn){
                    if(btn==='yes'){
                        Ext.Ajax.request({
                            url : "/supergydelete?arry="+list,
                            success : function(response){
                                var msg = Ext.JSON.decode(response.responseText);
                                Ext.Msg.show({
                                    title : "系统提示",
                                    msg : msg.message,
                                    icon : Ext.Msg.WARNING,
                                    buttons : Ext.Msg.YES
                                });
                                Ext.getCmp("mygridone").store.reload();
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
            });}

    }
});