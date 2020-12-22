angular.module("umbraco.filters").filter("formatBytes",function(){return function(n,t){if(n===0||t===undefined)return"0 Bytes";const i=parseInt(t.kilo)||1024,u=parseInt(t.decimals)||0,r=Math.floor(Math.log(n)/Math.log(i));return parseFloat((n/Math.pow(i,r)).toFixed(u))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][r]}});angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.CascadingDropdownList.Controller",["$scope","$q","$http",function(n,t,i){function f(){var h,f,s,o;if(n.model.value=n.model.value||u.defaultValue,r.dropdowns=[],u.apis.length>0){for(r.loading=!0,h=[],f=0;f<n.model.value.length;f++){for(s=u.apis[f],o=0;o<f;o++)s=s.replace("{"+o+"}",n.model.value[o]);h.push(i({method:"GET",url:s}))}t.all(h).then(function(n){n&&n.forEach(function(n,t){r.dropdowns[t]={options:n.data}});r.loading=!1})}r.change=e}function e(t){var f=t+1,e;u.apis.length>f&&(r.loading=!0,e=u.apis[f].replace(/{(\d+)}/g,function(t,i){return typeof n.model.value[i]!="undefined"?n.model.value[i]:t}),i({method:"GET",url:e}).then(function(n){r.dropdowns[f]={options:n.data};r.loading=!1}));o()}function o(){n.propertyForm&&n.propertyForm.$setDirty()}if(!n.model.hasOwnProperty("contentTypeId")){var u=Object.assign({},{apis:[],defaultValue:[""]},n.model.config),r=this;f()}}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.CheckboxList.Controller",["$scope",function(n){function u(){n.model.value=n.model.value||i.defaultValue;Array.isArray(n.model.value)===!1&&(n.model.value=[n.model.value]);t.items=i.items.slice();t.items.forEach(function(t){t.checked=n.model.value.indexOf(t.value)>-1});t.showDescriptions=Object.toBoolean(i.showDescriptions);t.showIcons=Object.toBoolean(i.showIcons);t.uniqueId=n.model.hasOwnProperty("dataTypeKey")?[n.model.alias,n.model.dataTypeKey.substring(0,8)].join("-"):n.model.alias;t.changed=f;t.toggleAll=Object.toBoolean(i.checkAll);t.toggleAll&&(t.toggle=e,t.toggleChecked=t.items.every(function(n){return n.checked}))}function f(){t.toggleChecked=t.items.every(function(n){return n.checked});n.model.value=[];t.items.forEach(function(t){t.checked&&n.model.value.push(t.value)});r()}function e(){n.model.value=[];t.items.forEach(function(i){i.checked=t.toggleChecked;i.checked&&n.model.value.push(i.value)});r()}function r(){n.propertyForm&&n.propertyForm.$setDirty()}var i=Object.assign({},{items:[],checkAll:0,showDescriptions:0,showIcons:0,defaultValue:[]},n.model.config),t=this;u()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.CodeEditor.Controller",["$scope",function(n){function u(){i.readonly=Object.toBoolean(t.readonly);i.options={autoFocus:!1,showGutter:Object.toBoolean(t.showGutter),useWrapMode:Object.toBoolean(t.useWrapMode),showInvisibles:Object.toBoolean(t.showInvisibles),showIndentGuides:Object.toBoolean(t.showIndentGuides),useSoftTabs:Object.toBoolean(t.useSoftTabs),showPrintMargin:Object.toBoolean(t.showPrintMargin),disableSearch:Object.toBoolean(t.disableSearch),theme:t.theme,mode:t.mode,firstLineNumber:t.firstLineNumber,advanced:{fontSize:t.fontSize,enableSnippets:Object.toBoolean(t.enableSnippets),enableBasicAutocompletion:Object.toBoolean(t.enableBasicAutocompletion),enableLiveAutocompletion:Object.toBoolean(t.enableLiveAutocompletion),minLines:t.minLines,maxLines:t.maxLines,wrap:Object.toBoolean(t.useWrapMode)}}}var r={showGutter:1,useWrapMode:1,showInvisibles:0,showIndentGuides:0,useSoftTabs:1,showPrintMargin:0,disableSearch:0,theme:"chrome",mode:"javascript",firstLineNumber:1,fontSize:"14px",enableSnippets:0,enableBasicAutocompletion:0,enableLiveAutocompletion:0,readonly:0,minLines:undefined,maxLines:undefined},t=Object.assign({},r,n.model.config),i=this;u()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.ConfigurationEditor.Controller",["$scope","$interpolate","editorService","localizationService","overlayService","Umbraco.Community.Contentment.Services.DevMode",function(n,t,i,r,u,f){function h(){n.model.value=n.model.value||[];Array.isArray(n.model.value)===!1&&(n.model.value=[n.model.value]);n.model.value.forEach(function(n){n.hasOwnProperty("type")&&(n.key=n.type,delete n.type)});e.itemLookup={};e.allowEdit={};e.nameTemplates={};e.descriptionTemplates={};e.items.forEach(function(n){e.itemLookup[n.key]=n;e.allowEdit[n.key]=n.fields&&n.fields.length>0;n.nameTemplate&&(e.nameTemplates[n.key]=t(n.nameTemplate));n.descriptionTemplate&&(e.descriptionTemplates[n.key]=t(n.descriptionTemplate))});o.allowAdd=e.maxItems===0||e.maxItems==="0"||n.model.value.length<e.maxItems;o.allowEdit=function(n){return e.allowEdit[n.key]};o.allowRemove=Object.toBoolean(e.allowRemove);o.allowSort=Object.toBoolean(e.disableSorting)===!1&&e.maxItems!==1&&e.maxItems!=="1";o.sortableOptions={axis:"y",containment:"parent",cursor:"move",disabled:o.allowSort===!1,opacity:.7,scroll:!0,tolerance:"pointer",stop:function(){s()}};o.addButtonLabelKey=e.addButtonLabelKey||"general_add";o.add=c;o.edit=l;o.populate=a;o.remove=v;o.propertyActions=[];Object.toBoolean(e.enableDevMode)&&o.propertyActions.push({labelKey:"contentment_editRawValue",icon:"brackets",method:function(){f.editValue(n.model,y)}})}function c(){var t=Object.toBoolean(e.allowDuplicates)?e.items:_.reject(e.items,function(t){return _.find(n.model.value,function(n){return t.key===n.key})});i.open({view:e.overlayView,size:e.items.length===1?e.items[0].overlaySize:"small",config:{mode:"select",autoSelect:e.items.length===1,label:n.model.label,items:t,enableFilter:Object.toBoolean(e.enableFilter),orderBy:e.orderBy},value:{},submit:function(t){n.model.value.push(t);e.maxItems!==0&&e.maxItems!=="0"&&n.model.value.length>=e.maxItems&&(o.allowAdd=!1);s();i.close()},close:function(){i.close()}})}function l(t){var r=n.model.value[t],u=e.itemLookup[r.key];i.open({view:e.overlayView,size:u.overlaySize,config:{mode:"edit",editor:u},value:r,submit:function(r){n.model.value[t]=r;s();i.close()},close:function(){i.close()}})}function a(n,t,i){var u="",r;return i==="name"&&e.nameTemplates.hasOwnProperty(n.key)===!0&&(r=e.nameTemplates[n.key],r&&(n.value.$index=t+1,u=r(n.value),delete n.value.$index)),i==="description"&&e.descriptionTemplates.hasOwnProperty(n.key)===!0&&(r=e.descriptionTemplates[n.key],r&&(n.value.$index=t+1,u=r(n.value),delete n.value.$index)),u||e.itemLookup[n.key][i]}function v(t){r.localizeMany(["content_nestedContentDeleteItem","general_delete","general_cancel","contentTypeEditor_yesDelete"]).then(function(i){u.open({title:i[1],content:i[0],closeButtonLabel:i[2],submitButtonLabel:i[3],submitButtonStyle:"danger",submit:function(){n.model.value.splice(t,1);(e.maxItems===0||e.maxItems==="0"||n.model.value.length<e.maxItems)&&(o.allowAdd=!0);s();u.close()},close:function(){u.close()}})})}function y(){o.allowAdd=e.maxItems!==0&&e.maxItems!=="0"&&n.model.value.length>=e.maxItems?!1:!0}function s(){n.propertyForm&&n.propertyForm.$setDirty()}var e=Object.assign({},{allowDuplicates:0,items:[],maxItems:0,disableSorting:0,allowRemove:1,enableFilter:0,orderBy:"name",overlayView:"",enableDevMode:0,addButtonLabelKey:"general_add"},n.model.config),o=this;h()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.Overlays.ConfigurationEditor.Controller",["$scope","formHelper",function(n){function e(){if(t.mode=i.mode,t.mode==="select")i.autoSelect&&i.items.length===1?u(i.items[0]):(t.title="Select "+i.label.toLowerCase()+"...",t.items=i.items,t.enableFilter=i.enableFilter,t.orderBy=i.orderBy,t.select=u);else if(t.mode==="edit"&&i.editor){var f=n.model.value||{key:"",value:{}};r(i.editor,f)}t.close=o}function r(i,r){i.overlaySize&&n.model.size!==i.overlaySize&&(n.model.size=i.overlaySize);r.value||(r.value={});t.title="Configure "+i.name;t.editor=Object.assign({},i);t.editor.fields&&t.editor.fields.length>0&&t.editor.fields.forEach(function(n){n.alias=n.key;n.value=r.value[n.key]});t.save=f}function u(n){_.isEmpty(n.fields)?f(n):(t.mode="edit",r(n,{value:n.defaultValues||{}}))}function o(){n.model.close&&n.model.close()}function f(t){n.$broadcast("formSubmitting",{scope:n});var i={key:t.key,value:{}};t.fields&&t.fields.forEach(function(n){i.value[n.key]=n.value});n.model.submit&&n.model.submit(i)}var i=Object.assign({},{mode:"select",autoSelect:!0,label:"",items:[],editor:null,enableFilter:!1,orderBy:"name"},n.model.config),t=this;e()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.ContentBlocks.Controller",["$scope","$q","$http","$interpolate","clipboardService","contentResource","editorService","editorState","localizationService","notificationsService","overlayService","umbRequestHelper","Umbraco.Community.Contentment.Services.DevMode",function(n,t,i,r,u,f,e,o,s,h,c,l,a){function nt(){var i=o.getCurrent(),t;for(v.currentPageId=i.id>0?i.id:i.parentId,n.model.value=n.model.value||[],n.model.value===""&&(n.model.value=[]),Array.isArray(n.model.value)===!1&&(n.model.value=[n.model.value]),v.elementTypeScaffoldCache={},v.elementTypeLookup={},v.nameTemplates={},v.contentBlockTypes.forEach(function(n){v.elementTypeLookup[n.key]=n;v.nameTemplates[n.key]=r(n.nameTemplate||"Item {{ $index }}")}),y.enablePreview=Object.toBoolean(v.enablePreview),y.allowAdd=v.maxItems===0||v.maxItems==="0"||n.model.value.length<v.maxItems,y.allowCopy=Object.toBoolean(v.allowCopy)&&u.isSupported(),y.allowEdit=Object.toBoolean(v.allowEdit),y.allowRemove=Object.toBoolean(v.allowRemove),y.allowSort=Object.toBoolean(v.disableSorting)===!1&&v.maxItems!==1&&v.maxItems!=="1",y.add=tt,y.copy=p,y.edit=it,y.remove=rt,y.populateName=k,y.sort=function(){b()},y.previews=[],y.blockActions=[],t=0;t<n.model.value.length;t++)y.blockActions.push(g(t));b();y.propertyActions=[];y.allowCopy===!0&&y.propertyActions.push({labelKey:"contentment_copyAllBlocks",icon:"documents",method:function(){for(var t=0;t<n.model.value.length;t++)p(t)}});Object.toBoolean(v.enableDevMode)===!0&&y.propertyActions.push({labelKey:"contentment_editRawValue",icon:"brackets",method:function(){a.editValue(n.model,function(){})}})}function g(n){var t=[];return y.allowCopy===!0&&t.push({labelKey:"contentment_copyContentBlock",icon:"documents",method:function(){p(n)}}),Object.toBoolean(v.allowCreateContentTemplate)===!0&&t.push({labelKey:"contentment_createContentTemplate",icon:"blueprint",method:function(){ut(n)}}),t}function tt(){e.open({config:{elementTypes:v.contentBlockTypes,enableFilter:v.enableFilter,currentPageId:v.currentPageId},size:v.contentBlockTypes.length===1?v.contentBlockTypes[0].overlaySize:"small",value:null,view:v.overlayView,submit:function(t){n.model.value.push(t);var i=n.model.value.length-1;y.blockActions.push(g(i));w(i);v.maxItems!==0&&v.maxItems!=="0"&&n.model.value.length>=v.maxItems&&(y.allowAdd=!1);d();e.close()},close:function(){e.close()}})}function p(i){var e=n.model.value[i],r=v.elementTypeLookup[e.elementType],o=k(e,i),s=v.elementTypeScaffoldCache.hasOwnProperty(r.alias)===!1?f.getScaffold(v.currentPageId,r.alias):t.when(v.elementTypeScaffoldCache[r.alias]);s.then(function(n){var i,s,f,t;if(v.elementTypeScaffoldCache.hasOwnProperty(r.alias)===!1&&(v.elementTypeScaffoldCache[r.alias]=n),n.name=o,n.variants[0].name=o,e.value)for(i=0;i<n.variants[0].tabs.length;i++)for(s=n.variants[0].tabs[i],f=0;f<s.properties.length;f++)t=s.properties[f],e.value.hasOwnProperty(t.alias)&&(t.propertyAlias=t.alias,t.value=e.value[t.alias]);u.copy("elementType",r.alias,n)})}function it(t){var i=n.model.value[t],r=v.elementTypeLookup[i.elementType];e.open({config:{elementType:r,currentPageId:v.currentPageId},size:r.overlaySize,value:i,view:v.overlayView,submit:function(i){n.model.value[t]=i;w(t);d();e.close()},close:function(){e.close()}})}function w(t){if(y.enablePreview===!0){var r=n.model.value[t];v.elementTypeLookup[r.elementType].previewEnabled&&(y.previews[r.key]={loading:!0},l.resourcePromise(i.post("backoffice/Contentment/ContentBlocksApi/GetPreviewMarkup",r,{params:{elementIndex:t,elementKey:r.key,contentId:v.currentPageId}}),"Failed to retrieve preview markup").then(function(n){n&&n.elementKey&&n.markup&&(y.previews[n.elementKey]={loading:!1,markup:n.markup})}))}}function b(){if(y.enablePreview===!0)for(var t=0;t<n.model.value.length;t++)w(t)}function k(n,t){var i="",r=v.nameTemplates[n.elementType];return r?(n.value.$index=t+1,i=r(n.value),delete n.value.$index):i=v.elementTypeLookup[n.elementType].name,i}function rt(t){s.localizeMany(["content_nestedContentDeleteItem","general_delete","general_cancel","contentTypeEditor_yesDelete"]).then(function(i){c.open({title:i[1],content:i[0],closeButtonLabel:i[2],submitButtonLabel:i[3],submitButtonStyle:"danger",submit:function(){n.model.value.splice(t,1);y.blockActions.pop();b();(v.maxItems===0||v.maxItems==="0"||n.model.value.length<v.maxItems)&&(y.allowAdd=!0);d();c.close()},close:function(){c.close()}})})}function ut(t){s.localizeMany(["blueprints_createBlueprintFrom","blueprints_blueprintDescription","blueprints_createdBlueprintHeading","blueprints_createdBlueprintMessage","general_cancel","general_create"]).then(function(i){var r=n.model.value[t],u=k(r,t),e=v.elementTypeLookup[r.elementType];c.open({disableBackdropClick:!0,title:s.tokenReplace(i[0],[u]),description:i[1],blueprintName:u,view:"/App_Plugins/Contentment/editors/content-blocks.blueprint.html",closeButtonLabel:i[4],submitButtonLabel:i[5],submitButtonStyle:"action",submit:function(n){delete n.error;n.submitButtonState="busy";var t={save:!0,name:n.blueprintName,tabs:[{properties:_.map(_.pairs(r.value),function(n){return{id:0,alias:n[0],value:n[1]}})}]},o={action:"saveNew",id:0,parentId:-1,contentTypeAlias:e.alias,expireDate:null,releaseDate:null,templateAlias:null,variants:[Object.assign({},t,{save:!0})]};f.saveBlueprint(o,!0,[],!1).then(function(t){n.submitButtonState="success";h.success(i[2],s.tokenReplace(i[3],[u]));e.blueprints.push({id:t.id,name:t.variants[0].name});c.close()},function(t){n.submitButtonState="error";n.error=t.data.ModelState.Name[0]})},close:function(){c.close()}})})}function d(){n.propertyForm&&n.propertyForm.$setDirty()}var v=Object.assign({},{allowCopy:1,allowCreateContentTemplate:0,allowEdit:1,allowRemove:1,disableSorting:0,contentBlockTypes:[],enableFilter:0,enablePreview:0,maxItems:0,overlayView:"",enableDevMode:0,sortableAxis:"y"},n.model.config),y=this;nt()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.Overlays.ContentBlocks.Controller",["$scope","blueprintConfig","clipboardService","contentResource",function(n,t,i,r){function h(){u.submit=y;u.close=p;f.elementType&&n.model.value?s(f.elementType,n.model.value):(u.mode="select",u.items=f.elementTypes,u.selectedElementType=null,u.clipboardItems=i.retriveDataOfType("elementType",f.elementTypes.map(function(n){return n.alias})),f.elementTypes.length>1||u.clipboardItems.length>0?(u.title="Add content",u.description="Select a content type...",u.icon="icon-page-add",u.selectBlueprint=!1,u.enableFilter=Object.toBoolean(f.enableFilter),u.select=o,u.paste=v,u.clearClipboard=c,u.prompt=!1,u.showPrompt=l,u.hidePrompt=a):f.elementTypes.length===1&&o(f.elementTypes[0]))}function c(){u.clipboardItems=[];i.clearEntriesOfType("elementType",f.elementTypes.map(function(n){return n.alias}))}function l(){u.prompt=!0}function a(){u.prompt=!1}function o(n){n.blueprints&&n.blueprints.length>0?n.blueprints.length===1&&t.skipSelect?e(n,n.blueprints[0]):(u.title="Add content",u.description="Select a content blueprint...",u.icon="icon-blueprint",u.selectBlueprint=!0,u.selectedElementType=n,u.blueprintAllowBlank=t.allowBlank,u.create=e):e(n)}function e(t,i){n.model.size=t.overlaySize;u.mode="edit";u.loading=!0;u.title="Edit content";u.description=t.name;u.icon=t.icon;u.content={elementType:t.key,icon:t.icon,key:String.CreateGuid()};var e=i&&i.id>0?r.getBlueprintScaffold(f.currentPageId,i.id):r.getScaffold(f.currentPageId,t.alias);e.then(function(n){Object.assign(u.content,n.variants[0]);u.loading=!1})}function v(t){var i=_.find(f.elementTypes,function(n){return n.alias===t.contentTypeAlias}),o,r,h,u,e;if(n.model.size=i.overlaySize,o={elementType:i.key,icon:i.icon,key:String.CreateGuid(),value:{}},t.variants.length>0)for(r=0;r<t.variants[0].tabs.length;r++)for(h=t.variants[0].tabs[r],u=0;u<h.properties.length;u++)e=h.properties[u],typeof e.value!="function"&&(o.value[e.propertyAlias]=e.value);s(i,o)}function s(n,t){u.mode="edit";u.loading=!0;u.title="Edit content";u.description=n.name;u.icon=n.icon;u.content={elementType:n.key,icon:n.icon,key:t.key};r.getScaffold(f.currentPageId,n.alias).then(function(n){var i,e,r,f;if(t.value)for(i=0;i<n.variants[0].tabs.length;i++)for(e=n.variants[0].tabs[i],r=0;r<e.properties.length;r++)f=e.properties[r],t.value.hasOwnProperty(f.alias)&&(f.value=t.value[f.alias]);Object.assign(u.content,n.variants[0]);u.loading=!1})}function y(){var f,t,e,i,r;if(n.model.submit){if(n.$broadcast("formSubmitting",{scope:n}),f={elementType:u.content.elementType,key:u.content.key,icon:u.content.icon,value:{}},u.content.tabs.length>0)for(t=0;t<u.content.tabs.length;t++)for(e=u.content.tabs[t],i=0;i<e.properties.length;i++)r=e.properties[i],typeof r.value!="function"&&(f.value[r.alias]=r.value);n.model.submit(f)}}function p(){n.model.close&&n.model.close()}var f=Object.assign({},{elementType:null,elementTypes:[],enableFilter:!0,currentPageId:-2},n.model.config),u=this;h()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.ContentSource.Controller",["$scope","editorService","entityResource",function(n,t,i){function f(){n.model.value&&n.model.value.startsWith("umb://document/")?(r.node={},r.loading=!0,i.getById(n.model.value,"Document").then(function(n){u(n);r.loading=!1})):r.node=null;r.showHelp=!1;r.showSearch=!1;r.pick=e;r.remove=o;r.show=s;r.hide=h;r.help=c;r.clear=l}function e(){t.treePicker({idType:"udi",section:"content",treeAlias:"content",multiPicker:!1,submit:function(i){var r=i.selection[0];u(r);n.model.value=r.udi;t.close()},close:function(){t.close()}})}function o(){n.model.value=null;r.node=null}function s(){r.showSearch=!0}function h(){r.showSearch=!1}function c(){r.showHelp=!r.showHelp}function l(){r.showSearch=!1;n.model.value=null}function u(n){r.node=n;i.getUrl(n.id,"Document").then(function(n){r.node.path=n})}var a=Object.assign({},{},n.model.config),r=this;f()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.DataTable.Controller",["$scope",function(n){function u(){n.model.value=n.model.value||[];t.headings=i.fields.map(function(n){return n.label});t.items=[];n.model.value.forEach(function(r,u){var f=[];i.fields.forEach(function(t,i){f.push(Object.assign({alias:[n.model.alias,u,i].join("_"),value:r[t.key]},t))});t.items.push(f)});t.styleTable={"max-width":Object.toBoolean(i.restrictWidth)?"800px":"100%"};t.styleButton=Object.toBoolean(i.restrictWidth)?{}:{"max-width":"100%"};t.usePrevalueEditors=Object.toBoolean(i.usePrevalueEditors)?!0:null;t.allowAdd=i.maxItems===0||i.maxItems==="0"||t.items.length<i.maxItems;t.allowRemove=!0;t.sortable=Object.toBoolean(i.disableSorting)===!1&&i.maxItems!==1&&i.maxItems!=="1";t.sortableOptions={axis:"y",containment:"parent",cursor:"move",disabled:t.sortable===!1,forcePlaceholderSize:!0,handle:".handle",helper:function(n,t){return t.children().each(function(){$(this).width($(this).width())}),t.clone()},items:"> tr",opacity:.7,scroll:!0,tolerance:"pointer",stop:function(){r()}};t.showPrompt=o;t.hidePrompt=s;t.add=f;t.remove=e}function f(){t.items.push(angular.copy(i.fields));i.maxItems!==0&&i.maxItems!=="0"&&t.items.length>=i.maxItems&&(t.allowAdd=!1);r()}function e(n){t.items.splice(n,1);(i.maxItems===0||i.maxItems==="0"||t.items.length<i.maxItems)&&(t.allowAdd=!0);r()}function o(n){n.prompt=!0}function s(n){delete n.prompt}function r(){n.propertyForm&&n.propertyForm.$setDirty()}var i=Object.assign({},{fields:[],disableSorting:0,maxItems:0,restrictWidth:0,usePrevalueEditors:1},n.model.config),t=this,h=n.$on("formSubmitting",function(){n.model.value=[];t.items.forEach(function(t){var i={};t.forEach(function(n){i[n.key]=n.value});n.model.value.push(i)})});n.$on("$destroy",function(){h()});u()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.DropdownList.Controller",["$scope",function(n){function r(){n.model.value=n.model.value||t.defaultValue;Array.isArray(n.model.value)&&(n.model.value=n.model.value[0]);i.items=t.items.slice();i.allowEmpty=Object.toBoolean(t.allowEmpty);i.htmlAttributes=t.htmlAttributes;i.uniqueId=n.model.hasOwnProperty("dataTypeKey")?[n.model.alias,n.model.dataTypeKey.substring(0,8)].join("-"):n.model.alias}var t=Object.assign({},{items:[],allowEmpty:1,defaultValue:"",htmlAttributes:[]},n.model.config),i=this;r()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.IconPicker.Controller",["$scope","editorService",function(n,t){function f(){n.model.value=n.model.value||r.defaultIcon;i.label=n.model.value.replace(" ","<br>");i.size=r.size;i.allowAdd=n.model.value==="";i.pick=e;i.remove=o}function e(){var r=n.model.value.split(" "),f={icon:r[0],color:r[1],submit:function(r){n.model.value=[r.icon,r.color].filter(n=>n).join(" ");i.label=n.model.value.replace(" ","<br>");i.allowAdd=!1;u();t.close()},close:function(){t.close()}};t.iconPicker(f)}function o(){n.model.value="";i.label="";i.allowAdd=!0;u()}function u(){n.propertyForm&&n.propertyForm.$setDirty()}var r=Object.assign({},{defaultIcon:"",size:"large"},n.model.config),i=this;f()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.ItemPicker.Controller",["$scope","editorService","localizationService","overlayService",function(n,t,i,r){function o(){if(n.model.value=n.model.value||u.defaultValue,Array.isArray(n.model.value)===!1&&(n.model.value=[n.model.value]),f.defaultIcon=u.defaultIcon,f.allowAdd=u.maxItems===0||u.maxItems==="0"||n.model.value.length<u.maxItems,f.allowEdit=!1,f.allowRemove=!0,f.allowSort=Object.toBoolean(u.disableSorting)===!1&&u.maxItems!==1&&u.maxItems!=="1",f.addButtonLabelKey=u.addButtonLabelKey||"general_add",f.add=s,f.remove=h,f.sort=function(){n.model.value=f.items.map(function(n){return n.value})},f.items=[],n.model.value.length>0&&u.items.length>0){var t=[];n.model.value.forEach(function(n){var i=_.find(u.items,function(t){return t.value===n});i?f.items.push(Object.assign({},i)):t.push(n)});t.length>0&&(n.model.value=_.difference(n.model.value,t),(u.maxItems===0||u.maxItems==="0"||n.model.value.length<u.maxItems)&&(f.allowAdd=!0))}}function s(){var i=Object.toBoolean(u.allowDuplicates)?u.items:_.reject(u.items,function(n){return _.find(f.items,function(t){return n.value===t.value})});t.open({config:{title:"Choose...",enableFilter:Object.toBoolean(u.enableFilter),enableMultiple:Object.toBoolean(u.enableMultiple),defaultIcon:u.defaultIcon,items:i,listType:u.listType,orderBy:u.overlayOrderBy},view:u.overlayView,size:u.overlaySize||"small",submit:function(i){i.forEach(function(t){f.items.push(Object.assign({},t));n.model.value.push(t.value)});u.maxItems!==0&&u.maxItems!=="0"&&n.model.value.length>=u.maxItems&&(f.allowAdd=!1);e();t.close()},close:function(){t.close()}})}function h(t){i.localizeMany(["content_nestedContentDeleteItem","general_delete","general_cancel","contentTypeEditor_yesDelete"]).then(function(i){r.open({title:i[1],content:i[0],closeButtonLabel:i[2],submitButtonLabel:i[3],submitButtonStyle:"danger",submit:function(){f.items.splice(t,1);n.model.value.splice(t,1);(u.maxItems===0||u.maxItems==="0"||n.model.value.length<u.maxItems)&&(f.allowAdd=!0);e();r.close()},close:function(){r.close()}})})}function e(){n.propertyForm&&n.propertyForm.$setDirty()}var u=Object.assign({},{allowDuplicates:0,defaultIcon:"icon-science",defaultValue:[],disableSorting:0,enableFilter:1,enableMultiple:0,items:[],maxItems:0,listType:"grid",overlayView:"",overlayOrderBy:"name",overlaySize:"small",addButtonLabelKey:"general_add"},n.model.config),f=this;o()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.Overlays.ItemPicker.Controller",["$scope",function(n){function u(){t.title=i.title;t.enableFilter=i.enableFilter;t.enableMultiple=i.enableMultiple;t.defaultIcon=i.defaultIcon;t.items=i.items;t.listType=i.listType;t.orderBy=i.orderBy;t.select=f;t.submit=r;t.close=e}function f(i){i.disabled!==!0&&(t.enableMultiple===!0?i.selected=!i.selected:(n.model.value=i,r()))}function r(){if(n.model.submit){var i=[];t.enableMultiple===!0?t.items.forEach(function(n){n.selected&&(delete n.selected,i.push(n))}):i.push(n.model.value);n.model.submit(i)}}function e(){n.model.close&&n.model.close()}var i=Object.assign({},{title:"Select...",enableFilter:!1,enableMultiple:!1,defaultIcon:"icon-science",items:[],listType:"grid",orderBy:"name"},n.model.config),t=this;u()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.MacroPicker.Controller",["$scope","entityResource","editorService","localizationService","overlayService",function(n,t,i,r,u){function s(){n.model.value=n.model.value||[];e.defaultIcon="icon-settings-alt";e.allowAdd=f.maxItems===0||f.maxItems==="0"||n.model.value.length<f.maxItems;e.allowEdit=!0;e.allowRemove=!0;e.allowSort=Object.toBoolean(f.disableSorting)===!1&&f.maxItems!==1&&f.maxItems!=="1";e.addButtonLabelKey=f.addButtonLabelKey||"defaultdialogs_selectMacro";e.add=h;e.edit=c;e.remove=l;e.populateDescription=a}function h(){i.macroPicker({dialogData:{richTextEditor:!1,macroData:{macroAlias:""},allowedMacros:f.availableMacros},submit:function(t){n.model.value.push({udi:t.selectedMacro.udi,name:t.selectedMacro.name,alias:t.selectedMacro.alias,params:_.object(_.map(t.macroParams,function(n){return[n.alias,n.value]}))});f.maxItems!==0&&f.maxItems!=="0"&&n.model.value.length>=f.maxItems&&(e.allowAdd=!1);o();i.close()},close:function(){i.close()}})}function c(t){var r=n.model.value[t];i.macroPicker({dialogData:{richTextEditor:!1,macroData:{macroAlias:r.alias,macroParamsDictionary:r.params},allowedMacros:f.availableMacros},submit:function(r){n.model.value[t]={udi:r.selectedMacro.udi,name:r.selectedMacro.name,alias:r.selectedMacro.alias,params:_.object(_.map(r.macroParams,function(n){return[n.alias,n.value]}))};o();i.close()},close:function(){i.close()}})}function l(t){r.localizeMany(["content_nestedContentDeleteItem","general_delete","general_cancel","contentTypeEditor_yesDelete"]).then(function(i){u.open({title:i[1],content:i[0],closeButtonLabel:i[2],submitButtonLabel:i[3],submitButtonStyle:"danger",submit:function(){n.model.value.splice(t,1);(f.maxItems===0||f.maxItems==="0"||n.model.value.length<f.maxItems)&&(e.allowAdd=!0);o();u.close()},close:function(){u.close()}})})}function a(n){return n.alias}function o(){n.propertyForm&&n.propertyForm.$setDirty()}var f=Object.assign({},{availableMacros:[],maxItems:0,disableSorting:0,addButtonLabelKey:"defaultdialogs_selectMacro"},n.model.config),e=this;s()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.RadioButtonList.Controller",["$scope",function(n){function r(){n.model.value=n.model.value||t.defaultValue;Array.isArray(n.model.value)&&(n.model.value=n.model.value[0]);i.items=t.items.slice();i.showDescriptions=Object.toBoolean(t.showDescriptions);i.showIcons=Object.toBoolean(t.showIcons);i.uniqueId=n.model.hasOwnProperty("dataTypeKey")?[n.model.alias,n.model.dataTypeKey.substring(0,8)].join("-"):n.model.alias}var t=Object.assign({},{items:[],showDescriptions:0,showIcons:0,defaultValue:""},n.model.config),i=this;r()}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.RenderMacro.Controller",["$scope","$routeParams","macroResource",function(n,t,i){function u(){if(r.loading=!0,_.isEmpty(n.model.config.macro)===!1){var u=n.model.config.macro[0];Object.assign(u.params,{__propertyAlias:n.model.alias,__propertyLabel:n.model.label,__propertyCulture:n.model.culture,__propertyDataTypeKey:n.model.dataTypeKey,__propertyDescription:n.model.description,__propertyHideLabel:n.model.hideLabel});i.getMacroResultAsHtmlForEditor(u.alias,t.id,u.params).then(function(n){r.html=n;r.loading=!1},function(n){r.error={title:n.data.Message+" "+n.errorMsg,message:n.data.ExceptionMessage};r.loading=!1})}else r.error={title:"Macro not configured",message:"This data type has not been configured. Please ensure that a macro has been selected."},r.loading=!1}if(!n.model.hasOwnProperty("contentTypeId")){var r=this;u()}}]);angular.module("umbraco.directives").component("contentmentListEditor",{templateUrl:"/App_Plugins/Contentment/components/list-editor.html",bindings:{addButtonLabel:"@?",addButtonLabelKey:"<?",allowAdd:"<?",allowEdit:"<?",allowRemove:"<?",allowSort:"<?",defaultIcon:"<?",getItem:"<?",getItemIcon:"<?",getItemName:"<?",getItemDescription:"<?",ngModel:"=",onAdd:"<?",onEdit:"<?",onRemove:"<?",onSort:"<?",propertyActions:"<?"},require:{propertyForm:"^form",umbProperty:"^"},controllerAs:"vm",controller:["$scope","localizationService",function(n,t){function r(){typeof i.onAdd=="function"&&i.onAdd()}function u(n,t){switch(typeof i.allowEdit){case"boolean":return i.allowEdit;case"function":return i.allowEdit(n,t);default:return!0}}function f(n,t){switch(typeof i.allowRemove){case"boolean":return i.allowRemove;case"function":return i.allowRemove(n,t);default:return!0}}function e(n){if(typeof i.onEdit=="function")i.onEdit(n)}function o(n,t,r){if(typeof i.getItem=="function")return i.getItem(n,t,r);switch(r){case"icon":return typeof i.getItemIcon=="function"?i.getItemIcon(n,t):n.icon||i.defaultIcon;case"name":return typeof i.getItemName=="function"?i.getItemName(n,t):n.name;case"description":return typeof i.getItemDescription=="function"?i.getItemDescription(n,t):n.description;default:return n[r]}}function s(n){if(typeof i.onRemove=="function")i.onRemove(n)}var i=this;i.$onInit=function(){i.propertyAlias=i.umbProperty.property.alias;i.sortableOptions={axis:"y",containment:"parent",cursor:"move",disabled:i.allowSort===!1,opacity:.7,scroll:!0,tolerance:"pointer",stop:function(){i.onSort&&i.onSort();i.propertyForm&&i.propertyForm.$setDirty()}};i.add=r;i.canEdit=u;i.canRemove=f;i.edit=e;i.populate=o;i.remove=s;i.addButtonLabelKey&&t.localize(i.addButtonLabelKey).then(function(n){i.addButtonLabel=n});i.propertyActions&&i.propertyActions.length>0&&i.umbProperty.setPropertyActions(i.propertyActions)}}]});angular.module("umbraco.directives").component("contentmentStackEditor",{templateUrl:"/App_Plugins/Contentment/components/stack-editor.html",bindings:{addButtonLabel:"@?",addButtonLabelKey:"<?",allowAdd:"<?",allowEdit:"<?",allowRemove:"<?",allowSort:"<?",blockActions:"<?",defaultIcon:"<?",getItemIcon:"<?",getItemName:"<?",ngModel:"=?",onAdd:"<?",onEdit:"<?",onRemove:"<?",onSort:"<?",propertyActions:"<?",previews:"<?"},require:{propertyForm:"^form",umbProperty:"^"},controllerAs:"vm",controller:["$scope","localizationService",function(n,t){function r(){typeof i.onAdd=="function"&&i.onAdd()}function u(n,t){switch(typeof i.allowEdit){case"boolean":return i.allowEdit;case"function":return i.allowEdit(n,t);default:return!0}}function f(n,t){switch(typeof i.allowRemove){case"boolean":return i.allowRemove;case"function":return i.allowRemove(n,t);default:return!0}}function e(n){if(typeof i.onEdit=="function")i.onEdit(n)}function o(n,t,r){if(typeof i.getItem=="function")return i.getItem(n,t,r);switch(r){case"icon":return typeof i.getItemIcon=="function"?i.getItemIcon(n,t):n.icon||i.defaultIcon;case"name":return typeof i.getItemName=="function"?i.getItemName(n,t):n.name;case"description":return typeof i.getItemDescription=="function"?i.getItemDescription(n,t):n.description;default:return n[r]}}function s(n){if(typeof i.onRemove=="function")i.onRemove(n)}var i=this;i.$onInit=function(){i.propertyAlias=i.umbProperty.property.alias;i.sortableOptions={axis:"y",containment:"parent",cursor:"move",disabled:i.allowSort===!1,opacity:.7,scroll:!0,tolerance:"pointer",stop:function(){i.onSort&&i.onSort();i.propertyForm&&i.propertyForm.$setDirty()}};i.add=r;i.canEdit=u;i.canRemove=f;i.edit=e;i.populate=o;i.remove=s;i.addButtonLabelKey&&t.localize(i.addButtonLabelKey).then(function(n){i.addButtonLabel=n});i.propertyActions&&i.propertyActions.length>0&&i.umbProperty.setPropertyActions(i.propertyActions)}}]});angular.module("umbraco.services").factory("Umbraco.Community.Contentment.Services.DevMode",["$timeout","editorService",function(n,t){return{editValue:function(i,r){t.open({title:"Edit raw value",value:angular.toJson(i.value,!0),ace:{showGutter:!0,useWrapMode:!0,useSoftTabs:!0,theme:"chrome",mode:"javascript",advanced:{fontSize:"14px",wrap:!0},onLoad:function(t){n(function(){t.focus()})}},view:"/App_Plugins/Contentment/editors/_json-editor.html",size:"medium",submit:function(n){i.value=angular.fromJson(n);r&&r();t.close()},close:function(){t.close()}})}}}]);angular.module("umbraco.directives").component("leeWasHere",{template:'<img ng-src="data:image/png;base64,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" alt="Lee was here">'});angular.module("umbraco.directives.html").directive("lkHtmlAttributes",[function(){return{restrict:"A",scope:{attributes:"&lkHtmlAttributes"},link:function(n,t){var i=n.attributes();Array.isArray(i)&&i.length>0&&i.forEach(function(n){t.attr(n.name,n.value)})}}}]);angular.module("umbraco.directives.html").directive("lkBindHtmlTemplate",["$compile",function(n){return{restrict:"A",replace:!0,link:function(t,i,r){t.$watch(function(n){return n.$eval(r.lkBindHtmlTemplate)},function(r){i.html(r);n(i.contents())(t)})}}}]);angular.module("umbraco").controller("Umbraco.Community.Contentment.Tree.Controller",["$scope","$window","navigationService",function(n,t,i){function u(){const u="contentment";var f=Umbraco.Sys.ServerVariables.umbracoPlugins[u];r.title=f.name;r.version="v"+f.version;i.syncTree({tree:u,path:"-1"});n.$emit("$changeTitle",r.title);r.links=[{icon:"icon-fa fa-book",name:"Documentation",url:"https://github.com/leekelleher/umbraco-contentment/tree/master/docs",description:"How to use each of the property editors."},{icon:"icon-fa fa-comments-o",name:"Support forum",url:"https://our.umbraco.com/packages/backoffice-extensions/contentment/contentment-feedback/",description:"Ask for help, the community is your friend."},{icon:"icon-fa fa-code-fork",name:"Source code",url:"https://github.com/leekelleher/umbraco-contentment",description:"See the code, all free and open-source."},{icon:"icon-fa fa-bug",name:"Issue tracker",url:"https://github.com/leekelleher/umbraco-contentment/issues/new/choose",description:"Found a bug? Suggest a feature? Let me know."},{icon:"icon-fa fa-id-card-o",name:"License",url:"https://opensource.org/licenses/MPL-2.0",description:"Licensed under the Mozilla Public License."}];r.shareUrl=encodeURIComponent("https://github.com/leekelleher/umbraco-contentment");r.shareTitle=encodeURIComponent("Check out Contentment, innovative editor components for Umbraco CMS!");r.subscribe=function(){return t.open("https://tinyletter.com/umbraco-contentment","newsletterWindow","scrollbars=yes,width=840,height=640"),!0};r.vote=function(n){r.nggyu=n==!1}}var r=this;u()}])