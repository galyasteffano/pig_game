var scores,round_score,active_player;
//var game_playing=true;      hiding the buttons instead of using state variable
init();

//console.log(dice);
//DOM manipulation can be used to read data
//document.querySelector('#current-'+active_player).textContent=dice;
//can only set plain text if you want to use html use the below
//document.querySelector('#current-'+active_player).innerHTML='<em>'+dice+'</em>';
var lastDice;
var set_score;
document.querySelector('.btn-roll').addEventListener('click',function()
{

  //1 Random number as soon as someone clicks the button
      var dice=rollDice();
      var second_dice=rollDice();
      //var duplicate=false;

     // console.log(dice,next);
//2 display result
     var dice_dom=document.querySelector('.dice');
     var dice2_dom=document.querySelector('.dice2');
     dice2_dom.style.display='block';
     dice_dom.style.display='block';
     dice_dom.src='images/dice-'+dice+'.png';
     dice2_dom.src='images/dice-'+second_dice+'.png';


  //3 Update the round score but only if the roll number was not 1
      if(dice!==1 || second_dice!==1){
    // add score
        round_score=round_score+dice+second_dice;
        document.querySelector('#current-'+active_player).textContent=round_score;
   }else if(lastDice===6 && dice===6){
        scores[active_player]=0;
        document.querySelector('#current-'+active_player).textContent=0;
        nextPlayer();
   } else{
    //next player
        nextPlayer();
      }
      lastDice=dice;
  }
);
document.querySelector('.btn-hold').addEventListener('click',function(){
  //Add current score to global scores

    scores[active_player]+=round_score;
    document.querySelector('#score-'+active_player).textContent=scores[active_player];
  //update the user interface UI
  //check if player won the game
//  console.log(scores);
    if(scores[active_player]>=parseInt(setWinningScore())){
      document.querySelector('#name-'+active_player).textContent='Winner!';
      document.querySelector('.dice').style.display='none';
      document.querySelector('.dice2').style.display='none';
      document.querySelector('.player_'+active_player+'_panel').classList.add('winner');
      document.querySelector('.player_'+active_player+'_panel').classList.remove('active');
      document.querySelector('.btn-roll').style.visibility='hidden';
      document.querySelector('.btn-hold').style.visibility='hidden';
     // game_playing=false;
     }
    else{
        nextPlayer();
      }

});

document.querySelector('.btn-new').addEventListener('click',init);

/*********************************************************************
*              Functions
*********************************************************************/
function nextPlayer(){
  active_player===0 ? active_player = 1 : active_player=0;
  round_score=0;
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';
  document.querySelector('.player_0_panel').classList.toggle('active');
  document.querySelector('.player_1_panel').classList.toggle('active');
  document.querySelector('.dice').style.display='none';
  document.querySelector('.dice2').style.display='none';
}
function init(){
  scores=[0,0];
  active_player=0;
  round_score=0;
  document.querySelector('.dice').style.display='none';  //hide the dice
  document.querySelector('.dice2').style.display='none';
  //get element by id is faster
  document.getElementById('score-0').textContent='0';
  document.getElementById('score-1').textContent='0';
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';
  document.querySelector('#name-0').textContent='Player 1';
  document.querySelector('#name-1').textContent='Player 2';
  //remove winner class
  document.querySelector('.player_0_panel').classList.remove('winner');
  document.querySelector('.player_1_panel').classList.remove('winner');
    document.querySelector('.player_0_panel').classList.remove('active');
  document.querySelector('.player_1_panel').classList.remove('active');
  //set first player to active player
    document.querySelector('.player_0_panel').classList.add('active');
    document.querySelector('.btn-roll').style.visibility='';          //show buttons
    document.querySelector('.btn-hold').style.visibility='';
    //game_playing=true;
}
function rollDice(){
     return Math.floor(Math.random()*6)+1;
}
function setWinningScore(){
     return document.querySelector('#set_score').value;
}
