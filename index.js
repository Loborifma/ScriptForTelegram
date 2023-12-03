function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  function findLast(arr, className) {
    return arr[arr.length - 1].querySelectorAll(className);
  }

  function sendMessage() {
    let isAlreadyAnswered = false;

    const messageField = document.querySelector(
      ".input-message-input.is-empty.i18n.scrollable.scrollable-y.no-scrollbar"
    );
    const sendButton = document.querySelector(
      ".btn-icon.rp.btn-circle.btn-send.animated-button-icon.record"
    );
    const dateList = document.querySelectorAll(".bubbles-date-group");

    let messageGroupList = findLast(dateList, ".bubbles-group");

    let lastMessage = findLast(
      messageGroupList,
      ".bubble > .bubble-content-wrapper > .bubble-content > .message"
    );

    return async () => {
      let currentMessageGroupList = findLast(dateList, ".bubbles-group");
      let currentLastMessage = findLast(
        currentMessageGroupList,
        ".bubble > .bubble-content-wrapper > .bubble-content > .message"
      );

      if (
        currentMessageGroupList.length === messageGroupList.length &&
        currentLastMessage.length === lastMessage.length
      ) {
        return;
      }

      messageGroupList = [...currentMessageGroupList];
      lastMessage = [...currentLastMessage];

      const isShift =
        lastMessage[lastMessage.length - 1].innerHTML.search(
          /(Отдам|Who wants)/gi
        );

      if (isShift !== -1) {
        if (isAlreadyAnswered) {
          await delay(1000);
          isAlreadyAnswered = false;
          return;
        }
        await delay(1000);
        messageField.classList.remove("is-empty");
        messageField.innerHTML = "Беру";
        sendButton.click();
        isAlreadyAnswered = true;
      }
    };
  }

  const tmp = sendMessage();

  setInterval(tmp, 1000);
}

(async function addNavLinks() {
  await delay(5000);

  const utilPanel = document.querySelector(
    ".chat-info-container > .chat-utils"
  );

  const scriptStartButton = document.createElement("button");

  function createButton(item, content, className) {
    item.classList.add("btn-icon", "rp", className);

    item.innerHTML = `
        <div class="c-ripple"></div>
        <span class="tgico button-icon">${content}</span>
      `;

    return item;
  }

  createButton(scriptStartButton, "+", "script-start-button");

  utilPanel.append(scriptStartButton);

  const scriptStartButtonDom = document.querySelector(".script-start-button");

  scriptStartButtonDom.addEventListener("click", (event) => {
    event.stopPropagation();
    init();

    scriptStartButtonDom.innerHTML = `
    <div class="c-ripple"></div>
    <span class="tgico button-icon">-</span>
  `;
  });
})();
