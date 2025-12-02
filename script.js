document.addEventListener('DOMContentLoaded', function () {
    const purpleColor = 'rgba(106, 90, 205, 1)';
    const purpleColorTransparent = 'rgba(106, 90, 205, 0.2)';

    // KPI Line Charts
    const kpiChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            x: { display: false },
            y: { display: false }
        },
        elements: {
            point: { radius: 0 },
            line: { tension: 0.4 }
        }
    };

    new Chart(document.getElementById('today-orders-chart'), {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [{
                data: [10, 12, 8, 14, 11, 13, 15],
                borderColor: purpleColor,
                backgroundColor: purpleColorTransparent,
                fill: true,
            }]
        },
        options: kpiChartOptions
    });

    new Chart(document.getElementById('this-month-revenue-chart'), {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [{
                data: [2000, 2100, 2050, 2200, 2300, 2250, 2450],
                borderColor: purpleColor,
                backgroundColor: purpleColorTransparent,
                fill: true,
            }]
        },
        options: kpiChartOptions
    });

    new Chart(document.getElementById('this-year-customers-chart'), {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [{
                data: [130, 128, 125, 122, 124, 121, 120],
                borderColor: purpleColor,
                backgroundColor: purpleColorTransparent,
                fill: true,
            }]
        },
        options: kpiChartOptions
    });

    // Revenue Bar Charts
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    new Chart(document.getElementById('weekly-revenue-chart'), {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [150, 200, 180, 220, 250, 120, 130],
                backgroundColor: purpleColor,
                borderRadius: 4
            }]
        },
        options: barChartOptions
    });

    new Chart(document.getElementById('yearly-revenue-chart'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [1200, 1500, 1800, 1600, 2000, 2100, 1900, 2200, 2400, 2300, 2500, 2450],
                backgroundColor: purpleColor,
                borderRadius: 4
            }]
        },
        options: barChartOptions
    });
});
