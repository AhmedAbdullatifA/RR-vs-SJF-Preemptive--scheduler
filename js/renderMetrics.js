function renderMetrics(tableId, metrics) {
    const t = document.getElementById(tableId);
    t.innerHTML = `
        <thead>
            <tr>
                <th>PID</th>
                <th>WT</th>
                <th>TAT</th>
                <th>RT</th>
            </tr>
        </thead>
    `;
    const body = document.createElement('tbody');
    let 
        sWT = 0, 
        sTAT = 0, 
        sRT = 0;
    metrics.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${m.pid}</td>
            <td>${m.wt}</td>
            <td>${m.tat}</td>
            <td>${m.rt}</td>
        `;
        body.appendChild(tr);
        sWT += m.wt; 
        sTAT += m.tat; 
        sRT += m.rt;
    });
    const n = metrics.length;
    const avgR = document.createElement('tr');
    avgR.className = 'avg';
    const 
        aWT = (sWT / n).toFixed(2), 
        aTAT = (sTAT / n).toFixed(2), 
        aRT = (sRT / n).toFixed(2);
    avgR.innerHTML = `
        <td>avg</td>
        <td>${aWT}</td>
        <td>${aTAT}</td>
        <td>${aRT}</td>
    `;
    body.appendChild(avgR);
    t.appendChild(body);
    return { 
        wt: sWT / n, 
        tat: sTAT / n, 
        rt: sRT / n 
    };
}