Ext.BLANK_IMAGE_URL = 'resources/s.gif';

OSes = {};

OSPanel = function() {
    OSPanel.superclass.constructor.call(this, {
        id:'oses-tree',
        region:'west',
        split:true,
        width: 280,
        minSize: 175,
        maxSize: 500,
        collapsible: true,
        margins:'0 0 5 5',
        cmargins:'0 0 0 0',
        rootVisible:false,
        lines:false,
        autoScroll:true,
        animCollapse:false,
        animate: false,
        collapseMode:'mini',
        root : new Ext.tree.AsyncTreeNode({
      		text: 'Invisible Root',
        		id:'0'
      	}),
        loader: new Ext.tree.TreeLoader({
	          	url:'json_OSes.php',
	          	preloadChildren: true, 
	          	requestMethod:'GET',
	          	baseParams:{format:'json'}
    	}),
    	collapsefirst:true
     }); 
     this.getSelectionModel().on('beforeselect', function(sm, node){
        		return node.isLeaf();
    	});
};

MainPanel = function() { 
	MainPanel.superclass.constructor.call(this, {
	        id:'doc-body',
	        region:'center',
	        margins:'0 5 5 0',
	        resizeTabs: true,
	        minTabWidth: 135,
	        tabWidth: 135,
	        plugins: new Ext.ux.TabCloseMenu(),
	        enableTabScroll: true,
	        activeTab: 0,
	
	        items: {
	            id:'welcome-panel',
	            title: 'Fastdeploy Welcome',
	            autoLoad: {url: 'welcome.html', callback: this.initSearch, scope: this},
	            iconCls:'icon-docs',
	            autoScroll: true
	        }
	    });
};

Ext.onReady(function(){
	
     	var mainPanel = new MainPanel();

      var viewport = new Ext.Viewport({
        layout:'border',
        items:[ OpSyses, mainPanel ]
    });
});