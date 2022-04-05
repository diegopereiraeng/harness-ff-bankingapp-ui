import { initialize, Event } from 'https://unpkg.com/@harnessio/ff-javascript-client-sdk@1.4.10/dist/sdk.client.js'
var target = getTarget()
var menuStyle = ''
var menuSelectedStyle= 'w3-blue'
var firstStart = true
var currentContent
var MenuVersion = "v1"

const cf = initialize(
    '2cef6a0c-a74c-4f9c-b4c5-4a1687055792',
    target
);

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
                            Name: "Visitor",
                            timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone),
                            lastUpdated: Date()
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
                            Name: window.localStorage.harnessDemoSignUpName,
                            timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone),
                            lastUpdated: Date()
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
                        Name: window.localStorage.harnessDemoSignUpName,
                        timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone),
                        lastUpdated: Date()
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
                    Name: "Visitor",
                    timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone),
                    lastUpdated: Date()
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
                Name: "Visitor",
                timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone),
                lastUpdated: Date()
              }
            }
    }
    return targetObj
}


var first = 0;
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

/* End FF Control */

function init() {
  refresh();
  //setInterval(refresh, 10000);
}

var ready = false
document.addEventListener("DOMContentLoaded", function(event) {
  ready = true
});
var jackWords = ['Harness','Im Jack','Ouch','Halloween','Candy?','Threats =D','Stop it','Booo'];
function randomWord(arr) {
return arr[Math.floor(Math.random() * arr.length)];}
var lock = false
var lockSong = false
$( function() {
	$( "#draggable" ).draggable();
	$('#draggable').click(function(){
	if (!lock){
		lock = true
		$(".speech-bubble").css("visibility", "visible");
		$(".speech-bubble").text(randomWord(jackWords));
		setTimeout(() => {  $(".speech-bubble").css("visibility", "hidden");lock = false; }, 2000);
	}else{
		console.log("Ouch")
	}
	if (lockSong == false){
		lockSong = true
		var audio = new Audio('./songs/HalloweenThemeSong.mp3');
		audio.play();
		setTimeout(() => {  audio.pause();lockSong = false;}, 25000);
	}
}
)
} );

/* START FEATURE FLAGS FUNCTIONS */

function HalloweenSongEnabled(flag) {
	if (ready) {
		var halloweenSongElement = document.getElementById('HalloweenTheme');
		if(flag == 'true'){
			console.log("Halloween Theme")
			halloweenSongElement.play();
		}else{
			halloweenSongElement.pause();
		}
	}
}
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

function BackendAPI(flag){
    if (flag == 'true') {
        var jqxhr = $.get( "http://34.121.70.58/banking-backend/api/v1/payments/process", function( data, status) {
            console.log( "payment - success" );
            console.log(data);
            console.log("Return Status");
            console.log(status);
            })
                .done(function() {
                console.log( "payment with success" );
                })
                .fail(function() {
                console.log( "payment error" );
                })
                .always(function() {
                console.log( "finished" );
                });

            // Perform other work here ...

            // Set another completion function for the request above
            jqxhr.always(function() {
                console.log( "payment transaction finished" );
        });
    }
}

function Customer_Mode(flag){
	console.log("Customer Mode = "+flag)
    if (flag == 'true') {
        window.localStorage.setItem('harnessCustomer', 'true' )
        menuStyle = 'new_menu'
    }
    else{
        window.localStorage.setItem('harnessCustomer', 'false' )
        menuStyle = 'menu'
    }
    if (MenuVersion == "v1") {
		if (window.location.href.indexOf("home_new.html") > -1 ) {
			checkMenu();
		}
	}
	else if (MenuVersion == "v2") {
		checkMenuV2();
	}
}

function Home_Menu_Dashboard_Selection_Color(flag) {

    $('.harness-dashboard').each(function(){
        console.log("Color Selected "+flag)
        $(this).removeClass(menuSelectedStyle);
        $(this).addClass("w3-"+flag);

    });

    $('.active').removeClass(menuSelectedStyle);
    console.log("menu selected old color: "+menuSelectedStyle+" - menu selected new color:"+"w3-"+flag)
    $('.active').addClass("w3-"+flag);

    menuSelectedStyle = "w3-"+flag

}
function ALL_Alert_Message(flag)
{
    alert(flag)
}

function TestRealTime(){
    alert(flag)
}

