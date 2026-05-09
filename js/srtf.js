function simulateSRTF(procs) {
    const n = procs.length;
    const rem = procs.map(p => p.bt);
    const wt = new Array(n).fill(0);
    const tat = new Array(n).fill(0);
    const rt = new Array(n).fill(-1);
    const done = new Array(n).fill(false);
    const gantt = [];
    let 
        t = 0, 
        doneCount = 0,
        lastPid = null, 
        lastIdx = -1, 
        lastStart = 0;

    const totalTime = procs.reduce((s, p) => s + p.bt, 0) + Math.max(...procs.map(p => p.at)) + 10;

    while (doneCount < n && t <= totalTime) {
        let 
            best = -1, 
            bestRem = Infinity;
            
        for (let i = 0; i < n; i++) {
            if (!done[i] && procs[i].at <= t && rem[i] < bestRem) {
                bestRem = rem[i]; 
                best = i;
            }
        }
        if (best === -1) {
            if (lastPid !== null) { 
                gantt.push({ 
                    pid: lastPid, 
                    start: lastStart, 
                    end: t, 
                    color: lastIdx 
                }); 
                lastPid = null; 
            }
            let nextAt = Infinity;
            for (let i = 0; i < n; i++) 
                if (!done[i] && procs[i].at > t && procs[i].at < nextAt) nextAt = procs[i].at;
            if (nextAt === Infinity) break;
            t = nextAt; 
            continue;
        }
        if (rt[best] === -1) 
            rt[best] = t - procs[best].at;

        if (procs[best].pid !== lastPid) {
            if (lastPid !== null) { 
                gantt.push({ 
                    pid: lastPid, 
                    start: lastStart, 
                    end: t, 
                    color: lastIdx 
                });
            }
                lastPid = procs[best].pid; 
                lastIdx = best; 
                lastStart = t;
        }
        rem[best]--; 
        t++;
        if (rem[best] === 0) {
            done[best] = true; 
            doneCount++;
            tat[best] = t - procs[best].at; 
            wt[best] = tat[best] - procs[best].bt;
            gantt.push({ 
                pid: lastPid, 
                start: lastStart, 
                end: t, 
                color: lastIdx 
            });
            lastPid = null; 
            lastStart = t;
        }
    }
    if (lastPid !== null) {
        gantt.push({ 
            pid: lastPid, 
            start: lastStart, 
            end: t, 
            color: lastIdx 
        });
    }
    return { 
        gantt, 
        metrics: procs.map((p, i) => ({ 
            pid: p.pid, 
            wt: wt[i], 
            tat: tat[i], 
            rt: rt[i] >= 0 ? rt[i] : 0 
        })) 
    };
}