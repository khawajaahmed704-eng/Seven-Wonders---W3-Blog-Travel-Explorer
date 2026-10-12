import { BlogPost, WonderComparisonItem } from '../types/database';

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    author_id: 'author-historian-1',
    title: "The Great Wall of China: History, Construction, and Secrets Behind the World's Most Famous Wall",
    slug: 'great-wall-of-china',
    excerpt: 'An enormous system of defensive fortifications stretching over 21,000 kilometres across mountains, deserts, and plateaus.',
    category: 'New 7 Wonders',
    tags: ['China', 'Asia', 'Architecture', 'Military History', 'UNESCO'],
    status: 'published',
    published_at: '2026-03-15T08:00:00Z',
    created_at: '2026-03-15T08:00:00Z',
    updated_at: '2026-03-15T08:00:00Z',
    location: 'Northern China',
    country: 'China · Asia',
    era: '3rd century BCE onward (Qin to Ming Dynasty)',
    reading_time_minutes: 8,
    cover_image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Great Wall of China: History, Construction, and Secrets

The Great Wall of China is an enormous system of walls, fortifications, and defensive structures built over many centuries across the historical northern borders of ancient Chinese states and Imperial China. Rather than being one uninterrupted wall, it is an integrated military defensive grid comprised of stone walls, rammed-earth ramparts, watchtowers, beacon towers, and garrison garrisons.

## Why it is Famous
It represents the pinnacle of ancient military civil engineering, China's imperial resilience, and the staggering human effort invested over millennia to protect agricultural heartlands from nomadic raids along the Eurasian Steppe.

### Key Historical Timeline
- **Pre-Imperial States (770–221 BCE):** Individual rival feudal states (Qi, Chu, Yan, and Zhao) erected earth walls along their borders.
- **Qin Dynasty (221–206 BCE):** Emperor Qin Shi Huang unified China, tore down internal barriers, and joined northern border fortifications into the first cohesive "Ten-Thousand-Li Long Wall."
- **Han Dynasty (202 BCE – 220 CE):** Extended westward into the Gobi Desert to secure Silk Road merchant caravans.
- **Ming Dynasty (1368–1644 CE):** Constructed the iconic stone-and-brick fortifications visitors see today around Badaling, Mutianyu, and Simatai.

---

## Intriguing Engineering Facts
1. **Total Extent:** Chinese State Administration of Cultural Heritage archaeological surveys estimate the comprehensive wall system—including trenches, natural cliff barriers, and auxiliary ramparts—stretches for **21,196 kilometres (13,171 miles)**.
2. **Sticky Rice Mortar:** Ming builders famously blended slaked lime with sticky amylopectin-rich rice broth, forging a mortar so cohesive that vegetation cannot penetrate the seams.
3. **Smoke & Signal Communications:** Elevated beacon towers transmitted visual messages using wolf dung smoke by day and blazing fires by night, relaying threat alarms across 500 miles within hours.
4. **Labor Force:** Millions of soldiers, peasant conscripts, and convicts worked under extreme weather conditions in rugged mountain ranges.

> *"He who has not climbed the Great Wall is not a true hero."* — Classical Chinese Proverb

