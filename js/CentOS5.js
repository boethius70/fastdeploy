var tab2 = new Ext.FormPanel({
        labelAlign: 'top',
        title: 'Host Information',
        bodyStyle:'padding:5px',
        width: 600,
        items: [{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [{
                    xtype:'textfield',
                    fieldLabel: 'Enter Hostname',
                    name: 'first',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: 'Enter domain name',
                    name: 'company',
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [{
                    xtype:'textfield',
                    fieldLabel: 'Enter system MAC address',
                    name: 'last',
                    anchor:'95%'
                },{
                    xtype:'combobox',
                    fieldLabel: 'Network addressing type',
                    name: 'email',
                    vtype:'email',
                    anchor:'95%'
                }]
            }]
        },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:235,
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'HD Partitioning',
                layout:'form',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                	xtype:'combobox',
                    fieldLabel: 'Hard drive type',
                    name: 'hd',
                    allowBlank:false,
                },{
                	xtype:'combobox',
                    fieldLabel: 'Hard drive partitioning type',
                    name: 'hdpart_type',
                    value: ''
                }]
            },{
                title:'Phone Numbers',
                layout:'form',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'Home',
                    name: 'home',
                    value: '(888) 555-1212'
                },{
                    fieldLabel: 'Business',
                    name: 'business'
                },{
                    fieldLabel: 'Mobile',
                    name: 'mobile'
                },{
                    fieldLabel: 'Fax',
                    name: 'fax'
                }]
            },{
                cls:'x-plain',
                title:'Biography',
                layout:'fit',
                items: {
                    xtype:'htmleditor',
                    id:'bio2',
                    fieldLabel:'Biography'
                }
            }]
        }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]
    });

    tab2.render(document.body);