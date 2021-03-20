const BLACKLISTED_KEY_CODES = [ 38 ];
const COMMANDS = {
  help:
    'Supported commands: <span class="code">about</span>, <span class="code">experience</span>, <span class="code">education</span>, <span class="code">skills</span>, <span class="code">acknowledges</span>, <span class="code">contact</span>',
  about:
    "Hello 👋<br>I'm Akash Sebastian. Information Security enthusiast ",
  skills:
    '<span class="code">Skill:</span>Pentesting, Coding, Bughunting...<br>',
  education:
    "unknown",
  resume: "<a href='./resume.pdf' class='success link'>resume.pdf</a>",
  experience: "No Experience😥",
  acknowledges: 
    "<a href='https://bughunter.withgoogle.com/profile/c199d616-6cc3-4e90-a3e2-31e80f0ec1a2' class='success link'>Google Hall of Fame</a> , <a href='https://www.nokia.com/responsible-disclosure/' class='success link'>Nokia HOF</a> , <a href='https://dev.to/security' class='success link'>dev.to HOF</a> , <a href='https://bugcrowd.com/netflix' class='success link'>Netflix HOF</a> , <a href='https://bugcrowd.com/pinterest' class='success link'>Pinterest</a> , <a href='https://www.philips.com/a-w/security/coordinated-vulnerability-disclosure/hall-of-honors.html' class='success link'>Philips HOF</a> , <a href='https://bugcrowd.com/soundcloud' class='success link'>Soundcloud HOF</a> , <a class='success link'>many more...</a>  ", 
  contact:
    "You can contact me on any of following :<br><a href='https://t.me/akashsebastian' class='success link'>Telegram</a>, <a href='https://www.instagram.com/akashsebastian333/' class='success link'>Instagram</a>, <a href='https://www.twitter.com/akashseb/' class='success link'>Twitter</a>, <a href='mailto:mail@akashsebastian.com' class='success link'>Email</a>, <a href='https://api.whatsapp.com/send?phone=+919746626938' class='success link'>whatsapp</a>"
};
let userInput, terminalOutput;

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  let output;
  input = input.toLowerCase();
  if (input.length === 0) {
    return;
  }
  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: ${input}</div>`;
    console.log("Oops! no such command");
  } else {
    output += COMMANDS[input];
  }

  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
};

const key = function keyEvent(e) {
  const input = userInput.innerHTML;

  if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) {
    return;
  }

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = function backSpaceKeyEvent(e) {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);