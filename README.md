# Round Robin vs SJF Preemptive Comparison Project

## Overview

This project compares two CPU scheduling algorithms:

- Round Robin (RR)
- Shortest Job First Preemptive

The simulator visualizes process execution using Gantt charts and calculates scheduling metrics such as:

- Waiting Time (WT)
- Turnaround Time (TAT)
- Response Time (RT)

It also provides automatic comparison, analysis, and conclusions between both algorithms.

---

# Features

- Dynamic process input
- Input validation
- Round Robin simulation
- SJF Preemptive simulation
- Gantt chart visualization
- Metrics tables
- Average metrics comparison
- Automatic analysis and recommendations
- Queue visualization for RR

---

# Technologies Used

- HTML
- CSS
- JavaScript

---

# Algorithms

## Round Robin

- Uses time quantum
- Fair CPU sharing
- Good response time
- Can produce more context switches

## SJF Preemptive (SRTF)

- Always selects shortest remaining burst
- Minimizes average waiting time
- May cause starvation for long jobs

---

# Metrics

The simulator calculates:

- Waiting Time
- Turnaround Time
- Response Time
- Average values for each metric

---

# How to Run

1. Download or clone the repository
2. Open `index.html`
3. Enter processes and quantum
4. Click "Run Simulation"

---

# Project Structure

```text
project/
│
├── index.html
├── css/
├── js/
├── screenshots/
├── test-cases/
└── README.md
```

---

# Test Scenarios

The project includes:

1. Normal workload
2. Fairness-revealing workload
3. Invalid input validation cases

---

# Team Members

- Ahmed Abdel Latif
- Ahmed Hassan 
- Ahmed Assem
- Abdulrahamn Braga
- Ammar Mostafa 
- Mohamed Shrief 
- Girgs Tawfic 

# Notes

- Same workload is applied to both algorithms.
- SJF is implemented as preemptive SRTF.
- RR queue rotation is handled correctly.
