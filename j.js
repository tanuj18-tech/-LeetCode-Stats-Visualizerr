// Run this function only after the HTML has been completely loaded and parsed before images, CSS, or other resources have fully loaded."

document.addEventListener("DOMContentLoaded", function(){

 
    const usernameinput = document.getElementById('inputuser');
        const searchbutton = document.getElementById('searchbutton');
        const statscontainer = document.querySelector("statscontainer");

        const easyprogresscircle = document.querySelector("#easypro");
        const medproprogresscircle =  document.querySelector("#mediumpro");
        const hardprogresscircle = document.querySelector("#hardpro");

         const easylable = document.querySelector("#easy-label");
          const medlable = document.querySelector("#medium-label");
           const hardlable = document.querySelector("#hard-label");

           

           const statsco = document.querySelector(".stats-container");
            const statscardjs = document.querySelector(".stats-card");

           function validateuname(uname)
           {
                if(uname === ""){
                    alert("username should not be empty");
                    return false; 
                }

                // This regex ensures your username contains only 
                // letters, numbers, and underscores, and is 1–15 characters long —

                const expression = /^[a-zA-Z0-9_]{1,15}$/;
                const isMatching = expression.test(uname);

                if (!isMatching) {
                    alert("Invalid Username");
                }
                else return true;
            }



        // api so async
           async function fetchuserdetails(username){
                   const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

                   try{
                        searchbutton.textContent = "searching...";
                        searchbutton.disabled = true;
                        
                        // aage mat badho so await  
                        const response = await fetch(url);
                      if(!response.ok){
                          throw new Error("unable to fecthc data")
                        }


                        // json = take the fetch response, read it, turn the JSON into a JS object, and store it in data.”
                        const dispdata = await response.json();
                        console.log("logging data " ,dispdata);

                        statsco.style.display = "block"; 
                        displayuserdata(dispdata);
                   }
                    
                   catch(err){
                    statsco.innerHTML = `<p>"No data found"</p>`;
                   }

                   finally{
                    searchbutton.textContent = "Search";
                    searchbutton.disabled = false;
                   }


                 }

                function updatedata(total , totalsolved , label , circle){
                    const progresspercent = (totalsolved/total)*100;
                    circle.style.setProperty("--progress-degree",`${progresspercent}%`);
                    label.textContent = `${totalsolved}/${total}`;
                 }

                 function displayuserdata(dispdata){
                    const totalque = dispdata.totalQuestions;
                    console.log(totalque);
                     const totaleasy = dispdata.totalEasy;
                    console.log(totaleasy);
                     const totalmedium = dispdata.totalMedium;
                    console.log(totalmedium);
                     const totalhard = dispdata.totalHard;
                    console.log(totalhard);


                    const totalSolvedque = dispdata.totalSolved;
                 
                    const totalSolvedeasy = dispdata.easySolved;
              
                    const totalSolvedmedium = dispdata.mediumSolved;
                    
                    const totalSolvedhard = dispdata.hardSolved;

                    updatedata(totaleasy,totalSolvedeasy,easylable,easyprogresscircle);
                    updatedata(totalmedium,totalSolvedmedium,medlable,medproprogresscircle);
                    updatedata(totalhard,totalSolvedhard,hardlable,hardprogresscircle);

                    const carddata = [
                        {label:"acceptance rate",value:dispdata.acceptanceRate},
                         {label:"contribution Points",value:dispdata.contributionPoints},
                          {label:"ranking",value:dispdata.ranking},
                           {label:"reputation",value:dispdata.reputation}

                    ];

                    console.log("card ka data " ,carddata);

                    statscardjs.innerHTML = carddata.map(
                        data => {
                            return `<div class = "card">
                            <h3>${data.label}</h3>
                            <p>${data.value}<p/>
                            </div>`
                            
                        }
                    ).join("");

                    console.log(carddata);
              
                 }

           searchbutton.addEventListener('click',function(){
                const uname = usernameinput.value;
                console.log("logging in username: ",uname);

                if(validateuname(uname)){
                    console.log("corect usernamem ");
                    fetchuserdetails(uname);
                }
           })

 })