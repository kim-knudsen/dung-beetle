import Fuse, { IFuseOptions } from 'fuse.js'
import { Wrestler } from '../types/wrestler-types.js'
import { getRandomElement } from '../utils/array-util.js'
import { assertIsDefined } from '../utils/assertions.js'

type ImmutableWrestler = Readonly<Wrestler>
type ImmutableWrestlers = ReadonlyArray<ImmutableWrestler>

const wrestlers: ImmutableWrestlers = [
    {
        id: 'Z2xy',
        name: 'David Mitchell',
        nickName: 'The Boy Wonder',
        catchPhrase: 'You Will Serve Hard Time',
        entranceMusic: 'Tutti-Frutti',
        finisherMove: 'Headbutt drop'
    },
    {
        id: '8dgy',
        name: 'Jason Martinez',
        nickName: 'The Blond Adonis',
        catchPhrase: "I'm the Boogey Man and I'm Comin to Getcha",
        entranceMusic: 'Great Balls of Fire',
        finisherMove: 'Forearm club'
    },
    {
        id: '59ry',
        name: 'Mark Lee',
        nickName: 'Mr. Technical',
        catchPhrase: 'Can You Dig It Sucka',
        entranceMusic: 'Be My Baby',
        finisherMove: 'Arm twist ropewalk chop'
    },
    {
        id: '5Xqy',
        name: 'Gary Williams',
        nickName: 'The Man from The Dark Side',
        catchPhrase: 'The Best There Is the Best There Was and the Best There Ever Will Be',
        entranceMusic: 'Yesterday',
        finisherMove: 'Throat thrust'
    },
    {
        id: '81ly',
        name: 'Paul Garcia',
        nickName: 'Juan El Hermoso',
        catchPhrase: 'Bang Bang',
        entranceMusic: "That'll Be the Day",
        finisherMove: 'Double Sledge'
    },
    {
        id: 'ygb5',
        name: 'Joshua Perez',
        nickName: 'The Ticking Time Bomb',
        catchPhrase: 'Thats Cool/ Thats Not Cool',
        entranceMusic: 'Anarchy in the U.K.',
        finisherMove: 'Back fist'
    },
    {
        id: '8ko8',
        name: 'Jonathan Roberts',
        nickName: 'Mr. TV',
        catchPhrase: 'I Am the Best in the World at What I Do',
        entranceMusic: 'Bo Diddley',
        finisherMove: 'Backflip kick'
    },
    {
        id: 'Zo28',
        name: 'John Sanchez',
        nickName: 'The German Beef',
        catchPhrase: 'I Am the Ayatollah of Rocck N Rolla',
        entranceMusic: "What'd I Say",
        finisherMove: 'Forehand chop'
    },
    {
        id: 'ZbvZ',
        name: 'Michael Walker',
        nickName: 'The Princess of Darkness',
        catchPhrase: 'Welcome to Raw Is Jericho',
        entranceMusic: 'The Message',
        finisherMove: 'Diving crossbody'
    },
    {
        id: '5J48',
        name: 'Larry Walker',
        nickName: 'The Sicilian Shooter',
        catchPhrase: 'This Is for All My Peeps',
        entranceMusic: 'A Change Is Gonna Come',
        finisherMove: 'Flying spinning heel kick'
    },
    {
        id: 'Z4A5',
        name: 'Christopher Parker',
        nickName: 'The Big Cat',
        catchPhrase: "Straight Edge Means I'm Drug Free, Alcohol Free and Better Than You",
        entranceMusic: "The Times They Are a-Changin'",
        finisherMove: 'Senton bomb'
    },
    {
        id: '5Lp5',
        name: 'Gary Hall',
        nickName: 'The Samoan Storm',
        catchPhrase: 'I Am the Best in the World',
        entranceMusic: 'Hound Dog',
        finisherMove: 'Mounted punches'
    },
    {
        id: 'Zn0y',
        name: 'George Perez',
        nickName: 'Soulman',
        catchPhrase: 'Sooner or Later Everyone Taps',
        entranceMusic: 'Ring of Fire',
        finisherMove: 'European uppercut'
    },
    {
        id: 'ZYV5',
        name: 'Kevin Martinez',
        nickName: 'B-Gizzle',
        catchPhrase: 'Its Me Its Me Its DDP',
        entranceMusic: 'Johnny B. Goode',
        finisherMove: 'Moonsault double foot stomp'
    },
    {
        id: '8wdZ',
        name: 'Anthony Lee',
        nickName: 'Hott Stuff',
        catchPhrase: 'Im Dolph Ziggler',
        entranceMusic: 'When Doves Cry',
        finisherMove: 'Double inverted DDT'
    },
    {
        id: 'yQN8',
        name: 'Edward Perez',
        nickName: "Madonna's Boyfriend",
        catchPhrase: 'Owww Have Mercy',
        entranceMusic: 'Fortunate Son',
        finisherMove: 'Powerbomb neckbreaker combination'
    },
    {
        id: '57Dy',
        name: 'John Evans',
        nickName: 'The Edge',
        catchPhrase: 'Suck It',
        entranceMusic: 'Superstition',
        finisherMove: 'Discus elbow smash'
    },
    {
        id: 'Ze1Z',
        name: 'Thomas Perez',
        nickName: 'IBM: Insane Bump Machine',
        catchPhrase: 'For the Benefit of Those with Flash Photography...',
        entranceMusic: 'Gimme Shelter',
        finisherMove: 'Double STO'
    },
    {
        id: 'ZPE5',
        name: 'Andrew Parker',
        nickName: 'Big Time',
        catchPhrase: 'Viva La Raza',
        entranceMusic: 'Redemption Song',
        finisherMove: 'Eye poke'
    },
    {
        id: '5lx5',
        name: 'Christopher Parker',
        nickName: 'The Profile',
        catchPhrase: 'If Youre Not Cheating Youre Not Trying',
        entranceMusic: 'Like a Rolling Stone',
        finisherMove: 'Bearhug hold top-rope legdrop combination'
    },
    {
        id: '8AVZ',
        name: 'Andrew Collins',
        nickName: 'Black Magic',
        catchPhrase: 'Get on Board the Ho Train',
        entranceMusic: "(I Can't Get No) Satisfaction",
        finisherMove: 'Shooting star elbow drop'
    },
    {
        id: 'yOWy',
        name: 'Jacob Stewart',
        nickName: 'Bamm-Bamm',
        catchPhrase: "Pimpin Ain't Easy",
        entranceMusic: 'You Really Got Me',
        finisherMove: 'Knee lift'
    },
    {
        id: '5ELZ',
        name: 'Jason Hernandez',
        nickName: 'Namida no Karisuma',
        catchPhrase: 'Whos Next',
        entranceMusic: 'Crying',
        finisherMove: 'Double facebuster'
    },
    {
        id: 'Z3kZ',
        name: 'Edward Adams',
        nickName: 'The Butcher',
        catchPhrase: 'You Will Never Forget the Name Golddust',
        entranceMusic: 'Layla',
        finisherMove: "Double fireman's carry"
    },
    {
        id: '5WjZ',
        name: 'Gary Roberts',
        nickName: 'The Pearl River Powerhouse',
        catchPhrase: 'Whatcha Gonna Do When Hulkamania Runs Wild on You',
        entranceMusic: 'Maybellene',
        finisherMove: 'Knee drop bulldog'
    },
    {
        id: 'ZMaZ',
        name: 'Jacob Williams',
        nickName: 'The Portuguese Man-Of-War',
        catchPhrase: 'Say Your Prayers and Eat Your Vitamins',
        entranceMusic: 'I Got You (I Feel Good)',
        finisherMove: 'Dragon whip'
    },
    {
        id: '8Km5',
        name: 'Edward Reed',
        nickName: 'El Rey Moro',
        catchPhrase: 'I Am a Wrestling God',
        entranceMusic: 'Long Tall Sally',
        finisherMove: 'Frog splash'
    },
    {
        id: '8vWZ',
        name: 'Steven Walker',
        nickName: 'The Masterpiece',
        catchPhrase: 'J E Double F J A Double R E Double T Thats Double J Jeff Jarrett',
        entranceMusic: 'All Along the Watchtower',
        finisherMove: 'Bearhug hold seated senton combination'
    },
    {
        id: 'Zz6Z',
        name: 'David Scott',
        nickName: 'The Louisville Lip',
        catchPhrase: 'The Pleasure Was All Yours',
        entranceMusic: 'God Only Knows',
        finisherMove: 'Jumping high kick'
    },
    {
        id: '8DR5',
        name: 'Joshua Morris',
        nickName: 'The Guiding Light',
        catchPhrase: 'Hey There Tough Guy',
        entranceMusic: 'I Heard It Through the Grapevine',
        finisherMove: 'Dropkick'
    },
    {
        id: 'yrO8',
        name: 'Stephen Miller',
        nickName: 'The Man-Beast',
        catchPhrase: 'USA USA Hooooo!',
        entranceMusic: 'Respect',
        finisherMove: 'Big splash'
    },
    {
        id: 'ymqy',
        name: 'Mark Johnson',
        nickName: 'The Rowdy Scot',
        catchPhrase: 'Stompin a Mud Hole and Walkin It Dry',
        entranceMusic: 'Billie Jean',
        finisherMove: 'Stinger splash'
    },
    {
        id: 'y0o5',
        name: 'Gary Lopez',
        nickName: 'The Flatliner',
        catchPhrase: 'This Is One Hell of a Slobberknocker',
        entranceMusic: 'Heroes',
        finisherMove: 'Enzuigiri'
    },
    {
        id: 'Zqgy',
        name: 'Joseph King',
        nickName: 'Custom Chucky P',
        catchPhrase: 'The Champ Is Here',
        entranceMusic: 'Crazy',
        finisherMove: '630° senton'
    },
    {
        id: 'yjRy',
        name: 'Kenneth Campbell',
        nickName: 'The Caribbean Legend',
        catchPhrase: 'Hustle Loyalty Respect',
        entranceMusic: 'She Loves You',
        finisherMove: 'Double chokeslam'
    },
    {
        id: '5pL5',
        name: 'Steven Roberts',
        nickName: 'The Dumpster',
        catchPhrase: 'I Am the Shaman of Sexy',
        entranceMusic: 'A Whiter Shade of Pale',
        finisherMove: 'Assisted senton'
    },
    {
        id: 'ZVnZ',
        name: 'Larry Phillips',
        nickName: 'The Worm',
        catchPhrase: "Its True Its Damn True/It's Real It's Damn Real",
        entranceMusic: "You've Lost That Lovin' Feelin'",
        finisherMove: 'Elevated jawbreaker'
    },
    {
        id: 'Zawy',
        name: 'Jonathan Adams',
        nickName: 'Mr. 200%',
        catchPhrase: 'I Dont Suck, You Suck',
        entranceMusic: 'One',
        finisherMove: 'Vertical press'
    },
    {
        id: 'Zxq5',
        name: 'Paul Nelson',
        nickName: 'Road Dogg',
        catchPhrase: 'What a Rush',
        entranceMusic: "Whole Lotta Shakin' Going On",
        finisherMove: 'Overhead chop'
    },
    {
        id: '8RMy',
        name: 'Daniel Baker',
        nickName: 'The Calypso Kid',
        catchPhrase: 'Simply Flawless',
        entranceMusic: 'Crazy',
        finisherMove: 'Double missile dropkick'
    },
    {
        id: 'Z6bZ',
        name: 'Gary Johnson',
        nickName: 'Hard Knox',
        catchPhrase: 'Here Comes the Pain',
        entranceMusic: 'Blueberry Hill',
        finisherMove: 'Chop block'
    },
    {
        id: '5NJ5',
        name: 'Mark Lopez',
        nickName: 'The Ideal Reflection',
        catchPhrase: 'Have a Nice Day',
        entranceMusic: 'California Girls',
        finisherMove: 'Stack-superplex'
    },
    {
        id: '8Gzy',
        name: 'Mark Scott',
        nickName: 'The Black and White Express',
        catchPhrase: 'Welcome to the Hall of Pain',
        entranceMusic: 'Suspicious Minds',
        finisherMove: 'Stomp'
    },
    {
        id: '8BX5',
        name: 'Eric Brown',
        nickName: 'The Lethal One',
        catchPhrase: 'I Will Not Die',
        entranceMusic: 'I Want to Hold Your Hand',
        finisherMove: 'Lariat running chop block combination'
    },
    {
        id: 'Z2Gx',
        name: 'Christopher King',
        nickName: 'The Bird Man',
        catchPhrase: 'I Am the Most Genetically Jacked Athletically Stacked Giant Walking Today',
        entranceMusic: 'Smells Like Teen Spirit',
        finisherMove: 'Axe handle elbow drop'
    },
    {
        id: '8dgg',
        name: 'Eric Wilson',
        nickName: 'Hinotama Kozou',
        catchPhrase: 'I Am the DNA of TNA',
        entranceMusic: "Let's Stay Together",
        finisherMove: 'Trapping headbutts'
    },
    {
        id: '594r',
        name: 'Joseph Martin',
        nickName: 'The Barbaric Berzerker',
        catchPhrase: 'Can I Have Your Attention Please',
        entranceMusic: "For What It's Worth",
        finisherMove: 'Double foot stomp'
    },
    {
        id: '5XGq',
        name: 'Kenneth Hall',
        nickName: 'The Rogue Horseman',
        catchPhrase: 'Im Awesome',
        entranceMusic: 'My Girl',
        finisherMove: 'German U-Turn'
    },
    {
        id: '81xl',
        name: 'Kevin Martinez',
        nickName: 'Gusano',
        catchPhrase: 'Kennedy...kennedy/ Anderson...anderson',
        entranceMusic: 'Help!',
        finisherMove: 'Dragonrana'
    },
    {
        id: 'yg2b',
        name: 'Anthony Nelson',
        nickName: 'The Hip Hop Hippo',
        catchPhrase: 'Simply Perfect',
        entranceMusic: 'Thunder Road',
        finisherMove: 'Forearm smash'
    },
    {
        id: '8kKo',
        name: 'Joshua Rodriguez',
        nickName: 'The Anarchist',
        catchPhrase: 'Big Things Poppin Little Things Stoppin',
        entranceMusic: 'Stairway to Heaven',
        finisherMove: 'Diving back elbow drop'
    },
    {
        id: 'Zov2',
        name: 'Christopher Walker',
        nickName: 'The Real Deal',
        catchPhrase: "When You're NWO You're NWO for Life",
        entranceMusic: 'London Calling',
        finisherMove: 'Aided leapfrog body guillotine'
    },
    {
        id: 'Zbjv',
        name: 'Jason Wilson',
        nickName: 'Supermouth',
        catchPhrase: 'Oh You Didnt Know, Your Ass Better Call Somebody',
        entranceMusic: 'My Generation',
        finisherMove: 'Double drop toe-hold'
    },
    {
        id: '5Jv4',
        name: 'Mark Edwards',
        nickName: 'Mad Dog',
        catchPhrase: 'Youre Either Nexus or Against Us',
        entranceMusic: 'In My Life',
        finisherMove: 'Diving leg drop bulldog'
    },
    {
        id: 'Z4xA',
        name: 'Charles Brown',
        nickName: 'Bulldozer',
        catchPhrase: 'I Am Not a Nugget',
        entranceMusic: "Papa's Got a Brand New Bag",
        finisherMove: 'Sidewalk slam top-rope legdrop combination'
    },
    {
        id: '5L0p',
        name: 'William Turner',
        nickName: 'Primetime',
        catchPhrase: 'Whats Up/shut Up',
        entranceMusic: 'When A Man Loves A Woman',
        finisherMove: 'Sliding forearm smash'
    },
    {
        id: 'ZnD0',
        name: 'Kevin Perez',
        nickName: 'The Texas Cowgirl',
        catchPhrase: 'I Am the Legend Killer',
        entranceMusic: 'Waterloo Sunset',
        finisherMove: 'Crane kick'
    },
    {
        id: 'ZYGV',
        name: 'Jeffrey King',
        nickName: 'The Giant-Killer',
        catchPhrase: 'Quote the Raven Nevermore',
        entranceMusic: 'In The Still Of The Nite',
        finisherMove: 'Pheonixrana'
    },
    {
        id: '8wkd',
        name: 'Kenneth Sanchez',
        nickName: "Smackdown's #1 Announcer",
        catchPhrase: 'Say Hello to the Bad Guy',
        entranceMusic: 'Tangled Up in Blue',
        finisherMove: 'Superkick-Plex'
    },
    {
        id: 'yQ3N',
        name: 'Scott Morris',
        nickName: 'Captain HUSTLE',
        catchPhrase: 'Wooooo!',
        entranceMusic: "I Still Haven't Found What I'm Looking For",
        finisherMove: 'Rebound clothesline'
    },
    {
        id: '57rD',
        name: 'Charles Campbell',
        nickName: 'Hard Rock',
        catchPhrase: 'To Be the Man You Gotta Beat the Man',
        entranceMusic: 'Purple Haze',
        finisherMove: 'Double cutter'
    },
    {
        id: 'Zej1',
        name: 'Brandon Hall',
        nickName: 'The Latina Super Woman',
        catchPhrase: 'Im a Kiss Stealing, Wheeling Dealing, Limousine Riding, Jet Flyng Son of a Gun',
        entranceMusic: 'Every Breath You Take',
        finisherMove: 'Molly-Go-Round'
    },
    {
        id: 'ZP0E',
        name: 'Charles Walker',
        nickName: 'The All-American Boy',
        catchPhrase: 'Space Mountain May Be the Oldest Ride in the Park, but It Has the Longest Line',
        entranceMusic: 'Strawberry Fields Forever',
        finisherMove: 'Rolling wheel kick'
    },
    {
        id: '5lbx',
        name: 'Thomas Evans',
        nickName: 'The Silver-Tongued Pugilist',
        catchPhrase: 'All the Women Want to Be with Me, and the Men Want to Be Like Me',
        entranceMusic: 'Summertime Blues',
        finisherMove: 'Cannonball'
    },
    {
        id: '8A1V',
        name: 'Justin Taylor',
        nickName: 'The Ultimate Temptation',
        catchPhrase: 'Know Your Role and Shut Your Mouth',
        entranceMusic: 'River Deep - Mountain High',
        finisherMove: 'Backbreaker hold diving elbow drop combination'
    },
    {
        id: 'yOlW',
        name: 'David Reed',
        nickName: 'SuperMex',
        catchPhrase: 'Im Gonna Lay the Smackdown on Your Candy Ass',
        entranceMusic: 'Bridge Over Troubled Water',
        finisherMove: 'Catching hip toss'
    },
    {
        id: '5EbL',
        name: 'Thomas Reed',
        nickName: 'Special K',
        catchPhrase: 'Can You Smell What the Rock Is Cookin',
        entranceMusic: 'Mystery Train',
        finisherMove: 'Calf kick'
    },
    {
        id: 'Z32k',
        name: 'Brian Roberts',
        nickName: 'Made in Poland',
        catchPhrase: 'Finally the Rock Has Come Back to (Whatever City He Is In)',
        entranceMusic: 'Louie Louie',
        finisherMove: 'Cross chop'
    },
    {
        id: '5W0j',
        name: 'Brian Scott',
        nickName: 'Hotrod',
        catchPhrase: 'It Doesnt Matter',
        entranceMusic: 'Walk On By',
        finisherMove: 'Avalanche frankensteiner'
    },
    {
        id: 'ZM0a',
        name: 'Christopher Baker',
        nickName: 'The Original Gangsta',
        catchPhrase: 'Just Bring It',
        entranceMusic: 'Let It Be',
        finisherMove: 'Moonsault leg drop'
    },
    {
        id: '8Kqm',
        name: 'Kevin Davis',
        nickName: "The Ragin' Bull",
        catchPhrase: 'Everybody Pays the Piper',
        entranceMusic: 'Heartbreak Hotel',
        finisherMove: 'Sky lift slam'
    },
    {
        id: '8vDW',
        name: 'Jacob Anderson',
        nickName: 'Loverboy',
        catchPhrase: 'Just When They Think They Know the Answers I Change the Questions',
        entranceMusic: 'Hey Jude',
        finisherMove: 'Elevated splash'
    },
    {
        id: 'Zz76',
        name: 'Justin Wilson',
        nickName: 'The New Era Icon',
        catchPhrase: 'Damn!',
        entranceMusic: 'Imagine',
        finisherMove: 'Spanish fly'
    },
    {
        id: '8D1R',
        name: 'David Lewis',
        nickName: "The New F'N Show",
        catchPhrase: "Im the Whole F'n Show",
        entranceMusic: 'Good Vibrations',
        finisherMove: 'Three-point stance clothesline'
    },
    {
        id: 'yrKO',
        name: 'Matthew Williams',
        nickName: 'The Path of Rage',
        catchPhrase: 'Woo Woo Woo You Know It',
        entranceMusic: 'Norwegian Wood (This Bird Has Flown)',
        finisherMove: 'Aided powerbomb'
    },
    {
        id: 'ymaq',
        name: 'Joseph Hall',
        nickName: 'The British Babe',
        catchPhrase: 'This Is for All the Ladies Who Wanna Be Me and All the Men Who Come to See Me',
        entranceMusic: 'A Day in the Life',
        finisherMove: 'Overhead kick'
    },
    {
        id: 'y0Vo',
        name: 'Daniel Walker',
        nickName: 'The Pascagoula Plowboy',
        catchPhrase: 'Big Poppa Pumps Your Hook-Up, Holla If You Hear Me',
        entranceMusic: 'Sympathy for the Devil',
        finisherMove: 'Tilt-a-whirl crossbody'
    },
    {
        id: 'Zqxg',
        name: 'Kevin Turner',
        nickName: 'No Class',
        catchPhrase: 'Thats an Order',
        entranceMusic: 'Dancing in the Street',
        finisherMove: 'Big boot'
    },
    {
        id: 'yjXR',
        name: 'Nicholas Young',
        nickName: 'The King of Chaos',
        catchPhrase: 'The Heart Break Kid Has Left the Building',
        entranceMusic: 'The Tracks Of My Tears',
        finisherMove: 'Mongolian chop'
    },
    {
        id: '5paL',
        name: 'Andrew King',
        nickName: 'Go Time',
        catchPhrase: 'Listen Fella!',
        entranceMusic: "Blowin' in the Wind",
        finisherMove: 'Forearm drop'
    },
    {
        id: 'ZV0n',
        name: 'Justin Williams',
        nickName: 'Johnny Texas',
        catchPhrase: 'Its Showtime',
        entranceMusic: "What's Going On",
        finisherMove: 'Facewash'
    },
    {
        id: 'ZaVw',
        name: 'Timothy Wright',
        nickName: 'The Soviet Terror',
        catchPhrase: 'If You Wanna See Me Whoop His Ass Give Me a Hell Yeah',
        entranceMusic: "(Sittin' On) The Dock of the Bay",
        finisherMove: 'Standing moonsault'
    },
    {
        id: 'Zx0q',
        name: 'Kevin Garcia',
        nickName: 'DA MAN',
        catchPhrase: 'Austin 3:16 Says I Just Whooped Your Ass',
        entranceMusic: 'Georgia On My Mind',
        finisherMove: 'Pendulum'
    },
    {
        id: '8RrM',
        name: 'Jacob Jackson',
        nickName: 'The Big Bad Booty Daddy',
        catchPhrase: 'What?',
        entranceMusic: 'Roll Over Beethoven',
        finisherMove: 'Leg drop'
    },
    {
        id: 'Z6xb',
        name: 'Joseph Young',
        nickName: 'Big Thunder',
        catchPhrase: 'Beat Me If You Can... Survive If I Let You!',
        entranceMusic: 'Blue Suede Shoes',
        finisherMove: 'Lariat takedown'
    },
    {
        id: '5NYJ',
        name: 'Richard Green',
        nickName: 'Mr. Torture',
        catchPhrase: 'D-Von, Get the Tables!',
        entranceMusic: "California Dreamin'",
        finisherMove: 'Slingshot catapult top rope bulldog combination'
    },
    {
        id: '8Gkz',
        name: 'Andrew Stewart',
        nickName: 'Perfectshawn',
        catchPhrase: 'Everyones Got a Price',
        entranceMusic: 'Good Golly',
        finisherMove: 'Corkscrew elbow drop'
    },
    {
        id: '8B9X',
        name: 'Scott Gonzalez',
        nickName: 'The Prize',
        catchPhrase: 'Holla Playa',
        entranceMusic: 'Love And Happiness',
        finisherMove: 'Back elbow'
    },
    {
        id: 'Z2Kx',
        name: 'Andrew Carter',
        nickName: 'The Reflection of Perfection',
        catchPhrase: 'Its Time to Play the Game',
        entranceMusic: 'Sunshine of Your Love',
        finisherMove: 'Slingshot catapult missile dropkick combination'
    },
    {
        id: '8d2g',
        name: 'Richard Sanchez',
        nickName: 'Number One',
        catchPhrase: 'Cause Im That Damn Good',
        entranceMusic: 'Born to Run',
        finisherMove: 'Leg drop splash combination'
    },
    {
        id: '59rr',
        name: 'Nicholas Gonzalez',
        nickName: 'The Japanese Buzzsaw',
        catchPhrase: 'Feel the Power',
        entranceMusic: 'I Walk the Line',
        finisherMove: 'Bearhug hold high kick combination'
    },
    {
        id: '5Xvq',
        name: 'William Parker',
        nickName: 'Pitbull',
        catchPhrase: 'Rest in Peace',
        entranceMusic: 'Whole Lotta Love',
        finisherMove: 'Short-arm clothesline'
    },
    {
        id: '81Ql',
        name: 'Eric Lopez',
        nickName: 'The Innovator of Offense',
        catchPhrase: 'Ill Make Ya Famous',
        entranceMusic: 'Jailhouse Rock',
        finisherMove: 'Senton'
    },
    {
        id: 'ygvb',
        name: 'Donald Young',
        nickName: 'The Technical Messiah',
        catchPhrase: 'Its Time, Its Vader Time',
        entranceMusic: 'Light My Fire',
        finisherMove: 'Backbreaker hold diving attack combination'
    },
    {
        id: '8k1o',
        name: 'Andrew Hall',
        nickName: 'The Straight Edge Warrior',
        catchPhrase: 'Hello Ladies',
        entranceMusic: 'People Get Ready',
        finisherMove: 'Diving double axe handle'
    },
    {
        id: 'Zox2',
        name: 'Scott Walker',
        nickName: 'The Human Suplex Machine',
        catchPhrase: 'Excuse Me',
        entranceMusic: 'No Woman, No Cry',
        finisherMove: 'Double enzuigiri'
    },
    {
        id: 'ZbXv',
        name: 'John Collins',
        nickName: 'The Sultan of Swing',
        catchPhrase: 'Youre Fired',
        entranceMusic: 'The Weight',
        finisherMove: 'Wheelbarrow hold top rope legdrop combination'
    },
    {
        id: '5JY4',
        name: 'Joseph Allen',
        nickName: 'Confederate Currency',
        catchPhrase: 'Kiss My Ass',
        entranceMusic: 'Hotel California',
        finisherMove: 'Backbreaker hold top-rope legdrop combination'
    },
    {
        id: 'Z4gA',
        name: 'George Rogers',
        nickName: 'The One Man Gang',
        catchPhrase: 'You Screwed Bret',
        entranceMusic: 'Blitzkrieg Bop',
        finisherMove: 'Wind-up punch'
    },
    {
        id: '5Lnp',
        name: 'Andrew Hernandez',
        nickName: 'The Clawmaster',
        catchPhrase: 'This Is Awesome',
        entranceMusic: 'Mr. Tambourine Man',
        finisherMove: 'Powerbomb missile dropkick combination'
    }
]

const fuseOptions: IFuseOptions<Wrestler> = {
    keys: ['name', 'nickName', 'finisherMove', 'entranceMusic', 'catchPhrase'],
    includeMatches: true,
    threshold: 0.35
}
const fuse = new Fuse(wrestlers, fuseOptions)

export const db = {
    random: () => getRandomElement(wrestlers),
    byId: (id: Wrestler['id']) => {
        const result = wrestlers.find(wrestler => wrestler.id === id)
        assertIsDefined(result, 'wrestler')

        return result
    },
    search: (query: string): ImmutableWrestlers => fuse.search(query).map(result => result.item)
}
