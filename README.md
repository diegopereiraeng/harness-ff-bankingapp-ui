# FF Banking App UI

Please, before doing any of the Demos


## BRANCH FEATURES Demo/LAB

1 - edit the [index.hml](https://github.com/diegopereiraeng/harness-ff-bankingapp-ui/blob/main/html/index.html) file and search for:
ex:

	a - <title>Harness Demo</title>

	b - <div id="titulo" class="titulo">
		Harness Banking
	    </div>

	c - <div id="logo" class="logo">
	        <img id="logo-img" src="https://harness.io/wp-content/themes/harnessio/assets/images/harness-logo.svg" height=40 ">
	    </div>

2 - Save as new Branch
3 - Create a Pull Request to Dev
4 - Wait for the Build/Deploy process, and them you should be able to connect into your environment:
ex: http://34.121.70.58/Your-Github-User/index.html

Thanks!


## FF DEMO/LAB

#### Create the flags and add them to code:

1 - edit the [ff.js](https://github.com/diegopereiraeng/harness-ff-bankingapp-ui/blob/main/html/js/ff.js) file and search for:

a(FF Key):

"UPDATE THE FF SDK KEY HERE"

b(Features):

----> ADD Your FEATURES HERE <--------

2 - Change the FF key using your own FF key and Add one or more feature below to this part of the code

3 - Create a Pull Request to the branch dev.

4 - Wait for the Build/Deploy process, and them you should be able to connect into your environment:
ex: http://34.121.70.58/Your-Github-User/index.html

5 - Create the flags using the same name of functions below.

ex: function Home_Maintenance(maintenance)...
flag will be "Home_Maintenance"

### ENABLE OR DISABLE MAINTENANCE MODE (DEPLOYED)
Use Harness Boolean FF to enable or disable maintenance mode.

Flag: Home_Maintenance

Type: Boolean

	function Home_Maintenance(maintenance) {

		var siteElement = $("body").find(".site");
		var maintenanceElement = $("body").find("#maintenance");
		console.log("Maintenance: "+maintenance)

		if ( maintenance == 'true'){
			console.log("Setting Maintenance: "+maintenance)
			siteElement.attr("style","display: none;");
			maintenanceElement.attr("style","display: visibility;");
			$("body").find("#scrolling-partners-section").attr("style","display: none;");
		}
		else{
			siteElement.attr("style","display: visibility;");
			$("body").find("#scrolling-partners-section").attr("style","display: visibility;");
			maintenanceElement.attr("style","display: none;");
			$("body").find("#scrolling-partners-section").attr("style","display: visibility;");
		}

	}

### CHANGE LOGO IMAGE
Use Harness String Variant  FF to change logo image

Flag: Home_Logo

Type: String Variant

Value: logo url - ex: http://site.com/image.png

	function Home_Logo(logo) {
		var imgElement = $("body").find("#logo-img");
		imgElement.attr("height","70");
		imgElement.attr("src",logo);
	}

### SEND MESSAGE TO CUSTOMER
Use Harness String Variant FF to send different messages for your customer.

Flag: ALL_ALERT_MODAL

Type: String Variant

Value: Message

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

### SHOW YOUTUBE VIDEO (DEPLOYED)
Use Harness String Variant FF to show your youtube videos for your customer.

Flag: ALL_YOUTUBE_MODAL

Type: String Variant

Value: Youtube video ID

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

Flag: Home_Banner

Type: Boolean

	function Home_Banner(flag) {
		checkBanner();
	}

### CHANGE TEXT HEADER NAME
Use Harness String Variant  FF to change all text header name

Flag: Home_Header_Name

Type: String Variant

Value: Header Text

	function Home_Header_Name(flag) {
		checkHeader();
	}

### CHANGE HOME MENU FEATURES
Use Harness JSON Variant  FF to change Menu feature

Flag: Home_Header_Name

Type: JSON Variant

Value: JSON ex:

    [    { "type": "fa-users", "name": "Home" },   { "type": "fa-eye", "name": "Activities" },   { "type": "fa-users", "name": "Bills" },   { "type": "fa-bullseye", "name": "Services" },   { "type": "fa-hand-holding-usd", "name": "Loans" },   { "type": "fa-bell", "name": "Insurance" },   { "type": "fa-bank", "name": "Crypto" },   { "type": "fa-history", "name": "Help" },   { "type": "fa-cog", "name": "Settings" },{"type": "fa-cog" , "name": "Time" } ]

FUNCTIO:

	function Home_Menu(flag) {
		if (window.location.href.indexOf("home_new.html") > -1 ) {
			checkMenu();
		}
	}

## Colors Features

### CHANGE HOME BODY COLOR
Use Harness String Variant  FF to change body color.

Flag: Home_Body_Color

Type: String Variant

Value: html color code or main color names

	function Home_Body_Color(flag) {
		checkSiteColor();
	}

### CHANGE HOME BODY TEXT COLOR
Use Harness String Variant  FF to change all text color.

Flag: Home_Body_Text_Color

Type: String Variant

Value: html color code or main color names

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

  
  