function Guest_Mode(flag) {
	console.log("Guest Mode: "+flag)
}

function Home_Menu_New(flag){
    if (menuStyle == 'new_menu') {
		console.log("New Menu = true")
	}else{
		console.log("New Menu = false")
	}

}

function Index_SignUp_Enable(flag){
    if (flag == 'off') {
        $('#signupForm').attr("style","display: none;");
        $('#login').attr("style","margin-left: -170px;");
        $('.switcher-login').attr("style","margin-left: -70px;");
        $('.switcher-signup').prop('disabled', true);
    }
    else{
        $('#signupForm').attr("style","display: visibility;");
        $('.switcher-signup').prop('disabled', false);
        $('#login').attr("style","");
        $('.switcher-login').attr("style","");
    }
}

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
        enabled = flag;
        type = "error"
        title = "error";
        message = "error";
    }
    console.log("ALL_ALERT_MODAL: "+flag);
    console.log("ALL_ALERT_MODAL Enabled: "+enabled);


    if ( enabled != "off" && (modalStatus != enabled || modalStatusMessage != message)){
        modalStatus = enabled
        modalStatusMessage = message
        var btModal = $("body").find("#modalButton");
        $("body").find("#ModalMessage").empty();
        $("body").find("#ModalMessage").append(message);
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

        try{
            if (enabled == 'off' && modalStatus != enabled){
                modalStatus = enabled
                modalStatusMessage = ""
            }
            $("body").find("#btnModalOk").click();

        }catch(e){
            console.log(e)
        }
   }


}
function ALL_YOUTUBE_MODAL(flag) {

    //alert("Youtube:"+flag)
    if ( flag != "off" && (youtubeStatus != flag) ){
        console.log("Youtube:"+flag)
        var btModal = $("body").find("#youtubebtn");
        $('.video-btn').attr("data-src","https://www.youtube.com/embed/"+flag);
        $('#youtubeID').attr("src","https://www.youtube.com/embed/"+flag+"?modestbranding=1&amp;showinfo=0?start=2");
        if (youtubeStatus == 'off') {
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
function Color_Mode(flag) {
    checkSiteColor()
}
function Customer_Message(flag) {
    console.log("FF: "+flag);
}
function Gender(flag) {
    console.log("FF: "+flag);
}
function Home_Banner(flag) {
    checkBanner();
}
function Home_Body_Color(flag) {
    checkSiteColor();
}
function Home_Body_Text_Color(flag) {
    checkSiteColor();
}
function Home_Dashboard(flag) {
    if (window.location.href.indexOf("home_new.html") > -1) {
        checkDashboard();
    }
}
function Home_Header_Name(flag) {
    checkHeader();
}
function Home_Logo(logo) {
    var imgElement = $("body").find("#logo-img");
    imgElement.attr("height","50");
    imgElement.attr("src",logo);
}

function Home_CKO(flag) {
    var siteElement = $("body").find(".site");
    var ckoElement = $("body").find("#cko2021");
    console.log("CKO Flag: "+flag)
    if ( flag == 'true'){
        ckoStatus = true
        console.log("Setting CKO: "+flag)
        siteElement.attr("style","display: none;");
        $("body").find("#scrolling-partners-section").attr("style","display: none;");
        ckoElement.attr("style","display: visibility;");
    }
    else{
        ckoStatus = false;
        siteElement.attr("style","display: visibility;");
        $("body").find("#scrolling-partners-section").attr("style","display: visibility;");
        ckoElement.attr("style","display: none;");
    }
}


function Home_Maintenance(maintenance) {

	var siteElement = $("body").find(".site");
	var halloweenElement = $("body").find("#Halloween");
	var harnessElement = $("body").find("#Harness");
	var maintenanceElement = $("body").find("#maintenance");
	console.log("Maintenance: "+maintenance)

	if ( maintenance == 'true'){
		maintenanceMode = true
		console.log("Setting Maintenance: "+maintenance)
		siteElement.attr("style","display: none;");
		halloweenElement.attr("style","display: none;");
		harnessElement.attr("style","display: none;");
		maintenanceElement.attr("style","display: visibility;");
		$("body").find("#scrolling-partners-section").attr("style","display: none;");
	}
	else{
		maintenanceMode = false
		switch(siteMode){
			case "Site":
				siteElement.attr("style","display: visibility;");
				break;
			case "Harness":
				harnessElement.attr("style","display: visibility;");
				break;
			}

		if (HalloweenMode == true ){
			halloweenElement.attr("style","display: visibility;");
		}
		if (Banner == true ){
			$("body").find("#scrolling-partners-section").attr("style","display: visibility;");
		}
		maintenanceElement.attr("style","display: none;");
	}

}
function Menu_Version(flag) {
	MenuVersion = flag;
	if (MenuVersion == "v1") {
		if (window.location.href.indexOf("home_new.html") > -1 ) {
			checkMenu();
		}
	}
	else if (MenuVersion == "v2") {
		checkMenuV2();
	}
}

function Home_Menu(flag) {
	if (MenuVersion == "v1") {
		if (window.location.href.indexOf("home_new.html") > -1 ) {
			checkMenu();
		}
	}
	else if (MenuVersion == "v2") {
        checkMenuV2();
    }
}
function Index_Body_Color(flag) {
    checkSiteColor()
}
function Index_Guest_Login(flag) {
    if (window.location.href.indexOf("index.html") > -1) {
        checkGuest();
    }
    console.log("FF: "+flag);
}
function javascript(flag) {
    console.log("FF: "+flag);
}
function Text_Color_Mode(flag) {
    checkSiteColor();
}

function checkMenu(){
    var menu
    var paddingClass
    var iconclass


	console.log("Checking Menu...");
	console.log("Applying Menu " + MenuVersion);
	if (MenuVersion == "v1") {
		if (window.location.href.indexOf("home_new.html") > -1 ) {
			var sideBarElement = $("body").find("#mySidebar");
			var avatarDivElement = $("body").find("#avatarDiv");
			var menuTitleElement = $("body").find("#menuTitle");

			var pageContentElement = $("body").find("#mainPageContent");
			var homeContentElement = $("body").find("#homeContent");

			//pageContentElement.removeAttr("style");
			pageContentElement.attr("style","margin-left:275px;margin-top:3px;");
			homeContentElement.attr("style","margin-left:275px;margin-top:3px;");

			//sideBarElement.removeAttr("style");
			sideBarElement.attr("style","z-index:3;width:275px;");

			avatarDivElement.attr("style","display: visibility;");
			menuTitleElement.attr("style","display: visibility;");

			checkSiteColor();


		}
	}


    if (menuStyle == 'menu' && window.location.href.indexOf("home_new.html") > -1) {
        menu = JSON.parse(cf.variation('Home_Menu', '[    { "type": "fa-users", "name": "Sign in" },   { "type": "fa-eye", "name": "Sign up" },   { "type": "fa-users", "name": "Harness" } ]'))
        paddingClass = "w3-padding"
        iconclass = ""
    }else{
        menu = JSON.parse(cf.variation('Home_Menu_New', '[    { "type": "fa-users", "name": "Sign in" },   { "type": "fa-eye", "name": "Sign up" },   { "type": "fa-users", "name": "Harness" } ]'))
        paddingClass = "w3-padding-small"
        iconclass = "w3-medium"
    }
    console.log("Menu Style: "+JSON.stringify(menuStyle));
    console.log("Menu: "+JSON.stringify(menu));
    // Bloco Menu
    $("body").find(".w3-bar-block").remove();
    var newBlock = $("<div />", {
        class: "w3-bar-block",
    });
    var newCloseLink = $("<a />", {
    //href : "#",
    class: "w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black",
    onclick: "w3_close()",
    title: "close menu"
    });
    $(newBlock).appendTo("#menuID");
    if(close == 0 ){
        $(newCloseLink).appendTo(".w3-bar-block");
        //close = 1;
    }


    for (const [key, value] of Object.entries(menu)) {
        console.log(value.name);
        var href
        var objectIcon
        var newLink;

        try{
            if(typeof(value.href) !== "undefined"){
                href=value.href
            }
            else{
                value.href="https://harness.io/"
            }
        }
        catch{
            value.href="https://harness.io/"
        }
        console.log("href = "+href);
        try{
            objectIcon=value.type
            console.log(objectIcon);
        }
        catch{
            objectIcon="fa-diamond"
        }
        var linkID = (value.name).replace(/[^a-zA-Z]/g, "");

        var menuSelected = "w3-"+cf.variation('Home_Menu_Dashboard_Selection_Color',"blue")

        if (value.name == "Home") {
            var active = ''
            if (firstStart) {
                newLink = $("<a />", {
                    //href : "#",
                    class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected+" active",
                    id: "menu-"+linkID,
                    value: href
                });
                firstStart = false
                currentContent = "Home"
            }else{
                if (currentContent == value.name) {
                    newLink = $("<a />", {
                        //href : "#",
                        class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected+" active",
                        id: "menu-"+linkID,
                        value: href
                    });
                } else {
                    newLink = $("<a />", {
                        //href : "#",
                        class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected,
                        id: "menu-"+linkID,
                        value: href
                    });
                }

            }

        }else{
            newLink = $("<a />", {
                //href : "#",
                class: "w3-bar-item w3-button "+paddingClass,
                id: "menu-"+linkID,
                target: "iframeContent",
                value: href
            });
        }

        menuSelectedStyle=menuSelected
        $(newLink).append('<i class="fas '+objectIcon+' fa-fw '+iconclass+'"></i>'+"  "+value.name);
        if(close == 0 ){
            $(newCloseLink).append('<i class="fa fa-remove fa-fw"></i>  Close Menu');
            close = 1;
        }

        $(newLink).on("click", function() {

                        showMenuContent(value.href,value.name, $(this));
                        });

        $(newLink).appendTo(".w3-bar-block");
        console.log(newLink);
    }

}

function checkMenuV2(flag){
	var menu
	var paddingClass
	var iconclass

	var sideBarElement = $("body").find("#mySidebar");
	var burgerElement = $("body").find("#hr");
	var avatarDivElement = $("body").find("#avatarDiv");
	var menuTitleElement = $("body").find("#menuTitle");
    menuTitleElement.attr("style","display: none;");

	var pageContentElement = $("body").find("#mainPageContent");
	var homeContentElement = $("body").find("#homeContent");

	//pageContentElement.removeAttr("style");

	//navBarElement.attr("style","margin-left:55px;margin-top:8px;");
	pageContentElement.attr("style","margin-left:55px;margin-top:3px;");
	homeContentElement.attr("style","margin-left:55px;margin-top:3px;");
	//sideBarElement.removeAttr("style");
	sideBarElement.attr("style","z-index:3;width:60px;margin-top:110px;");
	burgerElement.remove()

	checkSiteColor();


	avatarDivElement.attr("style","display: none;");
	menuTitleElement.attr("style","display: none;");

	if (menuStyle == 'menu' && window.location.href.indexOf("home_new.html") > -1) {
		menu = JSON.parse(cf.variation('Home_Menu', '[    { "type": "fa-users", "name": "Sign in" },   { "type": "fa-eye", "name": "Sign up" },   { "type": "fa-users", "name": "Harness" } ]'))
		paddingClass = "w3-padding"
		iconclass = ""
	}else{
		menu = JSON.parse(cf.variation('Home_Menu_New', '[    { "type": "fa-users", "name": "Sign in" },   { "type": "fa-eye", "name": "Sign up" },   { "type": "fa-users", "name": "Harness" } ]'))
		paddingClass = "w3-padding-small"
		iconclass = "w3-medium"
	}
	console.log("Menu Style: "+JSON.stringify(menuStyle));
	console.log("Menu: "+JSON.stringify(menu));
	// Bloco Menu
	$("body").find(".w3-bar-block").remove();
	var newBlock = $("<div />", {
		class: "w3-bar-block",
	});
	var newCloseLink = $("<a />", {
	//href : "#",
	class: "w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black",
	onclick: "w3_close()",
	title: "close menu"
	});
	$(newBlock).appendTo("#menuID");
	if(close == 0 ){
		$(newCloseLink).appendTo(".w3-bar-block");
		//close = 1;
	}


	for (const [key, value] of Object.entries(menu)) {
		console.log(value.name);
		var href
		var objectIcon
		var newLink;

		try{
			if(typeof(value.href) !== "undefined"){
				href=value.href
			}
			else{
				value.href="https://harness.io/"
			}
		}
		catch{
			value.href="https://harness.io/"
		}
		console.log("href = "+href);
		try{
			objectIcon=value.type
			console.log(objectIcon);
		}
		catch{
			objectIcon="fa-diamond"
		}
		var linkID = (value.name).replace(/[^a-zA-Z]/g, "");

		var menuSelected = "w3-"+cf.variation('Home_Menu_Dashboard_Selection_Color',"blue")

		if (value.name == "Home") {
			var active = ''
			if (firstStart) {
				newLink = $("<a />", {
					//href : "#",
					class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected+" active",
					id: "menu-"+linkID,
					value: href
				});
				firstStart = false
				currentContent = "Home"
			}else{
				if (currentContent == value.name) {
					newLink = $("<a />", {
						//href : "#",
						class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected+" active",
						id: "menu-"+linkID,
						value: href
					});
				} else {
					newLink = $("<a />", {
						//href : "#",
						class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected,
						id: "menu-"+linkID,
						value: href
					});
				}

			}

		}else{
			newLink = $("<a />", {
				//href : "#",
				class: "w3-bar-item w3-button "+paddingClass,
				id: "menu-"+linkID,
				target: "iframeContent",
				value: href
			});
		}

		menuSelectedStyle=menuSelected
		$(newLink).append('<i title="'+value.name+'" class="fas '+objectIcon+' fa-fw '+iconclass+'"></i>');
		if(close == 0 ){
			$(newCloseLink).append('<i class="fa fa-remove fa-fw"></i>');
			close = 1;
		}

		$(newLink).on("click", function() {

						showMenuContent(value.href,value.name, $(this));
						});

		$(newLink).appendTo(".w3-bar-block");
		console.log(newLink);
	}
}

/* END FEATURE FLAGS FUNCTIONS */


var refreshNum=0
function refresh() {
    console.log("Refresh No: "+refreshNum);
    checkMaintenance();
    checkSiteColor();
    if (window.location.href.indexOf("users.html") > -1) {
        checkAddUsers();
        var newMessage = $("body").find("#message > div").clone();
        newMessage.find(".message").append(value2);
        newMessage.find(".prime").append(value);
        newMessage.find(".message-box").addClass("message-blue");
        $(newMessage).appendTo(".message-list");
    }
    if (window.location.href.indexOf("home_new.html") > -1) {
        checkDashboard();
        if (MenuVersion == "v1") {
			checkMenu();
		}
		else if (MenuVersion == "v2") {
			checkMenuV2();
		}

    }
    if (window.location.href.indexOf("index.html") > -1) {
        checkGuest();
    }
    checkModal();
    checkBanner();
    checkLogo();
    checkHeader();

    refreshNum++;
    first++
}


function loginAsGuest(){
    window.localStorage.setItem('harnessDemoEmail', "community@harness.io" )
    window.localStorage.setItem('harnessDemoCompany', "Community" )
    window.localStorage.setItem('harnessDemoSignUpName', "Visitor" )
    window.localStorage.setItem('harnessDemoSignUpCompany', "Community" )
    window.localStorage.setItem('harnessDemoSignUpEmail', "community@harness.io" )
    window.location.href = "./home_new.html";
}

function checkGuest(){
    const guest = cf.variation('Index_Guest_Login', false)
    console.log("Guest: "+guest);
    if (guest)
    {
        var newLoginAsGuest = $("<button />", {
           href : "#",
           class: "btn-guest",
           onclick: "loginAsGuest()",
           title: "Login as Guest",
           text: "Login as Guest",
           value: "Login as Guest",
           id: "guest"
        });
        $(newLoginAsGuest).appendTo("#login");
    }else{
        try{
            $("body").find("#guest").remove()
        }
        catch(error){
            console.log(error);
        }
    }

}


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
    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}
function processSignUp(e) {
    if (e.preventDefault) e.preventDefault();
    var harnessDemoSignUpName = $("body").find("#signup-name").val();
    var harnessDemoSignUpCompany = $("body").find("#signup-company").val();
    var harnessDemoSignUpEmail = $("body").find("#signup-email").val();
    window.localStorage.setItem('harnessDemoSignUpName', harnessDemoSignUpName )
    window.localStorage.setItem('harnessDemoSignUpCompany', harnessDemoSignUpCompany )
    window.localStorage.setItem('harnessDemoSignUpEmail', harnessDemoSignUpEmail )
    window.localStorage.setItem('harnessCustomer', 'false' )

    var btModal = $("body").find("#modalButton");
    $("body").find("#ModalMessage").text("Thanks "+harnessDemoSignUpName+"!\nYou and your company "+harnessDemoSignUpCompany +" was registered with success!");
    $("body").find("#modalTitle").text("Success!");
    $("body").find("#iconModal").text("")
    $("body").find("#iconModal").append("&#xE876;");

    btModal.click();





    $("body").find("#login-email").val(harnessDemoSignUpEmail)
    $("body").find("#login-company").val(harnessDemoSignUpCompany)

    $("body").find(".switcher-login").click();
    /* do what you want with the form */
    // You must return false to prevent the default form behavior
    return false;
}

if (window.location.href.indexOf("index.html") > -1) {
    /* Login */
    var form = document.getElementById('login');
    if (form.attachEvent) {
      form.attachEvent("submit", processLogin);
    } else {
      form.addEventListener("submit", processLogin);
    }
    /* Sign Up */
    var form = document.getElementById('signup');
    if (form.attachEvent) {
        form.attachEvent("submit", processSignUp);
    } else {
        form.addEventListener("submit", processSignUp);
    }
    /* Switcher */
    const switchers = [...document.querySelectorAll('.switcher')]

    switchers.forEach(item => {
        item.addEventListener('click', function() {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'))
            this.parentElement.classList.add('is-active')
        })
    })

}


/* End submit interception */
var value;
let users = "";

/* Intercep Resize */


function resizeIframe(){
    let iframe = document.querySelector("#iframeContent");
    let iYoutube = document.querySelector("#iframeContent");

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

        $("body").find("#iframeContent").attr("style","display: visibility;width:"+($(window).width()) + 'px'+";height:"+$(window).height()+ 'px;');
        resizeIframe();
        $("body").find("#iframeContent").attr("src",site);

        $("body").find("#homeContent").attr("style","display:none;margin-left:300px;margin-top:3px;");
        //var iframe = $('body', $('#iframeContent')[0].contentWindow.document);
        //iframe.find("#onetrust-accept-btn-handler").click();
        $("#iframeContent").on("load", function(){
            console.log($(this).contents().find('#onetrust-accept-btn-handler').click())
            $(this).contents().find('#onetrust-accept-btn-handler').trigger("click");
          });
          currentContent = name
    }

}

function checkSiteColor(){
    var color = cf.variation('Color_Mode', '#222')
    var textColor = cf.variation('Text_Color_Mode', '#222')
    var homeBodyText = cf.variation('Home_Body_Text_Color', '#000')



    console.log("Site Color: "+color+" - Text Color: "+textColor);
    if (window.location.href.indexOf("home_new.html") > -1) {
        var homeBody = cf.variation('Home_Body_Color', '#F8F8FF')
        backgroundBackup = homeBody

        console.log("body color: "+homeBody)

        document.querySelector("#header-container").style.setProperty("--main-bg-color", color);
        document.querySelector("#mySidebar").style.setProperty("--main-bg-color", color);
        document.querySelector("#header-container").style.setProperty("--main-text-color", textColor);
        document.querySelector("#mySidebar").style.setProperty("--main-text-color", textColor);
        document.querySelector("body").style.setProperty("--main-bg-color", homeBody);
        document.querySelector("body").style.setProperty("--main-text-color", homeBodyText);
    }
    else if( window.location.href.indexOf("index.html") > -1) {
         var body = cf.variation('Index_Body_Color', '#222')
         document.querySelector("#header-container").style.setProperty("--main-bg-color", color);
         document.querySelector("body").style.setProperty("--main-body-color", body);
         document.querySelector("#header-container").style.setProperty("--main-text-color", textColor);
         document.querySelector("body").style.setProperty("--main-Itext-color", homeBodyText);
     }


}


function checkModal(){
    var modalFF = cf.variation('ALL_ALERT_MODAL', "off")

    console.log("Modal FF: "+modalFF);
    if ( modalFF != "off"){
        var titleModalFF = cf.variation('ALL_ALERT_MODAL_TITLE', "Awesome!")
        var typeModalFF = cf.variation('ALL_ALERT_MODAL_TYPE', "success")

        var btModal = $("body").find("#modalButton");
        btModal.click();
        $("body").find("#modalTitle").text(titleModalFF);
        $("body").find("#ModalMessage").text(modalFF);
        $("body").find("#iconModal").text("")
        if (typeModalFF == "error"){
            $("body").find("#iconModal").append("&#xE5CD;");
            //document.querySelector(".btn").style.setProperty("--modal-color", "#ef513a");
            //document.querySelector(".btn").style.setProperty("--modal-roll-color", "#da2c12");
            //document.querySelector(".btn").style.setProperty("--modal-roll-color", "#da2c12");
            //$("body").find(".modal-confirm").get(0).style.setProperty("--modal-color", "#da2c12")
            document.documentElement.style.setProperty("--modal-color", "#ef513a");
            document.documentElement.style.setProperty("--modal-roll-color", "#da2c12");
        }
        else
        {
            $("body").find("#iconModal").append("&#xE876;");
            document.documentElement.style.setProperty("--modal-color", "#82ce34");
            document.documentElement.style.setProperty("--modal-roll-color", "#6fb32b");

        }
    }

}


function checkLogo(){
    var logo = cf.variation('Home_Logo', "./images/harness-light.svg")
    console.log("Logo: "+logo);

    var imgElement = $("body").find("#logo-img");
    if (logo == "https://seeklogo.com/images/D/drone-logo-9D3EF64845-seeklogo.com.png"){
        imgElement.attr("src",logo);
        imgElement.attr("height","30");
        }
    else {
        imgElement.attr("src",logo);
        //imgElement.attr("width","114");
        imgElement.attr("width","40");
    }


}
function checkHeader(){
    var header = cf.variation('Home_Header_Name', "Banking App")
    console.log("Header: "+header);

    var headerElement = $("body").find("#titulo")
    headerElement.text("")
    headerElement.append(header);



}
function checkDashboard(){

    var dashboard = cf.variation('Home_Dashboard', "Balance")
    var dashboardArray = dashboard.split(',');
    console.log("Dashboard: "+dashboardArray);

    var dashboardElement = $("body").find("#dashboard");
    const crypto = window.crypto || window.msCrypto;
    var array = new Uint32Array(1);


    if (dashboardArray.includes("Messages")){
        let randomMessages = Math.floor(crypto.getRandomValues(array) * (100 - 1) + 1);
        dashboardElement.find("#Messages").attr("style","display: visibility;");
    }
    else{
        dashboardElement.find("#Messages").attr("style","display: none;");
    }
    if (dashboardArray.includes("Balance")){
        let randomBalance = Math.floor(crypto.getRandomValues(array) * (100000 - 1000) + 1000);
        dashboardElement.find("#Balance").attr("style","display: visibility;");
    }
    else{
            dashboardElement.find("#Balance").attr("style","display: none;");
        }
    if (dashboardArray.includes("Loan")){
        let randomLoan = Math.floor(crypto.getRandomValues(array) * (10000 - 1000) + 1000);
        dashboardElement.find("#Loan").attr("style","display: visibility;");
    }
    else{
            dashboardElement.find("#Loan").attr("style","display: none;");
        }
    if (dashboardArray.includes("Bills")){
        let randomBills = Math.floor(crypto.getRandomValues(array) * (20 - 1) + 1);
        dashboardElement.find("#Bills").attr("style","display: visibility;");
    }
    else{
        dashboardElement.find("#Bills").attr("style","display: none;");
    }


}
function checkContent(){

}
function checkBanner(){
    var banner = cf.variation('Home_Banner', "Harness") // second argument is default value when variation does not ex
    console.log("Banner: "+banner);

    var dashboardElement = $("body").find("#scrolling-partners-section");

    if (banner == "Harness"){
        dashboardElement.attr("style","display: visibility;");
    }
    else{
        dashboardElement.attr("style","display: none;");
    }

}
function checkMaintenance(){
    var maintenance = cf.variation('Home_Maintenance', true) // second argument is default value when variation does not ex
    console.log("Maintenance Mode: "+maintenance);
    var siteElement = $("body").find(".site");
    var maintenanceElement = $("body").find("#maintenance");

    if (maintenance){
        siteElement.attr("style","display: none;");
        maintenanceElement.attr("style","display: visibility;");

    }
    else{
        siteElement.attr("style","display: visibility;");
        maintenanceElement.attr("style","display: none;");
        $("body").find("#scrolling-partners-section").attr("style","display: visibility;");
    }

}


/* End Harness HOME FF */

/* Create Harness Local Storage */

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function setDataStorage(data){
    try{
        let userID = "";
        try {
            userID = JSON.parse(window.localStorage.harnessDemo).UserID;
        }
        catch(error){
            userID = '';
        }
        if(typeof(userID) == "undefined"){
            userID = '';
        }

        if ( userID.length < 1) {
            userID = uuidv4();
            data.userID = userID;
        }
        if(typeof(Storage) !== "undefined"){
            window.localStorage.setItem('harnessDemo', JSON.stringify(data) )
        }
    }
    catch(err){console.log(err)}
}
function getDataStorage(data){
    try{
        return JSON.parse(window.localStorage.harnessDemo);
    }
    catch(err){console.log(err); return "";}
}

/* End Create Harness Local Storage */

/* Hack form submit form */
/*
function processForm(e) {
    if (e.preventDefault) e.preventDefault();



    // You must return false to prevent the default form behavior
    return false;
}

var form = document.getElementById('my-form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}
*/
/* End Hack form submit form */



/* Harness Leader Board */
function checkAddUsers(){
    /*$.ajax({
        url: "https://api.fungenerators.com/name/generate?category=superhero&limit=1",
        type: 'GET',
        success: function(res) {
            console.log(res);
            users.push("res");
        }
    });*/


    //document.querySelector('.output').textContent = separatedArray;
    const genderFF = cf.variation('Gender', true) // second argument is default value when variation does not ex
    const genderArray = genderFF.split(',');
    console.log(genderArray);
    var gender = genderArray[0]
    var gender2 = genderArray[1]
    console.log("gender: "+gender);
    console.log("gender2: "+gender2);
    //var gender = "female"
    //var gender2 = "women"
    if (gender == "others" || gender == "unknown") {
       let randonSex = Math.floor(Math.random() * (10 - 1) + 1);
       console.log("Randon Sex: "+randonSex);
       if (randonSex < 5 ){
            gender = "male";
       }
       else{
            gender = "female";
       }
    }
    try{
        namey.get({ type: `${gender}` ,with_surname: true, callback: function(user) { console.log(user);console.log(typeof(user)); for (const [key, value] of Object.entries(user)) {console.log(`${value}`); window.localStorage.setItem('harnessDemoUser', `${value}` ) }  }});
    }
    catch(error){
        console.log("Namey script is not defined"+ error)
    }

    //console.log(users);

    console.log("typeOf: "+typeof(users));

    let name = window.localStorage.harnessDemoUser;
    console.log("Name: "+name);

    var newUser = $("body").find("#user-box").clone();
    let randomIdUser = Math.floor(Math.random() * 100);

    var myUser = new Object();
    myUser.name = name;
    myUser.number = randomIdUser;
    setDataStorage(myUser)

    var userParsed = getDataStorage();
    console.log("user parsed:");
    console.log(userParsed);
    var randomPicture = "";
    if (gender2 == "others" || gender2 == "unknown" ){
        var randomIDCharacter = Math.floor(Math.random() * (750 - 700) + 700)
        randomPicture = "https://www.superherodb.com/pictures2/portraits/10/100/"+randomIDCharacter+".jpg";
    }else{
        randomPicture = "https://randomuser.me/api/portraits/"+gender2 +"/"+randomIdUser+".jpg";
    }

    console.log("random picture:");
    console.log(randomPicture)
    newUser.find("#profile-picture").attr("src",randomPicture);
    newUser.find("#profile-picture").attr("alt",window.localStorage.harnessDemoUser);
    newUser.find("#profile-picture").addClass("leaderboard__picture");
    newUser.find(".leaderboard__name").append(window.localStorage.harnessDemoUser);
    newUser.find(".leaderboard__value").append(randomIdUser);
    newUser.addClass("leaderboard__profile");
    $(newUser).appendTo(".leaderboard__profiles");
}

/* End Harness Leader Board */

/* Harness Feature Flags */

cf.on(Event.READY, flags => {
    console.log("FLAGS:"+JSON.stringify(flags, null, 2));
    //log(JSON.stringify(flags, null, 2))

    //const value = cf.variation('javascript', false) // second argument is default value when variation does not ex
    //const value2 = cf.variation('Customer_Message', "Hello Visitor") // second argument is default value when variation does not exist
    //console.log("teste");
    //console.log(value);
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


    //init();
});

/* Feature Flags */

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
    } else {
      //log(JSON.stringify(flagInfo, null, 2))
      /*var newMessage = $("body").find("#message > div").clone();
      //newMessage.find(".message").append(value2);
      newMessage.find(".prime").append(value);
      newMessage.find(".message-box").addClass("message-blue");
      $(newMessage).appendTo(".message-list");*/
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



/* Harness Feature Flags */
