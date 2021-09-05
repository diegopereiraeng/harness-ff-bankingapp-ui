import { initialize, Event } from 'https://unpkg.com/@harnessio/ff-javascript-client-sdk@1.4.7/dist/sdk.client.js'

var target = getTarget()
var menuStyle = ''
var menuSelectedStyle= 'w3-blue'
var firstStart = true
var currentContent

const cf = initialize(
    '44e3ffcb-3a5e-4af1-a7f3-ba7a51cbc74b',
     // ^^ UPDATE THE FF SDK KEY HERE ^^ //
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

var first = 0;
var target = "";
var close = 0;

/* FF Control */

var modalStatus = ''
var modalStatusMessage = ""
var youtubeStatus = 'off'
var ckoStatus = false

/* End FF Control */


/* START FEATURE FLAGS FUNCTIONS */


// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //
// ----> ADD Your FEATURES HERE <-------- //


/* END FEATURE FLAGS FUNCTIONS */
    

var refreshNum=0
function refresh() {
    console.log("Refresh No: "+refreshNum);
    checkMaintenance();
    checkSiteColor();
    if (window.location.href.indexOf("home_new.html") > -1) {
        checkDashboard();
        checkMenu();

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
    form = document.getElementById('signup');
    if (form.attachEvent) {
        form.attachEvent("submit", processSignUp);
    } else {
        form.addEventListener("submit", processSignUp);
    }
    /* Switcher */
    const switchers = [...document.querySelectorAll('.switcher')]

    switchers.forEach(item => {
        item.addEventListener('click', function() {
            switchers.forEach(item1 => item1.parentElement.classList.remove('is-active'))
            this.parentElement.classList.add('is-active')
        })
    })

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
        
        $("body").find("#iframeContent").attr("style","display: visibility;width:"+($(window).width()) + 'px'+";height:"+$(window).height()+ 'px;');
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

function checkSiteColor(){
    var color = cf.variation('Color_Mode', '#222')
    var textColor = cf.variation('Text_Color_Mode', '#222')
    var homeBodyText = cf.variation('Home_Body_Text_Color', '#000')



    console.log("Site Color: "+color+" - Text Color: "+textColor);
    if (window.location.href.indexOf("home_new.html") > -1) {
        var homeBody = cf.variation('Home_Body_Color', '#F8F8FF')

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

function checkMenu(){
    var menu
    var paddingClass
    var iconclass
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
    class: "w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black",
    onclick: "w3_close()",
    title: "close menu"
    });
    $(newBlock).appendTo("#menuID");
    if(close == 0 ){
        $(newCloseLink).appendTo(".w3-bar-block");
    }


    for (const [key, value] of Object.entries(menu)) {
        console.log(value.name);
        console.log(key);
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
            if (firstStart) {
                newLink = $("<a />", {
                    class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected+" active",
                    id: "menu-"+linkID,
                    value: href
                });
                firstStart = false
                currentContent = "Home"
            }else{
                if (currentContent == value.name) {
                    newLink = $("<a />", {
                        class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected+" active",
                        id: "menu-"+linkID,
                        value: href
                    });
                } else {
                    newLink = $("<a />", {
                        class: "w3-bar-item w3-button "+paddingClass+" "+menuSelected,
                        id: "menu-"+linkID,
                        value: href
                    });
                }
                
            }
            
        }else{
            newLink = $("<a />", {
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
    var logo = cf.variation('Home_Logo', "https://harness.io/wp-content/themes/harnessio/assets/images/harness-logo.svg")
    console.log("Logo: "+logo);

    var imgElement = $("body").find("#logo-img");
    imgElement.attr("src",logo);
    imgElement.attr("height","30");
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

    if (dashboardArray.includes("Messages")){
        let randomMessages = Math.floor(Math.random() * (100 - 1) + 1);
        console.log(randomMessages);
        dashboardElement.find("#Messages").attr("style","display: visibility;");
    }
    else{
        dashboardElement.find("#Messages").attr("style","display: none;");
    }
    if (dashboardArray.includes("Balance")){
        let randomBalance = Math.floor(Math.random() * (100000 - 1000) + 1000);
        console.log(randomBalance);
        dashboardElement.find("#Balance").attr("style","display: visibility;");
    }
    else{
            dashboardElement.find("#Balance").attr("style","display: none;");
        }
    if (dashboardArray.includes("Loan")){
        let randomLoan = Math.floor(Math.random() * (10000 - 1000) + 1000);
        console.log(randomLoan);
        dashboardElement.find("#Loan").attr("style","display: visibility;");
    }
    else{
            dashboardElement.find("#Loan").attr("style","display: none;");
        }
    if (dashboardArray.includes("Bills")){
        let randomBills = Math.floor(Math.random() * (20 - 1) + 1);
        console.log(randomBills);
        dashboardElement.find("#Bills").attr("style","display: visibility;");
    }
    else{
        dashboardElement.find("#Bills").attr("style","display: none;");
    }


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
