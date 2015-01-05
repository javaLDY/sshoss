Ext.define("js.instockdetatil",{
    extend : "Ext.grid.Panel",
    dd : "",
    requires: [
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.ProgressBarPager'
    ],
    initComponent : function(){
        var me = this;
        var store = Ext.create("Ext.data.Store",{
           pageSize : 5,
           proxy : {
               type : "ajax",
               url : "/instockinfodetailselect?arry="+me.dd,
               reader : {
                   type : "json",
                   root : "listinstock",
                   totalProperty : "rows"
               }
           },
            fields : [
                "id","num","TMeInStockInfoByBillCode.billCode","price"
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
           store : store,
           id : "aaa",
           height : 575,
           title : "入库单数据",
           titleAlign : "center",
           columns : [
               {text : "入库单号",dataIndex : "TMeInStockInfoByBillCode.billCode",flex : 1},
               {text : "入库明细码",dataIndex : "id",flex : 1},
               {text : "数量",dataIndex : "num",flex : 1},
               {text : "价格",dataIndex : "price",flex : 1},
               {text : "商品编码",dataIndex : "id",flex : 1}
           ],
            dockedItems : [{
                xtype : "pagingtoolbar",
                store : store,
                dock : "bottom",
                displayInfo : true,
                plugins: new Ext.ux.SlidingPager()
            }]
        });
        this.callParent()
    }
});