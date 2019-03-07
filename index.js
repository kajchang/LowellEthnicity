$.getJSON('data.json', null, data => {
    const ctx = document.getElementById('chart');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: ['African American', 'Asian', 'White', 'American Indian or Alaska Native', 'Pacific Islander', 'Filipino', 'Hispanic'].map(ethnicity => new Object({
                label: ethnicity,
                data: [],
                fill: false,
                borderColor: '#' + Math.floor(Math.random()*16777215).toString(16).toUpperCase()
            }))
        },
        options: {
            title: {
                display: true,
                text: 'Lowell Ethnicity Data',
                fontSize: 24,
                fontColor: '#00000'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 2000
                    }
                }],
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        suggestedMin: 1993,
                        stepSize: 1,
                        suggestedMax: 2017
                    }
                }]
            }
        }
    });

    const years = Object.keys(data);

    const interval = setInterval(() => {
        const year = years.shift();

        if (!year) {
            return clearInterval(interval);
        }

        chart.data.datasets.forEach(dataset => {
            dataset.data.push({
                x: Number(year),
                y: data[year][dataset.label]
            });
        });

        chart.update();
    }, 1000);
});
