import { initialize, Event } from 'https://unpkg.com/@harnessio/ff-javascript-client-sdk@1.4.8/dist/sdk.client.js'

var target = getTarget()
var menuStyle = ''
var menuSelectedStyle= 'w3-blue'
var firstStart = true
var currentContent

const cf = initialize(
	'eae200d6-fec2-4352-9227-927a67df73ea',
	// ^^ UPDATE THE FF SDK KEY HERE ^^ //
	target
);

var first = 0;
var target = "";
var close = 0;

/* FF Control */

var modalStatus = ''
var modalStatusMessage = ""
var youtubeStatus = 'off'
var ckoStatus = false
var maintenanceMode = false
var siteMode = "Site"
var HalloweenMode = true
var Banner = true
var backgroundBackup = "#2f81d4"
var halloweenSong = new Audio('./songs/HalloweenThemeSong.mp3');

/* End FF Control */

/* START FEATURE FLAGS FUNCTIONS */

// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //

/* END FEATURE FLAGS FUNCTIONS */

/* BUILT IN FF */

function HalloweenJack(flag) {
		var jack = $("body").find(".halloween");
		if(flag == 'true'){
			console.log("JAck In dA HouSe")
			jack.attr("style","display: visibility;");
		}else{
			jack.attr("style","display: none;");
		}
}
function Halloween(flag) {
	var halloweenElement = $("body").find("#Halloween");

	HalloweenMode = flag;
	console.log("Halloween: "+flag)
	if (maintenanceMode == false){
		if ( HalloweenMode == 'true'){
			console.log("Setting Halloween: "+flag)
			halloweenElement.attr("style","display: visibility;");

			$( 'body' ).each(function () {
					backgroundBackup =$("body").css('backgroundColor');
                    this.style.setProperty( 'background-color', '#512888', 'important' );
                });
		}
		else{
		$( 'body' ).each(function () {
			this.style.setProperty( 'background-color', backgroundBackup, 'important' );
		});
			halloweenElement.attr("style","display: none;");
		}
	}
}


/* BUiLT IN FF */

var refreshNum=0


/* Submit interception  */

function processLogin(e) {
	if (e.preventDefault) e.preventDefault();
	var harnessDemoEmail = $("body").find("#login-email").val();
	var harnessDemoCompany = $("body").find("#login-company").val();
	window.localStorage.setItem('harnessDemoEmail', harnessDemoEmail )
	window.localStorage.setItem('harnessDemoCompany', harnessDemoCompany )

	if ((window.localStorage.harnessDemoSignUpEmail == harnessDemoEmail) && (window.localStorage.harnessDemoSignUpCompany == harnessDemoCompany)){
		window.location.href = "./home_new.html";
	}
	else{
		alert("Login Failed!!!\nYour Email or Company Name doesn't Match\nTry again or sign up if you are not a member!");
	}

	// You must return false to prevent the default form behavior
	return false;
}

/* End submit interception */

/* Intercep Resize */
function resizeIframe(){
	let iframe = document.querySelector("#iframeContent");

	iframe.addEventListener('load', function() {
		console.log("resizing 2")
		iframe.style.height = ($('body').height())+ 'px';
		iframe.style.height = ('700px');
		if (mySidebar.style.display === 'block') {
			iframe.style.width = ($(window).width()) + 'px';
		} else {
			iframe.style.width = ($(window).width() - 275) + 'px';
		}

	});
	$(window).on('resize', function() {
		console.log("resizing")
		if (window.self != window.top) {
			$(parent.document).find('iframe').each(function() {
			if (this.contentWindow.document == window.document) {
					$(this).css({ height: $('body').height() + 'px', width: $(body).width() });
				}
			});
		}
	});
}

/* Harness HOME FF */
function showMenuContent(site,name,id){
	console.log("Show MENU: " +name+" - "+site)

	var menuSelected = "w3-"+cf.variation('Home_Menu_Dashboard_Selection_Color',"blue")

	$('.w3-bar-item').each(function(){
		console.log(this)
		$(this).removeClass(menuSelectedStyle);
		$(this).removeClass("active");
	});
	console.log("Adding Class" + "#"+id+" to site:"+id.val())
	//Add the clicked button class
	id.addClass(menuSelected);
	id.addClass("active");
	menuSelectedStyle=menuSelected

	if (name == "Home"){
		$("body").find("#iframeContent").attr("style","display: none;");

		$("body").find("#homeContent").attr("style","display: visibility;margin-left:300px;margin-top:3px;");
		currentContent = name
	}
	else{

		$("body").find("#iframeContent").attr("style","display: visibility;width:"+($(window).width()) + 'px'+";height:"+($(window).height())+ 'px;');
		resizeIframe();
		$("body").find("#iframeContent").attr("src",site);

		$("body").find("#homeContent").attr("style","display:none;margin-left:300px;margin-top:3px;");

		$("#iframeContent").on("load", function(){
			console.log($(this).contents().find('#onetrust-accept-btn-handler').click())
			$(this).contents().find('#onetrust-accept-btn-handler').trigger("click");
		});
		currentContent = name
	}

}


