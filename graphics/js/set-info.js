function FixSize(selector){

	setTimeout(function(){
		var divWidth = $(selector + ":visible").width();
		var fontSize = 92;

		// Reset font to default size to start.
		$(selector).css("font-size", "");

		var text_org = $(selector + ":visible").html();

		var text_update = '<span style="white-space:nowrap;">' + text_org + '</span>';

		

		
		$(selector + ":visible").html(text_update);


		var childWidth = $(selector + ":visible").children().width();

		// console.log(childWidth + " " + divWidth);

		while ($(selector + ":visible").children().width() > divWidth){
			// console.log($(selector + ":visible").children().width() + " " + divWidth);
			$(selector).css("font-size", fontSize -= 1);
		}


		$('.game-number').css("left", $(".bracket-location").width() + 50);


		

		// console.log(fontSize)
	}, 500);

	$('.player1-prefix').css("font-size", $('.player1-tag').css("font-size"));	
	$('.player2-prefix').css("font-size", $('.player2-tag').css("font-size"));
}

$(() => {
	loadSmashControl();

	function loadSmashControl(){
		const bundle = 'nodecg-smashcontrol';
		var bracketlocation = $('.bracket-location');
		var player1name = $('.player1-tag');
		var player1pronouns = $('.player1-pronouns');
		var p1score = $('.player1-score');
		var p1prefix = $('.player1-prefix');

		var player2name = $('.player2-tag');
		var player2pronouns = $('.player2-pronouns');
		var p2score = $('.player2-score');
		var p2prefix = $('.player2-prefix');

		var commentary1 = $('.commentator-1');
		var commentary1pronouns = $('.commentator1-pronouns');
		var commentary2 = $('.commentator-2');
		var commentary2pronouns = $('.commentator2-pronouns');
		var gamenumber = $('.game-number');


		var player1score = nodecg.Replicant("player1Score", bundle);
		var player2score = nodecg.Replicant("player2Score", bundle);
		var setInfo = nodecg.Replicant("playerDataArray", bundle);
		var tourneyRepl = nodecg.Replicant("currentTournament", bundle);
		setInfo.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});
		player1score.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});
		player2score.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});

		var numOnce = 0;
		setInfo.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
				updateInfo(tourneyRepl);
		});

		var tourneyName = $('.tourney-name');
		tourneyRepl.on('change', (newVal, oldVal) => {
		if (newVal) {
			updateInfo(newVal);
		}
		});


		function updateFields(setData){
			bracketlocation.text(setData.bracketlocation);
			player1name.text(setData.player1tag);
			player1pronouns.text(setData.player1pronouns);
			player2name.text(setData.player2tag);
			player2pronouns.text(setData.player2pronouns);
			commentary1.text(setData.commentator1);
			commentary1pronouns.text(setData.commentator1pronouns);
			commentary2.text(setData.commentator2);
			commentary2pronouns.text(setData.commentator2pronouns);
			NodeCG.waitForReplicants(player1score, player2score).then(() => {
				p1score.text(player1score.value);
				p2score.text(player2score.value);
			});
			gamenumber.text("Game " + (parseInt(player1score.value) + parseInt(player2score.value) + 1));


			var split_text = setData.player1tag.split("| ");
			var tag = split_text.slice(1, split_text.length).join("");
			if ((typeof tag !== 'undefined')  && (tag !== "")) {
				player1name.text(tag);
				p1prefix.text(split_text[0]);
			} else {
				p1prefix.text("");
			}

			var split_text2 = setData.player2tag.split("| ");
			var tag2 = split_text2.slice(1, split_text2.length).join("");
			if ((typeof tag2 !== 'undefined')  && (tag2 !== "")) {
				player2name.text(tag2);
				p2prefix.text(split_text2[0]);
			} else {
				p2prefix.text("");
			}

			$('.p1port1').css("color", "var(--white)");
			$('.p1port2').css("color", "var(--white)");
			$('.p1port3').css("color", "var(--white)");
			$('.p1port4').css("color", "var(--white)");
			switch (setData.player1pronouns[setData.player1pronouns.length - 1]) {
				case "1":
					$('.p1port1').css("color", "var(--orange)");
					player1pronouns.text(setData.player1pronouns.substring(0, setData.player1pronouns.length - 1));
				break;
				case "2":
					$('.p1port2').css("color", "var(--orange)");
					player1pronouns.text(setData.player1pronouns.substring(0, setData.player1pronouns.length - 1));
				break;
				case "3":
					$('.p1port3').css("color", "var(--orange)");
					player1pronouns.text(setData.player1pronouns.substring(0, setData.player1pronouns.length - 1));
				break;
				case "4":
					$('.p1port4').css("color", "var(--orange)");
					player1pronouns.text(setData.player1pronouns.substring(0, setData.player1pronouns.length - 1));
				break;
			}

			$('.p2port1').css("color", "var(--white)");
			$('.p2port2').css("color", "var(--white)");
			$('.p2port3').css("color", "var(--white)");
			$('.p2port4').css("color", "var(--white)");
			switch (setData.player2pronouns[setData.player2pronouns.length - 1]) {
				case "1":
					$('.p2port1').css("color", "var(--orange)");
					player2pronouns.text(setData.player2pronouns.substring(0, setData.player2pronouns.length - 1));
				break;
				case "2":
					$('.p2port2').css("color", "var(--orange)");
					player2pronouns.text(setData.player2pronouns.substring(0, setData.player2pronouns.length - 1));
				break;
				case "3":
					$('.p2port3').css("color", "var(--orange)");
					player2pronouns.text(setData.player2pronouns.substring(0, setData.player2pronouns.length - 1));
				break;
				case "4":
					$('.p2port4').css("color", "var(--orange)");
					player2pronouns.text(setData.player2pronouns.substring(0, setData.player2pronouns.length - 1));
				break;
			}

			if (document.title === "RIT Melee Layout") {
				toFix = ['.player1-tag', '.player2-tag', '.player1-score', '.player2-score', '.tourney-name']
			
			} else {
				toFix = ['.player1-tag', '.player2-tag', '.commentator-1', '.commentator-2', '.player1-score', '.player2-score']
			
			}
			toFix.map(FixSize);


			
			
			

			
			if ($("#com1").length) {
				if (commentary1.text() === "") {
					$("#com1").css("display", "none");
				} else {
					$("#com1").css("display", "flex");
				}
			}

			if ($("#com2").length) {
				if (commentary2.text() === "") {
					$("#com2").css("display", "none");
				} else {
					$("#com2").css("display", "flex");
				}
			}


			
	




		}
		function updateInfo(tourneyData){
			// Currently adds the tournament name and events to the panel, can be extended to add more
			if (numOnce < 2) {
				var str = tourneyData.name;
				var strNum = str.replace(/\D/g, "");
				 
				tourneyName.text(strNum);

		
				
			numOnce += 1;
			
		}
		}
	}
})

async function upload(data) {
	// try {
	const response = await fetch('/bundles/tct-graphics-v2/graphics/H2HScript/H2H_input.json', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		  }
		});
	  const result = await response.json();
	  console.log("Success:", result);
	// } catch (error) {
	//   console.error("Error:", error);
	// }
  }

  async function fetchJson() {
	const response = await fetch("/bundles/tct-graphics-v2/graphics/H2HScript/H2H_input.json");
	const h2hjson = await response.json();
	console.log(h2hjson);
  }
