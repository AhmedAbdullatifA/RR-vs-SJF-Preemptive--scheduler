function renderAnalysis(rrAvg, srtfAvg, quantum, procs, rrMetrics, srtfMetrics) {
    const card = document.getElementById('analysis-card');
    const qs = [
        {
            q: 'Which algorithm gave lower average waiting time?',
            a: rrAvg.wt < srtfAvg.wt
                ? `Round Robin (${rrAvg.wt.toFixed(2)}) < SJF Preemptive (${srtfAvg.wt.toFixed(2)})`
                : Math.abs(rrAvg.wt - srtfAvg.wt) < 0.01
                    ? `Tie - both ${rrAvg.wt.toFixed(2)}`
                    : `SJF Preemptive (${srtfAvg.wt.toFixed(2)}) < RR (${rrAvg.wt.toFixed(2)})`
        },
        {
            q: 'Which algorithm gave lower average response time?',
            a: rrAvg.rt < srtfAvg.rt
                ? `Round Robin (${rrAvg.rt.toFixed(2)}) - time-slicing ensures fast first response`
                : `SJF Preemptive (${srtfAvg.rt.toFixed(2)}) - short jobs get CPU almost immediately`
        },
        {
            q: 'Did Round Robin appear fairer across all processes?',
            a: 'Yes - RR bounds the maximum wait to (n-1)&times;quantum, ensuring no process is starved regardless of burst length.'
        },
        {
            q: 'Did SJF Preemptive complete short jobs more efficiently?',
            a: `
                Yes - SJF Preemptive always preempts in favor of the shortest remaining job, 
                minimizing average turnaround for short-burst processes. 
                Long-burst processes may be significantly delayed.
            `
        },
        {
            q: `How did quantum = ${quantum} affect Round Robin behavior?`,
            a: quantum <= 2
                ? `
                    A quantum of ${quantum} is very small. RR approached true time-sharing 
                    but produced many context switches. 
                    Response time is excellent; overhead is high.
                `
                : quantum >= 8
                    ? `
                        A quantum of ${quantum} is large. RR runs each process for longer before switching 
                        - fewer context switches, but slower response and it converges toward FCFS behavior.
                    `
                    : `
                        A quantum of ${quantum} gives moderate context switching. 
                        Processes get reasonable time slices without excessive overhead. 
                        Try smaller values for better responsiveness.
                    `
        },
        {
            q: 'Which algorithm would you recommend for this workload, and why?',
            a: srtfAvg.wt < rrAvg.wt
                ? `
                    SJF Preemptive for batch/CPU-intensive workloads - lower avg WT 
                    (${srtfAvg.wt.toFixed(2)})
                    . Round Robin for interactive/user-facing systems - guaranteed fairness and bounded response time.
                `
                : `
                    Round Robin is a solid recommendation here - it matched SRTF on efficiency 
                    (avg WT ${rrAvg.wt.toFixed(2)}) 
                    while guaranteeing fairness. SRTF requires knowledge of remaining burst times which may not always be available.
                `
        }
    ];
    card.innerHTML = qs.map((item, i) =>
        `
            <div class="analysis-q">
                <span class="q-num">Q${i + 1}</span>
                <div>
                    <div class="q-text">${item.q}</div>
                    <div class="q-answer" style="margin-top:3px">    
                        ${item.a}
                    </div>
                </div>
            </div>
        `
    ).join('');
}