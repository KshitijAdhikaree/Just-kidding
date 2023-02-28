const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button()
function toggleButton() {
  button.disabled = !button.disabled;
}
//Passing joke to voiceRSS api
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: "159701a3cc8d4e49b5de3b365bc09479",
    src: jokeString,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
// Get jokes from joke api

async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //assign one or two park joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // passing joke to voiceRSS API
    tellMe(joke);

    //disable button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

//Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
