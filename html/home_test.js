/* Harness HOME FF */

function checkMenu(){

}
function checkLogo(){
}
function checkHeader(){
}
function checkDashboard(){
    //let name = window.localStorage.harnessDemoUser;
    //console.log("Name: "+name);
    const dashboard = cf.variation('Dashboard', "Balance") // second argument is default value when variation does not ex
    const dashboardArray = dashboard.split(', ');

    var dashboardElement = $("body").find("#dashboard");

    if (dashboardArray.includes("Messages")){
        let randomMessages = Math.floor(Math.random() * (100 - 1) + 1);
        dashboardElement.find("#Messages").attr("style","display: visibility;");
    }
    if (dashboardArray.includes("Balance")){
        let randomBalance = Math.floor(Math.random() * (100000 - 1000) + 1000);
        dashboardElement.find("#Balance").attr("style","display: visibility;");
    }
    if (dashboardArray.includes("Loan")){
        let randomLoan = Math.floor(Math.random() * (10000 - 1000) + 1000);
        dashboardElement.find("#Loan").attr("style","display: visibility;");
    }
    if (dashboardArray.includes("Bills")){
        let randomBills = Math.floor(Math.random() * (20 - 1) + 1);
        dashboardElement.find("#Bills").attr("style","display: visibility;");
    }


}
function checkContent(){
}
function checkBanner(){
}


/* End Harness HOME FF */