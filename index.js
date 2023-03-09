
const saveButton = document.getElementById("save-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
const showLeads = document.getElementById("show-leads")
const clearButton = document.getElementById("clear-btn")
const deleteallButton = document.getElementById("clearall-btn")
const tabButton = document.getElementById("tab-btn")


let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}


tabButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        console.log(myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    })
})

saveButton.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = " "
    //console.log(myLeads)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})

function renderLeads() {
    let listItems = []
    for (let i = 0; i < myLeads.length; i++) {
        listItems += ` <div>
                    <li id="list">
                       <a id="links" href="${myLeads[i]}" target="_blank">
                          ${myLeads[i]}
                       </a>
                       <button id="clear-btn"><i class="fa fa-close"></i></button>
                    </li> 
                   </div>`
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // showLeads.append(li)
    }
    showLeads.innerHTML = listItems
}

deleteallButton.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    renderLeads()

})





