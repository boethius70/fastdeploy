/* begin javascript for HTML_QuickForm_advmultiselect */
/* mac = document.displayForm.mac.value; */

function qfamsInit()
{
    if (window.qfamsName) {
        for (var e = 0; e < window.qfamsName.length; e++) {
            var div    = document.getElementById('qfams_' + window.qfamsName[e]);
            var inputs = div.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].onclick = qfamsUpdateLiveCounter;
            }
        }
    }
}

/**
 * - qfamsUpdateCounter -
 *
 * text tools to replace all childs of 'c' element by a new text node of 'v' value
 *
 * @param      dom element   c    html element; <span> is best use in most case
 * @param      string        v    new counter value
 *
 * @return     void
 * @public
 * @since      1.3.0
 */
function qfamsUpdateCounter(c, v)
{
    if (c != null) {
        // remove all previous child nodes of 'c' element
        if (c.childNodes) {
            for (var i = 0; i < c.childNodes.length; i++) {
                c.removeChild(c.childNodes[i]);
            }
        }
        // add new text value 'v'
        var nodeText = document.createTextNode(v);
        c.appendChild(nodeText);
    }
}

/**
 * - qfamsUpdateLiveCounter -
 *
 * standard onclick event handler to dynamic change value of counter
 * that display current selection
 *
 * @return     void
 * @private
 * @since      1.3.0
 */
function qfamsUpdateLiveCounter()
{
    var lbl = this.parentNode;
    var selectedCount = 0;

    // Find all the checkboxes...
    var div   = lbl.parentNode;
    var inputs = div.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked == 1) {
            selectedCount++;
        }
    }
    var e = div.id;
    var qfamsName = e.substring(e.indexOf('_', 0) + 1, e.length);
    // updates item count
    var span = document.getElementById(qfamsName + '_selected');
    qfamsUpdateCounter(span, selectedCount + '/' + inputs.length);
}

/**
 * - qfamsEditSelection -
 *
 * in single select box mode, edit current selection and update live counter
 *
 * @param      string        qfamsName      QuickForm advmultiselect element name
 * @param      integer       selectMode     Selection mode (0 = uncheck, 1 = check, 2 = toggle)
 *
 * @return     void
 * @public
 * @since      1.3.0
 */
function qfamsEditSelection(qfamsName, selectMode)
{
    if (selectMode !== 0 && selectMode !== 1 && selectMode !== 2) {
        return;
    }
    var selectedCount = 0;

    // Find all the checkboxes...
    var fruit  = document.getElementById('qfams_' + qfamsName);
    var inputs = fruit.getElementsByTagName('input');

    // Loop through all checkboxes (input element)
    for (var i = 0; i < inputs.length; i++) {
        if (selectMode == 2) {
            if (inputs[i].checked == 0) {
                inputs[i].checked = 1;
            } else if (inputs[i].checked == 1) {
                inputs[i].checked = 0;
            }
        } else {
            inputs[i].checked = selectMode;
        }
        if (inputs[i].checked == 1) {
            selectedCount++;
        }
    }

    // updates selected item count
    var span = document.getElementById(qfamsName + '_selected');
    qfamsUpdateCounter(span, selectedCount + '/' + inputs.length);
}

/**
 * - qfamsMoveSelection -
 *
 * in double select box mode, move current selection and update live counter
 *
 * @param      string        qfamsName      QuickForm advmultiselect element name
 * @param      dom element   selectLeft     Data source list
 * @param      dom element   selectRight    Target data list
 * @param      dom element   selectHidden   Full data source (selected, unselected)
 *                                          private usage
 * @param      string        action         Action name (add, remove, all, none, toggle)
 * @param      string        arrange        Sort option (none, asc, desc)
 *
 * @return     void
 * @public
 * @since      1.3.0
 */
