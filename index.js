const Didact = {
  createElement,
  render,
};

const container = document.getElementById("root");
const node = document.createElement(element.type);
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

let nextUnitOfWork = null
function workLoop(deadline){
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield){
    nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)

  function preformUnitOfWork(nextUnitOfWork){
    
  }
}
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

Didact.render(element, container)
// node.appendChild(text);
// container.appendChild(node);
