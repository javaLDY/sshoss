<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-12-10
  Time: 23:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <link href="extjs/resources/ext-theme-gray/ext-theme-gray-all-debug.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="extjs/ext-all.js"></script>
    <script type="text/javascript" src="js/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <style type="text/css">
        #box{margin: 450px;}
    </style>
    <script type="text/javascript">
        Ext.onReady(function(){
            Ext.create("newlogin.js",{
                renderTo : box
            }).center();
        });
    </script>
</head>
<body style="background:url(images/loginbackground.jpg) no-repeat center top;">
<div id="box" >

</div>
</body>
</html>
