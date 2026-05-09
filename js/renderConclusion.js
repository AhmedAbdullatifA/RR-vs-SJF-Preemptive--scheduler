function renderConclusion(rrAvg, srtfAvg, quantum, comp) {
    const
        card = document.getElementById('conclusion-card'),
        srtfWins = [!comp.rrWinsWT, !comp.rrWinsRT, !comp.rrWinsTAT].filter(Boolean).length,
        rrWins = [comp.rrWinsWT, comp.rrWinsRT, comp.rrWinsTAT].filter(Boolean).length,
        overall = srtfWins > rrWins ? 'SRTF' : rrWins > srtfWins ? 'Round Robin' : null,
        winner = overall === 'SRTF'
            ? `<span class="win-tag srtf">SJF Preemptive</span>`
            : overall === 'Round Robin'
                ? `<span class="win-tag rr">Round Robin</span>`
                : '';

    card.innerHTML = `
        <p>
            <strong>
                Overall winner (quantum = ${quantum}):
            </strong> 
            ${winner || 'Tie'} ${overall
            ? `performed better on more metrics.`
            : `Both algorithms performed comparably on this workload.`
        }
        </p>
        <p>
            <strong>
                Efficiency:
            </strong> 
            SJF Preemptive achieved avg WT = ${srtfAvg.wt.toFixed(2)} vs RR avg WT = ${rrAvg.wt.toFixed(2)}.
            ${srtfAvg.wt < rrAvg.wt
                ? 'SJF Preemptive minimizes waiting time by always choosing the job with the least remaining burst.'
                : 'RR matched or beat SJF Preemptive on waiting time - likely due to short or equal burst lengths in this dataset.'
            }
        </p>
        <p>
            <strong>
                Fairness:
            </strong> 
            Round Robin guarantees every process gets CPU time within at most (n-1) &times; quantum units.
            SJF Preemptive may starve long-burst processes if a continuous stream of short jobs arrives.
        </p>
        <p>
            <strong>
                Quantum effect:
            </strong> 
            The chosen quantum (${quantum}) ${quantum <= 2
            ? 'is small - good responsiveness but higher context-switch overhead for RR.'
            : quantum >= 8
                ? 'is large - RR behaves more like FCFS, reducing context switches but hurting response time.'
                : 'is moderate - balanced responsiveness and overhead for RR.'
        }
            Changing the quantum will shift RR\'s metrics significantly; SJF Preemptive is unaffected.
        </p>
        <p>
            <strong>
                Recommendation:
            </strong> ${srtfWins > rrWins
            ? `
                    SJF Preemptive is better for batch workloads where minimizing average wait matters most. 
                    Use Round Robin for interactive or time-sharing systems requiring fairness.
                `
            : `
                    Round Robin is better when fair CPU sharing and bounded response time matter. 
                    Use SJF Preemptive when minimizing average wait is the priority and burst times are known.
                `
        }
        </p>`;
}