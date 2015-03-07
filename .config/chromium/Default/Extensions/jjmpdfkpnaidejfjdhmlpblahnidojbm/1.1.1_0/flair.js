// ==UserScript==
// @name				rdiablo-browser-extension
// @namespace		reddit_diablo
// @description	Adds tooltips, linkifies battletags, and makes other small improvements to /r/Diablo.
// @include			http://*.reddit.com/r/Diablo
// @include			http://*.reddit.com/r/Diablo/*
// @include			https://*.reddit.com/r/Diablo
// @include			https://*.reddit.com/r/Diablo/*
// ==/UserScript==

(function(){
	"use strict";

	var i;

	var o = document.createElement("script");
	o.type = "text/javascript";
	o.src = "https://us.battle.net/d3/static/js/tooltips.js";
	document.getElementsByTagName("head")[0].appendChild(o);

	var skills = {"bash":"barbarian/active/bash","hammer of the ancients":"barbarian/active/hammer-of-the-ancients","cleave":"barbarian/active/cleave","ground stomp":"barbarian/active/ground-stomp","rend":"barbarian/active/rend","leap":"barbarian/active/leap","ancient spear":"barbarian/active/ancient-spear","frenzy":"barbarian/active/frenzy","seismic slam":"barbarian/active/seismic-slam","revenge":"barbarian/active/revenge","weapon throw":"barbarian/active/weapon-throw","sprint":"barbarian/active/sprint","threatening shout":"barbarian/active/threatening-shout","earthquake":"barbarian/active/earthquake","whirlwind":"barbarian/active/whirlwind","furious charge":"barbarian/active/furious-charge","battle rage":"barbarian/active/battle-rage","ignore pain":"barbarian/active/ignore-pain","call of the ancients":"barbarian/active/call-of-the-ancients","overpower":"barbarian/active/overpower","war cry":"barbarian/active/war-cry","wrath of the berserker":"barbarian/active/wrath-of-the-berserker","pound of flesh":"barbarian/passive/pound-of-flesh","ruthless":"barbarian/passive/ruthless","nerves of steel":"barbarian/passive/nerves-of-steel","weapons master":"barbarian/passive/weapons-master","berserker rage":"barbarian/passive/berserker-rage","inspiring presence":"barbarian/passive/inspiring-presence","bloodthirst":"barbarian/passive/bloodthirst","animosity":"barbarian/passive/animosity","superstition":"barbarian/passive/superstition","tough as nails":"barbarian/passive/tough-as-nails","no escape":"barbarian/passive/no-escape","relentless":"barbarian/passive/relentless","brawler":"barbarian/passive/brawler","juggernaut":"barbarian/passive/juggernaut","unforgiving":"barbarian/passive/unforgiving","boon of bul-kathos":"barbarian/passive/boon-of-bul-kathos","magic missile":"wizard/active/magic-missile","ray of frost":"wizard/active/ray-of-frost","shock pulse":"wizard/active/shock-pulse","frost nova":"wizard/active/frost-nova","arcane orb":"wizard/active/arcane-orb","diamond skin":"wizard/active/diamond-skin","wave of force":"wizard/active/wave-of-force","spectral blade":"wizard/active/spectral-blade","arcane torrent":"wizard/active/arcane-torrent","energy twister":"wizard/active/energy-twister","ice armor":"wizard/active/ice-armor","electrocute":"wizard/active/electrocute","slow time":"wizard/active/slow-time","storm armor":"wizard/active/storm-armor","explosive blast":"wizard/active/explosive-blast","magic weapon":"wizard/active/magic-weapon","disintegrate":"wizard/active/disintegrate","hydra":"wizard/active/hydra","familiar":"wizard/active/familiar","teleport":"wizard/active/teleport","meteor":"wizard/active/meteor","mirror image":"wizard/active/mirror-image","blizzard":"wizard/active/blizzard","energy armor":"wizard/active/energy-armor","archon":"wizard/active/archon","blur":"wizard/passive/blur","power hungry":"wizard/passive/power-hungry","evocation":"wizard/passive/evocation","glass cannon":"wizard/passive/glass-cannon","prodigy":"wizard/passive/prodigy","astral presence":"wizard/passive/astral-presence","illusionist":"wizard/passive/illusionist","cold blooded":"wizard/passive/cold-blooded","conflagration":"wizard/passive/conflagration","paralysis":"wizard/passive/paralysis","galvanizing ward":"wizard/passive/galvanizing-ward","temporal flux":"wizard/passive/temporal-flux","critical mass":"wizard/passive/critical-mass","arcane dynamo":"wizard/passive/arcane-dynamo","unstable anomaly":"wizard/passive/unstable-anomaly","poison dart":"witch-doctor/active/poison-dart","grasp of the dead":"witch-doctor/active/grasp-of-the-dead","corpse spiders":"witch-doctor/active/corpse-spiders","summon zombie dogs":"witch-doctor/active/summon-zombie-dogs","firebats":"witch-doctor/active/firebats","horrify":"witch-doctor/active/horrify","soul harvest":"witch-doctor/active/soul-harvest","plague of toads":"witch-doctor/active/plague-of-toads","haunt":"witch-doctor/active/haunt","sacrifice":"witch-doctor/active/sacrifice","zombie charger":"witch-doctor/active/zombie-charger","spirit walk":"witch-doctor/active/spirit-walk","spirit barrage":"witch-doctor/active/spirit-barrage","gargantuan":"witch-doctor/active/gargantuan","firebomb":"witch-doctor/active/firebomb","locust swarm":"witch-doctor/active/locust-swarm","acid cloud":"witch-doctor/active/acid-cloud","hex":"witch-doctor/active/hex","mass confusion":"witch-doctor/active/mass-confusion","big bad voodoo":"witch-doctor/active/big-bad-voodoo","wall of zombies":"witch-doctor/active/wall-of-zombies","fetish army":"witch-doctor/active/fetish-army","circle of life":"witch-doctor/passive/circle-of-life","jungle fortitude":"witch-doctor/passive/jungle-fortitude","spiritual attunement":"witch-doctor/passive/spiritual-attunement","gruesome feast":"witch-doctor/passive/gruesome-feast","bad medicine":"witch-doctor/passive/bad-medicine","blood ritual":"witch-doctor/passive/blood-ritual","zombie handler":"witch-doctor/passive/zombie-handler","pierce the veil":"witch-doctor/passive/pierce-the-veil","fetish sycophants":"witch-doctor/passive/fetish-sycophants","spirit vessel":"witch-doctor/passive/spirit-vessel","rush of essence":"witch-doctor/passive/rush-of-essence","vision quest":"witch-doctor/passive/vision-quest","fierce loyalty":"witch-doctor/passive/fierce-loyalty","grave injustice":"witch-doctor/passive/grave-injustice","tribal rites":"witch-doctor/passive/tribal-rites","fists of thunder":"monk/active/fists-of-thunder","lashing tail kick":"monk/active/lashing-tail-kick","deadly reach":"monk/active/deadly-reach","blinding flash":"monk/active/blinding-flash","tempest rush":"monk/active/tempest-rush","breath of heaven":"monk/active/breath-of-heaven","dashing strike":"monk/active/dashing-strike","crippling wave":"monk/active/crippling-wave","wave of light":"monk/active/wave-of-light","exploding palm":"monk/active/exploding-palm","cyclone strike":"monk/active/cyclone-strike","way of the hundred fists":"monk/active/way-of-the-hundred-fists","serenity":"monk/active/serenity","seven-sided strike":"monk/active/seven-sided-strike","mantra of evasion":"monk/active/mantra-of-evasion","mantra of retribution":"monk/active/mantra-of-retribution","sweeping wind":"monk/active/sweeping-wind","inner sanctuary":"monk/active/inner-sanctuary","mystic ally":"monk/active/mystic-ally","mantra of healing":"monk/active/mantra-of-healing","mantra of conviction":"monk/active/mantra-of-conviction","fleet footed":"monk/passive/fleet-footed","resolve":"monk/passive/resolve","exalted soul":"monk/passive/exalted-soul","transcendence":"monk/passive/transcendence","chant of resonance":"monk/passive/chant-of-resonance","seize the initiative":"monk/passive/seize-the-initiative","the guardian's path":"monk/passive/the-guardian's-path","sixth sense":"monk/passive/sixth-sense","pacifism":"monk/passive/pacifism","beacon of ytar":"monk/passive/beacon-of-ytar","guiding light":"monk/passive/guiding-light","one with everything":"monk/passive/one-with-everything","combination strike":"monk/passive/combination-strike","near death experience":"monk/passive/near-death-experience","hungering arrow":"demon-hunter/active/hungering-arrow","impale":"demon-hunter/active/impale","entangling shot":"demon-hunter/active/entangling-shot","caltrops":"demon-hunter/active/caltrops","rapid fire":"demon-hunter/active/rapid-fire","smoke screen":"demon-hunter/active/smoke-screen","vault":"demon-hunter/active/vault","bola shot":"demon-hunter/active/bola-shot","chakram":"demon-hunter/active/chakram","preparation":"demon-hunter/active/preparation","evasive fire":"demon-hunter/active/evasive-fire","grenades":"demon-hunter/active/grenades","shadow power":"demon-hunter/active/shadow-power","companion":"demon-hunter/active/companion","fan of knives":"demon-hunter/active/fan-of-knives","spike trap":"demon-hunter/active/spike-trap","strafe":"demon-hunter/active/strafe","elemental arrow":"demon-hunter/active/elemental-arrow","marked for death":"demon-hunter/active/marked-for-death","multishot":"demon-hunter/active/multishot","sentry":"demon-hunter/active/sentry","cluster arrow":"demon-hunter/active/cluster-arrow","rain of vengeance":"demon-hunter/active/rain-of-vengeance","tactical advantage":"demon-hunter/passive/tactical-advantage","thrill of the hunt":"demon-hunter/passive/thrill-of-the-hunt","vengeance":"demon-hunter/passive/vengeance","steady aim":"demon-hunter/passive/steady-aim","cull the weak":"demon-hunter/passive/cull-the-weak","night stalker":"demon-hunter/passive/night-stalker","brooding":"demon-hunter/passive/brooding","hot pursuit":"demon-hunter/passive/hot-pursuit","archery":"demon-hunter/passive/archery","numbing traps":"demon-hunter/passive/numbing-traps","perfectionist":"demon-hunter/passive/perfectionist","custom engineering":"demon-hunter/passive/custom-engineering","grenadier":"demon-hunter/passive/grenadier","sharpshooter":"demon-hunter/passive/sharpshooter","ballistics":"demon-hunter/passive/ballistics"};

	var as = document.getElementsByTagName("a");
	var name;
	for (i = 0; i < as.length; i++) {
		if (as[i].href === "/item") {				// Change all /item links to valid battle.net links
			name = as[i].textContent.replace(' ', '-').toLowerCase();
			as[i].href = "https://us.battle.net/d3/en/item/" + name;
		} else if (as[i].href === "/skill") {	// Change all /skill links to valid battle.net links
			name = as[i].textContent.toLowerCase();
			if (skills[name]) {
				as[i].href = "https://us.battle.net/d3/en/class/" + skills[name];
			}
		}
	}

	var flairs = document.getElementsByClassName("flair");
	var r, a, profile_url;
	for (i = 0; i < flairs.length; i++) {
		if (flairs[i].textContent === "") { continue; }

		if (flairs[i].className.indexOf("americas") !== -1)		{ r = "us"; }
		else if (flairs[i].className.indexOf("europe") !== -1)	{ r = "eu"; }
		else if (flairs[i].className.indexOf("asia") !== -1)		{ r = "as"; }
		else																		{ continue; }

		profile_url = flairs[i].textContent.replace("#", "-");
		a = document.createElement("a");
		a.textContent = flairs[i].textContent;
		flairs[i].textContent = "";
		a.href = "https://" + r + ".battle.net/d3/en/profile/" + profile_url + "/";
		flairs[i].appendChild(a);
		flairs[i].appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.textContent = "(d3up)";
		a.href = "http://d3up.com/profile/" + profile_url;
		flairs[i].appendChild(a);
	}
}());
