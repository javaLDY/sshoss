Ext.define("js.totalkucun",{
   extend : "Ext.grid.Panel",
   initComponent : function(){
       var store = Ext.create("Ext.data.Store",{
          pageSize : 5,
          proxy : {
              url : "/stockinfoselect",
              type : "ajax",
              reader : {
                  type : "json",
                  root : "liststockinfo",
                  totalProperty : "rows"
              }
          },
           fields : [
               "id","avgPrice","num","TMeMerchandiseInfoByMerchandiseId.merchandiseId"
           ],
           autoLoad : true
       });
       store.load({
           params : {
               start : 0,
               limit : 5
           }
       });
       Ext.apply(this,{
          title : "库存信息展示",
          titleAlign : "center",
          id : "totalchuku",
          store : store,
          columns : [
              {text : "库存编码",dataIndex:"id",align : "center",flex:1},
              {text : "商品编码",dataIndex:"TMeMerchandiseInfoByMerchandiseId.merchandiseId",align : "center",flex:1},
              {text : "加权平均价",dataIndex:"avgPrice",align : "center",flex:1},
              {text : "库存数量",dataIndex:"num",align : "center",flex:1}
          ],
           dockedItems : [{
               xtype : "pagingtoolbar",
               store : store,
               dock : "bottom",
               displayInfo : true
           }]
       });
       this.callParent();
   }
});