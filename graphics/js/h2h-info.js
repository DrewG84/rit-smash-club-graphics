var player1alltime;
var player2alltime;
var player1year;
var player2year;
var player1months;
var player2months;

$(() => {
	loadSmashControl();

	function loadSmashControl(){
		const bundle = 'nodecg-smashcontrol';

		var player1name = $('.player1-tag');
		var player2name = $('.player2-tag');

		

		 player1alltime = $('.player1-alltime');
		 player2alltime = $('.player2-alltime');
		 player1year = $('.player1-year');
		 player2year = $('.player2-year');
		 player1months = $('.player1-months');
		 player2months = $('.player2-months');


		var player1score = nodecg.Replicant("player1Score", bundle);
		var player2score = nodecg.Replicant("player2Score", bundle);
		var setInfo = nodecg.Replicant("playerDataArray", bundle);

		fetchJson();

		setInfo.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
				fetchJson();
		});
		player1score.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
				fetchJson();
		});
		player2score.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
				fetchJson();
		});


		
		function updateFields(setData){
			var h2h = fetchJson();
			console.log(h2h);
			player1name.text(setData.player1tag);
			player2name.text(setData.player2tag);

			

			NodeCG.waitForReplicants(player1score, player2score).then(() => {
				p1score.text(player1score.value);
				p2score.text(player2score.value);
			});



		}
	}
})


  async function fetchJson() {
	const response = await fetch("/bundles/tct-graphics-v2/graphics/H2HScript/H2H_output.json");
	const h2hjson = await response.json();

	player1alltime.text(h2hjson.allTime[0]);
	player2alltime.text(h2hjson.allTime[1]);
	player1year.text(h2hjson.pastYear[0]);
	player2year.text(h2hjson.pastYear[1]);
	player1months.text(h2hjson.past3Months[0]);
	player2months.text(h2hjson.past3Months[1]);

	console.log(h2hjson)
	return h2hjson;
  }
