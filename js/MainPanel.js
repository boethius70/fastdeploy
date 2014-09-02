/*
 * Ext JS Library 2.0.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

MainPanel = function(){
    this.preview = new Ext.Panel({
        id: 'preview',
        region: 'south',
        cls:'preview',
        autoScroll: true,


        tbar: [{
            id:'tab',
            text: 'View in New Tab',
            iconCls: 'new-tab',
            disabled:true,
            handler : this.openTab,
            scope: this
        },
        '-',
        {
            id:'win',
            text: 'Go to Post',
            iconCls: 'new-win',
            disabled:true,
            scope: this,
            handler : function(){
                window.open(this.gsm.getSelected().data.link);
            }
        }],

        clear: function(){
            this.body.update('');
            var items = this.topToolbar.items;
            items.get('tab').disable();
            items.get('win').disable();
        }
    });

    this.grid = new FeedGrid(this, {
        tbar:[{
            text:'Open All',
            tooltip: {title:'Open All',text:'Opens all item in tabs'},
            iconCls: 'tabs',
            handler: this.openAll,
            scope:this
        },
        '-',
        {
            split:true,
            text:'Reading Pane',
            tooltip: {title:'Reading Pane',text:'Show, move or hide the Reading Pane'},
            iconCls: 'preview-bottom',
            handler: this.movePreview.createDelegate(this, []),
            menu:{
                id:'reading-menu',
                cls:'reading-menu',
                width:100,
                items: [{
                    text:'Bottom',
                    checked:true,
                    group:'rp-group',
                    checkHandler:this.movePreview,
                    scope:this,
                    iconCls:'preview-bottom'
                },{
                    text:'Right',
                    checked:false,
                    group:'rp-group',
                    checkHandler:this.movePreview,
                    scope:this,
                    iconCls:'preview-right'
                },{
                    text:'Hide',
                    checked:false,
                    group:'rp-group',
                    checkHandler:this.movePreview,
                    scope:this,
                    iconCls:'preview-hide'
                }]
            }
        },
        '-',
        {
            pressed: true,
            enableToggle:true,
            text:'Summary',
            tooltip: {title:'Post Summary',text:'View a short summary of each item in the list'},
            iconCls: 'summary',
            scope:this,
            toggleHandler: function(btn, pressed){
                this.grid.togglePreview(pressed);
            }
        }]
    });

    MainPanel.superclass.constructor.call(this, {
        id:'main-tabs',
        activeTab:0,
        region:'center',
        margins:'0 5 5 0',
        resizeTabs:true,
        tabWidth:150,
        minTabWidth: 120,
        enableTabScroll: true,
        plugins: new Ext.ux.TabCloseMenu(),
        items: {
            id:'main-view',
            layout:'border',
            title:'Loading...',
            hideMode:'offsets',
            items:[
                this.grid, {
                id:'bottom-preview',
                layout:'fit',
                items:this.preview,
                height: 250,
                split: true,
                border:false,
                region:'south'
            }, {
                id:'right-preview',
                layout:'fit',
                border:false,
                region:'east',
                width:350,
                split: true,
                hidden:true
            }]
        }
    });

    this.gsm = this.grid.getSelectionModel();

    this.gsm.on('rowselect', function(sm, index, record){
        FeedViewer.getTemplate().overwrite(this.preview.body, record.data);
        var items = this.preview.topToolbar.items;
        items.get('tab').enable();
        items.get('win').enable();
    }, this, {buffer:250});

    this.grid.store.on('beforeload', this.preview.clear, this.preview);
    this.grid.store.on('load', this.gsm.selectFirstRow, this.gsm);

    this.grid.on('rowdblclick', this.openTab, this);
};

});