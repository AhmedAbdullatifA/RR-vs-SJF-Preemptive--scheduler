| PID | Arrival | Burst |
| --- | --- | --- |
| P1 | 0 | 20 |
| P2 | 2 | 3 |
| P3 | 4 | 2 |
| P4 | 6 | 1 |

Expected Outputs:

Round Robin (Quantum = 3): Long job (P1) gets split into multiple slices, short jobs finish quickly but turnaround is higher overall.

SJF Preemptive: Short jobs (P2, P3, P4) finish immediately, P1 waits longer but average waiting time is minimized.