function checkLogo(){
	var logo = cf.variation('Home_Logo', "https://harness.io/wp-content/themes/harnessio/assets/images/harness-logo.svg")
	console.log("Logo: "+logo);

	var imgElement = $("body").find("#logo-img");
	imgElement.attr("src",logo);
	imgElement.attr("height","30");
}


/* End Harness HOME FF */

function getTarget(){
	var targetObj
	if(typeof(Storage) !== "undefined"){
		if((typeof(window.localStorage.harnessDemoSignUpEmail) !== "undefined") && typeof(window.localStorage.harnessDemoCompany) !== "undefined"){
			if (window.location.href.indexOf("index.html") > -1) {
				targetObj = {
							identifier: 'Guest',
							name: "Guest",
							attributes: {
							email: "community@harness.io",
							Company: "Community",
							Name: "Visitor"
						}
				}
				var customer = window.localStorage.harnessCustomer
				if (customer == 'true') {
					var ffID = (window.localStorage.harnessDemoSignUpEmail).replace(/[^a-zA-Z]/g, "");
					targetObj = {
						identifier: ffID,
						name: window.localStorage.harnessDemoSignUpName,
						attributes: {
							email: window.localStorage.harnessDemoSignUpEmail,
							Company: window.localStorage.harnessDemoSignUpCompany,
							Name: window.localStorage.harnessDemoSignUpName
						}
					}
					menuStyle = 'new_menu'
				}
			}
			else{
				var ffID = (window.localStorage.harnessDemoSignUpEmail).replace(/[^a-zA-Z]/g, "");
				targetObj = {
						identifier: ffID,
						name: window.localStorage.harnessDemoSignUpName,
						attributes: {
						email: window.localStorage.harnessDemoSignUpEmail,
						Company: window.localStorage.harnessDemoSignUpCompany,
						Name: window.localStorage.harnessDemoSignUpName
					}
				}
			}
			var welcome = $("body").find("#Welcome")
			welcome.text("");
			welcome.append("Welcome, <br><strong>"+window.localStorage.harnessDemoSignUpName+"</strong>")
		}
		else{
			targetObj = {
				identifier: 'Guest',
				name: "Guest",
				attributes: {
				email: "community@harness.io",
				Company: "Community",
				Name: "Visitor"
				}
				}
		}
	}
	else
	{
		targetObj = {
			identifier: 'Guest',
			name: "Guest",
			attributes: {
			email: "community@harness.io",
			Company: "Community",
			Name: "Visitor"
			}
			}
	}
	return targetObj
}

/* Logic to call dynamically Feature Flags methods using their own names */

cf.on(Event.READY, flags => {
	console.log("FLAGS:"+JSON.stringify(flags, null, 2));
	for (const [key, value] of Object.entries(flags)) {
		console.log(key);
		console.log(value);
		var stringFunction = key+"('"+value+"')";
		console.log(stringFunction)
		try{
			eval(stringFunction);
		}
		catch(e){
			console.log(e)
		}
	}
});

/* End Logic to call dynamically Feature Flags methods using their own names */

/* Feature Flags EVENTS */

cf.on(Event.CHANGED, flagInfo => {
	console.log("FLAG Changed:"+JSON.stringify(flagInfo, null, 2));
	console.log("FLAG Name:"+flagInfo.flag)
	console.log("FLAG identifier:"+flagInfo.identifier)
	console.log("FLAG kind:"+flagInfo.kind)
	console.log("FLAG value:"+flagInfo.value)
	console.log("type of:"+typeof(flagInfo))
	var stringFunction = flagInfo.flag+"('"+flagInfo.value+"')";
	console.log(stringFunction)
	try{
		eval(stringFunction);
	}
	catch(e){
		console.log(e)
	}
	console.log("FF is Awesome");
	if (flagInfo.deleted) {
		console.log('Flag'+flagInfo.flag+' is deleted');
		//log(JSON.stringify(flagInfo, null, 2))
	}
});
cf.on(Event.DISCONNECTED, () => {
  // Event happens when connection is disconnected
	console.log("FF Disconnected");
})

cf.on(Event.ERROR, error => {
	console.log("FF Errror");
	console.log(error);
	cf.off()
	cf.close();
	// Event happens when connection some error has occurred
})

/* End Feature Flags EVENTS */
