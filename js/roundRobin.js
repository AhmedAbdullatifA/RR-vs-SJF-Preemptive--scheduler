function simulateRR(procs, quantum) {
    const n = procs.length;
    const rem = procs.map(p => p.bt);
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const rt = new Array(n).fill(-1);
    const queue = [];
    const arrived = new Array(n).fill(false);
    const gantt = [];
    const queueHistory = [];
    let t = 0, done = 0;

    let enqueue = function (time) {
        for (let i = 0; i < n; i++){
            if (!arrived[i] && procs[i].at <= time) {
                arrived[i] = true;
                queue.push(i);
            }
        }
    }

    enqueue(0);
    if (queue.length === 0) {
        let minAt = Math.min(...procs.map(p => p.at));
        t = minAt; enqueue(t);
    }

    const maxIter = n * 10000; 
    let iter = 0;
    while (done < n && iter++ < maxIter) {
        if (queue.length === 0) {
            let nextAt = Infinity;
            for (let i = 0; i < n; i++){
                if (!arrived[i] && procs[i].at < nextAt) 
                    nextAt = procs[i].at;
            }

            if (nextAt === Infinity) 
                break;

            t = nextAt; 
            enqueue(t); 
            continue;
        }
        const idx = queue.shift();
        if (rt[idx] === -1) 
            rt[idx] = t - procs[idx].at;

        const run = Math.min(quantum, rem[idx]);
        queueHistory.push({ 
            at: t, 
            pid: procs[idx].pid, 
            q: [...queue].map(i => procs[i].pid) 
        });
        
        gantt.push({ 
            pid: procs[idx].pid, 
            start: t, 
            end: t + run, 
            color: idx 
        });
        t += run; 
        rem[idx] -= run;
        
        enqueue(t);

        if (rem[idx] > 0) 
            queue.push(idx);

        else {
             done++; 
             tat[idx] = t - procs[idx].at; 
             wt[idx] = tat[idx] - procs[idx].bt; 
        }
    }
    return { 
        gantt, 
        metrics: procs.map((p, i) => ({ 
            pid: p.pid, 
            wt: wt[i], 
            tat: tat[i], 
            rt: rt[i] >= 0 ? rt[i] : 0 
        })), 
        queueHistory 
    };
}