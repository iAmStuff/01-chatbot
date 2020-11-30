// Remember the name
let userName = "";

// Populate discussionTree object
const discussionTree = {
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
            "Do you wnat to watch a currently airing anime? Or would you rather watch something that has finished airing?",
          questionType: "airing",
          ongoing: "Tonikaku Kawaii",
          finished: "Kaguya-sama: Love is war",
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
        ongoing: "Jujutsu Kaisen",
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
          "Do you wnat to watch a currently airing anime? Or would you rather watch something that has finished airing?",
        questionType: "airing",
        ongoing: "Majou no Tabitabi",
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
          question:
            "Do you wnat to watch a currently airing anime? Or would you rather watch something that has finished airing?",
          questionType: "airing",
          ongoing: "Kamisama ni Natta Hi",
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
        "Do you wnat to watch a currently airing anime? Or would you rather watch something that has finished airing?",
      questionType: "airing",
      ongoing: {
        question: "Opinon on horror anime?",
        questionType: "horror",
        yes: "Higurashi no Naku Koro ni Gou",
        no: "Jujutsu Kaisen",
        finished: [
          "Demon slayer: Kimetsu no Yaiba",
          "Tengen Toppa Gurren Lagann",
          "Noragami",
          "Fullmetal Alchemist",
        ],
      },
    },
  },
};
// knownInputs object here
// inputs are kinda vague and unnatural at this state
// things should improve once get a chance to work on the
// validate input function.
const knownInputs = {
  horror: {
    yes: ["yes", "yeah", "yea", "yep", "sure", "why not", "fine"],
    no: ["no", "nope", "nay", "negative", "no thanks", "i'm good"],
  },
  newbie: {
    yes: ["yes", "yeah", "yea", "yep"],
    no: ["no", "nope", "nay", "negative"],
  },
  genre: {
    romCom: [
      "romance",
      "comedy",
      "romcom",
      "romantic comedy",
      "shojou",
      "the former",
    ],
    action: ["action", "shounen", "the latter"],
  },
  filmAge: {
    old: ["classic", "classics", "old", "older"],
    new: ["new", "fresh", "recent", "newer"],
  },
  airing: {
    ongoing: ["currently airing", "ongoing", "airing", "current"],
    finshed: ["finished", "over", "finished airing", "complete"],
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
};

// array to track the chat messages
const chatLogs = [];

// write an input validation function here
const validateInput = (input, type) => {
  console.log("begin validateInput");
  const parseType = (input) => {
    answers = Object.keys(knownInputs[type]); // create array of answers we are attempting to translate the input to
    if (knownInputs[type][answers[0]].includes(input)) {
      return answers[0];
    } else if (knownInputs[type][answers[1]].includes(input)) {
      return answers[1];
    }
  };
  answer = input.toLowerCase();
  answerArray = answer.split(" ");
  // create an array of all words the user entered and check if any of these words match a keyword from the appropriate sub-object in knownInputs
  if (answerArray.some(parseType)) {
    console.log("Input vaildated as positive");
    //console.log();
  } //else if (true) {

  // }
  else {
    console.log("Input failed to validate");
  }
  // backup switch method
  // switch (type) {
  //   case "horror":
  //   case "newbie":
  //   case "genre":
  //   case "filmAge":
  //   case "airing":
  //   case "weight":
  //   default:
  //     throw "Error validating input";
  //}
};
// write a conversation reset function here

// new root discussionTree clone
let currentBranch = discussionTree;
/**
 *
 * FINISH THIS FUNCTION!
 */
const getBotReply = (msg) => {
  // validate input
  type = currentBranch.questionType;
  answer = validateInput(msg, type);
  // if statement to check for global commands. eg. restart, name change or whatever
  // ask for userName
  // give question
  // parse the answer
  // rewrite discussionTree with new route

  return "Error unknown...";
};

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
