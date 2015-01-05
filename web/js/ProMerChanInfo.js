Ext.define("js.ProMerChanInfo",{
    extend : "Ext.form.Panel",
    initComponent : function(){
        var me = this;
         var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners : {
                edit : function(editor,context){
                    var mystore = Ext.data.StoreManager.lookup("mystore");
                    if(context.record.data.merchandiseId&&context.record.data.merchandiseName&&context.record.data.merchandiseAb){
                        mystore.add({});
                    }
                }
            }
        });
        var store = Ext.create("Ext.data.ArrayStore",{
                id : "mystore",
                fields : [
                    "merchandiseId","merchandiseName","merchandiseAb","price","saleStatus","spec","describe","picPath","clickCount","remark","tMeMerchandiseCInfoByMerchandiseCid","tMeProStatusInfoByProStatusId","tMeUnitInfoByUnitId"
                ],
                data : [
                    {}
                ]
            });
        var salestatus = Ext.create("Ext.data.Store",{
            id : "ghgstore",
            fields : [
                "abbr","name"
            ],
            data : [
                {abbr : "true",name:"上架"},
                {abbr : "false",name:"下架"}
            ]
        });
        var unitinfo = Ext.create("Ext.data.Store",{
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
        });
        var mercheninfo = Ext.create("Ext.data.Store",{
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
        });
        var prostatusinfo = Ext.create("Ext.data.Store",{
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
        });

        Ext.apply(this,{
            title : "商品信息",
            titleAlign : "center",
            id : "formf",
            items : [{
                xtype : "grid",
                id : "ProMerChanInfo",
                store : store,
                plugins: cellEditing,
                columns : [
                    {text : "商品编码",dataIndex :"merchandiseId",flex : 1,align : "center",editor:{
                        allowBlank: false
                    }},
                    {text : "商品名称",dataIndex :"merchandiseName",flex : 1,align : "center",editor:{
                        name : "mer.merchandiseName",
                        allowBlank: false}
                    },
                    {text : "商品价格",dataIndex :"price",flex : 1,align : "center",editor:{
                        name : "mer.price",
                        allowBlank: false}
                    },
                    {text : "商品单位",dataIndex :"tMeUnitInfoByUnitId",flex : 1,align : "center",editor : Ext.create("Ext.form.ComboBox",{
                        name : "tMeUnitInfoByUnitId.unitId",
                        xtype : "combo",
                        store : unitinfo,
                        queryMode : "local",
                        displayField : "name",
                        valueField : "unitId"
                    }) },
                    {text : "商品促销状态",dataIndex :"tMeProStatusInfoByProStatusId",flex : 1,align : "center",editor : Ext.create("Ext.form.ComboBox",{
                        name : "mer.proStatusName",
                        xtype : "combo",
                        store : prostatusinfo,
                        queryMode : "local",
                        displayField : "proStatusName",
                        valueField : "proStatusId"
                    })},
                    {text : "商品类别",dataIndex :"tMeMerchandiseCInfoByMerchandiseCid",flex : 1,align : "center",editor : Ext.create("Ext.form.ComboBox",{
                        name : "mer.proStatusName",
                        xtype : "combo",
                        store : mercheninfo,
                        queryMode : "local",
                        displayField : "merchandiseCName",
                        valueField : "merchandiseCid"
                    }) },
                    {text : "助记码",dataIndex :"merchandiseAb",flex : 1,align : "center",editor:{
                        name : "mer.merchandiseAb",
                        allowBlank: false}
                    },
                    {text : "规格",dataIndex :"spec",flex : 1,align : "center",editor:{
                        name : "mer.spec",
                        allowBlank: false}
                    },
                    {text : "描述",dataIndex :"describe",flex : 1,align : "center",editor:{
                        name : "mer.describe",
                        allowBlank: false}
                    },
                    {text : "图片",dataIndex :"picPath",flex : 1,align : "center",editor:{
                        name : "mer.picPath",
                        allowBlank: false}
                    },
                    {text : "点击数",dataIndex :"clickCount",flex : 1,align : "center",editor:{
                        name : "mer.clickCount",
                        allowBlank: false}
                    },
                    {text : "备注",dataIndex :"remark",flex : 1,align : "center",editor:{
                        name : "mer.remark",
                        allowBlank: false}
                    },
                    {text : "销售状态",dataIndex :"saleStatus",flex : 1,align : "center",editor : Ext.create("Ext.form.ComboBox",{
                        xtype : "combo",
                        store : salestatus,
                        queryMode : "local",
                        displayField : "name",
                        valueField : "abbr",
                        name : "mer.saleStatus"
                    }) }

                ],
                tbar: [
                    {
                        xtype: "button",
                        text: "添加",
                        handler:me.promerchaninfoinsert


                    },
                    {
                        xtype: "button",
                        text: "修改"
                        //handler : function(){me.updatemerchaninfo(me)}
                    },
                    {
                        xtype: "button",
                        text: "删除"
                        //handler : me.deletemerchencinfo
                    },
                    {
                        xtype : "panel",
                        defaults : {
                            width : 270,
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
                                text: "查询"
                                // handler : me.selectmercheninfo
                            }]
                        }]
                    },
                    {
                        text : "提交",
                        handler : me.formsubmitinsert
                    }
                ]

            }]

        });
        this.callParent();
    },
    promerchaninfoinsert : function(){
        var record = Ext.getCmp("ProMerChanInfo").getSelectionModel().getSelection();
        var list = "";
        for(var i = 0,len=record.length;i<len;i++){
            list += record[i].get("merchandiseName") + ',' + record[i].get("merchandiseAb") + ',' +record[i].get("price") + ',' + record[i].get("saleStatus") + ',' +record[i].get("spec") + ',' + record[i].get("describe") + ',' +record[i].get("picPath") + ',' + record[i].get("clickCount") + "," + record[i].get("remark");
            if(i!=len-1){
                list += "|"
            }
        }
        Ext.Msg.show({
            title : "系统提示",
            msg : "确定提交【"+len+"】条吗?",
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.YESNO,
            fn : function(btn){
                if(btn==="yes"){
                    Ext.Ajax.request({
                       url : "userinfo?"+list,
                       success : function(response) {
                           var msg = Ext.JSON.decode(response.responseText);
                           Ext.Msg.show({
                               title: "系统提示",
                               msg: msg.message,
                               icon: Ext.Msg.WARNING,
                               buttons: Ext.Msg.YESNO
                           })
                       },
                       failure : function(response) {
                           var msg = Ext.JSON.decode(response.responseText);
                           Ext.Msg.show({
                               title: "系统提示",
                               msg: msg.message,
                               icon: Ext.Msg.WARNING,
                               buttons: Ext.Msg.YESNO
                           })
                       }
                    });
                }
            }
        });
    },
    formsubmitinsert : function(){
        var form = Ext.getCmp('formf');
        if(form.isValid()){
            form.submit({
               url : "heellelelele.jsp",
               success : function(from,action){

               },
               failure : function(from,action){}
            })
        }
    }
});