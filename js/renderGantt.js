function renderGantt(containerId, gantt, pidList, colors) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if (!gantt.length) 
        return;

    const maxT = Math.max(...gantt.map(b => b.end));

    // time axis
    const tAxis = document.createElement('div');
    tAxis.className = 'gantt-time-row';
    const ticks = new Set([0, maxT]);
    gantt.forEach(b => { 
        ticks.add(b.start); 
        ticks.add(b.end); 
    });
    [...ticks].sort((a, b) => a - b).forEach(tick => {
        const sp = document.createElement('span');
        sp.className = 'gantt-tick';
        sp.style.left = (tick / maxT * 100) + '%';
        sp.textContent = tick;
        tAxis.appendChild(sp);
    });
    container.appendChild(tAxis);

    const pidColorMap = {};
    pidList.forEach((pid, i) => pidColorMap[pid] = colors[i % colors.length]);

    pidList.forEach(pid => {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        const lbl = document.createElement('div');
        lbl.className = 'gantt-pid';
        lbl.textContent = pid;
        row.appendChild(lbl);
        const track = document.createElement('div');
        track.className = 'gantt-track';
        gantt.filter(b => b.pid === pid).forEach(b => {
            const blk = document.createElement('div');
            blk.className = 'gantt-block';
            blk.style.left = (b.start / maxT * 100) + '%';
            blk.style.width = Math.max(0.4, (b.end - b.start) / maxT * 100) + '%';
            blk.style.background = pidColorMap[pid];
            blk.style.opacity = '0.8';
            blk.title = `${pid}: t${b.start} → t${b.end} (${b.end - b.start} units)`;
            track.appendChild(blk);
        });
        row.appendChild(track);
        container.appendChild(row);
    });
}