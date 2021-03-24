const BaseCommand = require('../../utils/structures/BaseCommand');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const moment = require('moment');
const Discord = require("discord.js") 

module.exports = class RankCommand extends BaseCommand {
  constructor() {
    super('rank', 'Valorant', []);
  }

  run(client, message, args) {
    var vuser = args[0];
    var vpass = args[1];

    /*if (!message.channel.name.startsWith("ticket-")){
        message.delete({ timeout: 0, reason: '' });
        return message.channel.send("You should open a ticket by using `$new`");
    }*/
    message.delete({ timeout: 0, reason: '' });
    moment.locale('pt-br');
    require('dotenv').config()
    
    axiosCookieJarSupport(axios);
     
    const cookieJar = new tough.CookieJar();
    
    const auth = () => {
    
      return new Promise((resolve, reject)=>{
    
        let data = {
          'client_id': 'play-valorant-web-prod',
                'nonce': '1',
                'redirect_uri': 'https://playvalorant.com/opt_in',
                'response_type': 'token id_token',
        };
    
        axios.post('https://auth.riotgames.com/api/v1/authorization', data, {jar: cookieJar, withCredentials: true})
          .then(response=> {
            
            data = {
                'type': 'auth',
                'username': vuser,
                'password': vpass
            };
            
            axios.put('https://auth.riotgames.com/api/v1/authorization', data, {jar: cookieJar, withCredentials: true})
            .then(response=>{
              
              let uri = response.data.response.parameters.uri;
              let strTokens = uri.replace('https://playvalorant.com/opt_in#', '').split('&');
    
              let arrayTokens = {};
    
              strTokens.forEach(token=>{
                arrayTokens[token.split('=')[0]] = token.split('=')[1];
              });
    
              //console.log('Access Token:', arrayTokens.access_token)
              
    
              axios.defaults.headers.common['X-Riot-ClientPlatform'] = "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";
              axios.defaults.headers.common['Authorization'] = `Bearer ${arrayTokens.access_token}`
    
              axios.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {jar: cookieJar, withCredentials: true})
              .then(response=>{
    
                let entitlements_token = response.data.entitlements_token;
                axios.defaults.headers.common['X-Riot-Entitlements-JWT'] = entitlements_token
    
               //console.log('\nEntitlements Token:', entitlements_token);
    
                axios.post('https://auth.riotgames.com/userinfo', {}, {jar: cookieJar, withCredentials: true})
                .then(response=>{
    
                  let user_id = response.data.sub;
                  console.log('Player Id:', user_id);
                  resolve(user_id);
    
                });
    
              });
    
            });
    
          })
          .catch(error=> {
            reject(error);
          });
    
        });
    }
    
    const getMovementString = (before, after) => {
  
      if(after > before){
        return 'Promoted';
      }
      else if(after < before){
        return 'Demoted';
      }
      else{
        return 'Unchanged';
      }
    
    }
    
    const getRankString = rankId => {
    
      let rankName, rankNumber;
    
      if(rankId < 6)
        rankName = 'Iron';
      else if(rankId < 9)
        rankName = 'Bronze';
      else if(rankId < 12)
        rankName = 'Silver';
      else if(rankId < 15)
        rankName = 'Gold';
      else if(rankId < 18)
        rankName = 'Platinum';
      else if(rankId < 21)
        rankName = 'Diamond';
      else if(rankId < 24)
        rankName = 'Immortal';
      else
        return 'Radiant';
    
      if(((rankId / 3) % 1).toFixed(2) == 0.00){
        rankNumber = 1;
      }
      else if(((rankId / 3) % 1).toFixed(2) == 0.33){
        rankNumber = 2;
      }
      else{
        rankNumber = 3;
      }
    
      return `${rankName} ${rankNumber}`
    
    }
    
    const getRankedInfo = async (startIndex = 0, endIndex = '4') => {
    
      let playerId = await auth();
      let res = await axios.get(`https://pd.EU.a.pvp.net/mmr/v1/players/${playerId}/competitiveupdates?startIndex=${startIndex}&endIndex=${endIndex}`);
    
      let matches = res.data.Matches.reverse();
      matches = matches.filter(match=>match.TierBeforeUpdate != 0); //filtra as partidas rankeadas apenas;
    
      let numMatches = matches.length;
  
      if(numMatches > 0){
    
        matches.forEach(match=>{
  
          const embed = new Discord.MessageEmbed() 
          .setColor('#6959f7') 
          .addField(vuser,
          'Match Found:  ' + '**' + moment(match.MatchStartTime).format('DD/MM/YYYY  HH:mm') + '**\n' + 
          'Points Before:  ' + '**' + match.RankedRatingBeforeUpdate + '**' + '  ==>  Points After:  ' + '**' + match.RankedRatingAfterUpdate + '**\n' + 
          'Rank Before:  ' + '**' + getRankString(match.TierBeforeUpdate) + '**' + '  ==>  Rank After:  ' + '**' + getRankString(match.TierAfterUpdate) + '**\n' + 
          'Movement:  ' + '**' + getMovementString(match.CompetitiveMovement) + '**\n' +
          'Missing: ' + '**' + `${100 - matches[numMatches - 1 ].RankedRatingAfterUpdate} points for ${getRankString(matches[numMatches -1].TierAfterUpdate + 1)}` + '**'
  
          )
          .setFooter('Requested by: ' + message.author.tag, message.author.displayAvatarURL())
          message.channel.send(embed);
        });
    
      }
    
    }
    
    getRankedInfo();
};
};
  
