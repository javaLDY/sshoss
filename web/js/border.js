Ext.define("border",{
   extend : "Ext.container.Viewport",
   initComponent : function(){
       var me = this;
       var Mystore = Ext.create("Ext.data.Store",{
           fields:['theme','css'],
           data:[
               {theme:'默认', css:'ext-all.css'},
               {theme:"橄榄色", css:"xtheme-olive.css"},
               {theme:"浅灰色", css:"xtheme-gray-extend.css"},
               {theme:"绿色", css:"xtheme-green.css"},
               {theme:"椒盐色", css:"xtheme-peppermint.css"},
               {theme:"win8",css:"ext-all-neptune-debug.css"},
               {theme:"灰色",css:"ext-all-gray-debug.css"}
           ]
       });
       Ext.apply(this,{
         layout : "border",
         items : [
             {
                 title : "标题",
                 region : "north",
                 width : 200,
                 height :100,
                 html : "<h1>我爱你阿池</h1>",
                 items : [{
                     xtype : "combo",
                     fieldLabel:'更换皮肤',
                     id:'css',
                     labelWidth : 60,
                     labelAlign : "right",
                     triggerAction:'all',//显示所有的下拉列表的值
                     store:Mystore,
                     displayField:'theme',
                     valueField:'css',
                     value:'默认',
                     mode:'local',
                     anchor:'95%',
                     handleHeight:10,
                     //sizable:true,//尺寸是可以变化的
                     selectOnfocus:true,
                     typeAhead:true,//消除缓存
                     listeners : {
                         "select":function(){
                             var css = Ext.getCmp("css").getValue();                            //设置cookies 
                             var date=new Date();                            //alert(css); 
                             date.setTime(date.getTime()+30*24*3066*1000);
                             document.getElementsByTagName("link")[1].href="extjs/resources/css/"+css;
                             document.cookie="css="+css+";expires="+date.toGMTString();
                         }
                     }
                 }]
             },{
                 title : "菜单",
                 region : "west",
                 width : 200,
                 height : 200
             },{
                 title : "主界面",
                 region : "center"
             },{
                 title : "标注",
                 region : "south",
                 width : 200,
                 height : 200
             }
         ]
       });
        this.callParent()
   }

});