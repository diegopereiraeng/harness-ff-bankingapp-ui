$(document).ready(function (){
                $(".button-primary").click(function (){
                    $(".pop-outer").fadeIn("slow");
                });
                $(".close").click(function (){
                    $(".pop-outer").fadeOut("slow");
                });
            });
            $(function () {
  json = {
    "applicants" : [
      {
        "name" : "Diego Pereira",
        "email" : "diego.pereira@harness.io",
        "gender" : "Male",
        "age" : "33"
      }
    ]
  };

  $.each(json.applicants, function () {

    var newApplicant = $("body").find("#applicant > div").clone();

    newApplicant.find(".name").append(this.name);
    newApplicant.find(".email").append(this.email);
    newApplicant.find(".gender").append(this.gender);
    newApplicant.find(".age").append(this.age);

    $(newApplicant).appendTo(".applicant-list");
  });
});

function showFF(flagInfo){
    console.log("Show FF")
    console.log(JSON.stringify(flagInfo, null, 2));
}

var value;
let users = "";


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


function checkAddUsers(){
    /*$.ajax({
        url: "https://api.fungenerators.com/name/generate?category=superhero&limit=1",
        type: 'GET',
        success: function(res) {
            console.log(res);
            users.push("res");
        }
    });*/

    namey.get({ 
        with_surname: true, 
        callback: function(user) { 
            console.log(user);
            console.log(typeof(user)); 
            for (const [key, value] of Object.entries(user)) {
                console.log(`${value}`); 
                window.localStorage.setItem('harnessDemoUser', `${value}` ) 
            }
        }});
    console.log(users);

    console.log("typeOf: "+typeof(users));

    let name = window.localStorage.harnessDemoUser;
    console.log("Name: "+name);

    var newUser = $("body").find("#user-box").clone();
    let randomIdUser = Math.floor(Math.random() * 10);

    var myUser = new Object();
    myUser.name = name;
    myUser.number = randomIdUser;

    setDataStorage(myUser)
    var userParsed = getDataStorage();


    console.log("user parsed:");
    console.log(userParsed);
    const randomPicture = "https://randomuser.me/api/portraits/men/"+randomIdUser+".jpg";
    console.log("random picture:");
    console.log(randomPicture)
    newUser.find("#profile-picture").attr("src",randomPicture);
    newUser.find("#profile-picture").attr("alt",name);
    newUser.find("#profile-picture").addClass("leaderboard__picture");
    newUser.find(".leaderboard__name").append(name);
    newUser.find(".leaderboard__value").append(randomIdUser);
    newUser.addClass("leaderboard__profile");
    $(newUser).appendTo(".leaderboard__profiles");
//user-box
//class="leaderboard__profile"
//id="user-box"
//Picture
//src="https://randomuser.me/api/portraits/men/32.jpg"
//alt="Mark Zuckerberg"
//class="leaderboard__picture"
//id="profile-picture"
//Name - values
//class="leaderboard__name"
//class="leaderboard__value"
//35.7<span>B</span>
}
checkAddUsers();