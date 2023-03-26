---
---

{% raw %}
/**
 * @this Element
 * @param {string} name
 * @param {string[]} positions 
 */{% endraw %}
function updatePlayerNameBox(name, positions) {
    const gradient = createGradientString(positions);

    // const span = document.querySelector('.player-name-box')
    let elementText = name;
    let styleString = `background: ${gradient};`;
    if (name != 'Empty') { // if name is a real player
        elementText = name;
        this.classList.add('has-player');
        this.classList.remove('no-player');
    } else { // if its an empty player
        this.classList.add('no-player');
        this.classList.remove('has-player');
    }

    this.setAttribute('style', styleString);
    this.textContent = elementText;
}

/**
 * @param {string[]} positions 
 * @returns {string}
 */
function createGradientString(positions) {
    const colors = new Array();
    for (const pos of positions) {
        const colorName = all_position_colors[pos.trim()];
        if (!colors.includes(colorName)) {
            colors.push(colorName);
        }
    }
    
    const colorCount = colors.length || 1;
    const percentDivided = 100 / colorCount;

    let gradientMiddle = '';
    colors.forEach((c, i) => {
        const percent1 = percentDivided * i;
        let percent2 = percent1 + percentDivided;

        if (i == colors.length - 1) {
            percent2 = 100;
        }

        gradientMiddle = gradientMiddle + `, ${c} ${percent1}%, ${c} ${percent2}%`;
    })
    
    return `linear-gradient(to right${gradientMiddle})`;
}

const all_position_colors = allPositionColors();

{% raw %}
/**
 * @returns {{[key: string]: string}}
 */{% endraw %}
function allPositionColors() {
    return {{ site.data.colors.positions | jsonify }};
}