/*
let submitButton = document.getElementById('submit-button');
let siteList = [];
let siteListEl = document.getElementById('site-list');
let siteID = 0;

function toggleTimer() {
   let style = document.getElementById('action').value == 1 ? 'block' : 'none';
   document.getElementById('hidden_div').style.display = style;
}

function addSiteEntry(siteEntry) {
   siteListEl.innerHTML += `<div class="site-entry" ><span>${siteEntry.site}</span><span>${siteEntry.time ? "Reminder every " + siteEntry.time + " mins" : "Blocked"}</span><span><button id="remove-${siteEntry.id}">X</button></span></div>`;
   showDebug(dump(siteList))
   document.getElementById(`remove-${siteEntry.id}`).addEventListener('click', function () {
       removeSite(siteEntry.id)
   });

}

function dump(obj) {
   var out = '';
   for (var i in obj) {
       out += i + ": " + (typeof obj[i] === 'object' ? dump(obj[i]) : obj[i]) + "\n";
   }

   return out;
}

function removeSite(id) {

   siteList = siteList.filter((s) => s.id != id);
   showDebug("removeSite: " + dump(siteList))

   siteListEl.innerHTML = "";
   siteList.forEach((siteEntry) => {
       addSiteEntry(siteEntry)
   })

}

document.getElementById('action').addEventListener('change', function () {
   toggleTimer();

   document.querySelector("#timer").value = "";
});

submitButton.addEventListener('click', function () {
   try {

       let siteEntry = {};
       let site = document.querySelector("#website");
       let blockType = document.querySelector("#timer");

       siteEntry = { id: siteID, site: site.value, time: blockType.value != "" ? blockType.value : undefined };
       siteList.push(siteEntry);

       addSiteEntry(siteEntry);

       site.value = "";
       blockType.value = "";
       document.getElementById('action').value = "0"
       toggleTimer();
       siteID++;


   } catch (e) {
       showDebug(e);
   }
})

function showDebug(content) {
   document.querySelector('#debug').innerHTML = content;
}
*/
let debug = document.querySelector('#debug');

window.onload = function () {
    document.getElementById('submit-button').onclick = function () {
        var value = document.getElementById('website').value;
        const inputField = document.getElementById('website');

        inputField.placeholder="youtube.com";

        chrome.storage.sync.get('db_blocked_sites', (d) => {
            let sites = []
            if ('db_blocked_sites' in d) {
                sites = d['db_blocked_sites']
            }
            sites.push({ site: value });
            chrome.storage.sync.set({ 'db_blocked_sites': sites }, function () {
            });

        });
    }

    document.getElementById('get').onclick = function () {
        chrome.storage.sync.get('db_blocked_sites', function (data) {
            if ('db_blocked_sites' in data) {
                debug.innerHTML = "";
                data['db_blocked_sites'].map((w) => { debug.innerHTML += w.site })
            }
        });
    }

    document.getElementById('clear').onclick = function () {
        chrome.storage.sync.clear(function () {
            alert("All clear");
        })
    }
}