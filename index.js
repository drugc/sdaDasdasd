function start() {
  var btn = document.getElementById("btn");
  var card = document.querySelector(".card");
  if (btn && card) {
    card.remove();
  }
}

const tabId = "tab_" + Math.random().toString(36).substring(2);


if (!sessionStorage.getItem('isActive')) {
  sessionStorage.setItem('isActive', 'true');
  localStorage.setItem(tabId, 'online'); 
}


const channel = new BroadcastChannel('online_users');


function updateCounter() {
  const onlineUsers = Object.keys(localStorage)
    .filter(key => key.startsWith('tab_') && localStorage.getItem(key) === 'online');
  
  document.getElementById('online-counter').textContent = onlineUsers.length;
  channel.postMessage(onlineUsers.length); 
}


channel.addEventListener('message', (e) => {
  document.getElementById('online-counter').textContent = e.data;
});


window.addEventListener('beforeunload', () => {
  localStorage.removeItem(tabId);
  channel.postMessage(
    Object.keys(localStorage)
      .filter(key => key.startsWith('tab_') && localStorage.getItem(key) === 'online')
      .length
  );
});


updateCounter();
