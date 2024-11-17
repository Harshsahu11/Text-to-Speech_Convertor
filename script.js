let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        
        return;
    }

    speech.voice = voices[0]; 
    voiceSelect.innerHTML = ""; 

    
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i; 
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}


populateVoices();
window.speechSynthesis.onvoiceschanged = populateVoices;


voiceSelect.addEventListener("change", () => {
    const selectedVoiceIndex = parseInt(voiceSelect.value, 10);
    if (voices[selectedVoiceIndex]) {
        speech.voice = voices[selectedVoiceIndex];
    }
});

document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value.trim();
    if (!text) {
        alert("Please enter text to speak.");
        return;
    }
    speech.text = text;
    window.speechSynthesis.speak(speech);
});
