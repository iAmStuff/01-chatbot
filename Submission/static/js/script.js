// Remember the name
let userName = "";

// keep track of how we have pathed through the discussionTree. log this variable at any time to debug
let pathLogs = "";

// Populate discussionTree object
const getDiscussionTree = () => {
  // question: is the text the bot will print when it reaches that point in the tree
  // questionType: is a value which has corresponding key in the knownInputs object
  // answers are any objects after these first two keys
  // answers can be sub objects, in the event that you intend to lead the conversation to another question
  // or answers can be arrays, in the event you wish to present the user with a list of anime that meets the criteria
  // endpoint arrays should contain strings consisting of anime titles, this may change in the future to be objects that better describe the anime
  return {
    question: `Hi ${userName}, first things first: Are you new to anime?`,
    questionType: "newbie",
    yes: {
      question:
        "Would you rather watch romantic comedy style shows, or maybe something more action-y?",
      questionType: "genre",
      romCom: {
        question:
          "Do you want to watch something lightweight, or maybe something more heavy going?",
        questionType: "weight",
        light: {
          question: `Do you want to watch one of the "must-watch" classics, or would you rather watch something more recent?`,
          questionType: "filmAge",
          old: [
            "Toradora",
            "Sakurasou no Pet na Kanojo",
            "Mikakunin de Shinkoukei",
            "Hyouka",
          ],
          new: {
            question:
              "Do you want to watch a currently airing anime? Or would you rather watch something that has finished airing?",
            questionType: "airing",
            ongoing: ["Tonikaku Kawaii"],
            finished: ["Kaguya-sama: Love is war"],
          },
        },
        heavy: [
          "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai",
          "Ano Hi Mita Hana no Namae wo Bokutachi wa Mada Shiranai (Anohana)",
          "Shigatsu wa Kimi no Uso",
          "Steins; Gate",
        ],
      },
      action: {
        question: `Do you want to watch one of the "must-watch" classics, or would you rather watch something more recent?`,
        questionType: "filmAge",
        old: ["Tengen Toppa Gurren Lagann", "Noragami", "Fullmetal alchemist"],
        new: {
          question:
            "Do you want to watch a currently airing anime? Or would you rather watch something that has finished airing?",
          questionType: "airing",
          ongoing: ["Jujutsu Kaisen"],
          finished: ["One Punch Man", "Demon slayer: Kimetsu no Yaiba"],
        },
      },
    },
    no: {
      question:
        "Are you in a Romcom kinda mood? Or maybe an action kinda mood instead?",
      questionType: "genre",
      romCom: {
        question:
          "Do you want to watch something lightweight, or maybe something more heavy going?",
        questionType: "weight",
        light: {
          question:
            "Do you want to watch a currently airing anime? Or would you rather watch something that has finished airing?",
          questionType: "airing",
          ongoing: ["Majou no Tabitabi"],
          finished: [
            "Sewayaki Kitsune no Senko-san",
            "5-Toubun no Hanayome",
            "Wotaku ni Koi wa Muzukashii",
            "Yuru Camp△",
          ],
        },
        heavy: {
          question: "Do you feel like suffering today?",
          questionType: "suffering",
          yes: ["Clannad", "Kanojo Okarishimasu"],
          no: {
            question: `Damn thought I should give it a go. Anyway ${userName}, would you want to watch a currently airing anime? Or would you rather watch something that has finished airing?`,
            questionType: "airing",
            ongoing: ["Kamisama ni Natta Hi"],
            finished: [
              "Haruhi Suzumiya",
              "Monogatari series",
              "Yahari Ore no Seishun Love Comedy wa Machigatteiru",
            ],
          },
        },
      },
      action: {
        question:
          "Do you want to watch a currently airing anime? Or would you rather watch something that has finished airing?",
        questionType: "airing",
        ongoing: {
          question: `Real quick ${userName}, what's your opinon on horror anime?`,
          questionType: "horror",
          yes: ["Higurashi no Naku Koro ni Gou"],
          no: ["Jujutsu Kaisen"],
        },
        finished: [
          "Demon slayer: Kimetsu no Yaiba",
          "Tengen Toppa Gurren Lagann",
          "Noragami",
          "Fullmetal Alchemist",
        ],
      },
    },
  };
};

// declare path on global scope so we can modify it from our nested functions below
let path = "";

// knownInputs object here
// inputs are kinda vague and unnatural at this state
// things should improve once i get a chance to work on the validate input function.
const knownInputs = {
  // keywords that contain spaces currently cannot be validated with this method. revisit this later
  global: {
    theme: ["theme", "dark", "light", "mode", "switch"],
    restart: ["restart", "reset", "again"],
  },
  horror: {
    yes: ["yes", "yeah", "yea", "yep", "sure", "why not", "fine"],
    no: ["no", "nope", "nay", "negative", "no thanks", "i'm good"],
  },
  newbie: {
    yes: ["yes", "yeah", "yea", "yep", "i guess so"],
    no: ["no", "nope", "nay", "negative", "i guess not"],
  },
  genre: {
    romCom: [
      "romance",
      "comedy",
      "romcom",
      "romantic comedy",
      "shojou",
      "former",
    ],
    action: ["action", "shounen", "latter"],
  },
  filmAge: {
    old: ["classic", "classics", "old", "older"],
    new: ["new", "fresh", "recent", "newer"],
  },
  airing: {
    ongoing: ["currently airing", "ongoing", "airing", "current"],
    finished: ["finished", "over", "finished airing", "complete"],
  },
  weight: {
    light: [
      "light",
      "lightweight",
      "wholesome",
      "easy",
      "easy-going",
      "less serious",
      "simple",
    ],
    heavy: ["heavy", "heavyweight", "serious", "complex", "emotional", "rough"],
  },
  suffering: {
    yes: ["yes", "yeah", "yea", "yep", "sure", "why not", "fine"],
    no: ["no", "nope", "nay", "negative", "no thanks", "i'm good"],
  },
};

