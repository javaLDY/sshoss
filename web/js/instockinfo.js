Ext.define("js.instockinfo",{
   extend : "Ext.grid.Panel",
   initComponent : function(){
       var store = Ext.create("Ext.data.Store",{
           pageSize : 5,
           id : "mystore",
           proxy : {
               type : "ajax",
               url : "/instockinfoselect",
               reader : {
                   type : "json",
                   root : "inStockInfoList",
                   totalProperty : "rows"
               }
           },
           fields : [
               {name : "id",type:"int"},
               {name : "billCode",type:"String"},
               {name : "inType",type:"byte"},
               {name : "tAuOperInfoByOperId.operId",type:"String"},
               {name : "inTime",type:"Timestamp"},
               {name : "handler",type:"String"},
               {name : "totalMoney",type:"BigDecimal"},
               {name : "remark",type:"String"},
               {name : "instockinfoname",type:"String"},
               {name : "tBaSupplierInfoBySupplierId.supplierId",type:"String"}
           ],
           autoLoad : false
       });
       store.load({
            params : {
                start : 0,
                limit : 5
            }
       });
       Ext.apply(this,{
          id : "instockinfo",
          height : 396,
          store : Ext.data.StoreManager.lookup("mystore"),
          columns : [
              {text :"入库流水号",dataIndex:"id"},
              {text :"入库单号",dataIndex:"billCode"},
              {text :"操作员编码",dataIndex:"tAuOperInfoByOperId.operId"},
              {text :"供应商编码",dataIndex:"tBaSupplierInfoBySupplierId.supplierId"},
              {text :"入库方式",dataIndex:"inType"},
              {text :"入库时间",dataIndex:"inTime"},
              {text :"经手人",dataIndex:"handler"},
              {text :"入库金额",dataIndex:"totalMoney"},
              {text :"备注",dataIndex:"remark"},
              {text :"入库类型",dataIndex:"instockinfoname",flex:1}
          ],
           dockedItems : [{
               xtype : "pagingtoolbar",
               store : store,
               dock : "bottom",
               displayInfo : true
           }],
           tbar : [{
               text : "添加",
               xtype : "button"
           },{
               text : "修改",
               xtype : "button"
           },{
               text : "删除",
               xtype : "button"
           }]
       });
       this.callParent()
   }
});