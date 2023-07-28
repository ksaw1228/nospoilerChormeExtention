function adjustParentOpacity(node) {
  const parent = node.parentNode;
  if (parent && parent !== document.body) {
  parent.style.opacity = "0";
  }
  } function adjustNodes(element, blockedWords) {
  const nodeIterator = document.createNodeIterator(
  element,
  NodeFilter.SHOW_TEXT,
  {
  acceptNode: (node) => {
  return blockedWords.some((word) => node.textContent.includes(word))
  ? NodeFilter.FILTER_ACCEPT
  : NodeFilter.FILTER_REJECT;
  },
  }
  ); let node;
  while ((node = nodeIterator.nextNode())) {
  adjustParentOpacity(node);
  }
  } // 기존의 MutationObserver 및 로컬 스토리지를 가져오는 코드는 그대로 유지하세요 chrome.storage.local.get("blockedWords", ({ blockedWords }) => {
  if (blockedWords) {
  const blockedWordsArray = blockedWords
  .split(",")
  .map((word) => word.trim())
  .filter((word) => word.length > 0);
  adjustNodes(document.body, blockedWordsArray);
  
  // Observe and adjust dynamic content
  const observerConfig = {
    childList: true,
    subtree: true,
  };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          adjustNodes(addedNode, blockedWordsArray);
        } else if (addedNode.nodeType === Node.TEXT_NODE) {
          adjustTextNode(addedNode, blockedWordsArray);
        }
      });
    });
  });
  observer.observe(document.body, observerConfig);
  }
