Ext.define("js.roleinfo",{
   extend : "Ext.grid.Panel",
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    rolestate : Ext.create("Ext.data.Store",{
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
            pageSize : 5,
            proxy : {
                url : "/roleselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "rolelist",
                    totalProperty : "rows"
                }
            },
            fields : [
                "roleId","roleName","sortId","state"
            ],
            listeners: {
                beforeload: function (mystore, operation) {
                    if (Ext.getCmp("rolemohuid")) {
                        var name = Ext.getCmp("rolemohuid").getValue();
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
               limit : 5
           }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this,{
           title : "角色信息",
           titleAlign : "center",
           id : "roleinfo",
           selModel:checkBox,
           disableSelection: false,
           store : store,
           columns : [
               {text : "角色编码",dataIndex : "roleId",align : "center",flex : 1},
               {text : "角色名称",dataIndex : "roleName",align : "center",flex : 1},
               {text : "排序编码",dataIndex : "sortId",align : "center",flex : 1},
               {text : "状态",dataIndex : "state",align : "center",flex : 1}
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
                    me.roleinsert(me)
                }
            },{
                text : "修改",
                icon : "images/xiugai.png",
                style : {
                    borderColor : "#89CA49"
                },
                handler : function(){
                    me.roleupdate(me)
                }
            },{
                text : "禁用/启用",
                style : {
                    borderColor : "#89CA49"
                },
                icon : "images/shanchu.png",
                handler : me.roledelete
            },{
                xtype : "panel",
                layout : "column",
                items : [{
                    fieldLabel : "角色姓名",
                    xtype : "textfield",
                    id : "rolemohuid",
                    labelWidth :60,
                    labelAlign : "right"
                },{
                    xtype : "button",
                    style : {
                        borderColor : "#89CA49"
                    },
                    text : "查询",
                    icon : "images/chakan.png",
                    handler : me.roleselect
                }]
            }]
        });
        this.callParent();
    },
    roleinsert : function(MSG){
        Ext.Ajax.request({
            url : "/roletreeinsert",
            async : false,
            success : function(response){
                MSG.mydata = Ext.JSON.decode(response.responseText);
            }
        });
        var treeStore = Ext.create("Ext.data.TreeStore",{
            fields : [
                {name : "id",type : "String",mapping : "menu.menuId"},
                {name : "text",type : "String",mapping : "menu.text"}
            ],
            root: {
                text: "权限展示",
                id: '-1',
                children: MSG.mydata.node.children
            }
        });
        Ext.create("Ext.window.Window",{
            title : "角色录入",
            layout : "fit",
            frame : true,
            id : "rolewindowid",
            height : 400,
            items : [{
                xtype : "form",
                layout : "border",
                width : 270,
                height : 230,
                id : "roleformid",
                items : [{
                    region : "north",
                    border : false,
                    defaults : {
                        xtype : "textfield",
                        margin : "5 5 5 5",
                        labelWidth : 65,
                        labelAlign : "right"
                    },
                    items : [{
                        fieldLabel : "角色名称",
                        name : "roleName"
                    },{
                        fieldLabel : "排序编码",
                        name : "sortId"
                    },{
                        fieldLabel : "状态",
                        xtype : "combo",
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        store : MSG.rolestate,
                        name : "state"
                    }]
                },{
                    region : "center",
                    border : false,
                    autoScroll:true,
                    items : [{
                        xtype : "treepanel",
                        store : treeStore,
                        id : "roletreeinsert",
                        collapsible: false,
                        border : false,
                        autoScroll:true,
                        listeners: {
                            'checkchange': function (node, checked) {
                                node.expand();
                                node.checked = checked;
                                if (true == checked) {
                                    var parent_node = node.parentNode;
                                    while (parent_node != null) {
                                        parent_node.set('checked', checked);
                                        parent_node = parent_node.parentNode;
                                    }
                                    node.eachChild(function (child) {
                                        child.set('checked', checked);
                                        child.fireEvent('checkchange', child, checked);
                                    });
                                }
                                if(Ext.getCmp("roletreeinsert").getRootNode().data.id=="-1"){
                                    Ext.getCmp("roletreeinsert").getRootNode().data.checked=false;
                                }
                            }
                        }
                    }]
                }],
                buttonAlign : "center",
                buttons : [{
                    text : "提交",
                    handler : function(){
                        var realform = Ext.getCmp("roleformid").query();
                        var treearray =[];
                        var treedata = Ext.getCmp("roletreeinsert").getChecked();
                        Ext.each(treedata,function(node,index){
                            if(node.data.id!="-1"){
                                treearray[index]={};
                                treearray[index].menuId=node.data.id;
                            }
                        });
                        var roleform = {};
                        Ext.each(realform, function (item) {
                            if (item) {
                                if (item.xtype == 'combobox' || item.xtype == 'textfield') {
                                    roleform[item.name] = item.lastValue;
                                }
                            }
                        });
                        var form=Ext.create('Ext.form.Panel',{

                        });
                      //  if(form.isValid()){
                            form.submit({
                                url : "/roleinsert",
                                jsonSubmit : true,
                                params : {
                                    role:roleform,
                                    arry : treearray
                                },
                               success : function(form,action){
                                   var msg = Ext.JSON.decode(action.response.responseText);
                                   Ext.Msg.show({
                                       title : "系统提示",
                                       msg : msg.message,
                                       icon : Ext.Msg.WARNING,
                                       buttons : Ext.Msg.YES
                                   });
                                   Ext.getCmp("rolewindowid").close();
                                   Ext.getCmp("roleinfo").store.reload();
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
                       // }
                    }
                },{
                    text : "重置",
                    handler : function(){
                        Ext.getCmp("roleformid").getForm().reset();
                    }
                }]
            }]
        }).show().center();
        Ext.getCmp("roletreeinsert").expandAll();
    },
    roleupdate : function(MSG){
        var record = Ext.getCmp("roleinfo").getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url : "/roletreeinsert",
            async : false,
            success : function(response){
                MSG.mydata = Ext.JSON.decode(response.responseText);
            }
        });
        var treeStore = Ext.create("Ext.data.TreeStore",{
            fields : [
                {name : "id",type : "String",mapping : "menu.menuId"},
                {name : "text",type : "String",mapping : "menu.text"}
            ],
            root: {
                text: "权限展示",
                id: '-1',
                children: MSG.mydata.node.children
            }
        });
        if(record==null){
            Ext.Msg.show({
                title : "系统提示",
                msg :"请选择你要修改的数据",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            });
        }else{
            Ext.create("Ext.window.Window",{
                title : "角色修改",
                frame : true,
                id : "updatewindowid",
                layout : "fit",
                defaults : {
                    width : 300,
                    height : 400
                },
                items : [
                    {
                        layout: "border",
                        items: [
                            {
                                region: "north",
                                xtype: "form",
                                id: "updateformid",
                                defaults: {
                                    xtype: "textfield",
                                    margin: "5 5 5 5",
                                    labelWidth: 65,
                                    labelAlign: "right"
                                },
                                items: [
                                    {
                                        fieldLabel: "角色编码",
                                        name: "role.roleId",
                                        value: record.get("roleId"),
                                        readOnly: true
                                    },
                                    {
                                        fieldLabel: "角色名称",
                                        name: "role.roleName",
                                        value: record.get("roleName")
                                    },
                                    {
                                        fieldLabel: "排序编码",
                                        name: "role.sortId",
                                        value: record.get("sortId")
                                    },
                                    {
                                        fieldLabel: "状态",
                                        xtype: "combo",
                                        queryMode: 'local',
                                        displayField: 'name',
                                        valueField: 'abbr',
                                        store: MSG.rolestate,
                                        name: "role.state",
                                        value: record.get("state")
                                    }
                                ]

                            },
                            {
                                region: "center",
                                items: [
                                    {
                                        xtype: "treepanel",
                                        id: "updatetreeid",
                                        collapsible: false,
                                        border: false,
                                        autoScroll: true,
                                        store: treeStore,
                                        listeners: {
                                            'checkchange': function (node, checked) {
                                                node.expand();
                                                node.checked = checked;
                                                if (true == checked) {
                                                    var parent_node = node.parentNode;
                                                    while (parent_node != null) {
                                                        parent_node.set('checked', checked);
                                                        parent_node = parent_node.parentNode;
                                                    }
                                                    node.eachChild(function (child) {
                                                        child.set('checked', checked);
                                                        child.fireEvent('checkchange', child, checked);
                                                    });
                                                }
                                                if(Ext.getCmp("updatetreeid").getRootNode().data.id=="-1"){
                                                    Ext.getCmp("updatetreeid").getRootNode().data.checked=false;
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ],
                        buttonAlign: "center",
                        buttons: [
                            {
                                text: "提交",
                                handler: function () {
                                    var sarry = new Array();
                                    var treedate = Ext.getCmp("updatetreeid").getChecked();
                                    Ext.each(treedate,function(node,index){
                                        if(node.data.id!="-1"){
                                            sarry.push(node.data.id)
                                        }
                                    });
                                    var form = Ext.getCmp("updateformid").getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: "/jdbcroleupdate",
                                            params : {
                                                sarry : sarry
                                            },
                                            success: function (form, action) {
                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                Ext.Msg.show({
                                                    title: "系统提示",
                                                    msg: msg.message,
                                                    icon: Ext.Msg.WARNING,
                                                    buttons: Ext.Msg.YES
                                                });
                                                Ext.getCmp("updatewindowid").close();
                                                Ext.getCmp("roleinfo").store.reload();
                                            },
                                            failure: function (form, action) {
                                                var msg = Ext.JSON.decode(action.response.responseText);
                                                Ext.Msg.show({
                                                    title: "系统提示",
                                                    msg: msg.message,
                                                    icon: Ext.Msg.WARNING,
                                                    buttons: Ext.Msg.YES
                                                });
                                            }
                                        });
                                    }
                                }
                            },
                            {
                                text: "重置",
                                handler: function () {
                                    Ext.getCmp("updateformid").getForm().reset();
                                }
                            }
                        ]
                    }]

            }).show().center();
            Ext.getCmp("updatetreeid").expandAll();
        }
    },
    roledelete : function(){
        var deleterecord = Ext.getCmp("roleinfo").getSelectionModel().getSelection()[0];
        var state = deleterecord.get("state");
        var realstate = "";
        var mingling = "";
        if(state==true){
            realstate=false;
            mingling = "禁用"
        }else{
            realstate=true;
            mingling = "启用"
        }
        Ext.Msg.show({
           title : "系统提示",
           msg : "确定要【"+mingling+"】这条?",
           icon : Ext.Msg.WARNING,
           buttons : Ext.Msg.YESNO,
           fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                        url : "roledelete",
                        params : {
                            arry : deleterecord.get("roleId"),
                            booleanarry : realstate
                        },
                        success: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: "系统提示",
                                msg: msg.message,
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.YES
                            });
                            Ext.getCmp("roleinfo").store.reload();
                        },
                        failure: function (response) {
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title: "系统提示",
                                msg: msg.message,
                                icon: Ext.Msg.WARNING,
                                buttons: Ext.Msg.YES
                            });
                        }
                    });
                }
           }
        });
    },
    roleselect : function(){
        Ext.getCmp("roleinfo").store.reload({
            params : {
                arry : Ext.getCmp("rolemohuid").getValue()
        }
    })
}
});