function qfamsMoveSelection(qfamsName, selectLeft, selectRight, selectHidden, action, arrange)
{
    if (action == 'add' || action == 'all' || action == 'toggle') {
        var source = selectLeft;
        var target = selectRight;
    } else {
        var source = selectRight;
        var target = selectLeft;
    }
    // Don't do anything if nothing selected. Otherwise we throw javascript errors.
    if (source.selectedIndex == -1 && (action == 'add' || action == 'remove')) {
        return;
    }

    var maxTo = target.length;

    // Add items to the 'TO' list.
    for (var i = 0; i < source.length; i++) {
        if (action == 'all' || action == 'none' || action == 'toggle' || source.options[i].selected == true ) {
            target.options[target.length]= new Option(source.options[i].text, source.options[i].value);
        }
    }

    // Remove items from the 'FROM' list.
    for (var i = (source.length - 1); i >= 0; i--){
        if (action == 'all' || action == 'none' || action == 'toggle' || source.options[i].selected == true) {
            source.options[i] = null;
        }
    }

    // Add items to the 'FROM' list for toggle function
    if (action == 'toggle') {
        for (var i = 0; i < maxTo; i++) {
            source.options[source.length]= new Option(target.options[i].text, target.options[i].value);
        }
        for (var i = (maxTo - 1); i >= 0; i--) {
            target.options[i] = null;
        }
    }

    // updates unselected item count
    var c = document.getElementById(qfamsName + '_unselected');
    var s = document.getElementById('__' + qfamsName);
    qfamsUpdateCounter(c, s.length);

    // updates selected item count
    var c = document.getElementById(qfamsName + '_selected');
    var s = document.getElementById('_' + qfamsName);
    qfamsUpdateCounter(c, s.length);

    // Sort list if required
    if (arrange !== 'none') {
        qfamsSortList(target, qfamsCompareText, arrange);
    }

    // Set the appropriate items as 'selected in the hidden select.
    // These are the values that will actually be posted with the form.
    qfamsUpdateHidden(selectHidden, selectRight);
}

/**
 * - qfamsSortList -
 *
 * sort selection list if option is given in HTML_QuickForm_advmultiselect class constructor
 *
 * @param      dom element   list           Selection data list
 * @param      prototype     compareFunction to sort each element of a list
 * @param      string        arrange        Sort option (none, asc, desc)
 *
 * @return     void
 * @private
 * @since      1.3.0
 */
function qfamsSortList(list, compareFunction, arrange)
{
    var options = new Array (list.options.length);
    for (var i = 0; i < options.length; i++) {
        options[i] = new Option (
            list.options[i].text,
            list.options[i].value,
            list.options[i].defaultSelected,
            list.options[i].selected
        );
    }
    options.sort(compareFunction);
    if (arrange == 'desc') {
        options.reverse();
    }
    list.options.length = 0;
    for (var i = 0; i < options.length; i++) {
        list.options[i] = options[i];
    }
}

/**
 * - qfamsCompareText -
 *
 * callback function to sort each element of two lists A and B
 *
 * @param      string        option1        single element of list A
 * @param      string        option2        single element of list B
 *
 * @return     integer       -1 if option1 is less than option2,
 *                            0 if option1 is equal to option2
 *                            1 if option1 is greater than option2
 * @private
 * @since      1.3.0
 */
function qfamsCompareText(option1, option2)
{
    if (option1.text == option2.text) {
        return 0;
    }
    return option1.text < option2.text ? -1 : 1;
}

/**
 * - qfamsUpdateHidden -
 *
 * update private list that handle selection of all elements (selected and unselected)
 *
 * @param      dom element   h              hidden list (contains all elements)
 * @param      dom element   r              selection list (contains only elements selected)
 *
 * @return     void
 * @private
 * @since      1.3.0
 */
function qfamsUpdateHidden(h, r)
{
    for (var i = 0; i < h.length; i++) {
        h.options[i].selected = false;
    }

    for (var i = 0; i < r.length; i++) {
        h.options[h.length] = new Option(r.options[i].text, r.options[i].value);
        h.options[h.length - 1].selected = true;
    }
}

/**
 * - qfamsMoveUp -
 *
 * User-End may arrange and element up to the selection list
 *
 * @param      dom element   l              selection list (contains only elements selected)
 * @param      dom element   h              hidden list (contains all elements)
 *
 * @return     void
 * @public
 * @since      1.3.0
 */
function qfamsMoveUp(l, h)
{
    var indice = l.selectedIndex;
    if (indice < 0) {
        return;
    }
    if (indice > 0) {
        qfamsMoveSwap(l, indice, indice - 1);
        qfamsUpdateHidden(h, l);
    }
}

