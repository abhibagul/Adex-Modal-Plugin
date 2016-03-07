/*!
 * 			Adex Modal v1.0.0
 * 
 * 		The Simple Modal Plugin
 *		Author: Abhishek Bagul
 * 		Published: 6 Feb. 2016 @ 19:48:36
 *	
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * 
 * Copyright (C) 2016, Abhishek Bagul.
 * http://thesolutionbox.blogspot.com
 */

//Determine jquery is present or not
if ('undefined' !== typeof window.jQuery) {

(function($) {
	//append required styles ofthe modal
	//which are must for the plugin before
	//loading of the complete page
	var $styles = '<style>body,html{padding: 0px;border: 0px;margin: 0px;outline: 0px;width: 100%;height: 100%;}.adex_modal{transition:display 0.7s ease 0s; display:none;}.adex_modal .adex_bg{position:fixed;z-index:99998;left:0px;right:0px;top:0px;bottom:0px}.adex_modal .adex_table{  z-index:99999;  display:table;  width:100%;  height:100%;  box-shadow:0px 7px 10px 0px rgba(100,100,100,0.3);  position:fixed;  top:0px;  left:0px}.adex_modal .adex_cell{  vertical-align:middle;  display:table-cell}.adex_modal .adex_content{padding:10px 20px; width: 100%;}.adex_modal .adex_content{background:#fff;overflow-y:scroll}.adex_modal .adex_header .adex_title{overflow:hidden;white-space:nowrap;float:left;padding:10px 20px;text-transform:uppercase;font-weight:bold}.adex_header{min-height:40px}.adex_modal.default .adex_header{background:#3AB6F2 none repeat scroll 0% 0%;color:#FFF}.adex_modal .adex_close{  padding:10px 15px;  background:rgba(0,0,0,0.2);  transition:background 0.7s ease 0s;  float:right;  position:fixed;  right:0px}.adex_modal .adex_close:hover{cursor:pointer;background:rgba(0,0,0,0.5)}.default .adex_header{background:#15243B}.success .adex_header{background: rgb(32,162,32); color: #fff;}.warning .adex_header{background:rgb(233,155,0); color:#fff;}.error .adex_header{background: rgb(236,0,51); color: #fff;}.adex_modal_wrap{  box-shadow:10px 7px 20px 20px rgba(0,0,0,0.3)}.absolute{position:absolute;left:-4000px;}</style>';
	$($styles).appendTo('head');

	$.fn.adexmodal = function(options) {
		//Some default settings for safety if
		//user forgets to put any one of the
		//setting in the home page. 
		var settings = { 

			//If the header criteria is missing
			//or has some typo mistakes in the 
			//provided script it will set the 
			//header of the modal to blank. 
			header : '',

			//The default type of the modal plugin.
			//If the user forget to mention the type
			//of the modal it is set to default.
			//There are four types of the modal 
			// 1) default, 2) error, 3)success 4)warning
			//The above typo is incase sensetive. 
			mtype :'default',

			//The default beckground for the modal
			//plugin if someone has mistakenly put
			//the wrong background code. The
			//backgroung can be also be recognised in 
			//the rgb(*,*,*) format. Puting the opacity
			//in the rgba format will put the same opacity
			//as a background cancelling your opacity
			//property provided below in the plugin.
			background : '#000',

			//The opacity is placed in the
			//percentile format, rangingfrom 0 to 100.
			//The plugin further convert this into
			//required percentile opacity.
			bg_opacity : '60',  
			
			//default content which is going to
			//be display in the modal. The 
			//default content is set to blank. 
			content : '', 
			closebtn : '.close',
			speed: 160,
		}

		//Extend the settings provided by
		//the user and overwrite them but
		//placing after the above settings. 
		if(options) {
			$.extend(settings, options);
		}

		//return this
		return this.each(function() {	

			//Defining the basic variable
			// $this = element subjected to to application.
			// $settings = the previous extended settings array.
			var $this = $(this);
			var $settings = settings;
			

			//The following function will create 
			//a random class string and apply it 
			//to the subjected element.
			var randomkey = Math.random().toString(36).substring(7);
			$this.addClass(randomkey);
			
			//Wrap the element into the plugin elements
			//so it is made easy to understand where
			//the plugin is located on the page.
			$this.wrap('<div class="adex_modal_plugin"></div>');

			//Defining more basic variables
			// $that = Parent element for $this.
			var $that = $this.parent('.adex_modal_plugin');


			//Obtaining the all provided settings
			//by users or which is set to default 
			//from the array.
			$background = $settings.background;
			$opa_obt = $settings.bg_opacity;
			$opacity = ($opa_obt/100);
			$title = $settings.title;
			$type = $settings.mtype;
			$content = $settings.content;
			$header = $settings.header;
			$close = $settings.closebtn;
			$minht = $(window).height();

			//The maximum height upto which the
			//message area is visible and after
			//which it is going to scroll vertically.

			//If the height of the provided window is 
			//less than 500. Put upper and lower margin 
			//of message panel to 45px each.
			if($minht < 500){
				$c_height = $minht - 90;
			}

			//If the height is more than 500, then
			//set the maximum height of message panel
			//to 230px. Afterwards scroll the message panel.
			if($minht > 500){
				$c_height = 230; 
			}			

			//check custom header color is present or not
			//in the settings. If not tell the user in the
			//console and and set the header to default.
			var $customheader = $settings.customheader;
			if( typeof $customheader == 'undefined'){

				//custom header is not available or 
				//not defined.

				if( ($type == 'success') || ($type == 'error') || ($type == 'warning') || ($type == 'default') ){
					
					//type of modal is provided.
				
				}else{

					//type of modal is not provided.
					console.log('Invalid type of theme provided for the modal. The provided theme is : ' + $type + '.');
					console.log('The default theme is optimised by Adex Modal Plugin');
					$type = 'default';
				
				}
				var $css = '';

			}else{

				//cutom header is available. then warp it inside the css.
				var $css = 'style="background: ' + $customheader + ' !important;"'
			}


			//if the content is null or empty then
			//warn the user that he is not provided
			//any content.
			if(typeof $content == ''){
				console.log('Adex Modal plugin won\'t find any content!')
			}

			//if the header is null or empty then
			//warn the user that he is not provided
			//any header.
			if(typeof $header == ''){
				console.log('Adex Modal plugin won\'t find any header for modal!')
			}


			//After grabbing all the settings,
			//create the elements for the plugin.
			$code = "<div class='adex_modal "+ $type +" absolute'><div class='adex_bg' style='background:"+ $background +"; opacity:"+ $opacity +";'></div><div class='adex_table'><div class='adex_cell'><div class='adex_modal_wrap'><div class='adex_header' "+ $css +"><div class='adex_title'>"+ $header +"</div><div class='adex_close "+ $close +"'>X</div></div><div class='adex_content' style='max-height:"+  $c_height +"px;'>"+ $content +"</div></div></div></div></div>";

			//Insert the generated code inside
			//the parent element created before.
			$($code).appendTo($that);

			//Put the working actions of the modal
			//by appending the functions to the page.
			//The actions are of opening and closing
			//the modals which the provided speed of 
			//closing and opening the modal.
			$jq = "<script>"+
			 "$(document).ready(function(){ "+
			 	"$('." + randomkey + "').click(function(){"+
			 		"$(this).parent('.adex_modal_plugin').children('.adex_modal').fadeToggle("+ $settings.speed +");"+
			 		"$(this).parent('.adex_modal_plugin').children('.adex_modal').toggleClass('absolute');"+
				"});"+
				
				"$('."+ randomkey +"').parent('.adex_modal_plugin').find('." + $close + "').click(function(){"+
				"	$('."+ randomkey +"').parent('.adex_modal_plugin').children('.adex_modal').fadeToggle("+ $settings.speed +");"+
				"	$('."+ randomkey +"').parent('.adex_modal_plugin').children('.adex_modal').toggleClass('absolute');"+
				"});"+

			 "}); </script>";


			//Append the generated jquery code
			//to the page body element before
			//the page is being loaded.
			$($jq).appendTo('body');
		});

	}

})(jQuery);

//Now the plugin works is perfect :)! 
//Thank's for using the plugin.
console.log("Thank's for using Adex Modal Plugin! You can look for more cool stuff @ http://thesolutionbox.blogspot.in");

}
else{

	//If the jquery is absent, tell the user that it is must to use the jquery.
	console.log('The adex modal plugin requires the jquery plugin. To get the jquery visit : http://jquery.com');

}
