const templates = [
	{
		title: "PIC-NIC",
		tale: `I remember that time when I @verb@ed a person.
It was a @adjective@ day and I was @verb:participle@ with @propernoun@. 
We had decided to have a picnic and so we brought everything we needed: <a> @adjective@ tablecloth, plates, cutlery and glasses of @noun@;
and to eat pizzas, <a> @noun@, some @noun@ and <a> @noun@.
They @verb@ed on the ground and started @verb@ing @adverb@.
We were in <a> @adjective@ grove and nobody was there.
We @verb:past@ a lot, and we were eating the last pizza.
They had already eaten @number@ slices, so the last one was mine.
@propernoun@ pointed to me and exclaimed: "Look, <a> @noun@!" And I, @adjective@, turned around @adverb@, but there was nothing.
When I turned back, I saw him eating my last slice of pizza!
I @verb@ed the first object at hand, which was <a> @noun@ and I stuck it in the @noun@.
They @verb@ed and fell to the @adjective@ ground.
@adverb@, I dug a hole and threw my friend's @adjective@ body into it and went off pretending nothing happened.
NO ONE CAN TOUCH MY PIZZA!`
	}
];

const words = {
	nouns: ["aeon"]
};

// |NOUNS
// aeon
// air freshener
// aorta
// astronaut
// banana
// barley
// bean
// beef stroganoff
// belly button
// biscuit
// bucket
// bullfight
// cataract
// carriage
// chair
// chestnut
// capitan chesnut
// chimney
// cholesterol
// church
// cob
// colonel
// constitution
// dishwasher
// diver
// enema
// epidemic
// epiglottis
// erectile disfunction
// eyebrow
// fence
// fingertip
// fleet
// flock
// glue
// granduncle
// grass trimmer
// hang glider
// herbicide
// hole
// hovel
// ibex
// impoverished uranium
// jackal
// jet
// lava
// liver cirrhosis
// lycanthrope
// mantis
// mess
// microwave oven
// moped
// mouthwash
// nasal septum
// obsidian
// octopus
// ointment
// orography
// pagoda
// pancreas
// perineum
// quiver
// rasp
// ravioli
// rectum
// rock juice
// sarcophagus
// sardine
// sedan chair
// semester
// sergeant
// sheep
// shoe maker
// skewer
// slob
// smegma
// sock
// sorter
// spider web
// statue
// stonks
// syringe
// tattoo artist
// thermostat
// tire
// tower
// train
// tulip
// unicycle
// walrus
// war
// week
// |PROPERNOUNS
// Ben Dover
// Billy Bonka
// Bob
// Frollo
// George
// Jafar
// Jane
// Jim
// Luigi
// Onofrius
// Prosdocimus
// Rick
// Swjankx
// xXPussyEater96Xx
// Zelda
// |ADJECTIVES 
// arboreal
// baroque
// bent
// biblic
// blistering
// buttery
// colossal
// cool
// corrosive
// countless
// deformed
// disruptive
// diuretic
// erotic
// expert
// explosive
// filthy
// floating
// hairless
// heretic
// horizontal
// hoarse
// idiot
// ignoble
// illustrious
// legal
// liquid
// luminescent
// magenta
// mossy
// multicolour
// naval
// numb
// nutty
// open
// out of tune
// pale
// paleolithic
// parochial
// persian
// phosphorescent
// promiscuous
// putrefied
// questionable
// restless
// rotten
// sagacious
// salty
// secular
// slippery
// smelly
// spicy
// sporty
// sticky
// sweaty
// toxic
// unable
// unconceivable
// unrestrainable
// viscous
// vitaminic
// volumetric
// voluminous
// weak
// wet
// wooden
// |VERBS
// attribute
// abuse
// catch
// climb
// cornify
// cremate
// crucify
// beam
// beat
// believe
// besmirch
// blame
// burn
// denigrate
// denounce
// dip
// disclose
// eat
// extirpate
// falil
// finger
// grease
// illuminate
// impregnate
// insult
// kill
// lick
// paint
// pee
// peel
// pierce
// poop
// prefer
// rap
// riddle
// rise
// roll
// row
// sand
// scatter
// screw
// season
// shit
// skim
// slaughter
// sleep
// sneeze
// spread
// strew
// strum
// stumble
// suicide
// tame
// temporize
// toy
// transplant
// vomit
// wash
// weld
// yawn
// |ADVERBS
// ardently
// baldly
// blindly
// busily
// cordially
// deliciously
// exaggeratedly
// freely
// frequently
// furiously
// harshly
// humidly
// hyperbolically
// incoherently
// intelligently
// interculturally
// mentally
// minutely
// passionately
// patiently
// powerfully
// radioactively
// savagely
// securely
// silently
// sincerely
// slowly
// slugghishly
// softly
// solidly
// tediously
// virtuously
// unequivocally
// warmly
// weakly
// |TEMPLATES
// 
// $
// LETTER FROM AFAR
// Dear @propernoun@,
// I miss you so much and I would like to be with you now. Here it is truly @adjective@.
// @number@ @noun@s have passed since the last time we @verb@ed.
// Here the days go by @adverb@ and if it weren't for my @adjective@ job I wouldn't be here. The weather here is always @adjective@ and people behave @adverb@.
// Yesterday, for example, a person @verb@ed me and yelled at me: "@verb@, @noun@!", Even if I hadn't done anything.
// My work here is quite @adjective@, a week ago I @verb@ed <a> @noun@ of @noun@ and they complimented me.
// I met the only nice person here, his name is @propernoun@ and he is <a> @adjective@ boy.
// They told me that I can @verb@ again in @number@ days, I can't wait! I miss my house a lot and I will be finally able to @verb@ it.
// Your @adjective@ @propernoun@
// $
// COMPETITION
// I am so @adjective@, I can't wait to start.
// I am <a> @noun@! I have @verb@ed for so much time. The leading competitor is @propernoun@, <a> @adjective@ man with @number@ @noun@s in place of the @noun@ and he is at @number@ points.
// Suddenly I hear my name called from the @noun@. It's my turn to @verb@. I @verb@ the @noun@. They give me @noun@s to throw. I throw them and I realize too late that the wind makes @verb@ the arrow to the target. I throw the remaining ones, but I don't @verb@ @noun@s.
// Finally, after the count of the @noun@s, I finished @number@th. Not bad, better than @propernoun@. With a @noun@ he @verb@ed @adverb@ a judge. At the next tournament I will @verb@!
// $
// VIRTUAL TRAINING
// Welcome @propernoun@ to the Legend of @noun@ tutorial. In this @adjective@ game, your goal will be to @verb@ the @adjective@ princes, in the @noun@ of the @noun@'s tundra and to @verb@ all the enemies that will appear before you, using your @adjective@ skills.
// From now on I will be your thorn in the side, you will not be able to @verb@ without me telling you how. You won't be able to @verb@ without feeling my breath on your neck.
// I @adverb@ see that you have chosen the @noun@ class. This will give you the opportunity to perform the following moves: "@noun@ of the @adjective@ @noun@", the "@noun@'s @noun@", and "@adjective@ @noun@".
// You will also have a natural predisposition in handling @noun@s.
// In the @noun@ trade and wherever you are, you will always know which direction the closest @noun@ is.
// The challenge will not be easy. @number@ pitfalls are hiding around every corner, and many have tried before you, but no one has ever managed to complete the feat. But thanks to your @adjective@ knowledge, you will be able to triumph @adverb@.
// Good luck, @adjective@!
// Remember that your number of lives is @adjective@.
// Try not to @verb@, and to return @adjective@.
// $
// GET OUT OF MY MEADOW!
// It was <a> @adjective@ and @adjective@ winter day, the sun @verb@ed on the @noun@s and @propernoun@ @verb@ed @adverb@.
// At one point he heard the sounds of children playing with @noun@s in his garden. He had certainly not spent @number@ weeks fighting @adverb@, to then be invaded by some kids.
// It was so @adjective@ that he decided to call the police. <a> @adjective@ voice replied: "Police station, how can I help you?"
// "Some thugs have @verb@ed my garden"
// "Mr. Giovanni, you cannot call us every time children play in your garden, goodbye"
// So, with his brain clouded by the fumes of the @noun@s, he took his @noun@, and went out to seek justice.
// He still remembered his training, using @noun@ to cover himself, and trying not to be seen by enemies. He sent his @noun@ to @verb@ the neighborhood, and found that the children were playing near the vegetable garden.
// He remembered his youth when he @verb@ed @noun@s for fun.
// It was time to put an end to it, he took aim, and @verb@ed a child @adverb@ in the @noun@. While the others @verb@ed @adverb@, he lit a @noun@ cigar, and returned @adverb@ to play.
// $
// THE MARRIAGE
// Here I am. How many @adjective@ choices have led me to this moment.
// My witness @propernoun@ was at my side, visibly @adjective@. He is convinced that I shouldn't marry @propernoun@, he thinks she's <a> @noun@ since he first met her.
// Then suddenly the notes of the @adjective@ wedding march leave, and everyone gets to their feet, and she is there, @adjective@ as ever, followed by two @noun@s, who hold her the ends of her @noun@.
// "Now, or never again," my friend whispered to me. He was almost beginning to convince me. Was I making a choice that I would soon regret?
// It seemed like <a> @noun@ had passed, and the bride joined us at the @noun@. Don @propernoun@ took an @noun@ and began the ritual that would bind me forever to her.
// I looked at my father. That @noun@ was only there for the aperitif. I was already seeing him @verb@ing the wedding cake. My mother kept @verb@ing, she was consuming more handkerchiefs than <a> @noun@.
// It was almost a miracle, the ceremony was interrupted by a loud noise. We all turned to the entrance. There, the @noun@ @verb@ed in church, upsetting everyone present.
// I was stunned to see the bride pulling <a> @noun@ from under her dress which she swung to make her way through the crowd.
// There was a general uproar, @noun@s were also brought in. Those present were now @verb@ing in panic.
// Calm, I hid under the @noun@. The priest drew <a> @noun@ from under the cassock, and @verb@ed the damsel.
// I was @adjective@, but relieved. He was evidently an undercover @noun@. And I was going to marry <a> @noun@.
// What a @adjective@ day.
// $
// BBQ WITH FRIENDS
// You cannot imagine my @noun@ when I discovered that I had finally obtained my @verb@ing patent. So much so that I decided to celebrate with <a> @adjective@ barbecue.
// For the occasion, therefore, I invited my @adjective@ friends to my house. Everything was ready: the meat was marinating @adverb@ in the @noun@, while the fridge was overflowing with @noun@ cans.
// As @noun@s arrived, the @noun@ also filled up the dishes, and the environment warmed up @adverb@.
// @propernoun@ and I, to fuel the fire, threw @noun@s in the flames, with nothing short of @adjective@ results.
// In short, we were all a bit busy with something. My mother insisted on @verb@ing the sauces. To such kindness I certainly could not refuse.
// @propernoun@ instead wanted to bring his specialty at all costs: @noun@s of @noun@ with @noun@.
// The @adjective@ girls, on the other hand, were grappling with the most @adjective@ outlines I had ever seen. From what I understood they were preparing a salad of @noun@ and @noun@ and they had also started to peel @noun@s to be grilled. While the embers @verb@ed @adverb@ I could dedicate myself to studying the @noun@: I could not wait to taste it.
// In short, it was a very @adjective@ afternoon, we ate like @adjective@ @noun@s.