// GharbadTheWeak smells!
//test
/*************************************************
*** Check to see if jQuery is already included ***
*************************************************/
if (typeof jQuery == 'undefined')
{
	var script = document.createElement('script');
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
	var head = document.getElementByTagName('head')[0];
	head.appendChild(script);
}

/***************************************
*** Append Blizzard's tooltip script ***
***************************************/
$('body').append('<script type="text/javascript" src="http://us.battle.net/d3/static/js/tooltips.js"></script>');

/*******************************************************
*** Change all /item links to valid battle.net links ***
*******************************************************/
$('a[href="/item"]').each(function(){
	var name = $(this).text();
	name = name.replace(' ', '-').toLowerCase();
	$(this).attr('href', 'http://us.battle.net/d3/en/item/' + name);
});

/********************************************************
*** Change all /skill links to valid battle.net links ***
********************************************************/
var skills = {"berserker rage":"barbarian/passive/berserker-rage","rapid fire":"demon-hunter/active/rapid-fire","spectral blade":"wizard/active/spectral-blade","vermin":"witch-doctor/passive/vermin","near death experience":"monk/passive/near-death-experience","ancient spear":"barbarian/active/ancient-spear","unstable anomaly":"wizard/passive/unstable-anomaly","horrify":"witch-doctor/active/horrify","fan of knives":"demon-hunter/active/fan-of-knives","pound of flesh":"barbarian/passive/pound-of-flesh","spirit barrage":"witch-doctor/active/spirit-barrage","nerves of steel":"barbarian/passive/nerves-of-steel","grenadier":"demon-hunter/passive/grenadier","prodigy":"wizard/passive/prodigy","chakram":"demon-hunter/active/chakram","strafe":"demon-hunter/active/strafe","blinding flash":"monk/active/blinding-flash","corpse spiders":"witch-doctor/active/corpse-spiders","electrocute":"wizard/active/electrocute","evasive fire":"demon-hunter/active/evasive-fire","storm armor":"wizard/active/storm-armor","soul harvest":"witch-doctor/active/soul-harvest","familiar":"wizard/active/familiar","relentless":"barbarian/passive/relentless","furious charge":"barbarian/active/furious-charge","ice armor":"wizard/active/ice-armor","dashing strike":"monk/active/dashing-strike","cull the weak":"demon-hunter/passive/cull-the-weak","chant of resonance":"monk/passive/chant-of-resonance","plague of toads":"witch-doctor/active/plague-of-toads","resolve":"monk/passive/resolve","firebomb":"witch-doctor/active/firebomb","bola shot":"demon-hunter/active/bola-shot","elemental arrow":"demon-hunter/active/elemental-arrow","sharpshooter":"demon-hunter/passive/sharpshooter","pacifism":"monk/passive/pacifism","war cry":"barbarian/active/war-cry","slow time":"wizard/active/slow-time","perfectionist":"demon-hunter/passive/perfectionist","multishot":"demon-hunter/active/multishot","breath of heaven":"monk/active/breath-of-heaven","boon of bul-kathos":"barbarian/passive/boon-of-bul-kathos","whirlwind":"barbarian/active/whirlwind","energy twister":"wizard/active/energy-twister","shadow power":"demon-hunter/active/shadow-power","exalted soul":"monk/passive/exalted-soul","exploding palm":"monk/active/exploding-palm","magic weapon":"wizard/active/magic-weapon","entangling shot":"demon-hunter/active/entangling-shot","ballistics":"demon-hunter/passive/ballistics","crippling wave":"monk/active/crippling-wave","grenades":"demon-hunter/active/grenades","weapons master":"barbarian/passive/weapons-master","sprint":"barbarian/active/sprint","ground stomp":"barbarian/active/ground-stomp","mantra of retribution":"monk/active/mantra-of-retribution","weapon throw":"barbarian/active/weapon-throw","arcane torrent":"wizard/active/arcane-torrent","ruthless":"barbarian/passive/ruthless","one with everything":"monk/passive/one-with-everything","steady aim":"demon-hunter/passive/steady-aim","numbing traps":"demon-hunter/passive/numbing-traps","mantra of conviction":"monk/active/mantra-of-conviction","juggernaut":"barbarian/passive/juggernaut","blur":"wizard/passive/blur","zombie charger":"witch-doctor/active/zombie-charger","zombie handler":"witch-doctor/passive/zombie-handler","power hungry":"wizard/passive/power-hungry","spirit walk":"witch-doctor/active/spirit-walk","revenge":"barbarian/active/revenge","shock pulse":"wizard/active/shock-pulse","virtuoso":"wizard/passive/virtuoso","hot pursuit":"demon-hunter/passive/hot-pursuit","smoke screen":"demon-hunter/active/smoke-screen","acid cloud":"witch-doctor/active/acid-cloud","hammer of the ancients":"barbarian/active/hammer-of-the-ancients","temporal flux":"wizard/passive/temporal-flux","superstition":"barbarian/passive/superstition","earthquake":"barbarian/active/earthquake","fists of thunder":"monk/active/fists-of-thunder","cleave":"barbarian/active/cleave","fetish army":"witch-doctor/active/fetish-army","tough as nails":"barbarian/passive/tough-as-nails","paralysis":"wizard/passive/paralysis","wave of light":"monk/active/wave-of-light","mystic ally":"monk/active/mystic-ally","seize the initiative":"monk/passive/seize-the-initiative","serenity":"monk/active/serenity","spike trap":"demon-hunter/active/spike-trap","vault":"demon-hunter/active/vault","summon zombie dogs":"witch-doctor/active/summon-zombie-dogs","grasp of the dead":"witch-doctor/active/grasp-of-the-dead","circle of life":"witch-doctor/passive/circle-of-life","wrath of the berserker":"barbarian/active/wrath-of-the-berserker","conflagration":"wizard/passive/conflagration","blizzard":"wizard/active/blizzard","tempest rush":"monk/active/tempest-rush","explosive blast":"wizard/active/explosive-blast","evocation":"wizard/passive/evocation","transcendence":"monk/passive/transcendence","no escape":"barbarian/passive/no-escape","locust swarm":"witch-doctor/active/locust-swarm","arcane dynamo":"wizard/passive/arcane-dynamo","galvanizing ward":"wizard/passive/galvanizing-ward","archon":"wizard/active/archon","mass confusion":"witch-doctor/active/mass-confusion","rend":"barbarian/active/rend","grave injustice":"witch-doctor/passive/grave-injustice","big bad voodoo":"witch-doctor/active/big-bad-voodoo","vision quest":"witch-doctor/passive/vision-quest","astral presence":"wizard/passive/astral-presence","poison dart":"witch-doctor/active/poison-dart","disintegrate":"wizard/active/disintegrate","the guardians path":"monk/passive/the-guardians-path","hex":"witch-doctor/active/hex","sixth sense":"monk/passive/sixth-sense","overpower":"barbarian/active/overpower","hydra":"wizard/active/hydra","bloodthirst":"barbarian/passive/bloodthirst","bash":"barbarian/active/bash","brawler":"barbarian/passive/brawler","critical mass":"wizard/passive/critical-mass","hungering arrow":"demon-hunter/active/hungering-arrow","fierce loyalty":"witch-doctor/passive/fierce-loyalty","ignore pain":"barbarian/active/ignore-pain","fundamentals":"demon-hunter/passive/fundamentals","guiding light":"monk/passive/guiding-light","frost nova":"wizard/active/frost-nova","illusionist":"wizard/passive/illusionist","custom engineering":"demon-hunter/passive/custom-engineering","death trance":"witch-doctor/passive/death-trance","cluster arrow":"demon-hunter/active/cluster-arrow","fleet footed":"monk/passive/fleet-footed","threatening shout":"barbarian/active/threatening-shout","unforgiving":"barbarian/passive/unforgiving","tactical advantage":"demon-hunter/passive/tactical-advantage","pierce the veil":"witch-doctor/passive/pierce-the-veil","sweeping wind":"monk/active/sweeping-wind","sentry":"demon-hunter/active/sentry","bad medicine":"witch-doctor/passive/bad-medicine","preparation":"demon-hunter/active/preparation","call of the ancients":"barbarian/active/call-of-the-ancients","inner sanctuary":"monk/active/inner-sanctuary","impale":"demon-hunter/active/impale","way of the hundred fists":"monk/active/way-of-the-hundred-fists","ray of frost":"wizard/active/ray-of-frost","mantra of evasion":"monk/active/mantra-of-evasion","gruesome feast":"witch-doctor/passive/gruesome-feast","diamond skin":"wizard/active/diamond-skin","seven-sided strike":"monk/active/seven-sided-strike","spirit vessel":"witch-doctor/passive/spirit-vessel","haunt":"witch-doctor/active/haunt","wave of force":"wizard/active/wave-of-force","cyclone strike":"monk/active/cyclone-strike","caltrops":"demon-hunter/active/caltrops","night stalker":"demon-hunter/passive/night-stalker","rain of vengeance":"demon-hunter/active/rain-of-vengeance","energy armor":"wizard/active/energy-armor","jungle fortitude":"witch-doctor/passive/jungle-fortitude","gargantuan":"witch-doctor/active/gargantuan","teleport":"wizard/active/teleport","battle rage":"barbarian/active/battle-rage","mirror image":"wizard/active/mirror-image","combination strike":"monk/passive/combination-strike","thrill of the hunt":"demon-hunter/passive/thrill-of-the-hunt","lashing tail kick":"monk/active/lashing-tail-kick","wall of zombies":"witch-doctor/active/wall-of-zombies","black ice":"wizard/passive/black-ice","meteor":"wizard/active/meteor","marked for death":"demon-hunter/active/marked-for-death","rush of essence":"witch-doctor/passive/rush-of-essence","seismic slam":"barbarian/active/seismic-slam","inspiring presence":"barbarian/passive/inspiring-presence","glass cannon":"wizard/passive/glass-cannon","sacrifice":"witch-doctor/active/sacrifice","companion":"demon-hunter/active/companion","spiritual attunement":"witch-doctor/passive/spiritual-attunement","brooding":"demon-hunter/passive/brooding","vengeance":"demon-hunter/passive/vengeance","deadly reach":"monk/active/deadly-reach","arcane orb":"wizard/active/arcane-orb","tribal rites":"witch-doctor/passive/tribal-rites","animosity":"barbarian/passive/animosity","magic missile":"wizard/active/magic-missile","archery":"demon-hunter/passive/archery","blood ritual":"witch-doctor/passive/blood-ritual","leap attack":"barbarian/active/leap-attack","mantra of healing":"monk/active/mantra-of-healing","fetish sycophants":"witch-doctor/passive/fetish-sycophants","frenzy":"barbarian/active/frenzy","firebats":"witch-doctor/active/firebats"};
$('a[href="/skill"]').each(function(){
	var name = $(this).text().toLowerCase();
	name = name.replace(/'/g, "");
	if (skills[name])
		$(this).attr('href', 'http://us.battle.net/d3/en/class/' + skills[name]);
});

/******************************
*** Add the chat gem n shiz ***
******************************/
$('body').append('<div id="chat-gem"></div>');
$('body').append('<div id="chat-gem-info"></div>');
$('#chat-gem-info').hide();
$('#chat-gem').live("click", function(e){
	if ($(this).hasClass('clicked'))
	{
		$(this).removeClass('clicked');
		$('#chat-gem-info').html('Gem Deactivated');
	}
	else
	{
		$(this).addClass('clicked');
		$('#chat-gem-info').html('Gem Activated');
	}
	$('#chat-gem-info').stop().fadeTo(600, 1.0, function(){
		$(this).delay(500).fadeTo(900, 0.0);
	});
});

