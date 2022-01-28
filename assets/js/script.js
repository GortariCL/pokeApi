$(document).ready(function() {

    $('#form-pkm').submit(function(e) {

        e.preventDefault();

        let valueInput = $('#input-pkm').val();

        $.ajax({

            url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,
            success: function(data) {
                console.log(data);
                let name = data.name;
                let img = data.sprites.front_default;
                let weight = data.weight;

                $("#poke-info").html(`
                    <div class="text-center">
                        <h3 class="text-uppercase">${name}</h3>
                        <img src=${img}>
                        <h6>${weight}</h6>
                    </div>
                `);

                let estadisticas = [];

                data.stats.forEach(function (s) {
                    estadisticas.push({
                        label: s.stat.name,
                        y : s.base_stat,
                    });
                });

                let config = {
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas",
                    },
                    axisY:{
                        title: "Valor",
                    },
                    axisX: {
                        title: "Estadistica",
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: estadisticas,
                        },
                    ],
                };

                var chart = new CanvasJS.Chart("pokeStats", config);

                chart.render();
            },
        });
    });
});