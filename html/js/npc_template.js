import { monsterSizes, sourceBooks } from './constants.js'

let page = 1
let limit = 10
fetch(`http://localhost:8000/monsters?page=${page}&limit=${limit}`)
.then((response) => response.json())
.then((data) => {
    filterResult = data;
    filterResult.forEach(function (element) {
        let {
            name, type, size, cr, str, dex, con, int, wis, cha, hp, ac, savings, senses, skills, speed, tokenURL, 
            traits, actions, immunities, legendaryActions, source, page
        } = element;
        let monsterDiv = `
                <div class="monster-line">
                    <div class="monster-cell monster-cell-avatar"><img src="${tokenURL}" alt="${name}" class="avatar"></div>
                    <div class="monster-cell monster-cell-name">${name}</div>
                    <div class="monster-cell monster-cell-type">${type}</div>
                    <div class="monster-cell monster-cell-size">${size}</div>
                    <div class="monster-cell monster-cell-cr">${cr}</div>
                    <div class="monster-cell monster-cell-add-button"><button class="monster-button"><div class="">ponlo</div></button></div>
                    <div onclick="showNPC('npcID${name}')" class="monster-cell monster-cell-expand-button"><div id="npcID${name}Scroll" class="npc-sheet-button"></div></div>
                </div>
                <div id="npcID${name}" class="npcsheet">
                    <div class="npc-stats">
                        <div class="npc-sheet-header-wraper">
                            <div class="npc-sheet-header-container">
                                <div class="npc-sheet-header-name">${name}</div>
                                <div class="npc-sheet-header-source">
                                    <a href="https://5e.tools/book.html#${source},page:${page}" target="_blank" title="${abreviations(source, 'source')}, Page ${page}">
                                        ${source}<span class="npc-sheet-header-page">p${page}</span>
                                    </a>
                                </div>
                            </div>
                            <div class="npc-sheet-header-size-type">${abreviations(size, "size")} ${type}</div>
                        </div>
                        <div class="npc-sheet-basic-data-wraper">
                            <div class="npc-sheet-basic-data ac"><p>CA</p><p>${ac}</p></div>
                            <div class="npc-sheet-basic-data hp"><p>PG</p><p>${hp['average']} (${hp['formula']})</p></div>
                            <div class="npc-sheet-basic-data speed"><p>Movimiento</p><p>${speed}</p></div>
                            <div class="npc-sheet-basic-data cr"><p>VD</p><p>${cr}</p></div>
                        </div>
                        <div class="npc-sheet-stats-wraper">
                            <div class="npc-sheet-stats str"><p>Fuerza</p><p>${str}</p></div>
                            <div class="npc-sheet-stats dex"><p>Destreza</p><p>${dex}</p></div>
                            <div class="npc-sheet-stats con"><p>Constitución</p><p>${con}</p></div>
                            <div class="npc-sheet-stats int"><p>Inteligencia</p><p>${int}</p></div>
                            <div class="npc-sheet-stats wis"><p>Sabiduría</p><p>${wis}</p></div>
                            <div class="npc-sheet-stats cha"><p>Carisma</p><p>${cha}</p></div>
                        </div>
                        ${ savings || immunities || skills || senses ? 
                            `<div class="npc-sheet-info-wraper">
                                <div class="npc-sheet-info">
                                    ${savings ? `<p>Savings: ${savings}</p>` : ''}
                                    ${immunities ? `<p>Immunities: ${immunities}</p>` : ''}
                                    ${skills ? `<p>Skills: ${skills}</p>` : ''}
                                    ${senses ? `<p>Senses: ${senses}</p>` : ''}
                                </div>
                            </div>`: ''
                        }
                        ${ traits ? `
                            <div class="npc-sheet-traits-wraper">
                                ${printTraits(traits)}
                            </div> ` : ''
                        }
                        <div class="npc-sheet-actions-wraper">
                            <div class="npc-sheet-actions-name"><div class="npc-sheet-actions-info"></div></div>
                        </div>
                        ${ legendaryActions ? `
                            <div class="npc-sheet-legendary-actions-wraper">
                                <p class="npc-sheet-legendary-actions-header">Legendary Actions</P>
                                ${printlegendaryActions(legendaryActions)}
                            </div> ` : ''
                        }
                    </div>
                </div>`;
        document.getElementById('monsterResults').insertAdjacentHTML("beforeend",monsterDiv)
    })
    // DELETE THIS WHEN FINISHED
    filterResult.forEach(element => console.log(element))
});

function printTraits(traits) {
    return Object.entries(traits).map(function (trait) {
        return `<p class="npc-sheet-trait"><span class="npc-shseet-trait-name">${trait[0]}: </span>${trait[1]}</p>`;
    }).join('');
}
function printlegendaryActions(legendaryActions) {
    return Object.entries(legendaryActions).map(function (legendaryActions) {
        return `<p class="npc-sheet-legendary-actions"><span class="npc-sheet-legendary-actions-name">${legendaryActions[0]}: </span>${legendaryActions[1]}</p>`;
    }).join('');
}

function abreviations(data, target) {
    data = data.toLowerCase();
    return target === "size" ? monsterSizes[data] : sourceBooks[data];
}