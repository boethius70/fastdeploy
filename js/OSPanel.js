OSPanel = function() {
    OSPanel.superclass.constructor.call(this, {
        id:'os-tree',
        region:'west',
        title:'OSes',
        split:true,
        width: 225,
        minSize: 175,
        maxSize: 400,
        collapsible: true,
        margins:'5 0 5 5',
        cmargins:'5 5 5 5',
        rootVisible:false,
        lines:false,
        autoScroll:true,
        root: new Ext.tree.TreeNode('Deployable Operating Systems'),
        collapseFirst:false,

        tbar: [{
            iconCls:'add-feed',
            text:'Add Feed',
            handler: this.showWindow,
            scope: this
        },{
            id:'delete',
            iconCls:'delete-icon',
            text:'Remove',
            handler: function(){
                var s = this.getSelectionModel().getSelectedNode();
                if(s){
                    this.removeFeed(s.attributes.url);
                }
            },
            scope: this
        }]
    });

    this.feeds = this.root.appendChild(
        new Ext.tree.TreeNode({
            text:'My Feeds',
            cls:'feeds-node',
            expanded:true
        })
    );

    this.getSelectionModel().on({
        'beforeselect' : function(sm, node){
             return node.isLeaf();
        },
        'selectionchange' : function(sm, node){
            if(node){
                this.fireEvent('feedselect', node.attributes);
            }
            this.getTopToolbar().items.get('delete').setDisabled(!node);
        },
        scope:this
    });

    this.addEvents({feedselect:true});

    this.on('contextmenu', this.onContextMenu, this);
};