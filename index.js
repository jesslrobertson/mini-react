
const Didact = {
  createElement,
  render,
};

const element = Didact.createElement();
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
  const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)
  element.props.children.forEach(child => render(child, dom))

  container.appendChild(dom)
}
console.log(createElement("div"));

node.appendChild(text);
container.appendChild(node);
