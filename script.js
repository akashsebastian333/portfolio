window.onload = () => {
  const myInput = document.getElementById('dummyKeyboard');
  myInput.onpaste = e => e.preventDefault();
 }
const COMMANDS = {
  whoami:
    'guest',
  ls:
    'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">acknowledges</span>, <span class="code">certificates</span>, <span class="code">contact</span>',
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">acknowledges</span>, <span class="code">certificates</span>, <span class="code">contact</span>',
  about:
    "Hello 👋<br>I'm Akash Sebastian. Information Security enthusiast, I do bug bounty hunting, Capture The Flag as a hobby and passion",
  skills:
    '<span class="code">Skill:</span>Pentesting, Programming, Bughunting...<br>',
  education:
    "unknown",
  certificates: "<a href='https://www.akashsebastian.com/certificates' class='success link'>certificates</a>",
  resume: "<a href='./resume.pdf' class='success link'>resume.pdf</a>",
  experience: "No Experience😥",
  ack: 
    "<a href='https://bughunter.withgoogle.com/profile/c199d616-6cc3-4e90-a3e2-31e80f0ec1a2' class='success link'>Google Hall of Fame</a> , <a href='https://www.nokia.com/responsible-disclosure/' class='success link'>Nokia HOF</a> , <a href='https://dev.to/security' class='success link'>dev.to HOF</a> , <a href='https://bugcrowd.com/netflix/hall-of-fame' class='success link'>Netflix HOF</a> , <a href='https://bugcrowd.com/pinterest/hall-of-fame' class='success link'>Pinterest HOF</a> , <a href='https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html' class='success link'>Philips HOF</a> , <a href='https://bugcrowd.com/soundcloud/hall-of-fame' class='success link'>Soundcloud HOF</a> , <a class='success link'>many more...</a>  ", 
acknowledges: 
    "<a href='https://bughunter.withgoogle.com/profile/c199d616-6cc3-4e90-a3e2-31e80f0ec1a2' class='success link'>Google Hall of Fame</a> , <a href='https://www.nokia.com/responsible-disclosure/' class='success link'>Nokia HOF</a> , <a href='https://dev.to/security' class='success link'>dev.to HOF</a> , <a href='https://bugcrowd.com/netflix/hall-of-fame' class='success link'>Netflix HOF</a> , <a href='https://bugcrowd.com/pinterest/hall-of-fame' class='success link'>Pinterest HOF</a> , <a href='https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html' class='success link'>Philips HOF</a> , <a href='https://bugcrowd.com/soundcloud/hall-of-fame' class='success link'>Soundcloud HOF</a> , <a class='success link'>many more...</a>  ", 
  contact:
    "You can contact me on any of following :<br><a href='https://t.me/akashsebastian' class='success link'>Telegram</a>, <a href='https://www.instagram.com/akashsebastian333/' class='success link'>Instagram</a>, <a href='https://www.twitter.com/akashseb/' class='success link'>Twitter</a>, <a href='mailto:mail@akashsebastian.com' class='success link'>Email</a>, <a href='https://api.whatsapp.com/send?phone=+919746626938' class='success link'>whatsapp</a>"
};

const  userInput = document.getElementById("userInput");
const  terminalOutput = document.getElementById("terminalOutput");
const  inputfield = document.getElementById("dummyKeyboard");

inputfield.addEventListener('keypress', (e) =>{
  if (e.key === "Enter") {
    let input = e.target.value;
    input = input.toLowerCase();
    if (input.length === 0) {
      return;
    }
    let output;
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
      output += `<div class="terminal-line">no such command: ${input}</div>`;
      console.log("Oops! no such command");
    } else {
      output += COMMANDS[input];
    };
    terminalOutput.innerHTML = `${
      terminalOutput.innerHTML
    }<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight; 
    e.target.value = ""
  };
});
