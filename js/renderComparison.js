function renderComparison(rrAvg, srtfAvg) {
    const card = document.getElementById('comparison-card');
    const metrics = [
        ['avg waiting time', 'wt'],
        ['avg turnaround time', 'tat'],
        ['avg response time', 'rt']
    ];
    let html = `
            <div class="comp-head">
                <span>metric</span>
                <span>Round Robin</span>
                <span>SJF Preemptive</span>
            </div>
        `;
    metrics.forEach(([label, key]) => {
        const 
            rv = rrAvg[key], 
            sv = srtfAvg[key],
            tie = Math.abs(rv - sv) < 0.005,
            rrWin = rv < sv,
            rrCls = tie ? 'neutral' : rrWin ? 'win-rr' : 'neutral',
            srtfCls = tie ? 'neutral' : !rrWin ? 'win-srtf' : 'neutral';
        html += `
            <div class="comp-row">
                <span class="comp-metric">${label}</span>
                <span class="comp-val ${rrCls}">${rv.toFixed(2)}${!tie && rrWin ? ' ✓' : ''}</span>
                <span class="comp-val ${srtfCls}">${sv.toFixed(2)}${!tie && !rrWin ? ' ✓' : ''}</span>
            </div>
        `;
    });
    card.innerHTML = html;
    return { 
        rrWinsWT: rrAvg.wt <= srtfAvg.wt, 
        rrWinsRT: rrAvg.rt <= srtfAvg.rt, 
        rrWinsTAT: rrAvg.tat <= srtfAvg.tat
    };
}