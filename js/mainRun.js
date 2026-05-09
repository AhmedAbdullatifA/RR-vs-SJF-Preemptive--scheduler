function runSim() {
    clearError();
    const qV = Number(document.getElementById('quantum').value);
    if (!qV || qV <= 0 || !Number.isInteger(qV)) {
        showError('Time quantum must be a positive integer.'); 
        return;
    }
    const { procs, errs } = getProcesses();
    if (errs.length) { 
        showError(errs.join(' | ')); 
        return; 
    }
    if (procs.length < 2) { 
        showError('Please enter at least 2 processes.'); 
        return; 
    }

    const 
        pidList = procs.map(p => p.pid),
        { gantt: rrGantt, metrics: rrMetrics, queueHistory } = simulateRR(procs, qV),
        { gantt: srtfGantt, metrics: srtfMetrics } = simulateSRTF(procs);

    renderGantt('gantt-rr', rrGantt, pidList, RR_COLORS);
    renderGantt('gantt-srtf', srtfGantt, pidList, SRTF_COLORS);

    // queue chips
    const qView = document.getElementById('rr-queue');
    qView.innerHTML = '';
    const shown = queueHistory.slice(0, 10);
    shown.forEach(s => {
        const chip = document.createElement('span');
        chip.className = 'q-chip';
        chip.title = `t=${s.at}: running ${s.pid} | queue: [${s.q.join(', ') || 'empty'}]`;
        chip.textContent = `t${s.at}: ${s.pid}`;
        qView.appendChild(chip);
    });
    if (queueHistory.length > 10) {
        const more = document.createElement('span');
        more.className = 'q-more';
        more.textContent = `+${queueHistory.length - 10} more events`;
        qView.appendChild(more);
    }

    const rrAvg = renderMetrics('table-rr', rrMetrics);
    const srtfAvg = renderMetrics('table-srtf', srtfMetrics);
    const comp = renderComparison(rrAvg, srtfAvg);
    renderConclusion(rrAvg, srtfAvg, qV, comp);
    renderAnalysis(rrAvg, srtfAvg, qV, procs, rrMetrics, srtfMetrics);

    const results = document.getElementById('results');
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
