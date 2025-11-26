const positions = [
    { id: 1, label: '左', emoji: '⬅️' },
    { id: 2, label: '真ん中', emoji: '⬇️' },
    { id: 3, label: '右', emoji: '➡️' }
];

let currentKeeperDirection = null;
let gamePlayed = false;

function generateKeeperDirection() {
    currentKeeperDirection = Math.ceil(Math.random() * 3);
}

function getPositionLabel(posId) {
    return positions.find(p => p.id === posId).label;
}

function playerShoot(direction) {
    if (gamePlayed) return;

    gamePlayed = true;
    
    const resultBox = document.getElementById('resultBox');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultText = document.getElementById('resultText');
    const resultDetail = document.getElementById('resultDetail');
    const choicesGrid = document.getElementById('choicesGrid');
    const resetBtn = document.getElementById('resetBtn');

    let isGoal = (direction !== currentKeeperDirection);

    const shootPos = getPositionLabel(direction);
    const keeperPos = getPositionLabel(currentKeeperDirection);

    if (isGoal) {
        resultBox.className = 'result-box goal';
        resultEmoji.textContent = '🎉';
        resultText.textContent = 'ゴール！';
        resultDetail.textContent = `シューターが${shootPos}にシュート → キーパーは${keeperPos}に飛んだ！`;
    } else {
        resultBox.className = 'result-box save';
        resultEmoji.textContent = '🧤';
        resultText.textContent = 'セーブ！';
        resultDetail.textContent = `シューターが${shootPos}にシュート → キーパーが${keeperPos}で止めた！`;
    }

    resultBox.classList.remove('hidden');

    // ボタンを無効化
    const buttons = choicesGrid.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = true);
    resetBtn.disabled = false;
}

function resetGame() {
    gamePlayed = false;
    generateKeeperDirection();
    
    document.getElementById('resultBox').classList.add('hidden');
    document.getElementById('instruction').textContent = 'シュートコースを選んでください';
    document.getElementById('keeperStatus').textContent = 'キーパーの動きが決まりました...';

    // ボタンを有効化
    const choicesGrid = document.getElementById('choicesGrid');
    const buttons = choicesGrid.querySelectorAll('.choice-btn');
    buttons.forEach(btn => btn.disabled = false);
    
    document.getElementById('resetBtn').disabled = true;
}

function initGame() {
    const choicesGrid = document.getElementById('choicesGrid');
    choicesGrid.innerHTML = '';

    positions.forEach(pos => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.onclick = () => playerShoot(pos.id);
        btn.innerHTML = `${pos.emoji}<div class="choice-label">${pos.label}</div>`;
        choicesGrid.appendChild(btn);
    });

    generateKeeperDirection();
    document.getElementById('resetBtn').disabled = true;
}

// ゲーム初期化
initGame();