/**
 * - qfamsMoveDown -
 *
 * User-End may arrange and element down to the selection list
 *
 * @param      dom element   l              selection list (contains only elements selected)
 * @param      dom element   h              hidden list (contains all elements)
 *
 * @return     void
 * @public
 * @since      1.3.0
 */
function qfamsMoveDown(l, h)
{
    var indice = l.selectedIndex;
    if (indice < 0) {
        return;
    }
    if (indice < l.options.length - 1) {
        qfamsMoveSwap(l, indice, indice + 1);
        qfamsUpdateHidden(h, l);
    }
}

/**
 * - qfamsMoveSwap -
 *
 * User-End may invert two elements position in the selection list
 *
 * @param      dom element   l              selection list (contains only elements selected)
 * @param      integer       i              element source indice
 * @param      integer       j              element target indice
 *
 * @return     void
 * @public
 * @since      1.3.0
 */
function qfamsMoveSwap(l, i, j)
{
    var valeur = l.options[i].value;
    var texte  = l.options[i].text;
    l.options[i].value = l.options[j].value;
    l.options[i].text  = l.options[j].text;
    l.options[j].value = valeur;
    l.options[j].text  = texte;
    l.selectedIndex = j;
}
/* end javascript for HTML_QuickForm_advmultiselect */
/* begin common FastDeploy functions */
	function chkThis(field)
	{
	     field.value = formatMAC(field.value);
	
	     if(field.createTextRange)
	     {
	          setCaretAtEnd(field);
	     }
	}
	
	function chkPK(field)
	{
	     field.value = formatPK(field.value);
	
	     if(field.createTextRange)
	     {
	          setCaretAtEnd(field);
	     }
	}
	
	function chkThisIP(field)
	{
	     field.value = formatIP(field.value);
	
	     if(field.createTextRange)
	     {
	          setCaretAtEnd(field);
	     }
	}
	
	function formatMAC(mac){
	     mac = mac.replace(/\W/g, "");
	
	     if(mac.length >= 2){
	          mac = mac.substring(0, 2) + '-' + mac.substring(2);
	
	         	if(mac.length >= 5){
	               mac = mac.substring(0, 5) + '-' + mac.substring(5);
	               
	               if(mac.length >= 8){
	               	mac = mac.substring(0, 8) + '-' + mac.substring(8);
	               	
	               	if(mac.length >= 11){
	               		mac = mac.substring(0, 11) + '-' + mac.substring(11);
	               		
	               		if(mac.length >= 14){
	               			mac = mac.substring(0, 14) + '-' + mac.substring(14);
	
	               			if(mac.length > 17)
	              	 			{
	                    			mac = mac.substring(0, 17);
	               			}
	          		}
	
	     		}
	     	    }
	          }
	     }
	
	     return mac;
	}
	
	function formatPK(pk){
	     pk = pk.replace(/\W/g, "");
	
	     if(pk.length >= 5){
	          pk = pk.substring(0, 5) + '-' + pk.substring(5);
	
	         	if(pk.length >= 11){
	               pk = pk.substring(0, 11) + '-' + pk.substring(11);
	               
	               if(pk.length >= 17){
	               	pk = pk.substring(0, 17) + '-' + pk.substring(17);
	               	
	               	if(pk.length >= 23){
	               		pk = pk.substring(0, 23) + '-' + pk.substring(23);
	               		
	               		if(pk.length > 29){
	               			pk = pk.substring(0, 29);
	               		
				}
	     		}
	     	    }
	          }
	     }
	
	     return pk;
	}
