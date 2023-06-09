/**
 * @this {HTMLElement} DOM
 * @param {Event} event 
 */
function sortRightClick(event) {
    // element is right clicked
    // check if it has the sort-asc attribute
    const key = event.target.getAttribute('sort-key');
    if (event.target && key) {
        event.preventDefault();
        sortPlayerPool(event.target, key);
    }
}

/** @type {Player[]} */
const sortedPlayerPool = JSON.parse(JSON.stringify(all_players));

/**
 * @param {EventTarget} target
 * @param {string} sortKey 
 */
function sortPlayerPool(target, sortKey) {
    // Get table of player pool.
    const poolTable = document.getElementById('player-pool-table');
    if (!poolTable) { return; }

    // Check if the element has the `sort-asc` attribute. If not, add it.
    let sortAsc = target.getAttribute('sort-asc');
    if (!sortAsc) {
        sortAsc = 'true';
        target.setAttribute('sort-asc', 'true');
    }

    // Sort the array of all players by the provided sort key.
    sortedPlayerPool.sort((a, b) => {
        if (typeof a[sortKey] == 'string') {
            return ((sortAsc === 'true') ? 1 : -1) * a[sortKey].localeCompare(b[sortKey]);
        } else {
            return ((sortAsc === 'true') ? 1 : -1) * (a[sortKey] - b[sortKey]);
        }
    });

    // Set the sorted order of the player cells.
    sortedPlayerPool.forEach((player, i) => {
        // find element by ID
        const cell = poolTable.querySelector(`#${CSS.escape(player.id)}-name-box.player-name-box`)?.parentElement;

        if (cell) {
            // do the same as below
            cell.style.order = i;
        }        
    });

    // Set `sort-asc` attribute to the opposite value.
    target.setAttribute('sort-asc', !(sortAsc === 'true'));

    // Remove `.sorted` class from last key sorted by (if there is one)
    const prevSorted = document.querySelectorAll('[sort-key].sorted');
    prevSorted.forEach(el => el.classList.remove('sorted'));

    // Add `.sorted` class to the target
    const allMatchingLabels = document.querySelectorAll(`[sort-key="${sortKey}"]`);
    allMatchingLabels.forEach(el => el.classList.add('sorted'));
}
