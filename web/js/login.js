Ext.define("newlogin.js",{
   extend : "Ext.panel.Panel",
    initComponent : function(){
        var me = this;
        Ext.apply(this,{
            width : 250,
            height : 160,
            border : false,
            bodyStyle : {
                background : "#8BBA5D"
            },
            layout : "fit",
            items : [{
               xtype : "form",
                id : "loginformid",
               border : false,
                bodyStyle : {
                    background : "#8BBA5D"
                    //background : "#89CA49"
                },
               defaults : {
                  xtype : "textfield",
                  labelWidth : 45,
                  border : false,
                  labelAlign : "right",
                  margin : "10 10 10 10",
                  allowBlank : false
               },
               layout : "vbox",
                items: [
                    {
                        fieldLabel: "姓名",
                        blankText: "姓名不能为空",
                        name: "oper.operName",
                        id: "opername"
                    },
                    {
                        fieldLabel: "密码",
                        blankText: "密码不能为空",
                        inputType: "password",
                        name: "oper.pwd"
                    },
                    {
                        xtype: "panel",
                        layout: "column",
                        border : false,
                        bodyStyle : {
                            background : "#8BBA5D"
                        },
                        width :300,
                        defaults : {
                            bodyStyle : {
                                background : "#8BBA5D"
                            }
                        },
                        items: [
                            {
                                fieldLabel: "验证码",
                                xtype: "textfield",
                                labelWidth: 45,
                                width :150,
                                labelAlign: "right",
                                allowBlank : false,
                                name: "checknum"
                            },
                            {
                                border: false,
                                html: "&nbsp;<img src='validCode.jsp' style='width:72px;height:22px;' onclick='this.src=\"validCode.jsp?r=\"+Math.random()'/>"
                            }
                        ]
                    }
                ],
                buttonAlign: "center",
                buttons: [
                    {
                        text: "登陆",
                        style : {
                            background : "#89CA49"
                        },
                        handler: me.dologin
                    },
                    {
                        text: "重置",
                        style : {
                            background : "#89CA49"
                        },
                        handler: function () {
                            this.up("panel").down("form").getForm().reset();
                        }
                    }
                ]
            }]
        }).center();
        this.callParent()
    },
    dologin: function () {
        var form = Ext.getCmp("loginformid").getForm();
        if (form.isValid()) {
            form.submit({
                url: "/operlogin",
                waitTitle : "系统提示",
                waitMsg : "正在进行登录验证..........",
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    if (msg.isno) {
                        Ext.Msg.show({
                            title: "系统提示",
                            msg: msg.message,
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.YES
                        });
                        window.location = "/maininsert"
                    } else {
                        Ext.Msg.show({
                            title: "系统提示",
                            msg: msg.message,
                            icon: Ext.Msg.WARNING,
                            buttons: Ext.Msg.YES
                        });
                    }
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
});