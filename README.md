# FF Banking App UI

  

## FF LAB

  
#### Create your flags and add them to code:

### ENABLE OR DISABLE MAINTENANCE MODE
Use Harness Boolean FF to enable or disable maintenance mode.

	function Home_Maintenance(maintenance) {

		var siteElement = $("body").find(".site");
		var maintenanceElement = $("body").find("#maintenance");
		console.log("Maintenance: "+maintenance)

		if ( maintenance == 'true'){
			console.log("Setting Maintenance: "+maintenance)
			siteElement.attr("style","display: none;");
			maintenanceElement.attr("style","display: visibility;");
		}
		else{
			siteElement.attr("style","display: visibility;");
			$("body").find("#scrolling-partners-section").attr("style","display: visibility;");
		}
		maintenanceElement.attr("style","display: none;");
		}
	}

### CHANGE LOGO IMAGE
Use Harness String Variant  FF to change logo image

	function Home_Logo(logo) {
		var imgElement = $("body").find("#logo-img");
		imgElement.attr("height","70");
		imgElement.attr("src",logo);
	}
  
### SEND MESSAGE TO CUSTOMER
Use Harness String Variant FF to send different messages for your customer.

	function ALL_ALERT_MODAL(flag) {
		var title
		var message
		var type
		var enabled

		try{
		var Array = flag.split('|');
		enabled = Array[0];
		type = Array[1];
		title = Array[2];
		message = Array[3];
		console.log("title : "+title);
		console.log("type : "+type);
		console.log("message : "+message);
	}
	catch{
		alertArray = flag;
		enabled = flag
	}
	console.log("ALL_ALERT_MODAL: "+flag);
	console.log("ALL_ALERT_MODAL Enabled: "+enabled);

	if ( enabled != "off" && (modalStatus != enabled || modalStatusMessage != message)){
		modalStatus = enabled
		modalStatusMessage = message

		var btModal = $("body").find("#modalButton");

		$("body").find("#ModalMessage").text(message);
		$("body").find("#modalTitle").text(title);
		$("body").find("#iconModal").text("")

		if (type == "error"){
			$("body").find("#iconModal").append("&#xE5CD;");
			document.documentElement.style.setProperty("--modal-color", "#ef513a");
			document.documentElement.style.setProperty("--modal-roll-color", "#da2c12");
		}
		else
		{
			$("body").find("#iconModal").append("&#xE876;");
			document.documentElement.style.setProperty("--modal-color", "#82ce34");
			document.documentElement.style.setProperty("--modal-roll-color", "#6fb32b");
		}

		btModal.click();

	}else{
		if (enabled == 'off' && modalStatus != enabled){
			modalStatus = enabled
			modalStatusMessage = ""
		}

		try{
			$("body").find("#btnModalOk").click();
		}catch(e){
			console.log(e)
		}
		}
	}

### SHOW YOUTUBE VIDEO
Use Harness String Variant FF to show your youtube videos for your customer.

	function ALL_YOUTUBE_MODAL(flag) {
		if ( flag != "off" && (youtubeStatus != flag) ){
			console.log("Youtube:"+flag)
			var btModal = $("body").find("#youtubebtn");

			$('.video-btn').attr("data-src","https://www.youtube.com/embed/"+flag);
			$('#youtubeID').attr("src","https://www.youtube.com/embed/"+flag+"?modestbranding=1&amp;showinfo=0?start=2");
			
			if (youtubeStatus == 'off') {
				//btModal.click();
				$("#youtubeModal").modal('show');
			}
			youtubeStatus = flag
			}else{
				if (flag == 'off' && youtubeStatus != flag){
					youtubeStatus = flag
					try{
						$("#youtubeModal").modal('hide');
						$('#youtubeID').attr("src","");
					}catch(e){
						console.log(e)
					}
				}
		}

	}

### ADD OR REMOVE MARKETING BANNER
Use Harness Boolean FF to enable or disable the marketing banner.

	function Home_Banner(flag) {
		checkBanner();
	}

### CHANGE TEXT HEADER NAME
Use Harness String Variant  FF to change all text header name

	function Home_Header_Name(flag) {
		checkHeader();
	}

### CHANGE HOME MENU FEATURES
Use Harness JSON Variant  FF to change Menu feature

	function Home_Menu(flag) {
		if (window.location.href.indexOf("home_new.html") > -1 ) {
			checkMenu();
		}
	}

## Colors Features
	
### CHANGE HOME BODY COLOR
Use Harness String Variant  FF to change body color.

	function Home_Body_Color(flag) {
		checkSiteColor();
	}
	
### CHANGE HOME BODY TEXT COLOR
Use Harness String Variant  FF to change all text color.

	function Home_Body_Text_Color(flag) {
		checkSiteColor();
	}

### CHANGE LOGIN BODY COLOR
Use Harness String Variant  FF to change login body color.

	function Index_Body_Color(flag) {
		checkSiteColor()
	}

### CHANGE HEADER + MENU TEXT COLOR
Use Harness String Variant  FF to change all text color.

	function Text_Color_Mode(flag) {
		checkSiteColor();
	}

  
  