// array to track the chat messages
const chatLogs = [];

const setName = (input) => {
  console.log(`setting name to ${input}`);
  userName = input;
  currentBranch = getDiscussionTree();
  return userName;
};

// clone discussionTree to a global variable so we can move the tree root
let currentBranch;

const validateInput = (input, type) => {
  console.log("begin validateInput");
  const parseType = (input) => {
    // sub function to be used with some() method
    answers = Object.keys(knownInputs[type]); // create array of answers we are attempting to translate the input to
    // example output where type = "weight"
    // knownInputs.weight = {light: [...], heavy: [...]};
    // answers = Object.keys(knownInputs[type]);
    // answers = ["light", "heavy"]
    for (let i = 0; i < answers.length; i++) {
      if (knownInputs[type][answers[i]].includes(input)) {
        console.log(`Input parsed with value "${answers[i]}"`);
        path = answers[i];
        return path;
      }
    }
  };
  answer = input.toLowerCase();
  answerArray = answer.split(" ");

  // create an array of all words the user entered and check if any of these words match a keyword from the appropriate sub-object in knownInputs

  if (answerArray.some(parseType)) {
    return path;
  }
  return false;
};

// get all the elements
// I originally thought I would need to DOMify all of these.
// But I then realised that all the sub objects would inherit the .dark class from body
// Well they can stay here in the event I want to make other style choices with theme switch
const bodyEl = document.querySelector("body");
const containerDiv = document.querySelector(".container");
const chatbotInterface = document.querySelector("#chatbox-interface");
const chatContainer = document.querySelector("#chat-container");
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#btn-chat-send");
const chatboxContainer = document.querySelector("#chatbox-container");
const chatbox = document.querySelector("#chatbox");
const chatItem = document.querySelector("chat-item");

// instructions on how to handle commands such as restart and theme switch.
const botCommands = (command) => {
  switch (command) {
    case "restart":
      console.log("Restarting");
      currentBranch = getDiscussionTree();
      break;
    case "theme":
      console.log("Changing theme");
      themeSwitch();
      break;
  }
};

const themeSwitch = () => {
  bodyEl.classList.toggle("dark");
  handleChatSubmit();
};

const getAnswer = () => {
  const randomAnime =
    currentBranch[Math.floor(Math.random() * currentBranch.length)];
  const answerLines = [
    `I found one, I suggest you try watching ${randomAnime}.`,
    `Good news ${userName}! I've managed to narrow down the results significantly, here, give ${randomAnime} a watch!`,
    `Oooo here's a good one ${userName}. Look up ${randomAnime}. I think you'll like it!`,
  ];
  return answerLines[Math.floor(Math.random() * answerLines.length)];
};

const getBotReply = (msg) => {
  console.log("begin getBotReply");
  // first check if userName is set, if not, this will tell the program to save the next input as userName
  if (userName == "") {
    setName(msg);
  } else {
    // then check if the input matches any special requests. eg empty username, dark mode...
    const commandMsg = validateInput(msg, "global");
    type = currentBranch.questionType;
    if (commandMsg) {
      botCommands(commandMsg);
    } else if (validateInput(msg, type)) {
      // if none of those tests pass, the usual conversation logic can commence
      // rewrite currentBranch with new root
      currentBranch = currentBranch[path];
      // record this change for debugging purposes
      pathLogs += `.${path}`;
      console.log(`Now at discussionTree${pathLogs}`);
      // check to see if we found the answer yet
      if (Array.isArray(currentBranch)) {
        console.log("answer found");
        return getAnswer();
      }
    } else {
      return `Sorry ${userName} but I don't quite understand that, maybe try a different wording?`;
    }
  }
  return currentBranch.question; // print next response to screen
};

// there be dragons
const renderChatbox = () => {
  // get a reference to the chatbox element
  const chatboxEl = document.getElementById("chatbox");

  // copy the latest set of messages, then reverses the new
  // array and takes the first 20 elements
  const recentMessages = [...chatLogs].reverse().slice(0, 20);
  /**
   * this one liner statement would be equivalent to:
   * var recentMessages = chatLog.slice();
   * recentMessages.reverse();
   * var last20RecentMessages = recentMessages.slice(0,20);
   */

  // markup to display
  let chatboxHTML = "";

  // create a chat item div element
  for (let message of recentMessages) {
    let markup = `
      <div class="chat-item chat-item-bot">${message.bot.replyMsg}</div>
      <div class="chat-item chat-item-user">${message.user.inputMsg}</div>
    `;
    chatboxHTML += markup;
  }

  // set the inner HTML
  chatboxEl.innerHTML = chatboxHTML;
};

// form submit handler
const handleChatSubmit = (event) => {
  // Stop the page from reloading when the form is submitted
  event.preventDefault();

  // get reference to the chat input
  const chatInput = document.getElementById("chat-input");

  // get the chat form input value
  const chatValue = chatInput.value;
  // clear the input ready for the next message
  chatInput.value = "";

  const botReply = getBotReply(chatValue);

  // Create a data model to save the chat log against
  const chatLog = {
    user: {
      inputMsg: chatValue,
    },
    bot: {
      replyMsg: botReply,
    },
    timestamp: new Date(),
  };

  // push the user message to the chat log
  chatLogs.push(chatLog);

  // render the chatbox
  renderChatbox();
};

// attach the submit event handler to the form here ...
const formEl = document.getElementById("chat-form");
formEl.addEventListener("submit", handleChatSubmit);