## Practical Travel Tips for Visitors
- **Best Sections:** Mutianyu offers panoramic views and cable car access with fewer crowds than Badaling; Jiankou provides rugged, un-restored hiking for seasoned adventurers.
- **Best Season:** Late spring (April–May) for blooming mountain orchards or autumn (September–October) for clear skies and fiery red foliage.
    `,
  },
  {
    id: 'post-2',
    author_id: 'author-historian-2',
    title: "Petra, Jordan: Exploring the Lost City Carved Into Rose-Red Rock",
    slug: 'petra-jordan',
    excerpt: 'An ancient desert metropolis carved directly into vibrant sandstone cliffs by the resourceful Nabataeans.',
    category: 'New 7 Wonders',
    tags: ['Jordan', 'Middle East', 'Archaeology', 'Nabataean', 'UNESCO'],
    status: 'published',
    published_at: '2026-03-10T10:30:00Z',
    created_at: '2026-03-10T10:30:00Z',
    updated_at: '2026-03-10T10:30:00Z',
    location: "Ma'an Governorate",
    country: 'Jordan · Middle East',
    era: '4th century BCE onward',
    reading_time_minutes: 7,
    cover_image: 'https://images.unsplash.com/photo-1579606032824-2c67995a6ec8?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# Petra, Jordan: The Rose-Red City Carved from Mountain Stone

Petra is an ancient rock-cut city situated in southwestern Jordan's rugged desert canyons. Established as the royal capital of the Nabataean kingdom as early as the 4th century BCE, Petra blossomed into a wealthy crossroads linking Arabian incense, Indian spices, and Mediterranean silks.

## Why it is Famous
Referred to poetically by British scholar John William Burgon as "a rose-red city half as old as time," Petra astonishes visitors with classical Hellenistic facades sculpted directly from vibrant iron-banded sandstone bedrock, set against an unforgiving desert landscape.

---

## Architectural & Hydrological Highlights
- **The Siq:** A dramatic, serpentine gorge stretching 1.2 kilometres between vertical 80-metre-high rock faces, guarding the entrance to the city.
- **Al-Khazneh (The Treasury):** Standing nearly 40 metres tall, this majestic mausoleum facade bursts into view at the end of the Siq, carved with Corinthian capitals and mythical figures.
- **Water Management Ingenuity:** In an arid region receiving barely 100mm of annual rainfall, Nabataean hydraulic engineers built terra-cotta conduits, rock-hewn cisterns, dams, and filtration basins that sustained over 30,000 citizens.
- **Ad-Deir (The Monastery):** Petra's largest monument, situated after an 800-step mountain climb, measuring 50 metres wide by 45 metres tall.

## Interesting Historical Facts
1. Petra remained hidden from the Western world for centuries after trade routes shifted and devastating earthquakes struck in 363 and 551 CE.
2. In 1812, Swiss explorer Johann Ludwig Burckhardt disguised himself as an Arab scholar named Sheikh Ibrahim Ibn Abdallah to gain access.
3. Less than 20% of the ancient city has been excavated by modern archaeologists, leaving miles of subterranean tombs yet to be documented.
    `,
  },
  {
    id: 'post-3',
    author_id: 'author-historian-1',
    title: 'Christ the Redeemer: The Story Behind Brazil’s Iconic Statue Above Rio',
    slug: 'christ-the-redeemer',
    excerpt: 'Rising atop Mount Corcovado, this monumental Art Deco sculpture welcomes travelers with arms outstretched 710 meters above the sea.',
    category: 'New 7 Wonders',
    tags: ['Brazil', 'South America', 'Art Deco', 'Landmark', 'Culture'],
    status: 'published',
    published_at: '2026-03-05T12:00:00Z',
    created_at: '2026-03-05T12:00:00Z',
    updated_at: '2026-03-05T12:00:00Z',
    location: 'Rio de Janeiro',
    country: 'Brazil · South America',
    era: 'Completed in 1931',
    reading_time_minutes: 6,
    cover_image: 'https://images.unsplash.com/photo-1593995863951-b79b472e3a89?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# Christ the Redeemer: The Story Behind Brazil's Iconic Mountain Sentinel

Perched dramatically on the precipice of Mount Corcovado in Rio de Janeiro's Tijuca National Park, *Cristo Redentor* stands as the globe's foremost Art Deco masterpiece. With arms spanning 28 metres wide, the monument embraces the sun-drenched bays, beaches, and rainforests of Rio de Janeiro.

## Why it is Famous
Completed in 1931, the monument has grown into both a sacred place of pilgrimage and an international beacon of warmth, fraternity, and Brazilian cultural identity.

---

## Construction and Engineering
- **Dimensions:** The statue measures **30 metres (98 feet)** in height, standing atop an 8-metre pedestal housing a dedicated chapel.
- **Weight:** Weighs approximately 635 metric tonnes.
- **Materials:** Engineered with reinforced concrete to resist ferocious coastal winds, clad meticulously in six million triangular soapstone tiles chosen for their soft luster and weather durability.
- **Collaboration:** Conceived by Brazilian civil engineer Heitor da Silva Costa, sculpted in plaster segments by French-Polish artist Paul Landowski, and structural design led by French engineer Albert Caquot.

## Intriguing Curiosities
1. **Lightning Strikes:** Because of its elevated 710-metre mountain peak position, Christ the Redeemer is struck by lightning 3 to 5 times per year. Lightning struck the statue's right thumb during a fierce 2014 storm, prompting prompt restoration.
2. **Crowdfunded by the People:** The construction was financed predominantly by private donations from Brazilian Catholics who collected funds through grassroots campaigns across Rio churches.
3. **Soapstone Secret Messages:** Women who pasted the mosaic soapstone tiles wrote names and personal prayers on the underside of thousands of tiles.
    `,
  },
  {
    id: 'post-4',
    author_id: 'author-historian-2',
    title: 'Machu Picchu: How the Incas Built a Sacred Sanctuary Above the Clouds',
    slug: 'machu-picchu',
    excerpt: 'High in the Peruvian Andes, Machu Picchu exemplifies master-class dry-stone engineering and celestial harmony.',
    category: 'New 7 Wonders',
    tags: ['Peru', 'South America', 'Inca', 'Andes', 'Archaeology'],
    status: 'published',
    published_at: '2026-02-28T09:15:00Z',
    created_at: '2026-02-28T09:15:00Z',
    updated_at: '2026-02-28T09:15:00Z',
    location: 'Cusco Region, Urubamba Province',
    country: 'Peru · South America',
    era: '15th century (Inca Empire under Pachacuti)',
    reading_time_minutes: 8,
    cover_image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# Machu Picchu: How the Incas Built a City Above the Clouds

Hidden among emerald peaks where the Andes mountain range descends into the Amazonian cloud forest, Machu Picchu sits at an altitude of 2,430 metres (7,970 feet). Erected around 1450 CE under the reign of Inca emperor Pachacuti Inca Yupanqui, this sacred citadel remains one of humanity's purest architectural triumphs.

## Why it is Famous
Its seamlessly carved granite boulders, fitted together without a single drop of mortar (*ashlar masonry*), survived catastrophic Andean earthquakes while modern colonial buildings crumbled.

---

## Architectural Genius
- **Ashlar Masonry:** Stones were shaped with bronze and stone chisels to nest together with micro-millimeter precision. A credit card cannot slide between the seams.
- **Seismic Resilience:** When an earthquake occurs, the stones "dance"—they shake slightly and fall cleanly back into their original sockets without collapsing.
- **Agricultural Terraces:** More than 700 agricultural terraces preserved topsoil, prevented mountain landslides, and created diverse microclimates for cultivating corn, potatoes, and medicinal herbs.
- **Hydrological Network:** A 749-meter stone aqueduct feeds 16 cascading ceremonial fountains, designed to flow uniformly in dry and wet seasons alike.

## Notable Landmarks within the Citadel
1. **The Intihuatana Stone:** An astronomical clock and sun-dial hitching post aligned with the June and December solstices.
2. **Temple of the Sun:** A semi-circular stone enclosure framing a sacred cave, engineered to receive winter solstice sunlight directly through its window.
3. **The Sacred Plaza and Principal Temple:** Massive three-sided granite hall commanding panoramic views of the Urubamba valley below.
    `,
  },
  {
    id: 'post-5',
    author_id: 'author-historian-1',
    title: 'Chichén Itzá: The Maya City Where Architecture Meets Astronomy',
    slug: 'chichen-itza',
    excerpt: 'Explore the monumental El Castillo pyramid, where equinox shadows bring the feathered serpent Kukulcán to life.',
    category: 'New 7 Wonders',
    tags: ['Mexico', 'North America', 'Maya', 'Astronomy', 'Pyramids'],
    status: 'published',
    published_at: '2026-02-20T14:45:00Z',
    created_at: '2026-02-20T14:45:00Z',
    updated_at: '2026-02-20T14:45:00Z',
    location: 'Yucatán Peninsula',
    country: 'Mexico · North America',
    era: 'Mainly 6th–13th centuries CE',
    reading_time_minutes: 7,
    cover_image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# Chichén Itzá: The Maya City Where Architecture Meets Astronomy

Sprawling across the limestone plains of Mexico's northern Yucatán Peninsula, Chichén Itzá was a bustling commercial and ritual metropolis that reached its apex between 600 and 1200 CE. Blending classical Maya civilization with later Toltec artistic influences, the city stands as a stone testament to mathematical genius.

## Why it is Famous
The central step pyramid, **El Castillo** (Temple of Kukulcán), acts as a physical three-dimensional calendar aligning precisely with solar, lunar, and Venusian cycles.

---

## Astounding Astronomical Features
- **The 365 Steps of the Year:** El Castillo has 91 steps on each of its four sides (91 × 4 = 364), plus the top platform, totaling exactly 365—one step for every solar day.
- **The Equinox Serpent Descent:** During spring and autumn equinoxes (March 20 and September 22), the late afternoon sunlight projects a sequence of triangular shadows across the northern balustrade, simulating a 30-meter serpent slithering down to join the carved stone head of Kukulcán at the base.
- **Acoustic Marvel:** If you clap your hands at the base of El Castillo, the echo reverberating from the high limestone staircases mimics the chirping call of the sacred Resplendent Quetzal bird.

## Key Archaeological Sites
1. **The Great Ball Court:** The largest Mesoamerican court ever discovered, measuring 168 by 70 metres, where high-stakes ritual games were contested.
2. **El Caracol (The Snail Observatory):** A cylindrical stone observation tower with viewing slits calibrated to trace the orbital paths of Venus.
3. **The Sacred Cenote (Cenote Sagrado):** A natural limestone sinkhole 60 metres in diameter, revered as the dwelling place of Chaac, the rain deity.
    `,
  },
  {
    id: 'post-6',
    author_id: 'author-historian-2',
    title: 'Inside the Roman Colosseum: Engineering, Entertainment, and Ancient History',
    slug: 'roman-colosseum',
    excerpt: 'The Flavian Amphitheatre held 50,000 spectators and embodied the power, cruelty, and technological mastery of imperial Rome.',
    category: 'New 7 Wonders',
    tags: ['Italy', 'Europe', 'Roman Empire', 'Amphitheatre', 'Gladiators'],
    status: 'published',
    published_at: '2026-02-12T11:20:00Z',
    created_at: '2026-02-12T11:20:00Z',
    updated_at: '2026-02-12T11:20:00Z',
    location: 'Rome',
    country: 'Italy · Europe',
    era: '1st century CE (70–80 CE under Flavian dynasty)',
    reading_time_minutes: 8,
    cover_image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# Inside the Roman Colosseum: Engineering, Entertainment, and Ancient History

Rising in the heart of Rome east of the Roman Forum, the **Flavian Amphitheatre**—universally known as the Colosseum—remains the largest amphitheatre ever erected in antiquity. Commissioned around 70–72 CE by Emperor Vespasian and officially inaugurated in 80 CE by Titus with 100 days of games, it accommodated over 50,000 citizens.

## Why it is Famous
The Colosseum defined Roman imperial power, showcasing public spectacles, social hierarchy, advanced crowd circulation, and concrete vaulting that still underpins modern stadium architecture today.

---

## Architectural & Engineering Prowess
- **Vomitoria Entrance Arches:** 80 numbered arches permitted 50,000 patrons to enter and exit within fifteen minutes without stampedes—a design blueprint copied by modern football stadiums.
- **The Hypogeum:** Beneath the wooden, sand-covered arena floor lay a two-story subterranean maze of brick corridors, cages, winches, and counterweighted trapdoor lifts that could hoist lions, bears, and gladiators instantaneously onto the stage.
- **The Velarium:** An immense retractable canvas awning hoisted by imperial Roman naval sailors to shelter spectators from blistering summer Mediterranean sun.
- **Classical Orders:** The facade exhibits three stacked tiers of classical Greek and Roman columns: Doric at ground level, Ionic in the middle, and Corinthian on the upper tier.

## Historical Facts
1. During its opening ceremonies in 80 CE, the arena floor was reportedly flooded to stage mock naval battles (*naumachiae*).
2. The name "Colosseum" originates not from the building's size, but from the colossal 30-metre bronze statue of Emperor Nero (*Colossus Neronis*) that once stood nearby.
3. Over four centuries of gladiatorial combats, wild animal hunts (*venationes*), and public executions took place before games were banned in 435 CE.
    `,
  },
  {
    id: 'post-7',
    author_id: 'author-historian-1',
    title: 'The Taj Mahal: Architecture, History, and the Story Behind a World Icon',
    slug: 'taj-mahal',
    excerpt: 'The immortal white marble mausoleum in Agra, celebrated for poetic symmetry and timeless Mughal craftsmanship.',
    category: 'New 7 Wonders',
    tags: ['India', 'South Asia', 'Mughal', 'Architecture', 'UNESCO'],
    status: 'published',
    published_at: '2026-02-01T15:00:00Z',
    created_at: '2026-02-01T15:00:00Z',
    updated_at: '2026-02-01T15:00:00Z',
    location: 'Agra, Uttar Pradesh',
    country: 'India · South Asia',
    era: '17th century CE (1632–1653 CE)',
    reading_time_minutes: 7,
    cover_image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Taj Mahal: Architecture, History, and the Story Behind a World Icon

Nestled along the southern bank of the Yamuna River in Agra, the **Taj Mahal** stands as the pinnacle of Mughal Islamic architecture. Commissioned in 1632 by the fifth Mughal emperor Shah Jahan to house the tomb of his beloved empress Mumtaz Mahal, it remains an eternal monument to devotion and aesthetic balance.

## Why it is Famous
Praised by Nobel laureate Rabindranath Tagore as *"a solitary tear suspended on the cheek of time,"* the Taj Mahal is renowned for its absolute bilateral symmetry, translucent Makrana marble, and hypnotic garden reflections.

---

## Architectural & Artistic Mastery
- **Bilateral Symmetry:** Every element—from the central onion dome and flanking minarets to the quadruple Charbagh water gardens and matching red sandstone mosque—is balanced across a central axis. The only intentional asymmetry is the tomb of Shah Jahan himself, placed alongside Mumtaz Mahal decades later.
- **Pietra Dura (Parchin Kari):** Artisans inlaid semi-precious stones (lapis lazuli from Afghanistan, jade from China, turquoise from Tibet, carnelian from Arabia) into the pure white marble, creating delicate floral vines and Quranic calligraphy that seem to grow organically out of the stone.
- **Tilted Minarets:** The four 40-metre corner minarets were intentionally canted slightly outward (a fraction of a degree). If a major earthquake ever struck, the towers would tumble away from the central dome rather than crushing the imperial tomb.
- **Color Changing Facade:** The Makrana marble absorbs shifting ambient daylight: blushing pale pink at dawn, brilliant radiant white at noon, and shimmering golden under the full moon.
    `,
  },
  // Ancient Wonders Articles
  {
    id: 'post-8',
    author_id: 'author-historian-2',
    title: 'The Great Pyramid of Giza: The Sole Surviving Wonder of the Ancient World',
    slug: 'great-pyramid-of-giza',
    excerpt: 'Built for Pharaoh Khufu circa 2600 BCE, this honorary wonder has defied four millennia of desert winds and earthquakes.',
    category: 'Ancient Wonders',
    tags: ['Egypt', 'Africa', 'Ancient Wonders', 'Pyramids', 'Pharaohs'],
    status: 'published',
    published_at: '2026-01-20T10:00:00Z',
    created_at: '2026-01-20T10:00:00Z',
    updated_at: '2026-01-20T10:00:00Z',
    location: 'Giza Plateau, Cairo',
    country: 'Egypt · Africa',
    era: 'c. 2600–2560 BCE (Old Kingdom 4th Dynasty)',
    reading_time_minutes: 8,
    cover_image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Great Pyramid of Giza: The Sole Surviving Wonder

Of the traditional Seven Wonders of the Ancient World compiled by Hellenistic travelers like Antipater of Sidon, only the **Great Pyramid of Giza** still stands substantially intact. Conceived as the eternal resting place for Pharaoh Khufu (Cheops), its construction was completed around 2560 BCE.

## Why it is Famous
For more than 3,800 years, the Great Pyramid stood as the tallest man-made structure on Earth until Lincoln Cathedral in England surpassed it in 1311 CE. Because of its monumental durability, the New7Wonders Foundation awarded Giza permanent **Honorary Wonder** status in 2007.

---

## Astounding Ancient Metrics
- **Massive Weight:** Composed of approximately 2.3 million limestone and granite blocks, weighing between 2.5 and 15 metric tonnes apiece, aggregating to roughly 6 million tonnes.
- **Precision Alignment:** The base of the pyramid is aligned with true magnetic north within just 3/60ths of a single degree of arc—an accuracy modern builders struggle to replicate without satellite telemetry.
- **Original Casing Stones:** It was originally sheathed in highly polished Tura white limestone that gleamed like a beacon in the desert sun, casting radiant reflections for miles before earthquakes and quarrying stripped the outer skin.
- **Internal Chambers:** Features the Queen's Chamber, the Grand Gallery, and the King's Chamber with its massive granite relieving blocks designed to redistribute the weight of the mountain above.
    `,
  },
  {
    id: 'post-9',
    author_id: 'author-historian-1',
    title: 'The Hanging Gardens of Babylon: Mystery, Myth, and Botanical Splendor',
    slug: 'hanging-gardens-of-babylon',
    excerpt: 'An oasis of terraced botanical gardens in ancient Mesopotamia, celebrated as a triumph of artificial mountain engineering.',
    category: 'Ancient Wonders',
    tags: ['Iraq', 'Mesopotamia', 'Ancient Wonders', 'Mythology', 'Gardens'],
    status: 'published',
    published_at: '2026-01-12T09:00:00Z',
    created_at: '2026-01-12T09:00:00Z',
    updated_at: '2026-01-12T09:00:00Z',
    location: 'Near Hillah, Babil Province',
    country: 'Iraq · Middle East',
    era: 'c. 600 BCE (Neo-Babylonian Empire)',
    reading_time_minutes: 6,
    cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Hanging Gardens of Babylon: Mystery, Myth, and Botanical Splendor

Among the ancient wonders, the **Hanging Gardens of Babylon** are the most romanticized and historically debated. According to Greek and Roman writers such as Strabo and Diodorus Siculus, King Nebuchadnezzar II built the elevated tiers around 600 BCE to soothe his homesick Median queen, Amytis, who longed for the lush, verdant mountain slopes of her Persian homeland.

## The Architectural Vision
- The term "hanging" is derived from the Greek *kremastos*, which translates more accurately to "overhanging" or "terraced like a mountain balcony."
- Vaulted tiers constructed of baked brick and bitumen rose 20 to 25 metres into the arid sky, insulated with reed layers and lead sheeting to prevent irrigation water from seeping into structural foundations.
- An ingenious screw-pump or chain-bucket mechanism (*shaduf*) continuously elevated water from the Euphrates River to irrigate date palms, cedar trees, and exotic flowering flora.

## The Great Archaeological Mystery
Unlike the other wonders, no contemporary Babylonian clay tablets mention the gardens. Recent scholarly research by Oxford Assyriologist Stephanie Dalley suggests the gardens may have been erected not in Babylon, but by King Sennacherib at the Assyrian capital of Nineveh.
    `,
  },
  {
    id: 'post-10',
    author_id: 'author-historian-2',
    title: 'The Statue of Zeus at Olympia: Phidias’s Gold and Ivory Colossus',
    slug: 'statue-of-zeus-olympia',
    excerpt: 'The magnificent chryselephantine monument created by the master sculptor Phidias in ancient Greece.',
    category: 'Ancient Wonders',
    tags: ['Greece', 'Europe', 'Ancient Wonders', 'Olympia', 'Zeus', 'Sculpture'],
    status: 'published',
    published_at: '2026-01-05T14:00:00Z',
    created_at: '2026-01-05T14:00:00Z',
    updated_at: '2026-01-05T14:00:00Z',
    location: 'Olympia, Peloponnese',
    country: 'Greece · Europe',
    era: 'c. 435 BCE (Classical Greece)',
    reading_time_minutes: 6,
    cover_image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Statue of Zeus at Olympia: Phidias's Chryselephantine Masterwork

In the sanctuary of Olympia, birthplace of the Olympic Games, the ancient Greeks gathered to venerate Zeus, king of the gods. To honor the deity, the citizens commissioned the Athenian sculptor **Phidias**—who had already sculpted the Athena Parthenos at the Acropolis—to build a colossal seated statue inside the Temple of Zeus.

## Chryselephantine Construction
- Standing over **12 metres (40 feet)** high on an elevated cedarwood and ebony throne, the statue was so immense that contemporary writers remarked Zeus would lift the roof of the temple off if he ever stood up.
- **Ivory and Gold:** Zeus’s exposed flesh was rendered in polished ivory plates, while his flowing robes, sandals, and garland of olive leaves were forged from beaten gold plates inlaid with glass and precious gems.
- In his right hand, Zeus held a gold-and-ivory statue of Nike, goddess of victory; in his left rested a scepter crowned with an eagle made of all metals.

## Its Fate
The monument stood for over eight centuries. It was later transported to Constantinople, where it is believed to have perished in a devastating palace fire in 475 CE.
    `,
  },
  {
    id: 'post-11',
    author_id: 'author-historian-1',
    title: 'The Temple of Artemis at Ephesus: The Colossal Marble Marvel of Asia Minor',
    slug: 'temple-of-artemis-ephesus',
    excerpt: 'Dedicated to the goddess of the hunt, this Ionic marvel was four times the size of the Parthenon in Athens.',
    category: 'Ancient Wonders',
    tags: ['Türkiye', 'Europe/Asia', 'Ancient Wonders', 'Ephesus', 'Greek Architecture'],
    status: 'published',
    published_at: '2025-12-28T08:30:00Z',
    created_at: '2025-12-28T08:30:00Z',
    updated_at: '2025-12-28T08:30:00Z',
    location: 'Near Selçuk, Izmir Province',
    country: 'Türkiye · Europe/Asia',
    era: 'c. 550 BCE (Archaic & Classical eras)',
    reading_time_minutes: 6,
    cover_image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Temple of Artemis at Ephesus: Grandeur and Devastation

Located on the Aegean coast of modern Türkiye near Selçuk, the **Temple of Artemis** (*Artemision*) was celebrated across the Mediterranean world as the most majestic structure among all ancient wonders. Antipater of Sidon wrote that after beholding the shrine of Artemis reaching toward the clouds, the Sun himself had never looked upon its equal.

## Monumental Scale
- Measuring approximately **137 metres (450 feet)** in length and 69 metres wide, it had 127 fluted marble columns standing 18 metres tall.
- Generously financed by King Croesus of Lydia, famed for his legendary wealth.
- In 356 BCE, a man named Herostratus burned it to the ground simply to immortalize his name in history—coincidentally on the very night Alexander the Great was born.
- The Ephesians rebuilt the temple with even greater splendor, before it was permanently damaged by the Goths in 268 CE.
    `,
  },
  {
    id: 'post-12',
    author_id: 'author-historian-2',
    title: 'The Mausoleum at Halicarnassus: The Monumental Tomb That Gave Us the Word',
    slug: 'mausoleum-at-halicarnassus',
    excerpt: 'Erected for the ruler Mausolus, its soaring colonnade and pyramid roof inspired every great tomb that followed.',
    category: 'Ancient Wonders',
    tags: ['Türkiye', 'Europe/Asia', 'Ancient Wonders', 'Halicarnassus', 'Bodrum'],
    status: 'published',
    published_at: '2025-12-20T11:00:00Z',
    created_at: '2025-12-20T11:00:00Z',
    updated_at: '2025-12-20T11:00:00Z',
    location: 'Bodrum, Muğla Province',
    country: 'Türkiye · Europe/Asia',
    era: 'c. 353–350 BCE',
    reading_time_minutes: 6,
    cover_image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Mausoleum at Halicarnassus: The Tomb of King Mausolus

When Mausolus, satrap ruler of Caria, died in 353 BCE, his grieving wife and sister Artemisia II commissioned Greek architects Satyros and Pytheos alongside the era's four greatest sculptors—Leochares, Bryaxis, Scopas, and Timotheus—to construct an unprecedented resting monument in Halicarnassus (modern Bodrum).

## Design Features
- Rose approximately **45 metres (148 feet)** in height, comprised of three distinct tiers: a podium base with high-relief battle friezes, a colonnade of 36 Ionic pillars, and a stepped 24-tier pyramid roof.
- At the pinnacle rested a colossal marble four-horse chariot (*quadriga*) bearing statues of Mausolus and Artemisia.
- The tomb was so celebrated that the name **Mausoleum** became the universal word for any grand above-ground sepulchre worldwide.
- Survived until earthquakes brought it down between the 12th and 15th centuries; Knights of St. John subsequently repurposed its stones to fortify Bodrum Castle.
    `,
  },
  {
    id: 'post-13',
    author_id: 'author-historian-1',
    title: 'The Colossus of Rhodes: The Bronze Sun God of the Aegean Harbor',
    slug: 'colossus-of-rhodes',
    excerpt: 'The 33-meter bronze colossus dedicated to Helios, celebrating Rhodian victory and maritime independence.',
    category: 'Ancient Wonders',
    tags: ['Greece', 'Europe', 'Ancient Wonders', 'Rhodes', 'Bronze Statue'],
    status: 'published',
    published_at: '2025-12-14T07:15:00Z',
    created_at: '2025-12-14T07:15:00Z',
    updated_at: '2025-12-14T07:15:00Z',
    location: 'Rhodes, Dodecanese Islands',
    country: 'Greece · Europe',
    era: 'c. 280 BCE',
    reading_time_minutes: 5,
    cover_image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-1',
      display_name: 'Dr. Evelyn Lin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Archaeologist and East Asian historical researcher specializing in frontier architecture.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Colossus of Rhodes: Bronze Titan of the Mediterranean

Erected by sculptor Chares of Lindos between 292 and 280 BCE, the **Colossus of Rhodes** commemorated the successful defense of the island against a massive one-year siege led by Demetrius Poliorcetes of Macedonia. The Rhodians melted down bronze siege engines left behind by the invaders to forge this statue of their patron deity, Helios.

## The Titan at the Harbor
- Standing approximately **33 metres (108 feet)** high, it was comparable in scale to the Statue of Liberty (from feet to crown).
- Built around stone pillars and iron tie-bars with bronze casting plates.
- Contrary to medieval romantic drawings showing the statue straddling the harbor mouth with ships sailing between its legs, historical consensus confirms it stood upright on a single pedestal overlooking the Mandraki harbor.
- It stood for only 54 years before the great Rhodes earthquake of 226 BCE broke it at the knees. An oracle warned against re-erecting it, and its bronze remained on the ground as a tourist curiosity for 800 years until merchants sold the scrap metal.
    `,
  },
  {
    id: 'post-14',
    author_id: 'author-historian-2',
    title: 'The Lighthouse of Alexandria: Guiding Ships to Pharos Island for Centuries',
    slug: 'lighthouse-of-alexandria',
    excerpt: 'The archetype of all modern lighthouses, built under the Ptolemaic Kingdom to illuminate Mediterranean trade.',
    category: 'Ancient Wonders',
    tags: ['Egypt', 'Africa', 'Ancient Wonders', 'Alexandria', 'Lighthouse', 'Navigation'],
    status: 'published',
    published_at: '2025-12-05T16:00:00Z',
    created_at: '2025-12-05T16:00:00Z',
    updated_at: '2025-12-05T16:00:00Z',
    location: 'Pharos Island, Alexandria',
    country: 'Egypt · Africa',
    era: 'c. 280–247 BCE (Ptolemaic Kingdom)',
    reading_time_minutes: 6,
    cover_image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    author_profile: {
      id: 'author-historian-2',
      display_name: 'Tariq Al-Mansoor',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Levantine field archaeologist and historian of ancient caravan trade routes.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    content: `
# The Lighthouse of Alexandria: Beacon of the Ptolemies

Built on the eastern tip of Pharos Island at the entrance to Alexandria's harbor, the **Pharos of Alexandria** was engineered by Greek architect Sostratus of Cnidus under Ptolemy I Soter and finished under Ptolemy II Philadelphus around 280 BCE.

## Engineering and Illumination
- Estimated to have stood between **100 and 120 metres (330 to 390 feet)** tall, making it one of the tallest man-made edifices on the planet for centuries.
- Divided into three ascending levels: a square limestone podium base, an octagonal middle section, and a cylindrical open turret at the summit.
- A bonfire blazed at the top, while an enormous polished bronze mirror reflected the flame at night and sunlight by day, warning vessels away from treacherous offshore reefs from up to 50 kilometres away.
- Survived through Roman and Islamic rule until earthquakes in 956, 1303, and 1323 CE reduced it to ruins. Sultan Qaitbay used the fallen stones in 1480 to build the Fort of Qaitbay, which stands on the exact site today.
    `,
  },
];

export const COMPARISON_DATA: WonderComparisonItem[] = [
  {
    id: 'comp-1',
    wonder: 'Great Wall of China',
    type: 'Modern',
    country: 'China',
    period: '3rd century BCE onward',
    highlight: 'Defensive wall system spanning over 21,000 km',
    statusText: 'Preserved & World Heritage Site',
    coordinates: '40.4319° N, 116.5704° E',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=400&q=80',
    slug: 'great-wall-of-china',
  },
  {
    id: 'comp-2',
    wonder: 'Petra',
    type: 'Modern',
    country: 'Jordan',
    period: '4th century BCE onward',
    highlight: 'Rock-carved rose-red architecture & Nabataean water systems',
    statusText: 'Active archaeological park & World Heritage Site',
    coordinates: '30.3285° N, 35.4444° E',
    image: 'https://images.unsplash.com/photo-1579606032824-2c67995a6ec8?auto=format&fit=crop&w=400&q=80',
    slug: 'petra-jordan',
  },
  {
    id: 'comp-3',
    wonder: 'Christ the Redeemer',
    type: 'Modern',
    country: 'Brazil',
    period: 'Completed 1931',
    highlight: '30m Art Deco monumental statue over Corcovado',
    statusText: 'National sanctuary & icon of Rio',
    coordinates: '22.9519° S, 43.2105° W',
    image: 'https://images.unsplash.com/photo-1593995863951-b79b472e3a89?auto=format&fit=crop&w=400&q=80',
    slug: 'christ-the-redeemer',
  },
  {
    id: 'comp-4',
    wonder: 'Machu Picchu',
    type: 'Modern',
    country: 'Peru',
    period: '15th century CE',
    highlight: 'Inca mountain city with precision dry-stone ashlar masonry',
    statusText: 'World Heritage Historic Sanctuary',
    coordinates: '13.1631° S, 72.5450° W',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=400&q=80',
    slug: 'machu-picchu',
  },
  {
    id: 'comp-5',
    wonder: 'Chichén Itzá',
    type: 'Modern',
    country: 'Mexico',
    period: 'Mainly 6th–13th centuries CE',
    highlight: 'El Castillo pyramid with equinox shadow serpent effect & 365 steps',
    statusText: 'Protected archaeological zone',
    coordinates: '20.6843° N, 88.5678° W',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=400&q=80',
    slug: 'chichen-itza',
  },
  {
    id: 'comp-6',
    wonder: 'Colosseum',
    type: 'Modern',
    country: 'Italy',
    period: '1st century CE (70–80 CE)',
    highlight: 'Roman amphitheatre with 80 vomitoria & subterranean hypogeum',
    statusText: 'Preserved monument & museum',
    coordinates: '41.8902° N, 12.4922° E',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
    slug: 'roman-colosseum',
  },
  {
    id: 'comp-7',
    wonder: 'Taj Mahal',
    type: 'Modern',
    country: 'India',
    period: '17th century CE (1632–1653)',
    highlight: 'Pure white Makrana marble symmetrical mausoleum with pietra dura',
    statusText: 'Preserved national monument & UNESCO site',
    coordinates: '27.1751° N, 78.0421° E',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80',
    slug: 'taj-mahal',
  },
  {
    id: 'comp-8',
    wonder: 'Great Pyramid of Giza',
    type: 'Honorary',
    country: 'Egypt',
    period: 'c. 2600 BCE',
    highlight: 'Khufu tomb; only substantially surviving ancient wonder',
    statusText: 'Permanent Honorary Status (New7Wonders)',
    coordinates: '29.9792° N, 31.1342° E',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80',
    slug: 'great-pyramid-of-giza',
  },
  {
    id: 'comp-9',
    wonder: 'Hanging Gardens of Babylon',
    type: 'Ancient',
    country: 'Iraq (Mesopotamia)',
    period: 'c. 600 BCE',
    highlight: 'Terraced mountain oasis with Archimedean screw irrigation',
    statusText: 'Ruined / Historic archaeological debate',
    coordinates: '32.5422° N, 44.4210° E',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    slug: 'hanging-gardens-of-babylon',
  },
  {
    id: 'comp-10',
    wonder: 'Statue of Zeus at Olympia',
    type: 'Ancient',
    country: 'Greece',
    period: 'c. 435 BCE',
    highlight: '12m Chryselephantine gold & ivory colossus by Phidias',
    statusText: 'Destroyed by fire in 5th century CE',
    coordinates: '37.6384° N, 21.6300° E',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=400&q=80',
    slug: 'statue-of-zeus-olympia',
  },
  {
    id: 'comp-11',
    wonder: 'Temple of Artemis at Ephesus',
    type: 'Ancient',
    country: 'Türkiye',
    period: 'c. 550 BCE',
    highlight: 'Colossal 127-column marble temple 4x larger than Parthenon',
    statusText: 'Single restored column remains at Selçuk',
    coordinates: '37.9497° N, 27.3639° E',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=400&q=80',
    slug: 'temple-of-artemis-ephesus',
  },
  {
    id: 'comp-12',
    wonder: 'Mausoleum at Halicarnassus',
    type: 'Ancient',
    country: 'Türkiye',
    period: 'c. 350 BCE',
    highlight: '45m tomb of satrap Mausolus with 36 columns & chariot crown',
    statusText: 'Foundation ruins at Bodrum Castle',
    coordinates: '37.0379° N, 27.4241° E',
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=400&q=80',
    slug: 'mausoleum-at-halicarnassus',
  },
  {
    id: 'comp-13',
    wonder: 'Colossus of Rhodes',
    type: 'Ancient',
    country: 'Greece',
    period: 'c. 280 BCE',
    highlight: '33m bronze statue of sun god Helios celebrating victory',
    statusText: 'Felled by 226 BCE earthquake',
    coordinates: '36.4511° N, 28.2278° E',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80',
    slug: 'colossus-of-rhodes',
  },
  {
    id: 'comp-14',
    wonder: 'Lighthouse of Alexandria',
    type: 'Ancient',
    country: 'Egypt',
    period: 'c. 280 BCE',
    highlight: '100m three-tiered beacon with bronze mirror on Pharos Island',
    statusText: 'Foundation used in 15th c. Fort Qaitbay',
    coordinates: '31.2140° N, 29.8856° E',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    slug: 'lighthouse-of-alexandria',
  },
];

export const INITIAL_COMMENTS = [
  {
    id: 'comment-1',
    post_id: 'post-1',
    user_id: 'sample-user-1',
    content: "Climbing Mutianyu section in October was one of the most mesmerizing travel experiences of my life! The sticky rice mortar fact is mind blowing.",
    created_at: '2026-03-16T14:22:00Z',
    updated_at: '2026-03-16T14:22:00Z',
    user_profile: {
      id: 'sample-user-1',
      display_name: 'Sophia Patel',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      bio: 'World traveler and archaeology lover.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
  },
  {
    id: 'comment-2',
    post_id: 'post-2',
    user_id: 'sample-user-2',
    content: "Walking through the narrow Siq canyon and seeing the Treasury reveal itself in pink sandstone gave me literal chills. Petra is a must-visit wonder.",
    created_at: '2026-03-11T19:05:00Z',
    updated_at: '2026-03-11T19:05:00Z',
    user_profile: {
      id: 'sample-user-2',
      display_name: 'Marcus Vance',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      bio: 'Photographer & cultural explorer.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
  },
  {
    id: 'comment-3',
    post_id: 'post-4',
    user_id: 'sample-user-1',
    content: "The ashlar masonry without modern mortar is so impressive. When our guide showed us how tight the stones still fit after 500 years, everyone was speechless.",
    created_at: '2026-03-01T11:40:00Z',
    updated_at: '2026-03-01T11:40:00Z',
    user_profile: {
      id: 'sample-user-1',
      display_name: 'Sophia Patel',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      bio: 'World traveler and archaeology lover.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
  },
  {
    id: 'comment-4',
    post_id: 'post-7',
    user_id: 'sample-user-2',
    content: "Visiting the Taj Mahal at dawn when the marble reflects the pink and orange sunrise hues is pure poetry. Incredible writeup!",
    created_at: '2026-02-02T16:15:00Z',
    updated_at: '2026-02-02T16:15:00Z',
    user_profile: {
      id: 'sample-user-2',
      display_name: 'Marcus Vance',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      bio: 'Photographer & cultural explorer.',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
  },
];
