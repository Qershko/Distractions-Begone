
let submitButton = document.getElementById('submit-button');
let siteList = [];
let siteListEl = document.getElementById('site-list');
let siteID = 0;

function toggleTimer() {
    let style = document.getElementById('action').value == 1 ? 'block' : 'none';
    document.getElementById('hidden_div').style.display = style;
}

function addToStorage(site) {
    chrome.storage.sync.get('db_blocked_sites', (d) => {
        let sites = []
        if ('db_blocked_sites' in d) {
            sites = d['db_blocked_sites']
        }
        sites.push(site);
        siteList.push(site);
        chrome.storage.sync.set({ 'db_blocked_sites': sites }, function () {
        });
    });
}

function addSiteEntry(siteEntry) {
    let siteEl = document.createElement("div");
    siteEl.innerHTML = `<span>${siteEntry.site}</span><span>${siteEntry.time ? "Reminder every " + siteEntry.time + " mins" : "Blocked"}</span><span><button id="remove-${siteEntry.id}">X</button></span>`

    siteEl.classList.add("site-entry")
    siteListEl.appendChild(siteEl)
    siteEl.addEventListener('click', function () {
        removeSite(siteEntry.id)
    });

}

function removeSite(id) {
    chrome.storage.sync.get('db_blocked_sites', (d) => {
        let sites = []
        if ('db_blocked_sites' in d) {
            sites = d['db_blocked_sites']
        }
        console.log(sites.findIndex((s) => { return s.id == id }))

        sites.splice(sites.findIndex((s) => { return s.id == id }), 1)
        siteList = sites;
        chrome.storage.sync.set({ 'db_blocked_sites': sites }, function () {
        });
        siteListEl.innerHTML = "";

        siteList.forEach((siteEntry) => {
            addSiteEntry(siteEntry)
        });
    });
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

        addToStorage(siteEntry)
        addSiteEntry(siteEntry);


        site.value = "";
        blockType.value = "";
        document.getElementById('action').value = "0"
        toggleTimer();
        siteID++;


    } catch (e) {

    }
})

window.onload = function () {

    chrome.storage.sync.get('db_blocked_sites', (d) => {
        let sites = []
        if ('db_blocked_sites' in d) {
            sites = d['db_blocked_sites']
        }

        sites.forEach((siteEntry) => {
            addSiteEntry(siteEntry)
            siteID = siteEntry.id;
        });
        siteID++;
    });
}