function getProcesses() {
    const 
        procs = [],
        pids = new Set(), 
        errs = [];
    document.querySelectorAll('#process-rows .proc-row').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const pid = inputs[0].value.trim();
        const atV = inputs[1].value.trim();
        const btV = inputs[2].value.trim();
        if (!pid && !atV && !btV) 
            return;
        
        if (!pid) {
            errs.push('A process is missing its PID.'); 
            return; 
        }
        if (pids.has(pid)) {
            errs.push(`Duplicate PID: "${pid}".`); 
            return; 
        }
        pids.add(pid);
        const 
            at = Number(atV), 
            bt = Number(btV);
        if (atV === '' || isNaN(at) || !Number.isInteger(at) || at < 0)
            errs.push(`"${pid}": arrival time must be a non-negative integer.`);

        else if (btV === '' || isNaN(bt) || !Number.isInteger(bt) || bt <= 0)
            errs.push(`"${pid}": burst time must be a positive integer.`);

        else 
            procs.push({ pid, at, bt });

    });
    return { procs, errs };
}

function showError(msg) {
    const b = document.getElementById('error-box');
    b.innerHTML = msg.replace(/\|/g, '<br>');
    b.style.display = 'block';
}

function clearError() { 
    document.getElementById('error-box').style.display = 'none'; 
}