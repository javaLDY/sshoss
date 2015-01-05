Ext.define("js.menurelate",{
   extend : "Ext.grid.Panel",
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    //菜单编码的combox
    menucombox : Ext.create("Ext.data.Store",{
       proxy : {
           type : "ajax",
           url : "/menuselect",
           reader : {
               type : "json",
               root : "listmenu"
           }
       },
        fields : [
            "menuId","menuName"
        ],
        autoLoad : true
    }),
   initComponent : function(){
       var me = this;
       var store = Ext.create("Ext.data.Store",{
           pageSize : 10,
           proxy : {
               url : "/menurelateselect",
               type : "ajax",
               reader : {
                   type : "json",
                   root : "newmenurelatelist",
                   totalProperty : "rows"
               }
           },
           fields : [
               "menuinfoid","menuname","module","tag","TAuMenuInfoByMenuId.menuId","src","text","leaf"
           ],
           listeners: {
               beforeload: function (mystore, operation) {
                   if (Ext.getCmp("menurelatemohuid")) {
                       var name = Ext.getCmp("menurelatemohuid").getValue();
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
          title : "菜单关系",
          titleAlign : "center",
          id : "menurelateid",
          selModel : checkBox,
          disableSelection : false,
          store : store,
          columns : [
              {text : "关系编码",dataIndex : "menuinfoid",align : "center",flex : 1},
              {text : "菜单编码",dataIndex : "TAuMenuInfoByMenuId.menuId",align : "center",flex : 1},
              {text : "关系名称",dataIndex : "text",align : "center",flex : 1},
              {text : "关系路径",dataIndex : "module",align : "center",flex : 1},
              {text : "关系ID",dataIndex : "tag",align : "center",flex : 1},
              {text : "关系图片",dataIndex : "src",align : "center",flex : 1},
              {text : "leaf",dataIndex : "leaf",align : "center",flex : 1}
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
                   me.menurelateinsert(me);
               }
           },{
               text : "修改",
               style : {
                   borderColor : "#89CA49"
               },
               icon : "images/xiugai.png",
               handler : function(){
                   me.menurelateupdate(me)
               }
           },{
               text : "删除",
               style : {
                   borderColor : "#89CA49"
               },
               icon : "images/shanchu.png",
               handler : me.menurelatedelete
           },{
               xtype : "panel",
               layout : "column",
               items : [{
                   fieldLabel : "关系名称",
                   xtype : "textfield",
                   id : "menurelatemohuid",
                   labelWidth :60,
                   labelAlign : "right"
               },{
                   xtype : "button",
                   text : "快捷查询",
                   style : {
                       borderColor : "#89CA49"
                   },
                   icon : "images/chakan.png",
                   handler : me.menurelateselect
               }]
           }]
       });
       this.callParent();
   },
    menurelateinsert : function(MSG){
        Ext.create("Ext.window.Window",{
            title : "角色录入",
            layout : "fit",
            frame : true,
            id : "menurelatewindowid",
            items : [{
                xtype : "form",
                id : "menurelateformid",
                defaults : {
                    xtype : "textfield",
                    margin : "5 5 5 5",
                    labelWidth : 65,
                    labelAlign : "right"
                },
                items : [{
                    fieldLabel : "菜单名称",
                    xtype : "combo",
                    queryMode: 'local',
                    displayField: 'menuName',
                    valueField: 'menuId',
                    store : MSG.menucombox,
                    name : "menurelate.TAuMenuInfoByMenuId.menuId"
                },{
                    fieldLabel : "关系名称",
                    name : "menurelate.text"
                },{
                    fieldLabel : "关系路径",
                    name : "menurelate.module"
                },{
                    fieldLabel : "关系ID",
                    name : "menurelate.tag"
                },{
                    fieldLabel : "关系图片",
                    name : "menurelate.src"
                }],
                buttonAlign : "center",
                buttons : [{
                    text : "提交",
                    handler : function(){
                        var form = Ext.getCmp("menurelateformid").getForm();
                        if(form.isValid()){
                            form.submit({
                                url : "/menurelateinsert",
                                success : function(form,action){
                                    var msg = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.show({
                                        title : "系统提示",
                                        msg : msg.message,
                                        icon : Ext.Msg.WARNING,
                                        buttons : Ext.Msg.YES
                                    });
                                    Ext.getCmp("menurelatewindowid").close();
                                    Ext.getCmp("menurelateid").store.reload();
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
                        Ext.getCmp("menurelateformid").getForm().reset();
                    }
                }]
            }]
        }).show().center()
    },
    menurelateupdate : function(MSG){
        var record = Ext.getCmp("menurelateid").getSelectionModel().getSelection()[0];
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
                id : "menurelatewindowid",
                items : [{
                    xtype : "form",
                    id : "menurelateformid",
                    defaults : {
                        xtype : "textfield",
                        margin : "5 5 5 5",
                        labelWidth : 65,
                        labelAlign : "right"
                    },
                    items : [{
                        fieldLabel : "关系编码",
                        name : "menurelate.menuinfoid",
                        value : record.get("menuinfoid"),
                        readOnly : true
                    },{
                        fieldLabel : "关系图片",
                        name : "menurelate.src",
                        value : record.get("src")
                    },{
                        fieldLabel : "关系名称",
                        name : "menurelate.text",
                        value : record.get("text")
                    },{
                        fieldLabel : "关系路径",
                        name : "menurelate.module",
                        value : record.get("module")
                    },{
                        fieldLabel : "关系ID",
                        name : "menurelate.tag",
                        value : record.get("tag")
                    },{
                        fieldLabel : "菜单编码",
                        xtype : "combo",
                        queryMode: 'local',
                        displayField: 'menuName',
                        valueField: 'menuId',
                        store : MSG.menucombox,
                        name : "menurelate.TAuMenuInfoByMenuId.menuId",
                        value : record.get("TAuMenuInfoByMenuId.menuId")
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : function(){
                            var form = Ext.getCmp("menurelateformid").getForm();
                            if(form.isValid()){
                                form.submit({
                                    url : "/menurelateupdate",
                                    success : function(form,action){
                                        var msg = Ext.JSON.decode(action.response.responseText);
                                        Ext.Msg.show({
                                            title : "系统提示",
                                            msg : msg.message,
                                            icon : Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES
                                        });
                                        Ext.getCmp("menurelatewindowid").close();
                                        Ext.getCmp("menurelateid").store.reload();
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
                            Ext.getCmp("menurelateformid").getForm().reset();
                        }
                    }]
                }]
            }).show().center()
        }
    },
    menurelatedelete : function(){
        var deleterecord = Ext.getCmp("menurelateid").getSelectionModel().getSelection();
        var listvalue="";
        for(var i = 0,len=deleterecord.length;i<len;i++){
            listvalue += deleterecord[i].get("menuinfoid");
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
                        url : "/menurelatedelete?arry="+listvalue,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg :msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                            Ext.getCmp("menurelateid").store.reload();
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
    menurelateselect : function(){
        Ext.getCmp("menurelateid").store.reload({
            params : {
                arry : Ext.getCmp("menurelatemohuid").getValue()
            }
        })
    }
});