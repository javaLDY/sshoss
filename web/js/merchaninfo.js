Ext.define("js.merchaninfo",{
    extend : "Ext.panel.Panel",
        unitinfo : Ext.create("Ext.data.Store",{
            proxy : {
                url : "/unitinfoselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "unitlist"
                }
            },
            fields : [
                "unitId","name"
            ],
            autoLoad: true
        }),
        mercheninfo : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/merchenselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "listmerCinfo"
            }
        },
        fields : [
            "merchandiseCid","merchandiseCName"
        ],
        autoLoad: true
    }),
     prostatusinfo : Ext.create("Ext.data.Store",{
        proxy : {
            url : "/prostatusinfoselect",
            type : "ajax",
            reader : {
                type : "json",
                root : "prostatuslist"
            }
        },
        fields : [
            "proStatusId","proStatusName"
        ],
        autoLoad: true
    }),
     salepromerinfo : Ext.create("Ext.data.Store",{

        fields : [
            "abbr","name"
        ],
        data : [
            {abbr : "true",name:"上架"},
            {abbr : "false",name:"下架"}
        ]
    }),
    initComponent : function(){
        var me = this;
        var store = Ext.create("Ext.data.Store",{
            pageSize : 30,
            proxy : {
                url : "/promerchaninfoselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listman",
                    totalProperty : "rows"
                }
            },
            fields : [
                "merchandiseId","merchandiseName","merchandiseAb","price","saleStatus","spec","describe","picPath","clickCount","remark","TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid","TMeProStatusInfoByProStatusId.proStatusId","TMeUnitInfoByUnitId.unitId"
            ],
            listeners: {
                beforeload: function (mystore, operation) {
                    if (Ext.getCmp("merchaninfosel")) {
                        var name = Ext.getCmp("merchaninfosel").getValue();
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
                limit : 30
            }
        });
        var checkBox = Ext.create('Ext.selection.CheckboxModel');
        Ext.apply(this,{
            layout : "border",
            width :1920,
            id : "merchaninfo",
            height : 745,
            items : [{
                region : "center",
                xtype : "tabpanel",
                id : "stockcenter1",
                items : [{
                    title : "商品信息维护",
                    xtype : "panel",
                    items : [{
                        xtype : "grid",
                        store : store,
                        selModel:checkBox,
                        autoScroll : true,
                        id : "stockcenter11",
                        disableSelection: false,
                        columns : [
                            {text : "商品编码",dataIndex :"merchandiseId",flex : 1,align : "center"},
                            {text : "商品名称",dataIndex :"merchandiseName",flex : 1,align : "center"},
                            {text : "商品价格",dataIndex :"price",flex : 1,align : "center"},
                            {text : "商品单位编码",dataIndex :"TMeUnitInfoByUnitId.unitId",flex : 1,align : "center"},
                            {text : "商品促销状态编码",dataIndex :"TMeProStatusInfoByProStatusId.proStatusId",flex : 1,align : "center"},
                            {text : "商品类别编码",dataIndex :"TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid",flex : 1,align : "center"},
                            {text : "助记码",dataIndex :"merchandiseAb",flex : 1,align : "center"},
                            {text : "规格",dataIndex :"spec",flex : 1,align : "center"},
                            {text : "描述",dataIndex :"describe",flex : 1,align : "center"},
                            {text : "图片",dataIndex :"picPath",flex : 1,align : "center"},
                            {text : "点击数",dataIndex :"clickCount",flex : 1,align : "center"},
                            {text : "备注",dataIndex :"remark",flex : 1,align : "center"},
                            {text : "销售状态",dataIndex :"saleStatus",flex : 1,align : "center"}
                        ],
                        dockedItems : [{
                            xtype : "pagingtoolbar",
                            store : store,
                            dock : "bottom",
                            displayInfo : true
                        }],
                        tbar : [{
                            xtype : "button",
                            text : "添加",
                            style : {
                                borderColor : "#89CA49"
                            },
                            icon : "images/add.png",
                            handler : function(){me.merchaninfoinsert(me)}
                        },{
                            xtype : "button",
                            text : "修改",
                            style : {
                                borderColor : "#89CA49"
                            },
                            icon : "images/xiugai.png",
                            handler : function(){me.merchaninfoupdate(me)}
                        },{
                            xtype : "button",
                            text : "删除",
                            style : {
                                borderColor : "#89CA49"
                            },
                            icon : "images/shanchu.png",
                            handler : me.merchaninfodelete
                        },{
                            xtype : "panel",
                            defaults : {
                                width : 260,
                                border : false
                            },
                            items : [{
                                xtype : "panel",
                                layout : "column",
                                defaults : {
                                    labelWidth : 55,
                                    labelAlign : "right",
                                    border : false
                                },
                                items : [{
                                    fieldLabel : "商品名称",
                                    xtype : "textfield",
                                    id : "merchaninfose",
                                    name : "merchaninfosel"
                                },{
                                    xtype : "button",
                                    text : "查询",
                                    icon : "images/chakan.png",
                                    handler : me.merchaninfoselect
                                }]
                            }]
                        }]
                    }]}]}]
        });
        this.callParent()
    },
    merchaninfoinsert : function(MSG){
        var me = this;
        Ext.create("Ext.window.Window",{
            title : "商品信息",
            titleAlign : "center",
            id : "myinsert",
            frame : true,
            layout : "fit",
           //width : 600,
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
                    fieldLabel : "商品名称",
                    name : "mer.merchandiseName"
                },{
                    fieldLabel : "商品价格",
                    name : "mer.price",
                    regex : /^[0-9]*$/,
                    blankText : "只能是数字"
            },{
                    fieldLabel : "商品单位",
                    name : "mer.TMeUnitInfoByUnitId.unitId",
                    xtype : "combo",
                    store : me.unitinfo,
                    queryMode : "local",
                    displayField : "name",
                    valueField : "unitId",
                    editable : false
                },{
                    fieldLabel : "商品促销状态",
                    name : "mer.TMeProStatusInfoByProStatusId.proStatusId",
                    xtype : "combo",
                    store : me.prostatusinfo,
                    queryMode : "local",
                    displayField : "proStatusName",
                    valueField : "proStatusId",
                    editable : false
                },{
                    fieldLabel : "商品类别",
                    name : "mer.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid",
                    xtype : "combo",
                    store : me.mercheninfo,
                    queryMode : "local",
                    displayField : "merchandiseCName",
                    valueField : "merchandiseCid",
                    editable : false
                },{
                    fieldLabel : "助记码",
                    name : "mer.merchandiseAb"
                },{
                    fieldLabel : "规格",
                    name : "mer.spec"
                },{
                    fieldLabel : "描述",
                    name : "mer.describe"
                },{
                    fieldLabel : "图片",
                    xtype: 'filefield',
                    labelWidth: 50,
                    id : "pic_picture",
                    msgTarget: 'side',
                    allowBlank: false,
                    name : "uploadFile",
                    anchor: '100%',
                    buttonText: 'Select Photo...'
                },{
                    fieldLabel : "点击数",
                    name : "mer.clickCount"
                },{
                    fieldLabel : "销售状态",
                    xtype : "combo",
                    store : me.salepromerinfo,
                    queryMode : "local",
                    displayField : "name",
                    valueField : "unitId",
                    name : "mer.saleStatus"
                   //readOnly : true
                },{
                    fieldLabel : "备注",
                    name : "mer.remark"
                }],
                buttonAlign : "center",
                buttons : [{
                    text : "提交",
                    handler : me.realmerchaninfoinsert
                },{
                    text : "重置",
                    handler : function(){
                        Ext.getCmp("formid").getForm().reset();
                    }
                }]
            }]
        }).show();
    },
    realmerchaninfoinsert : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/promercheninfoinsert",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.show({
                        title: "系统提示",
                        msg: msg.message,
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.YES
                    });
                    Ext.getCmp("stockcenter11").store.reload();
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
    merchaninfoupdate : function(MSG1){
        var me = this;
        var record = Ext.getCmp("stockcenter11").getSelectionModel().getSelection()[0];
        if(record==null){
            Ext.Msg.alert("请选择你要更新的数据")
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
                    id : "formid",
                    defaults : {
                        xtype : "textfield",
                        allowBlank : false,
                        blankText : "必填字段不允许为空",
                        labelWidth : 70,
                        labelAlign : "right"
                    },items : [{
                        fieldLabel : "商品编码",
                        name : "mer.merchandiseId",
                        value : record.get("merchandiseId"),
                        hidden : true
                    },{
                        fieldLabel : "商品名称",
                        name : "mer.merchandiseName",
                        value : record.get("merchandiseName")
                    },{
                        fieldLabel : "商品价格",
                        name : "mer.price",
                        regex : /^[0-9]*$/,
                        blankText : "只能是数字",
                        value : record.get("price")
                    },{
                        fieldLabel : "商品单位",
                        name : "mer.TMeUnitInfoByUnitId.unitId",
                        xtype : "combo",
                        store : me.unitinfo,
                        queryMode : "local",
                        displayField : "name",
                        valueField : "unitId",
                        editable : false,
                        value : record.get("TMeUnitInfoByUnitId.unitId")
                    },{
                        fieldLabel : "商品促销状态",
                        name : "mer.TMeProStatusInfoByProStatusId.proStatusId",
                        xtype : "combo",
                        store : me.prostatusinfo,
                        queryMode : "local",
                        displayField : "proStatusName",
                        valueField : "proStatusId",
                        editable : false,
                        value : record.get("TMeProStatusInfoByProStatusId.proStatusId")
                    },{
                        fieldLabel : "商品类别",
                        name : "mer.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid",
                        xtype : "combo",
                        store : me.mercheninfo,
                        queryMode : "local",
                        displayField : "merchandiseCName",
                        valueField : "merchandiseCid",
                        editable : false,
                        value : record.get("TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid")
                    },{
                        fieldLabel : "助记码",
                        name : "mer.merchandiseAb",
                        value : record.get("merchandiseAb")
                    },{
                        fieldLabel : "规格",
                        name : "mer.spec",
                        value : record.get("merchandiseName")
                    },{
                        fieldLabel : "描述",
                        name : "mer.describe",
                        value : record.get("describe")
                    },{
                        fieldLabel : "图片",
                        name : "mer.picPath",
                        value : record.get("picPath")
                    },{
                        fieldLabel : "点击数",
                        name : "mer.clickCount",
                        value : record.get("clickCount")
                    },{
                        fieldLabel : "销售状态",
                        xtype : "combo",
                        store : me.salepromerinfo,
                        queryMode : "local",
                        displayField : "name",
                        valueField : "unitId",
                        name : "mer.saleStatus",
                        value : record.get("saleStatus")
                    },{
                        fieldLabel : "备注",
                        name : "mer.remark",
                        value : record.get("remark")
                    }],
                    buttonAlign : "center",
                    buttons : [{
                        text : "提交",
                        handler : me.realmerchaninfoupdate
                    },{
                        text : "重置",
                        handler : function(){
                            Ext.getCmp("formid").getForm().reset();
                        }
                    }]
                }]
            }).show();
        }

    },
    realmerchaninfoupdate : function(){
        var form = this.up("form").getForm();
        if(form.isValid()){
            form.submit({
                url : "/promerchaninfoupdate",
                success : function(form,action){
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.Msg.show({
                        title : "系统提示",
                        msg :msg.message,
                        icon : Ext.Msg.WARNING,
                        buttons : Ext.Msg.YES
                    });
                    Ext.getCmp("stockcenter11").store.reload();
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
    merchaninfodelete : function(){
        var record = Ext.getCmp("stockcenter11").getSelectionModel().getSelection();
        var list = "";
        for(var i = 0,len=record.length;i<len;i++){
            list += record[i].get("merchandiseId")
            if(i !=len-1){
                list += ","
            }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定要删除【"+len+"】条吗?",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                        url : "/promerchaninfodelete?arry="+list,
                        success : function(response){
                            var msg = Ext.JSON.decode(response.responseText);
                            Ext.Msg.show({
                                title : "系统提示",
                                msg : msg.message,
                                icon : Ext.Msg.WARNING,
                                buttons : Ext.Msg.YES
                            });
                            Ext.getCmp("stockcenter11").store.reload();
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
    merchaninfoselect : function(){
        Ext.getCmp("stockcenter11").store.reload({params : {merchaninfosel:Ext.getCmp("merchaninfose").getValue()}})
    }
});