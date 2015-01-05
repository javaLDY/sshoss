Ext.define("js.tree",{
   arry :{},
    arry1 : "",
   extend : "Ext.tree.Panel",
    initComponent : function(){
        var me = this;

        var aa = Ext.Ajax.request({
            url:"/treeNodeSelect?arry="+me.arry,
            async: false,
            success:function(response){
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string'){
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });

        var store = Ext.create("Ext.data.TreeStore",{
        fields : [
            {name : "text",type : "String",mapping : "menu.text"}
        ],
            root: {
                text: me.arry1,
                id: '-1',
                children: me.jsonData.node.children
            }
        });
        debugger;
        Ext.apply(this,{
           id : "treeid",
           collapsible: false,
           border : false,
           expanded : true,
           autoScroll:true,
           titleAlign : "center",
           store: store
        });
        this.callParent();
    }
});