/* end common FastDeploy functions */
/* begin common Dojo functions */
	function DisplayTreeContent(){
	    this.update = function(message) {
	        var clickedTreeNode = message.node;

			var docPane = dojo.widget.byId("docpane");
			var file = clickedTreeNode.object;
			if (!file){
				docPane.setContent(""); // put an error message here?
			}else{
				docPane.setUrl(file);
			}
	    };
	    clickedTreeNode = "";
	}
	
	function getOS(id) {
		var idStr = "{\"id\":" + id + "}";
		request = {'action' : 'getOS', 'data' : idStr};
		dojo.io.bind({
			url: "add.php",
			handler: showArticle,
			mimetype: "text/json",
			content: request
		});
	}

	var myVeryCoolObject = null;
	var bindArgs = {
		url:  "debug.php",
		type: "text/json",
		load: function(type, data, evt){
			myVeryCoolObject = data;
	}
	};
	//dojo.io.bind(bindArgs);
	
	function initAjax() {
        		dojo.event.connect(dojo.byId("loadIt"), "onclick", "loadRemotely");
    	}
	//var displayer = new DisplayTreeContent();
          
	//var nodeSelectionTopic = dojo.event.topic.getTopic("nodeSelected");

	//nodeSelectionTopic.subscribe(displayer, "update");

	// display custom loadError or use built in
	// works best from live server instead of filesystem
	function contentLoadError(e){
		var chkbox = dojo.byId("defaultLoadError");
		if(chkbox && chkbox.checked){
			// use built in
			return;
		}
		e.preventDefault(); // or e.returnValue = false;
		var pane = dojo.widget.byId('docpane')
		pane.setContent("Custom Loaderror goes here<br/><img src='images/x.gif' style='float:left;'/> file not found");
		dialogHandler();// turn off loading dialog
	}

	// display custom Error(Content java/javascript eval error) or use built in method
	function contentExecError(e){
		var chkbox = dojo.byId("defaultEvalError");
		if(chkbox && chkbox.checked){
			// use built in
			return;
		}
		e.preventDefault();
		alert('Oops! error occured:'+arguments[0]);
	}

	// display loading dialog or use built in "Loading..." message
	function contentDownloadStart(e){
		var chkbox = dojo.byId("defaultLoadInfo");
		if(chkbox && chkbox.checked){
			// use built in
			return;
		}
		dialogHandler(e, true);
	}

	// show / hide loading dialog
	function dialogHandler(e, show){
		var dialog = dojo.widget.byId("statusDialog");
		if(show){
			e.preventDefault();
			dialog.show();
			return;
		}
		dialog.hide();
	}
	// create a variable that closures can relate to in addOnLoad and handleSubmits
        // that way we dont have to call dojo.widget.byId multiple times
        /* var cpane = null;
        var scriptScope = this;
        if(typeof _container_ == 'undefined'){
        		var _container_ = dojo;
    	}

        // set up a listener for form submits inside cpane
        dojo.addOnLoad(function(){
            // set the reference for our ContentPane widget to the variable we created before
            cpane = dojo.widget.byId('docpane');
            
            // connect a event listener to contentpane domNode
            // If IE had decent DOM we could just settle with connecting a onsubmit event
            // and listen to that when it bubbled up to cpane.domNode,
            // but onsubmit events doesn't bubble in IE
            // so we are forced to iterate through document.forms
            // and create a new FormBind listener each time we load a new content
           
            dojo.event.connect(cpane, 'onLoad', 'setUpForm');
	  
            // on page initial load cpane onLoad isn't called
            setUpForm();
	  
        }
        );
       */
        	function flipTabs() {
        		tabContainer =dojo.widget.byId('mainTabContainer');
        		dojo.event.connect(tabContainer, 'selectChild',
        		function() {
        			if (tabContainer.selectChild('tab2')) { 
        				flipdiv('hd_partitions'); 
        			}
        		}
        		)
     	}
        
        // handle form submits
        function setUpForm(){

            // find out if any of document.forms is a ancestor of cpane.domNode
            var node = null;
            for(var i = 0; i < document.forms.length; i++){
                if(dojo.dom.isDescendantOf(document.forms[i],cpane.domNode)){
                    node = document.forms[i];
                    break;
                }
            }

            if(node){
                // create a new FormBind object
                new dojo.io.FormBind({
                    // evt.target is our formNode
                    formNode: node,
                    load: function(load, data, e) {
                        // relay the server response to cpane.setContent
                        cpane.setContent(data);
                    }
                });
            }
      
        };
/* end common Dojo functions */
/* */ 
function dispHandle(obj) 
{
	if (obj.style.visibility == "hidden")
		obj.style.visibility = "visibile";
	else
		obj.style.visibility = "hidden";
}

