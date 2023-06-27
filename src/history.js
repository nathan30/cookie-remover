// history.js
function showHistory() {
    let storage = chrome.storage || browser.storage;
    storage.local.get(['history'], function(result) {
        let history = result.history || [];
        // Trier l'historique du plus récent au plus ancien
        history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        let historyContainer = document.getElementById('historyContainer');

        if (history.length === 0) {
            historyContainer.innerHTML = "<p>Aucune action n'a été effectuée pour le moment.</p>";
        } else {
            // Créer un objet pour regrouper les actions par date/heure
            let groupedHistory = {};

            history.forEach((action) => {
                // Utiliser la date/heure comme clé (en tant que chaîne)
                let date = new Date(action.timestamp);
                let formattedDate = date.toLocaleString(); // Utilise le format de date/heure local

                // Si cette clé n'existe pas déjà, initialiser avec un tableau vide
                if (!groupedHistory[formattedDate]) {
                    groupedHistory[formattedDate] = [];
                }

                // Ajouter l'action à la liste des actions pour cette date/heure
                groupedHistory[formattedDate].push(action);
            });

            // Parcourir chaque date/heure dans l'objet groupedHistory
            for (let timestamp in groupedHistory) {
                let actionList = groupedHistory[timestamp];

                let timestampDiv = document.createElement('div');
                timestampDiv.style.display = "flex";
                timestampDiv.style.gap = "5px";
                timestampDiv.style.justifyContent = "center";
                timestampDiv.textContent = `${timestamp}`;
                historyContainer.appendChild(timestampDiv);

                actionList.forEach((action) => {
                    let actionDiv = document.createElement('div');
                    actionDiv.classList.add("action");
                    actionDiv.classList.add("rule");

                    let iconAndInfoDiv = document.createElement('div');
                    iconAndInfoDiv.classList.add("iconAndInfoDiv");

                    let iconDiv = document.createElement('div');
                    if(action.action === "hide"){
                        iconDiv.innerHTML = `<i class="fa fa-times-circle" aria-hidden="true"></i>`;
                        iconDiv.title = `Cacher l'élément`;
                    }else if(action.action === "removeClass"){
                        iconDiv.innerHTML = `<i class="fa fa-minus-circle" aria-hidden="true"></i>`;
                        iconDiv.title = `Retirer une classe à l'élément`;
                    }else if(action.action === "addClass"){
                        iconDiv.innerHTML = `<i class="fa fa-plus-circle" aria-hidden="true"></i>`;
                        iconDiv.title = `Ajouter une classe à l'élément`;
                    }

                    let infosDiv = document.createElement('div');

                    let selectorDiv = document.createElement('div');
                    if(action.selector === "id"){
                        selectorDiv.textContent = `#${action.selection}`;
                    }else if(action.selector === "class"){
                        selectorDiv.textContent = `.${action.selection}`;
                    }else if(action.selector === "querySelector"){
                        selectorDiv.textContent = `querySelector("${action.selection}")`;
                    }
                    selectorDiv.style.fontWeight = "bold";
                    infosDiv.appendChild(selectorDiv);

                    let actionNameDiv = document.createElement('div');
                    if(action.action === "hide"){
                        actionNameDiv.textContent = `Cacher l'élément`;
                    }else if(action.action === "removeClass"){
                        actionNameDiv.textContent = `Retirer la classe : .${action.actionValue} `;
                    }else if(action.action === "addClass"){
                        actionNameDiv.textContent = `Ajouter la classe : .${action.actionValue} `;
                    }
                    infosDiv.appendChild(actionNameDiv);

                    let dateDiv = document.createElement('div');
                    let date = new Date(action.timestamp);
                    let formattedDate = date.toLocaleString(); // Utilise le format de date/heure local
                    // dateDiv.textContent = `${formattedDate}`;
                    infosDiv.appendChild(dateDiv);

                    let urlDiv = document.createElement('div');
                    urlDiv.textContent = `${action.url}`;
                    urlDiv.style.color = "lightgrey";
                    infosDiv.appendChild(urlDiv);

                    iconAndInfoDiv.appendChild(iconDiv);
                    iconAndInfoDiv.appendChild(infosDiv);

                    actionDiv.appendChild(iconAndInfoDiv);

                    historyContainer.appendChild(actionDiv);
                });
            }
        }
    });
}




