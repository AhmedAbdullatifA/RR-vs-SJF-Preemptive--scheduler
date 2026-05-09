function addRow(pid = '', at = '', bt = '') {
    const id = 'r' + rowCount++;
    rowIds.push(id);
    const div = document.createElement('div');
    div.className = 'proc-row';
    div.id = id;
    div.innerHTML = `
        <input type="text" class="pid" placeholder="P${rowCount}" value="${pid}">
        <input type="number" placeholder="0" value="${at}" min="0">
        <input type="number" placeholder="1" value="${bt}" min="1">
        <button class="btn-remove" onclick="removeRow('${id}')" title="Remove">&#10005;</button>
    `;
    document.getElementById('process-rows').appendChild(div);
}

function removeRow(id) {
    const el = document.getElementById(id);
    if (el) 
        el.remove();

    const i = rowIds.indexOf(id);
    if (i > -1) 
        rowIds.splice(i, 1);

}

function loadPreset(idx, btn) {
    document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
    if (btn) 
        btn.classList.add('active');

    document.getElementById('process-rows').innerHTML = '';
    rowIds.length = 0; 
    rowCount = 0;
    const p = PRESETS[idx];
    document.getElementById('quantum').value = p.q;
    p.procs.forEach(r => addRow(r[0], r[1], r[2]));
    clearError();
    document.getElementById('results').style.display = 'none';
}