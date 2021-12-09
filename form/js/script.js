$(document).ready(function() {

    function renderList(data) {
        var list = ` <ul style="width: 50%; border-radius: 8px; margin-bottom: 5%;" class='collection'>
        <li class='collection-item'>Nome de invocador: ${data.summoner.name}</li>
        <li class='collection-item'>Nivel: ${data.summoner.summonerLevel}</li>`

        if (data.soloQueue) {
            list += `<li class='collection-item'>Solo: ${data.soloQueue.tier} ${data.soloQueue.rank}</li>`;
            list += `<li class='collection-item'>Vitórias: ${data.soloQueue.wins} Derrotas: ${data.soloQueue.losses}</li>`;

        }

        if (data.flexQueue) {
            list += `<li class='collection-item'>Flex: ${data.flexQueue.tier} ${data.flexQueue.rank}</li>`;
            list += `<li class='collection-item'>Vitórias: ${data.flexQueue.wins} Derrotas: ${data.flexQueue.losses}</li>`;
        }

        list += `</ul>`;
        list += `<button class="downbtn btn waves-effect green accent-4" id="confirm">Confirmar</button><button class="downbtn btn waves-effect red" id="cancel" onclick="">Cancelar</button>`;

        return list
    }

    $('#btnBuscar').click(function() {
        var username = $('#username').val();
        $.get({
                url: `http://localhost:3000/api/getSummoner/${username}`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                }
            },
            function(data) {
                if (!data.error) {
                    console.log(data);
                    $('#input').css("margin-top", "5%");
                    $('#showSummoner').css("margin-bottom", "5%");
                    $('#showSummoner').html("");
                    $('#showSummoner').append(`<img style="margin-top: 5%;" src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon${data.summoner.profileIconId}.jpg">`).append(renderList(data));
                    $('#cancel').click(function() {
                        $('#showSummoner').html("");
                        $('#input').css("margin-top", "30%");
                        $('#showSummoner').css("margin-bottom", "30%");
                    });
                } else {
                    alert('Invocador não encontrado');
                }
            });
    });
});