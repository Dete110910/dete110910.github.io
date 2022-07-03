 function chargePlayLists(){
   let playlist = [];
   playlist.push("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/10344346102");
   playlist.push("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/10490991402");

   return playlist;
 }

 async function getDeezerData() {
  const playLists = chargePlayLists();
  let responses = [];
  var myHeaders = new Headers();
  myHeaders.append("X-Requested-With", "XMLHttpRequest");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  for(var i = 0; i < playLists.length; i++){
    const response =  await fetch(
      playLists[i],
      requestOptions
    );

    responses.push(await response.json());

  }

  
  //console.log(responses[0]["tracks"]["data"])
 

  parseData(responses);

  //console.log(jsonResponse);

  //let responses = [];

  //const fileResponse = await fetch('playlist.json');
  //responses.push(await fileResponse.json());
  //parseData(responses);
}


function parseData(responses){
  for(var i = 0; i < responses.length; i++){
    const title = responses[i]["tracks"]["data"];
    for(var j = 0; j < title.length; j++){
      var div = document.createElement("div");
      const songTitle = title[j]["title_short"];
      div.id = songTitle;
      div.innerText = songTitle;
      div.addEventListener("click", () => {
        alert(document.getElementById(songTitle).textContent);
      })
      document.body.appendChild(div);
      //console.log(title[j]["title_short"]);
    }
  }
}

getDeezerData();
