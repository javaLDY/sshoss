<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/12/14
  Time: 9:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <link href="extjs/resources/ext-theme-gray/ext-theme-gray-all-debug.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="extjs/ext-all.js"></script>
    <script type="text/javascript" src="js/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/test.js"></script>
    <script type="text/javascript">
        Ext.onReady(function(){
            Ext.create("test",{
                renderTo : Ext.getBody()
            }).center();
        });
    </script>
</head>
<body>

</body>
</html>
