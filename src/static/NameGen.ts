//These aren't accurate to Rec Room's actual Adjective and Noun list.
//For the cases of the server it works fine enough though.

//https://github.com/claudiodekker/word-generator/blob/master/src/Words/Adjective.php
const adjectives: string[] = [
    'Aged', 'Amber', 'Ancient', 'Autumn', 'Azure', 'Beaming', 'Billowing', 'Bitter',
    'Blazing', 'Bleak', 'Blended', 'Blue', 'Blushing', 'Bright', 'Brisk', 'Bronze',
    'Bubbling', 'Calm', 'Cautious', 'Celestial', 'Cerulean', 'Charming', 'Clear', 'Cloudy',
    'Cobalt', 'Cold', 'Cool', 'Cozy', 'Crimson', 'Crinkled', 'Crisp', 'Curved',
    'Damp', 'Dancing', 'Dawn', 'Dazzling', 'Deciduous', 'Delicate', 'Dewy', 'Distant',
    'Divine', 'Dotted', 'Dreamy', 'Drifting', 'Dry', 'Dusty', 'Eager', 'Earthen',
    'Earthy', 'Echoing', 'Elusive', 'Emerald', 'Empty', 'Enchanting', 'Endless', 'Ethereal',
    'Evening', 'Exquisite', 'Fading', 'Faint', 'Fair', 'Faithful', 'Falling', 'Familiar',
    'Feathery', 'Fierce', 'Flickering', 'Floral', 'Flowing', 'Fluffy', 'Fluttering', 'Fragrant',
    'Frosted', 'Frosty', 'Frozen', 'Gentle', 'Glassy', 'Glistening', 'Glowing', 'Golden',
    'Graceful', 'Grateful', 'Green', 'Gusty', 'Harmonious', 'Hazy', 'Heavenly', 'Humble',
    'Icy', 'Illuminated', 'Indigo', 'Infinite', 'Inky', 'Invigorating', 'Inviting', 'Jade',
    'Jovial', 'Joyful', 'Late', 'Lively', 'Long', 'Luminous', 'Lush', 'Magnetic',
    'Majestic', 'Marbled', 'Mellow', 'Melodic', 'Midnight', 'Mild', 'Misty', 'Modest',
    'Moonlit', 'Morning', 'Muddy', 'Murmuring', 'Muted', 'Mysterious', 'Mystical', 'Nameless',
    'Natural', 'Nautical', 'Nebulous', 'Nocturnal', 'Pastel', 'Patient', 'Peaceful', 'Pearly',
    'Pensive', 'Perceptive', 'Plush', 'Polished', 'Pristine', 'Proud', 'Purple', 'Quaint',
    'Quiet', 'Quivering', 'Radiant', 'Red', 'Reflective', 'Reserved', 'Resilient', 'Restless',
    'Reverent', 'Rhythmic', 'Rippled', 'Roaring', 'Rosy', 'Ruby', 'Ruffled', 'Sable',
    'Satin', 'Scenic', 'Serene', 'Shaded', 'Shimmering', 'Silent', 'Silver', 'Silvery',
    'Sleek', 'Slumbering', 'Small', 'Snowy', 'Solitary', 'Solstice', 'Soothing', 'Sparkling',
    'Spongy', 'Spring', 'Starlit', 'Stellar', 'Still', 'Stormy', 'Strong', 'Sultry',
    'Summer', 'Sunny', 'Swaying', 'Temperate', 'Tender', 'Tranquil', 'Twilight', 'Twinkling',
    'Undulating', 'Valiant', 'Velvety', 'Verdant', 'Vibrant', 'Vivid', 'Wavy', 'Weathered',
    'Whimsical', 'Whispered', 'Windy', 'Winter', 'Wispy', 'Woven', 'Yawning', 'Zealous'
]

//https://github.com/claudiodekker/word-generator/blob/master/src/Words/Noun.php
const nouns: string[] = [
    'Acorn', 'Algae', 'Alpenglow', 'Apex', 'Arc', 'Aurora', 'Balloon', 'Beacon',
    'Beam', 'Bird', 'Bloom', 'Blush', 'Bough', 'Boulder', 'Bramble', 'Breeze',
    'Brook', 'Butterfly', 'Candle', 'Canopy', 'Canyon', 'Cascade', 'Cinder', 'Cliff',
    'Cloud', 'Constellation', 'Cove', 'Creek', 'Crest', 'Cricket', 'Crystal', 'Dandelion',
    'Dapple', 'Dawn', 'Dell', 'Dew', 'Dewdrop', 'Dream', 'Drizzle', 'Dust',
    'Eagle', 'Ember', 'Estuary', 'Expanse', 'Fawn', 'Feather', 'Fern', 'Field',
    'Fire', 'Firefly', 'Flame', 'Flare', 'Flower', 'Fluff', 'Foam', 'Fog',
    'Forest', 'Fox', 'Fragment', 'Frog', 'Frost', 'Galaxy', 'Glade', 'Glen',
    'Glimmer', 'Glitter', 'Glow', 'Grass', 'Grove', 'Hail', 'Harbor', 'Haven',
    'Haze', 'Hearth', 'Hedge', 'Hill', 'Horizon', 'Hummingbird', 'Isle', 'Jewel',
    'Jungle', 'Lagoon', 'Lake', 'Landmark', 'Lantern', 'Lark', 'Leaf', 'Lichen',
    'Light', 'Lily', 'Lotus', 'Lullaby', 'Marble', 'Marsh', 'Meadow', 'Meander',
    'Mirage', 'Moon', 'Morning', 'Moss', 'Mountain', 'Murmur', 'Nebula', 'Nest',
    'Night', 'Oak', 'Oasis', 'Ocean', 'Orchard', 'Orchid', 'Palm', 'Panorama',
    'Paper', 'Peak', 'Pebble', 'Penguin', 'Penumbra', 'Petal', 'Pine', 'Plateau',
    'Pond', 'Prairie', 'Rain', 'Ravine', 'Reef', 'Resonance', 'Ridge', 'Rift',
    'Ripple', 'River', 'Rosette', 'Sanctuary', 'Sand', 'Sapphire', 'Savanna', 'Sea',
    'Seashell', 'Sediment', 'Shade', 'Shape', 'Shard', 'Shelter', 'Shimmer', 'Silence',
    'Sky', 'Snow', 'Snowflake', 'Solace', 'Songbird', 'Sound', 'Spark', 'Spindle',
    'Spire', 'Splash', 'Spray', 'Sprig', 'Sprout', 'Squirrel', 'Star', 'Stone',
    'Strand', 'Stream', 'Summit', 'Sun', 'Sunset', 'Surf', 'Swirl', 'Thunder',
    'Tide', 'Trail', 'Tree', 'Tundra', 'Twig', 'Umbra', 'Vale', 'Valley',
    'Vapor', 'Veil', 'Violet', 'Vista', 'Voice', 'Vortex', 'Water', 'Waterfall',
    'Wave', 'Wildflower', 'Willow', 'Wind', 'Wisp', 'Wood', 'Zenith', 'Zest'
]

export default function gen_name()
{
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)] as string
    const noun = nouns[Math.floor(Math.random() * nouns.length)] as string
    const num = Math.floor(Math.random() * 999)+1
    return (adjective + noun + num).toString()
}