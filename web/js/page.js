Ext.define("pifu",{
   extend : "Ext.form.ComboBox",
   initComponent : function(){
       var Mystore = Ext.create("Ext.data.Store",{
       fields:['theme','css'],
       data:[
           {theme:'默认', css:'ext-all.css'},
           {theme:'紫色', css:'xtheme-purple.css'},
           {theme:"橄榄色", css:"xtheme-olive.css"},
           {theme:"黑色", css:"xtheme-black.css"},
           {theme:"巧克力色", css:"xtheme-chocolate.css"},
           {theme:"深黑色", css:"xtheme-galdaka.css"},
           {theme:"浅灰色", css:"xtheme-gray-extend.css"},
           {theme:"绿色", css:"xtheme-green.css"},
           {theme:"靛青色", css:"xtheme-indigo.css"},
           {theme:"椒盐色", css:"xtheme-peppermint.css"},
           {theme:"银白色", css:"xtheme-silverCherry.css"},
           {theme:"暗蓝色", css:"xtheme-slate.css"},
           {theme:"透明色", css:"xtheme-slickness.css"},
           {theme:"透明色1", css:"xtheme-slickness2.css"}

       ]
       });
       var Mycombo = Ext.apply(this,{
               xtype : "combo",
               fieldLabel:'更换皮肤',
               id:'css',
               triggerAction:'all',
               store:Mystore,
               displayField:'theme',
               valueField:'css',
               value:'默认',
               mode:'local',
               anchor:'95%',
               handleHeight:10,
               resizable:true,
               selectOnfocus:true,
               typeAhead:true,
       listeners : {
           "select":function(){
               var css = Mycombo.getValue();                            //设置cookies 
               var date=new Date();                            //alert(css); 
               date.setTime(date.getTime()+30*24*3066*1000);
               document.getElementsByTagName("link")[1].href="extjs/resources/css/"+css;
               document.cookie="css="+css+";expires="+date.toGMTString();
           }
       }
   });
       this.callParent()
   }
});