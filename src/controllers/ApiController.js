const request = require('request');
const url = 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const urlQueue = 'https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/'
//A key pode ser gerada por qualquer pessoa no site de  Desenvolvedor da Riot Games:https://developer.riotgames.com/
const apiKey = '#minha_key';

//Função resposável por fazer a requisição e tratar os dados da url "summoner" (invocador) e da url "queue" (Fila (Rank))
function getSummoner(req, res) {
    var summoner;
    var QueueStatus
    var username = req.params.username;
    console.log(username);
    request({ url: url + username + apiKey, json: true }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            summoner = body;
            getQueue(summoner.id);
            // console.log(QueueStatus)
            // return res.json({ summoner, QueueStatus })
        } else {
            return res.json({ error: response.body });
        }
    });

    
    //Função dedicada para requisição e tratamento de dados do rank do invocador
    function getQueue(id) {
        request({ url: urlQueue + id + apiKey, json: true }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                QueueStatus = body;
                console.log(QueueStatus, summoner);

                var soloQueue = QueueStatus.find((item) => item.queueType === 'RANKED_SOLO_5x5');
                var flexQueue = QueueStatus.find((item) => item.queueType === 'RANKED_FLEX_SR');
                return res.json({ summoner, soloQueue, flexQueue });

            } else {
                return { errorQueue: response.body.status.message }
            }
        });
    }
}



module.exports = {
    getSummoner
}