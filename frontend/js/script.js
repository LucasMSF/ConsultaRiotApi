$(document).ready(function () {
    //Referenciando os objetos da DOM em variáveis
    var btn = $('#btn');
    var input = $('#nomeDeInvocador');
    var responseDiv = $('#response');

    //Evento click do Botão de consulta
    btn.click(function () {
        //Requisição AJAX a API do BackEnd (E um tratamento básico com condicional)
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/api/getSummoner/${input.val()}`,
            success: function (response) {
                console.log(response);
                if (response.error) {
                    alert('Invocador não encontrado');
                } else {
                    responseDiv.html("");
                    responseDiv.append(renderList(response));
                }
            }
        });
    });


    //Função resposável por Por "Renderizar", que trata e insere os dados da requisição no HTML
    function renderList(r) {
        let htmlResponse = `<div id="summoner"><img src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon${r.summoner.profileIconId}.jpg?image=q_auto&v=1518361200">`;
        htmlResponse += `<ul class="collection"><li class="collection-item">Nome: ${r.summoner.name}</li>`;
        htmlResponse += `<li class="collection-item">Nível: ${r.summoner.summonerLevel}</li></div>`;

        if (r.soloQueue) {
            let type = "Ranqueada Solo";
            let rank;
            let elo;
            switch (r.soloQueue.tier) {
                case 'IRON':
                    rank = "Nova pasta/0.png";
                    elo = "Ferro";

                    break;
                case 'BRONZE':
                    rank = "Nova pasta/1.png";
                    elo = "Bronze";

                    break;
                case 'SILVER':
                    rank = "Nova pasta/2.png";
                    elo = "Prata";

                    break;
                case 'GOLD':
                    rank = "Nova pasta/3.png";
                    elo = "Ouro";

                    break;
                case 'PLATINUM':
                    rank = "Nova pasta/4.png";
                    elo = "Platina";

                    break;
                case 'DIAMOND':
                    rank = "Nova pasta/5.png";
                    elo = "Diamante";

                    break;

                default:
        
                    break;
            }
            htmlResponse += `<div id="rank"><div id="rankImg"><img src="${rank}"></div><ul class="collection"><li class="collection-item">${type}</li><li class="collection-item">Elo: ${elo} ${r.soloQueue.rank}</li><li class="collection-item">Vitórias/Derrotas: ${r.soloQueue.wins}/${r.soloQueue.losses}</li></ul></div>`;
        }

        return htmlResponse;
    }
});
