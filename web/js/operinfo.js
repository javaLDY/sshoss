Ext.define("js.operinfo",{
   extend : "Ext.panel.Panel",
   //操作员状态combox
    operstate : Ext.create("Ext.data.Store",{
      fields : [
          "abbr","name"
      ],
       data : [
           {"abbr" : 1,"name":"使用"},
           {"abbr" : 0,"name":"关闭"}
       ]
   }),
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    //角色编码store
    rolestore : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/operrolecombox",
            type : "ajax",
            reader : {
                type : "json",
                root : "list"
            }
        },
        fields : [
            "RoleID","RoleName"
        ],
        autoLoad : true
    }),
    jsonData : {},
   initComponent : function(){
       var me = this;
       var store = Ext.create("Ext.data.Store",{
          pageSize : 5,
          proxy : {
              url : "/operselect",
              type : "ajax",
              reader : {
                  type : "json",
                  root : "operinfolist",
                  totalProperty : "rows"
              }
          },
           listeners: {
               beforeload: function (mystore, operation) {
                   if (Ext.getCmp("opermohuid")) {
                       var name = Ext.getCmp("opermohuid").getValue();
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
           fields : [
               "operName","TAuRoleInfoByRoleId.roleName","pwd","address","linkTel","qq","email","mobile","sortId","state","operId","TAuRoleInfoByRoleId.roleId"
           ],
           autoLoad : false
       });
       store.load({
           params : {
               start : 0,
               limit : 5
           }
       });
       var checkBox = Ext.create("Ext.selection.CheckboxModel");
       Ext.apply(this,{
           width : 1508,
           height : 743,
           id : "operinfo",
           layout : "border",
           items : [{
               region : "north",
               xtype : "form",
               title : "操作员信息",
               frame : true,
               id : "operform",
               titleAlign : "center",
               defaults : {
                   xtype : "textfield",
                   labelWidth : 65,
                   labelAlign : "right",
                   margin : "20 20 20 20"
               },
               layout : "column",
               items : [{
                   fieldLabel : "操作员名称",
                   name : "oper.operName"
               },{
                   fieldLabel : "角色编码",
                   name : "oper.TAuRoleInfoByRoleId.roleId",
                   xtype : "combo",
                   queryMode: 'local',
                   displayField: 'RoleName',
                   valueField: 'RoleID',
                   editable : false,
                   store : me.rolestore
               },{
                   fieldLabel : "密码",
                   name : "oper.pwd"
               },{
                   fieldLabel : "地址",
                   name : "oper.address"
               },{
                   fieldLabel : "联系电话",
                   name : "oper.linkTel"
               },{
                   fieldLabel : "QQ",
                   name : "oper.qq"
               },{
                   fieldLabel : "Email",
                   name : "oper.email"
               },{
                   fieldLabel : "手机号码",
                   name : "oper.mobile"
               },{
                   fieldLabel : "排序编码",
                   name : "oper.sortId"
               },{
                   fieldLabel : "状态",
                   xtype : "combo",
                   editable : false,
                   store: me.operstate,
                   queryMode: 'local',
                   displayField: 'name',
                   valueField: 'abbr',
                   name : "oper.state"
               }],
               buttonAlign : "center",
               buttons : [{
                   text : "提交",
                   icon : "images/accept.png",
                   style : {
                       borderColor : "#89CA49"
                   },
                   handler : me.operinsert
               },"","",{
                   text : "重置",
                   style : {
                       borderColor : "#89CA49"
                   },
                   icon : "images/reset.png",
                   handler : function(){
                       Ext.getCmp("operform").getForm().reset();
                   }
               },"","",{
                   text : "删除",
                   style : {
                       borderColor : "#89CA49"
                   },
                   icon : "images/shanchu.png",
                   handler : me.operdelete
               },"","",{
                   text : "修改",
                   style : {
                       borderColor : "#89CA49"
                   },
                   icon : "images/xiugai.png",
                   handler : function(){
                       me.operupdate(me)
                   }
               },"","",{
                   xtype : "panel",
                   layout : "column",
                   items : [{
                       fieldLabel : "操作员名称",
                       labelWidth : 65,
                       labelAlign : 'right',
                       id : "opermohuid",
                       xtype : "textfield"
                   },{
                       xtype : "button",
                       text : "查看",
                       style : {
                           borderColor : "#89CA49"
                       },
                       handler : me.operselect
                   }]
               }]
           },{
               xtype : "grid",
               store : store,
               region : "center",
               selModel : checkBox,
               disableSelection : false,
               id : "operinfoid",
               columns : [
                   {text : "操作员编码",dataIndex : "operId",align : "center",flex : 1},
                   {text : "角色编码",dataIndex : "TAuRoleInfoByRoleId.roleId",align : "center",flex : 1,hidden : true},
                   {text : "操作员名称",dataIndex : "operName",align : "center",flex : 1},
                   {text : "角色编号",dataIndex : "TAuRoleInfoByRoleId.roleName",align : "center",flex : 1},
                   {text : "密码",dataIndex : "pwd",align : "center",flex : 1},
                   {text : "地址",dataIndex : "address",align : "center",flex : 1},
                   {text : "联系电话",dataIndex : "linkTel",align : "center",flex : 1},
                   {text : "QQ",dataIndex : "qq",align : "center",flex : 1},
                   {text : "邮箱",dataIndex : "email",align : "center",flex : 1},
                   {text : "手机",dataIndex : "mobile",align : "center",flex : 1},
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
               listeners : {
                   itemcontextmenu : function(opergrid, record, item, index, e){
                       e.preventDefault();
                       e.stopEvent();
                       var f = 1;
                       if(f===1){
                           Ext.getCmp("eastaaaaaaa").expand();
                           f = 0;
                       }else{
                           Ext.getCmp("eastaaaaaaa").collapse();
                           f = 1;
                       }
                       var menu = new Ext.menu.Menu({
                           float : true,
                           items : [{
                               text : "查看权限",
                               handler : function(){
                                   this.up("menu").hide();
                                   arry = record.get("operId");
                                   arry1 = record.get("operName");
                                   var aa = Ext.getCmp("operinfoeastsb").getRootNode();
                                    Ext.Ajax.request({
                                       url:"/treeNodeSelect?arry="+arry,
                                       async: false,
                                       success:function(response){
                                           me.jsonData = response.responseText;
                                           if (typeof(me.jsonData) === 'string'){
                                               me.jsonData = Ext.JSON.decode(me.jsonData);
                                               me.mystore= me.jsonData.node.children;
                                               aa.removeAll(false);
                                               Ext.getCmp("operinfoeastsb").setRootNode(me.jsonData.node);
                                               Ext.getCmp("operinfoeastsb").getRootNode().data.text = arry1;
                                               Ext.getCmp("operinfoeastsb").expandAll();

                                           }
                                       }
                                   });
                               }
                           }]
                       }).showAt(e.getXY());
                   }
               }
           },{
               region : "east",
               border : false,
               id : "eastaaaaaaa",
               header : {
                   title : "权限展示",
                   titleAlign : "center",
                   style : {
                       background : "#83cbff"
                   },
                   border :false
               },
               collapsible : true,
               items : [{
                   id : "operinfoeastsb",
                   xtype : "treepanel",
                   collapsible : true,
                   split : true,
                   width : 200,
                   border :false,
                   store : Ext.create("Ext.data.TreeStore",{
                       fields : [
                           {name : "text",type : "String",mapping : "menu.text"}
                       ],
                       root: {
                           text: "权限展示",
                           id: '-1',
                           children:me.mystore
                       }
                   })
               }],
               collapsed: true
           }]
       });
       this.callParent();
   },
    operinsert : function(){
        var form = Ext.getCmp("operform").getForm();
        if(form.isValid()){
            form.submit({
                url : "/operinfoinsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg : msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                    Ext.getCmp("operform").getForm().reset();
                    Ext.getCmp("operinfoid").store.reload();
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
    },
    operupdate : function(MSG){
        var me= MSG;
        var record = Ext.getCmp("operinfoid").getSelectionModel().getSelection()[0];
        if(record==null){
            Ext.Msg.show({
                title : "系统提示",
                msg : "请选择你要更新的数据",
                icon : Ext.Msg.WARNING,
                buttons : Ext.Msg.YES
            })
        }else{
            Ext.create("Ext.window.Window",{
                title : "菜单更新",
                layout : "fit",
                frame : true,
                id : "operinfoupdatewindow",
                items : [{
                    xtype : "form",
                    id : "operinfoupdateformid",
                    defaults : {
                        xtype : "textfield",
                        margin : "5 5 5 5",
                        labelWidth : 65,
                        labelAlign : "right"
                    },
                    items : [{
                        fieldLabel : "操作员名称",
                        name : "oper.operName",
                        value : record.get("operName"),
                        readOnly : true
                    },{
                        fieldLabel : "QQ",
                        name : "oper.qq",
                        value : record.get("qq")
                    },{
                        fieldLabel : "密码",
                        name : "oper.pwd",
                        value : record.get("pwd")
                    },{
                        fieldLabel : "地址",
                        name : "oper.address",
                        value : record.get("address")
                    },{
                        fieldLabel : "联系电话",
                        name : "oper.linkTel",
                        value : record.get("linkTel")
                    },{
                        fieldLabel : "角色名称",
                        xtype : "combo",
                        queryMode: 'local',
                        displayField: 'RoleName',
                        valueField: 'RoleID',
                        store : me.rolestore,
                        name : "oper.TAuRoleInfoByRoleId.roleId",
                        value : record.get("TAuRoleInfoByRoleId.roleName")
                    },{
                        fieldLabel : "Email",
                        name : "oper.email",
                        value : record.get("email")
                    },{
                        fieldLabel : "手机号码",
                        name : "oper.mobile",
                        value : record.get("mobile")
                    },{
                        fieldLabel : "排序编码",
                        name : "oper.sortId",
                        value : record.get("sortId")
                    },{
                        fieldLabel : "状态",
                        name : "oper.state",
                        xtype : "combo",
                        queryMode: 'local',
                        displayField : "name",
                        valueField : "abbr",
                        store : me.operstate
                    }
                    ],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : function(){
                            var form = Ext.getCmp("operinfoupdateformid").getForm();
                            if(form.isValid()){
                                form.submit({
                                    url : "/operupdate",
                                    success : function(form,action){
                                        var msg = Ext.JSON.decode(action.response.responseText);
                                        Ext.Msg.show({
                                            title : "系统提示",
                                            msg : msg.message,
                                            icon : Ext.Msg.WARNING,
                                            buttons : Ext.Msg.YES
                                        });
                                        Ext.getCmp("operinfoupdatewindow").close();
                                        Ext.getCmp("operinfoid").store.reload();
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
                            Ext.getCmp("operinfoupdateformid").getForm().reset();
                        }
                    }]
                }]
            }).show().center()
        }
    },
    operdelete : function(){
        var record = Ext.getCmp("operinfoid").getSelectionModel().getSelection();
        var listvalue = "";
        for(var i = 0,len=record.length;i<len;i++){
            listvalue += record[i].get("operId");
            if(i!=len-1){
                listvalue += ","
            }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定删除这【"+len+"】条吗?",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                       url : "/operdelete?arry=" + listvalue,
                       success : function(response){
                           var msg = Ext.JSON.decode(response.responseText);
                           Ext.Msg.show({
                               title : "系统提示",
                               msg : msg.message,
                               icon : Ext.Msg.WARNING,
                               buttons : Ext.Msg.YES
                           });
                           Ext.getCmp("operinfoid").store.reload();
                       },
                        failure : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YESNO
                            })
                        }
                    });
                }
            }
        })
    },
    operselect : function(){
        Ext.getCmp("operinfoid").store.reload({
            params : {
                arry : Ext.getCmp("opermohuid").getValue()
            }
        })
    }
});