function visi(nr)
{
	if (document.layers)
	{
		vista = (document.layers[nr].visibility == 'hide') ? 'show' : 'hide'
		document.layers[nr].visibility = vista;
	}
	else if (document.all)
	{
		vista = (document.all[nr].style.visibility == 'hidden') ? 'visible'	: 'hidden';
		document.all[nr].style.visibility = vista;
	}
	else if (document.getElementById)
	{
		vista = (document.getElementById(nr).style.visibility == 'hidden') ? 'visible' : 'hidden';
		document.getElementById(nr).style.visibility = vista;

	}
}

function blocking(nr)
{
	if (document.layers)
	{
		current = (document.layers[nr].display == 'none') ? 'block' : 'none';
		document.layers[nr].display = current;
	}
	else if (document.all)
	{
		current = (document.all[nr].style.display == 'none') ? 'block' : 'none';
		document.all[nr].style.display = current;
	}
	else if (document.getElementById)
	{
		vista = (document.getElementById(nr).style.display == 'none') ? 'block' : 'none';
		document.getElementById(nr).style.display = vista;
	}
}

function flipit(nr,ns,formval1,formval2,formval3) { 
	/*
	 * handles flipping display of DIV layers by SELECT fields
	 * flipit('hd_partitions','hd_part_scheme','standard','vg','raid');
	 *                nr             ns         formval1  formval2 formval3
	 */ 
	if (document.all[ns].value == formval1 ) {	
		blocking(nr); 
	}	
	else if (document.all[ns].value == formval2) { 
		vista = (document.getElementById(nr).style.display == 'block') ? 'none' : 'none';
		document.getElementById(nr).style.display = vista;
	}
	else if (document.all[ns].value == formval3) { 
		vista = (document.getElementById(nr).style.display == 'block') ? 'none' : 'none';
		document.getElementById(nr).style.display = vista;
	}
	else if (document.all[ns].value == '') { 
		vista = (document.getElementById(nr).style.display == 'block') ? 'none' : 'none';
		document.getElementById(nr).style.display = vista;
	}
}
//* flipit('hd_partitions','hd_part_type'*/ 
flipdiv = function(nr) { 
	/*
	 * handles flipping display of DIV layers to DEFAULT values
	*/
	document.write(document.all[nr].value); 
	if (document.all[nr].value == 'hd_partitions') { 
		vista = (document.getElementById(nr).style.display == 'block') ? 'none' : 'none';
		document.getElementById(nr).style.display = vista;
	}
}

function go()
{
	box = document.forms[0].navi;
	destination = box.options[box.selectedIndex].value;
	if (destination) location.href = destination;
}

/* code to handle running PHP functions inside Javascript */
function javaFunction(os_name,os_version,os_subversion){
        // In the varArray are all the variables you want to give with the function
        hostname = document.displayForm.hostname.value;
        domain = document.displayForm.domain.value;
        mac= document.displayForm.mac.value;
        addr_type= document.displayForm.addr_type.value;
        ipaddr= document.displayForm.ipaddr.value;
        netmask= document.displayForm.netmask.value;
        gateway= document.displayForm.gateway.value;
        dns_1= document.displayForm.dns_1.value;
        dns_2= document.displayForm.dns_2.value;
        password  = document.displayForm.password.value;
        password_confirm = document.displayForm.password_confirm.value;
        lang = document.displayForm.lang.value;
        tz = document.displayForm.tz.value;
        cpu = document.displayForm.cpu.value;
        hd = document.displayForm.hd.value;
        notify = document.displayForm.notify.value;
        pre_install = document.displayForm.pre_install.value;
        post_install = document.displayForm.post_install.value;
        var url="javascript:dojo.widget.byId('docpane').setUrl('edit.php?os_name="+os_name+"&os_version="+os_version+"&os_subversion="+os_subversion+"&mac="+mac+"&hostname="+hostname+"&domain="+domain+"&addr_type="+addr_type+"&ipaddr="+ipaddr+"&netmask="+netmask+"&gateway="+gateway+"&dns_1="+dns_1+"&dns_2="+dns_2+"&password="+password+"&password_confirm="+password_confirm+"&lang="+lang+"&tz="+tz+"&cpu="+cpu+"&hd="+hd+"&notify="+notify+"&pre_install="+pre_install+"&post_install="+post_install+"')";
        window.open(url, "_self");
}

