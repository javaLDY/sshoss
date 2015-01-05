Ext.define("test",{
    extend:'Ext.panel.Panel',
    require:[
        'Ext.chart.*',
        'Ext.layout.container.Fit',
        'Ext.grid.Panel'
    ],
    initComponent: function () {
        var pieStore = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/dayinstocknumselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listvalue"
                }
            },
            fields : [
                "detail",
                "MerchandiseName",
                "InTime"
            ],
            autoLoad : true
        });

        var pieChart = Ext.create('Ext.chart.Chart', {
            width: 100,
            height: 100,
            animate: false,
            store: pieStore,
            shadow: false,
            insetPadding: 0,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'detail',
                showInLegend: false,
                label: {
                    field: 'MerchandiseName',
                    display: 'rotate',
                    contrast: true,
                    font: '9px Arial'
                }
            }]
        });

        var gridStore = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/dayinstocknumselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listvalue"
                }
            },
            fields : [
                "detail",
                "MerchandiseName",
                "InTime"
            ],
            autoLoad : true
        });

        var grid = Ext.create('Ext.grid.Panel', {
            store: gridStore,
            height: 130,
            width: 480,
            columns: [
                {
                    text   : 'name',
                    dataIndex: 'MerchandiseName'
                },
                {
                    text   : 'data',
                    dataIndex: 'detail'
                }
            ]
        });

        var store1 = Ext.create('Ext.data.JsonStore', {
            proxy : {
                url : "/dayinstocknumselect",
                type : "ajax",
                reader : {
                    type : "json",
                    root : "listvalue"
                }
            },
            fields : [
                "detail",
                "MerchandiseName",
                "InTime"
            ],
            autoLoad : true
        });

        var chart = Ext.create('Ext.chart.Chart', {
            animate: true,
            shadow: true,
            store: store1,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['detail'],
                title: false,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['InTime'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'InTime',
                yField: ['detail'],
                tips: {
                    trackMouse: true,
                    width: 580,
                    height: 170,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [pieChart, grid]
                    }
                }
            }]
        });
        Ext.apply(this,{
            width: 800,
            height: 400,
            title: 'Line Chart',
            layout: 'fit',
            items: chart
        });
        this.callParent();
    }
});
