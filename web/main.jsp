<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-12-01
  Time: 8:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title></title>
    <link href="extjs/resources/ext-theme-gray/ext-theme-gray-all-debug.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="extjs/ext-all.js"></script>
    <script type="text/javascript" src="js/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/newmain.js"></script>
    <style type="text/css">
        .newmian{background-image : url(images/muban1.jpg)!important}
        .button1{background-image:url(images/home.png)!important;}
        .button2{background-image:url(images/ruku.png)!important;}
        .button3{background-image:url(images/jiaoyi.png)!important;}
        .button4{background-image:url(images/baobei.png)!important;}
        .button5{background-image:url(images/fahuo.png)!important;}
        .button6{background-image:url(images/kehu.png)!important;}
        .button7{background-image:url(images/yunfei.png)!important;}
        .button8{background-image:url(images/genzong.png)!important;}
        .button9{background-image:url(images/duanxin.png)!important;}
        .button0{background-image:url(images/shezhi.png)!important;}
        body {background-color: #3892d3; font-size:12px; }
        .part01{ width:90%; height:48px; margin-left: 10px; margin-top: 10px; margin-right: 10px;border: 1px solid #83cbff}
        .part01:hover{ background:#83cbff}
        .part01 img{ width:32px; height:32px; float:left; margin-right: 10px;}
        .con{ width: auto; height:48px; float:left}
        .con span{ font:normal 12px/18px ""; display:block; height:18px}
        .con .con1{ width: auto; height:30px;}
        #aaaa{background: url(images/muban1.jpg) repeat-x;}
    </style>
    <script type="text/javascript">
        Ext.onReady(function(){
            Ext.create("newmain",{
                renderTo : Ext.getBody()
            }).center();
        });
    </script>
</head>
<body>
<s:hidden  id="aa" value="%{#session.src.operName}"></s:hidden>
<s:hidden  id="bb" value="%{#session.src.TAuRoleInfoByRoleId.roleName}"></s:hidden>
</body>
</html>