/* used to toggle visibility of table row text elements in-line */
function applyDisplay(toggle,id) {
                        //document.getElementById(id).style.visibility = value;
    	if (toggle == "off") {
         		document.getElementById(id).style.display = "none";
         	}
          else if (toggle == "on") {
         		document.getElementById(id).style.display = "inline";
       	}
}

/* begin: code to handle please wait screen on form screens */

/* end: code to handle please wait screen on form screens */ 
/* frame break function */
function breakIt() {
	window.top.location.href="index.html" 
} 	

var stateNode;
 
	function offState(rootCell) {
 
		var tallyLeft = document.getElementById(rootCell).offsetLeft;
		var tallyTop = document.getElementById(rootCell).offsetTop;
		if (document.getElementById(rootCell).offsetParent) {
			var rootNodeFound = false;
			var offsetStart = document.getElementById(rootCell).offsetParent;
			while (!rootNodeFound) {
				tallyLeft += offsetStart.offsetLeft;
				tallyTop += offsetStart.offsetTop;
				if (offsetStart.offsetParent)
					offsetStart = offsetStart.offsetParent;
				else
					rootNodeFound = true;
			}
		}
 
		var shadow = document.createElement('div');
		shadow.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=90)';
		shadow.style.MozOpacity = 0.85;
		shadow.setAttribute('id', 'shadow_' + rootCell);
		shadow.style.position = 'absolute';
		shadow.style.left = tallyLeft + 'px';
		shadow.style.top = tallyTop + 'px';
		shadow.style.width = document.getElementById(rootCell).offsetWidth.toString() + 'px';
		shadow.style.height = document.getElementById(rootCell).offsetHeight.toString() + 'px';
		shadow.style.background = '#FFFFFF';
		document.body.appendChild(shadow);
 
		var shadowMessage = document.createElement('div');
		shadowMessage.setAttribute('id', 'shadowMessage');
		shadowMessage.style.position = 'absolute';
		shadowMessage.innerHTML =
			'<table>' +
				'<tr>' +
					'<td valign=middle style="color:#006699;">' +
						'PLEASE WAIT' +
					'</td>' +
					'<td valign=middle>' +
						'<object type="application/x-shockwave-flash" data="http://www.overset.com/upload/throbber-bars1.swf" width="40" height="40">' +
							'<param name="movie" value="http://www.overset.com/upload/throbber-bars1.swf" />' +
							'<param name="BGCOLOR" value="#ffffff" />' +
							'<param name="wmode" value="transparent" />' +
						'</object>' +
					'</td>' +
				'</tr>' +
			'</table>';
		shadow.appendChild(shadowMessage);
		shadowMessage.style.left = ((shadowMessage.offsetParent.offsetWidth / 2) - (shadowMessage.offsetWidth / 2)).toString() + 'px';
		shadowMessage.style.top = ((shadowMessage.offsetParent.offsetHeight / 2) - (shadowMessage.offsetHeight / 2)).toString() + 'px';
 
		stateNode = 'shadow_' + rootCell;
 
	}
 
	function onState () {
		document.getElementById(stateNode).parentNode.removeChild(document.getElementById(stateNode));
	}
/* end : code to handle display of "Please wait" screens in form fields */


/* dojo dijit UI functions */

/* event handler for hiding links */
/*
window.onload = applyEvents;
function applyEvents(){
    if(document.getElementById && document.getElementsByTagName){
        var arrAllLinks = document.getElementsByTagName("a");
        var oLink;
        for(var i=0; i<arrAllLinks.length; i++){
            oLink = arrAllLinks[i];
            if(oLink.className.search(/fixLayer/) != -1){
                oLink.onclick = function (oEvent){
                    var oEvent = (typeof oEvent != "undefined")? oEvent : event;
                    oEvent.returnValue = false;
                    if(oEvent.preventDefault){
                        oEvent.preventDefault();
                    }
                    document.getElementById("check").className = "display-block";
                }
            }
        }
    }
}

*/