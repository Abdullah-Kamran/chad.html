 // Your JavaScript code goes here

 const chatInput = document.querySelector(".chat-input textarea");
 const sendChatBtn = document.querySelector(".chat-input span");
 const chatbox = document.querySelector(".chatbox");
 const chatbotToggler = document.querySelector(".chatbot-toggler");
 const chatbotCloseBtn = document.querySelector(".close-btn");

 let userMessage;
 const API_KEY = "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";
 const inputInitHeight = chatInput.scrollHeight
 const createChatLi = (message, className) => {
   const chatLi = document.createElement("li");
   chatLi.classList.add("chat", className);
   let chatContent =
     className === "outgoing"
       ? `<p></p>`
       : `<span class="material-symbols-outlined"><img class="bot" src="bot.png"/></span><p></p>`;
   chatLi.innerHTML = chatContent;
   chatLi.querySelector("p").textContent = message;
   return chatLi;
 };

 const generateResponse = (incomingChatLi) => {
const API_URL = "https://api.openai.com/v1/chat/completions";
const messageElement = incomingChatLi.querySelector("p");
const requestOptions = {
method: "POST",
headers: {
 "Content-Type": "application/json",
 Authorization: `Bearer ${API_KEY}`,
},
body: JSON.stringify({
 model: "gpt-3.5-turbo",
 messages: [{ role: "user", content: userMessage }],
}),
};

fetch(API_URL, requestOptions)
.then((res) => res.json())
.then((data) => {
console.log(data); // Log the API response for debugging
messageElement.textContent = data.choices[0].message.content;
chatbox.scrollTo(0, chatbox.scrollHeight);
})
.catch((error) => {
console.error(error); // Log API errors for debugging
messageElement.classList.add("error");
messageElement.textContent =
 "Oops! Something went wrong. Please try again.";
chatbox.scrollTo(0, chatbox.scrollHeight);
});

};


 const handleChat = () => {
   userMessage = chatInput.value.trim();
   if (!userMessage) return;
   chatInput.value = "";
   chatbox.appendChild(createChatLi(userMessage, "outgoing"));
   chatbox.scrollTo(0, chatbox.scrollHeight);
   chatInput.style.height = `${inputInitHeight}px`

   setTimeout(() => {
     const incomingChatLi = createChatLi("Thinking...", "incoming");
     chatbox.appendChild(incomingChatLi);
     chatbox.scrollTo(0, chatbox.scrollHeight);
     generateResponse(incomingChatLi); // Call the function to send the message to the API
   }, 600);
 };

 chatInput.addEventListener("input" , () => {
   chatInput.style.height = `${inputInitHeight}px`
   chatInput.style.height = `${chatInput.scrollHeight}px`
 })
 chatInput.addEventListener("keydown" , (e) => {
   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
     e.preventDefault()
     handleChat()
   }
  
 })
 sendChatBtn.addEventListener("click", handleChat);
 chatbotToggler.addEventListener("click", () =>
   document.body.classList.toggle("show-chatbot"))
 chatbotCloseBtn.addEventListener("click", () =>
   document.body.classList.remove("show-chatbot"))
