import { ChapterContent, SubjectId } from '../types';

// ─── Study Notes Content for Each Chapter ──────────────────
// Each topic from subjects.ts becomes a "chapter" with rich notes

const gaChapters: ChapterContent[] = [
  {
    id: 'ga__indian_polity',
    title: 'Indian Polity',
    subjectId: 'general_awareness',
    introduction: 'The Indian Constitution is the supreme law of India. Adopted on 26 November 1949 and effective from 26 January 1950, it establishes the framework for governance, fundamental rights, directive principles, and the separation of powers between the Legislature, Executive, and Judiciary.',
    sections: [
      {
        heading: 'The Preamble & Its Significance',
        content: 'The Preamble to the Indian Constitution declares India to be a Sovereign, Socialist, Secular, Democratic Republic. The terms "Socialist", "Secular", and "Integrity" were added by the 42nd Amendment Act of 1976. The Preamble is considered the soul of the Constitution and reflects the ideals that the framers envisioned for India.\n\nThe Supreme Court in the Kesavananda Bharati case (1973) ruled that the Preamble is part of the Constitution and can be amended under Article 368, but its basic structure cannot be altered.',
        highlight: 'The 42nd Amendment (1976) added "Socialist", "Secular", and "Integrity" to the Preamble.'
      },
      {
        heading: 'Fundamental Rights (Articles 12–35)',
        content: 'Part III of the Constitution guarantees six fundamental rights to all citizens:\n\n• Right to Equality (Articles 14–18): Equality before law, prohibition of discrimination, abolition of untouchability and titles.\n• Right to Freedom (Articles 19–22): Six freedoms including speech, assembly, movement, residence, profession, and protection against arbitrary arrest.\n• Right against Exploitation (Articles 23–24): Prohibition of human trafficking and child labour.\n• Right to Freedom of Religion (Articles 25–28): Freedom of conscience and free profession, practice, and propagation of religion.\n• Cultural and Educational Rights (Articles 29–30): Protection of minorities\' interests.\n• Right to Constitutional Remedies (Article 32): Dr. Ambedkar called this the "Heart and Soul" of the Constitution, as it empowers citizens to approach the Supreme Court directly.',
        highlight: 'Article 32 — Right to Constitutional Remedies — is the "Heart and Soul" of the Constitution.'
      },
      {
        heading: 'Directive Principles & Fundamental Duties',
        content: 'Directive Principles of State Policy (Part IV, Articles 36–51) are non-justiciable guidelines for the government. Key directives include Article 39A (free legal aid), Article 40 (Panchayat self-governance), Article 44 (Uniform Civil Code), and Article 48A (environmental protection).\n\nFundamental Duties (Article 51A) were added by the 42nd Amendment and include respecting the Constitution, promoting harmony, preserving heritage, protecting the environment, and developing scientific temper. Originally 10 duties, the 86th Amendment added the 11th duty — providing education opportunities for children aged 6–14.',
      },
      {
        heading: 'Emergency Provisions',
        content: 'The Constitution provides for three types of emergencies:\n\n• National Emergency (Article 352): Proclaimed by the President on grounds of war, external aggression, or armed rebellion. Fundamental Rights under Article 19 are suspended. Has been proclaimed three times — 1962, 1971, and 1975.\n• State Emergency / President\'s Rule (Article 356): When the constitutional machinery in a state fails. Maximum duration is 3 years with parliamentary approval every 6 months.\n• Financial Emergency (Article 360): When the financial stability of India is threatened. Has never been proclaimed.',
      },
    ],
    keyPoints: [
      'The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950',
      'Article 32 (Right to Constitutional Remedies) is the "Heart and Soul" of the Constitution',
      'The 42nd Amendment is called the "Mini-Constitution" — it added Socialist, Secular, Integrity',
      'There are 6 Fundamental Rights and 11 Fundamental Duties',
      'Three types of emergencies: National (Art 352), State (Art 356), Financial (Art 360)',
      'The basic structure doctrine was established in the Kesavananda Bharati case (1973)',
    ],
  },
  {
    id: 'ga__history',
    title: 'Modern & Ancient History',
    subjectId: 'general_awareness',
    introduction: 'Indian history spans thousands of years — from the ancient Indus Valley Civilization through medieval empires to the modern freedom struggle. Understanding key events, dates, movements, and personalities is crucial for competitive examinations.',
    sections: [
      {
        heading: 'Ancient India & the Indus Valley Civilization',
        content: 'The Indus Valley Civilization (c. 3300–1300 BCE) was one of the world\'s earliest urban civilizations, centered around the Indus and Ghaggar-Hakra rivers. Major sites include Harappa and Mohenjo-daro (Pakistan), and Dholavira, Lothal, and Kalibangan (India).\n\nDholavira in Gujarat is famous for its sophisticated water reservoir system and was declared a UNESCO World Heritage Site. Lothal is known for the world\'s earliest dockyard. The civilization excelled in urban planning with grid-pattern streets, advanced drainage systems, and standardized weights and measures.',
        highlight: 'Dholavira (Gujarat) — UNESCO Site — is famous for its advanced water harvesting and reservoir system.'
      },
      {
        heading: 'The Freedom Struggle: Key Milestones',
        content: 'The Indian independence movement saw several landmark events:\n\n• 1857 — First War of Independence (Sepoy Mutiny), starting at Meerut\n• 1885 — Indian National Congress founded by A.O. Hume in Bombay\n• 1905 — Partition of Bengal by Lord Curzon, sparking the Swadeshi Movement\n• 1917 — Champaran Satyagraha, Gandhi\'s first civil resistance in India\n• 1919 — Jallianwala Bagh Massacre on Baisakhi day (April 13)\n• 1920 — Non-Cooperation Movement launched (called off after Chauri Chaura, 1922)\n• 1930 — Dandi March / Salt Satyagraha — Gandhi marched 240 miles\n• 1932 — Poona Pact between Gandhi and Ambedkar on representation\n• 1942 — Quit India Movement with the "Do or Die" slogan\n• 1947 — Independence on August 15',
        highlight: 'The Dandi March (1930) — Gandhi marched 240 miles from Sabarmati to Dandi to break the salt law.'
      },
      {
        heading: 'The Three Battles of Panipat',
        content: 'Panipat in Haryana was the site of three decisive battles that shaped Indian history:\n\n• First Battle of Panipat (1526): Babur defeated Ibrahim Lodi, establishing the Mughal Empire. Babur used a revolutionary combination of cannons (topkhana) and cavalry tactics.\n• Second Battle of Panipat (1556): Akbar\'s regent Bairam Khan defeated Hemu (Hemchandra Vikramaditya), consolidating Mughal power.\n• Third Battle of Panipat (1761): Ahmad Shah Abdali\'s Durrani Empire defeated the Maratha Confederacy under Sadashivrao Bhau. This battle ended Maratha ambitions of political supremacy in North India.',
      },
    ],
    keyPoints: [
      'Indus Valley sites: Harappa, Mohenjo-daro, Dholavira, Lothal, Kalibangan',
      'INC founded in 1885 by A.O. Hume; first President was W.C. Bonnerjee',
      'Three Battles of Panipat: 1526, 1556, and 1761',
      'Jallianwala Bagh Massacre — April 13, 1919 — General Dyer',
      'Quit India Movement — August 8, 1942 — "Do or Die" slogan',
      'Champaran Satyagraha (1917) was Gandhi\'s first Satyagraha in India',
    ],
  },
  {
    id: 'ga__geography',
    title: 'Geography & Environment',
    subjectId: 'general_awareness',
    introduction: 'India\'s geography is remarkably diverse — from the Himalayas in the north to coastal plains in the south, from the Thar Desert in the west to tropical rainforests in the east. Understanding rivers, peaks, passes, lakes, and climate zones is essential for competitive exams.',
    sections: [
      {
        heading: 'Rivers of India',
        content: 'India has numerous major river systems:\n\n• Ganga — Longest river system, originates from Gangotri glacier in Uttarakhand\n• Brahmaputra — Called Tsangpo in Tibet, enters India through Arunachal Pradesh\n• Godavari — Largest peninsular river, called the "Dakshin Ganga"\n• Damodar — Known as the "Sorrow of Bengal" due to frequent floods\n• Kosi — Known as the "Sorrow of Bihar"\n\nThe Damodar Valley Corporation (DVC), established in 1948, was India\'s first multipurpose river valley project, modeled after the Tennessee Valley Authority (TVA) of the USA.',
        highlight: 'Damodar is the "Sorrow of Bengal"; Kosi is the "Sorrow of Bihar".'
      },
      {
        heading: 'Notable Lakes & Geographic Features',
        content: 'India has several significant lakes and geographic landmarks:\n\n• Wular Lake (J&K) — Largest freshwater natural lake in India\n• Chilika Lake (Odisha) — Largest brackish water lagoon, first Ramsar Site\n• Vembanad Lake (Kerala) — Longest lake in India\n• Loktak Lake (Manipur) — Largest freshwater lake in NE India, famous for floating Phumdis\n• Majuli (Assam) — World\'s largest river island on the Brahmaputra\n\nImportant mountain passes include Nathu La (Sikkim), Zoji La (J&K), Shipki La (Himachal Pradesh), and Rohtang Pass (Himachal Pradesh).',
      },
      {
        heading: 'Atmospheric Layers & Climate',
        content: 'Earth\'s atmosphere consists of five layers:\n\n• Troposphere (0–12 km) — Where weather occurs; temperature decreases with altitude\n• Stratosphere (12–50 km) — Contains the ozone layer that absorbs UV radiation\n• Mesosphere (50–80 km) — Meteors burn up here\n• Thermosphere (80–700 km) — Northern/Southern lights occur here\n• Exosphere (700+ km) — Gradual transition to outer space\n\nThe ozone layer in the stratosphere is crucial for life on Earth as it absorbs harmful UV-B and UV-C radiation.',
        highlight: 'The Stratosphere (12–50 km) contains the ozone layer that shields Earth from UV radiation.'
      },
    ],
    keyPoints: [
      'Wular Lake (J&K) — largest freshwater natural lake in India',
      'Chilika Lake (Odisha) — largest brackish water lagoon, first Ramsar Site',
      'Majuli (Assam) — world\'s largest river island on the Brahmaputra',
      'Kanchenjunga — third highest peak, highest entirely within Indian territory',
      'Anamudi — highest peak in the Western Ghats (2,695 m)',
      'The ozone layer is located in the Stratosphere (12–50 km altitude)',
    ],
  },
  {
    id: 'ga__economy',
    title: 'Indian Economy',
    subjectId: 'general_awareness',
    introduction: 'Understanding India\'s economic framework — from monetary policy by the RBI to fiscal policy and taxation — is fundamental for competitive exams. Key concepts include repo rates, GST, inflation targeting, and budgetary processes.',
    sections: [
      {
        heading: 'Monetary Policy & the RBI',
        content: 'The Reserve Bank of India (RBI) manages monetary policy to control inflation and ensure economic stability.\n\nKey policy rates:\n• Repo Rate — Rate at which RBI lends to commercial banks against government securities. This is the primary tool for controlling inflation.\n• Reverse Repo Rate — Rate at which RBI borrows from commercial banks. Used to absorb excess liquidity.\n• Bank Rate — Rate for long-term lending by RBI (no collateral required).\n• Cash Reserve Ratio (CRR) — Percentage of deposits banks must maintain with RBI as cash.\n• Statutory Liquidity Ratio (SLR) — Percentage of deposits banks must invest in approved securities.',
        highlight: 'Repo Rate is the primary tool used by RBI to control inflation and manage liquidity.'
      },
      {
        heading: 'Goods and Services Tax (GST)',
        content: 'GST was implemented on July 1, 2017, replacing multiple indirect taxes with a unified national tax structure. The Kelkar Task Force (2003) originally recommended a comprehensive national GST.\n\nGST has five rate slabs: 0%, 5%, 12%, 18%, and 28%. The GST Council, chaired by the Union Finance Minister with state finance ministers as members, decides on GST rates and administration.\n\nThe 101st Constitutional Amendment Act enabled the introduction of GST by inserting Article 246A into the Constitution.',
      },
    ],
    keyPoints: [
      'Repo Rate — rate at which RBI lends to banks against govt securities',
      'GST implemented on July 1, 2017 — five slabs: 0%, 5%, 12%, 18%, 28%',
      'Kelkar Task Force (2003) recommended the GST framework',
      '101st Constitutional Amendment enabled GST (Article 246A)',
      'CRR is the cash reserve banks must maintain with RBI',
      'The annual Union Budget is presented under Article 112 of the Constitution',
    ],
  },
  {
    id: 'ga__static_gk',
    title: 'Static GK & Honors',
    subjectId: 'general_awareness',
    introduction: 'Static General Knowledge covers national parks, classical dances, international organizations, awards, and other factual knowledge that remains constant over time.',
    sections: [
      {
        heading: 'National Parks & Wildlife Sanctuaries',
        content: 'India is home to over 100 national parks:\n\n• Kaziranga National Park (Assam) — Home to two-thirds of the world\'s Great One-Horned Rhinoceros. UNESCO World Heritage Site.\n• Jim Corbett National Park (Uttarakhand) — India\'s oldest national park (1936), famous for Bengal Tigers.\n• Gir National Park (Gujarat) — Last natural habitat of the Asiatic Lion.\n• Sundarbans National Park (West Bengal) — Largest mangrove forest, home to the Royal Bengal Tiger.\n• Periyar National Park (Kerala) — Famous for elephants and located around Periyar Lake.',
        highlight: 'Kaziranga (Assam) hosts 2/3 of the world\'s Great One-Horned Rhinoceros population.'
      },
      {
        heading: 'Classical Dance Forms & International Organizations',
        content: 'India recognizes 8 classical dance forms:\n• Bharatanatyam — Tamil Nadu\n• Kathakali — Kerala\n• Kathak — Northern India (Uttar Pradesh)\n• Odissi — Odisha\n• Kuchipudi — Andhra Pradesh\n• Mohiniyattam — Kerala\n• Sattriya — Assam\n• Manipuri — Manipur\n\nKey international organizations and their HQs:\n• IMF & World Bank — Washington D.C., USA\n• WTO — Geneva, Switzerland\n• WHO — Geneva, Switzerland\n• UNESCO — Paris, France\n• ICJ — The Hague, Netherlands\n• ADB — Manila, Philippines',
      },
    ],
    keyPoints: [
      'Kaziranga (Assam) — Great One-Horned Rhinoceros; Jim Corbett (Uttarakhand) — oldest park',
      'Gir (Gujarat) — only Asiatic Lion habitat; Sundarbans — largest mangrove forest',
      'Eight classical dances: Bharatanatyam, Kathakali, Kathak, Odissi, Kuchipudi, Mohiniyattam, Sattriya, Manipuri',
      'IMF & World Bank → Washington D.C.; WTO & WHO → Geneva; UNESCO → Paris',
      'ICJ (International Court of Justice) → The Hague, Netherlands',
    ],
  },
];

const scienceChapters: ChapterContent[] = [
  {
    id: 'sci__mechanics',
    title: 'Mechanics & Motion',
    subjectId: 'science',
    introduction: 'Mechanics is the branch of physics dealing with the motion of objects and the forces acting upon them. Newton\'s three laws of motion form the backbone of classical mechanics.',
    sections: [
      {
        heading: 'Newton\'s Three Laws of Motion',
        content: 'First Law (Law of Inertia): An object at rest stays at rest, and an object in motion continues in uniform motion unless acted upon by an external unbalanced force. Example: Passengers lurch forward when a bus brakes suddenly.\n\nSecond Law: Force equals mass times acceleration (F = ma). The rate of change of momentum is proportional to the applied force. Unit of force is Newton (N = kg·m/s²).\n\nThird Law: For every action, there is an equal and opposite reaction. Example: A rocket propels forward by expelling exhaust gases backward.',
        highlight: 'Newton\'s Second Law: F = ma (Force = Mass × Acceleration)'
      },
      {
        heading: 'Gravity, Weight & Motion Under Gravity',
        content: 'Acceleration due to gravity on Earth\'s surface is approximately g ≈ 9.8 m/s². The escape velocity from Earth is 11.2 km/s — the minimum speed needed for an object to break free of Earth\'s gravitational pull without further propulsion.\n\nKey equations of motion under gravity:\n• v = u + gt\n• s = ut + ½gt²\n• v² = u² + 2gs\n\nWhere u = initial velocity, v = final velocity, g = acceleration due to gravity, s = displacement, t = time.',
        highlight: 'Earth\'s escape velocity = 11.2 km/s; g ≈ 9.8 m/s²'
      },
      {
        heading: 'Work, Energy & Power',
        content: 'Work is done when a force causes displacement: W = F × d × cos(θ). The SI unit of work is the Joule (J).\n\nKinetic Energy (KE) = ½mv² — energy possessed by a moving object.\nPotential Energy (PE) = mgh — energy due to position in a gravitational field.\n\nPower is the rate of doing work: P = W/t. The SI unit of power is the Watt (W = J/s).\n\nThe Law of Conservation of Energy states that energy can neither be created nor destroyed, only transformed from one form to another. The total energy of an isolated system remains constant.',
      },
    ],
    keyPoints: [
      'First Law — Inertia; Second Law — F = ma; Third Law — Action-Reaction',
      'g ≈ 9.8 m/s² on Earth\'s surface; escape velocity = 11.2 km/s',
      'KE = ½mv²; PE = mgh; Power = Work/Time',
      'SI unit of force is Newton (N); energy is Joule (J); power is Watt (W)',
      'Conservation of Energy: Energy cannot be created or destroyed',
    ],
  },
  {
    id: 'sci__optics',
    title: 'Optics & Waves',
    subjectId: 'science',
    introduction: 'Optics deals with the behavior of light — reflection, refraction, dispersion, and the nature of electromagnetic radiation. Waves describe the propagation of energy through media.',
    sections: [
      {
        heading: 'Light: Reflection & Refraction',
        content: 'Light travels in straight lines (rectilinear propagation). The speed of light in vacuum is approximately 3 × 10⁸ m/s.\n\nReflection follows two laws: (1) angle of incidence equals angle of reflection, and (2) the incident ray, reflected ray, and normal all lie in the same plane.\n\nConvex mirrors always form virtual, erect, and diminished images — used in vehicle rear-view mirrors to provide a wider field of view. Concave mirrors can form both real and virtual images — used in torches, headlights, and shaving mirrors.\n\nRefraction is the bending of light when passing between media of different optical densities. Snell\'s Law: n₁ sin(i) = n₂ sin(r).',
        highlight: 'Convex mirrors are used in rear-view mirrors — they provide a wider field of view.'
      },
      {
        heading: 'Scattering & Color of the Sky',
        content: 'Lord Rayleigh explained why the sky appears blue using Rayleigh scattering. The intensity of scattered light is inversely proportional to the fourth power of wavelength (I ∝ 1/λ⁴). Since blue light has a shorter wavelength than red, it is scattered much more (about 5.5 times more than red light).\n\nAt sunset and sunrise, light travels through a thicker layer of atmosphere, scattering away most blue light. Only longer wavelengths (red, orange) reach our eyes, which is why the sky appears reddish at these times.',
        highlight: 'Rayleigh Scattering: I ∝ 1/λ⁴ — blue light scatters ~5.5× more than red light.'
      },
      {
        heading: 'Sound Waves',
        content: 'Sound waves are longitudinal mechanical waves that require a medium (solid, liquid, or gas) to propagate. Sound cannot travel through vacuum.\n\nSpeed of sound varies by medium:\n• In air (at 20°C): ~343 m/s\n• In water: ~1,484 m/s\n• In steel: ~5,960 m/s\n\nThe human audible range is 20 Hz to 20,000 Hz. Sounds below 20 Hz are infrasonic; above 20,000 Hz are ultrasonic. SONAR uses ultrasonic waves to detect underwater objects.',
      },
    ],
    keyPoints: [
      'Speed of light in vacuum ≈ 3 × 10⁸ m/s',
      'Convex mirror — always virtual, erect, diminished image; used in rear-view mirrors',
      'Rayleigh scattering explains blue sky: I ∝ 1/λ⁴',
      'Sound is a longitudinal mechanical wave — cannot travel in vacuum',
      'Human audible range: 20 Hz – 20,000 Hz; SONAR uses ultrasound',
    ],
  },
  {
    id: 'sci__periodic_table',
    title: 'Periodic Table & Bonding',
    subjectId: 'science',
    introduction: 'The Periodic Table organizes elements by atomic number, electron configuration, and recurring chemical properties. Understanding element groups, bonding types, and chemical reactions is fundamental.',
    sections: [
      {
        heading: 'Structure of the Modern Periodic Table',
        content: 'The Modern Periodic Table (Mendeleev\'s improved version) arranges 118 elements by increasing atomic number. It has 18 groups (vertical columns) and 7 periods (horizontal rows).\n\nKey groups:\n• Group 1 — Alkali metals (Li, Na, K, etc.) — highly reactive, form strong bases\n• Group 2 — Alkaline earth metals (Mg, Ca, etc.)\n• Group 17 — Halogens (F, Cl, Br, I) — highly reactive non-metals\n• Group 18 — Noble gases (He, Ne, Ar) — inert due to complete valence shells\n\nMercury (Hg) is the only metal that is liquid at room temperature (25°C). Bromine is the only non-metal that is liquid at room temperature.',
        highlight: 'Mercury (Hg) — only metal liquid at room temperature; Bromine — only non-metal liquid at room temperature.'
      },
      {
        heading: 'Chemical Bonding & Reactions',
        content: 'There are three main types of chemical bonds:\n\n• Ionic Bonds — formed by transfer of electrons between a metal and non-metal (e.g., NaCl)\n• Covalent Bonds — formed by sharing of electrons between non-metals (e.g., H₂O, CO₂)\n• Metallic Bonds — delocalized electron sea holding metal atoms together\n\nImportant chemical compounds:\n• Baking Soda — NaHCO₃ (Sodium Bicarbonate)\n• Washing Soda — Na₂CO₃·10H₂O (Sodium Carbonate)\n• Plaster of Paris — CaSO₄·½H₂O\n• Bleaching Powder — Ca(OCl)Cl',
      },
    ],
    keyPoints: [
      'Modern Periodic Table: 118 elements, 18 groups, 7 periods',
      'Mercury — only metal liquid at 25°C; Bromine — only non-metal liquid at 25°C',
      'Baking Soda = NaHCO₃; Plaster of Paris = CaSO₄·½H₂O',
      'Ionic bonds = electron transfer; Covalent bonds = electron sharing',
      'Noble gases (Group 18) are inert due to complete outer electron shells',
    ],
  },
  {
    id: 'sci__acids_bases',
    title: 'Acids, Bases & Salts',
    subjectId: 'science',
    introduction: 'Acids and bases are fundamental chemical substances. Their interactions produce salts and water in neutralization reactions. The pH scale measures acidity and alkalinity.',
    sections: [
      {
        heading: 'pH Scale & Human Body Chemistry',
        content: 'The pH scale ranges from 0 to 14:\n• pH < 7 — Acidic (e.g., HCl, H₂SO₄, lemon juice)\n• pH = 7 — Neutral (pure water)\n• pH > 7 — Basic/Alkaline (e.g., NaOH, soap, baking soda)\n\nNormal human arterial blood pH is maintained between 7.35–7.45 (slightly alkaline). Gastric juice in the stomach has a pH of about 1.5–3.5 (highly acidic, primarily HCl).\n\nIndicators like litmus paper turn red in acids and blue in bases. Phenolphthalein is colorless in acids and turns pink in bases.',
        highlight: 'Human blood pH = 7.35–7.45 (slightly alkaline); Stomach acid pH ≈ 1.5–3.5'
      },
      {
        heading: 'Important Reactions',
        content: 'Key acid-base and metal reactions:\n\n• Zinc + HCl → ZnCl₂ + H₂ (hydrogen gas evolved)\n• Iron rusting is a slow redox reaction: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ → 2Fe₂O₃·3H₂O (rust)\n• Neutralization: HCl + NaOH → NaCl + H₂O\n\nThe atmosphere contains approximately 78% Nitrogen, 21% Oxygen, and 0.93% Argon. CO₂ constitutes about 0.04%.',
      },
    ],
    keyPoints: [
      'pH scale: 0–14; below 7 = acidic, above 7 = basic, 7 = neutral',
      'Blood pH: 7.35–7.45; Stomach acid: pH ≈ 1.5–3.5',
      'Zn + HCl produces hydrogen gas; Iron rusting is a redox reaction',
      'Atmosphere: 78% N₂, 21% O₂, 0.93% Argon',
    ],
  },
  {
    id: 'sci__cell_biology',
    title: 'Cell Biology & Genetics',
    subjectId: 'science',
    introduction: 'The cell is the basic structural and functional unit of life. Understanding cell organelles, DNA, and genetic inheritance is essential for biology sections of competitive exams.',
    sections: [
      {
        heading: 'Cell Organelles & Their Functions',
        content: 'Key cell organelles:\n\n• Mitochondria — "Powerhouse of the cell" — produces ATP through cellular respiration\n• Nucleus — Contains DNA; controls cell activities\n• Ribosome — Site of protein synthesis\n• Endoplasmic Reticulum (ER) — Rough ER has ribosomes for protein synthesis; Smooth ER synthesizes lipids\n• Golgi Apparatus — Packages and distributes proteins and lipids\n• Chloroplast — Found only in plant cells; site of photosynthesis\n• Cell Wall — Present in plant cells (cellulose), absent in animal cells\n• Lysosomes — "Suicide bags" — contain digestive enzymes for waste disposal',
        highlight: 'Mitochondria = "Powerhouse of the cell"; Lysosomes = "Suicide bags"'
      },
      {
        heading: 'DNA, Genetics & Heredity',
        content: 'DNA (Deoxyribonucleic Acid) is the hereditary material in most organisms. Its double-helix structure was discovered by Watson and Crick in 1953.\n\nKey genetic concepts:\n• Genes are segments of DNA that code for proteins\n• Chromosomes: Humans have 46 chromosomes (23 pairs)\n• Sex determination: XX = female, XY = male (father determines sex)\n• Dominant genes are expressed over recessive genes\n• Gregor Mendel — "Father of Genetics" — studied pea plants\n\nBlood types are determined by the ABO gene system. O negative is the universal donor; AB positive is the universal recipient.',
      },
    ],
    keyPoints: [
      'Mitochondria — produces ATP; nicknamed "Powerhouse of the cell"',
      'Humans have 46 chromosomes (23 pairs); sex determined by father (XX/XY)',
      'Watson & Crick discovered DNA double-helix structure (1953)',
      'O⁻ = universal donor; AB⁺ = universal recipient',
      'Gregor Mendel = "Father of Genetics"',
    ],
  },
  {
    id: 'sci__physiology',
    title: 'Human Physiology',
    subjectId: 'science',
    introduction: 'Human physiology studies how the body\'s organ systems function — from circulation and respiration to digestion and the nervous system.',
    sections: [
      {
        heading: 'Circulatory & Respiratory Systems',
        content: 'The heart is a four-chambered muscular organ that pumps blood through two circuits:\n• Pulmonary circulation: Right ventricle → Lungs → Left atrium (deoxygenated → oxygenated)\n• Systemic circulation: Left ventricle → Body → Right atrium\n\nPulmonary veins are the only veins that carry oxygenated blood (from lungs to left atrium).\nPulmonary arteries are the only arteries that carry deoxygenated blood (from heart to lungs).\n\nLungs facilitate gas exchange via alveoli. Oxygen diffuses into blood; CO₂ diffuses out.',
        highlight: 'Pulmonary veins carry oxygenated blood — the only veins to do so.'
      },
      {
        heading: 'The Nervous System & Hormones',
        content: 'The nervous system has two main divisions:\n• Central Nervous System (CNS): Brain + Spinal cord\n• Peripheral Nervous System (PNS): Nerves extending to the body\n\nKey brain parts:\n• Cerebrum — Thinking, memory, voluntary actions\n• Cerebellum — Balance and coordination\n• Medulla Oblongata — Controls involuntary actions (heartbeat, breathing, swallowing)\n\nImportant hormones:\n• Insulin — Produced by beta cells of pancreas; regulates blood sugar. Deficiency causes Diabetes Mellitus.\n• Vitamin D — Synthesized in skin via UV-B sunlight exposure; essential for calcium absorption.',
        highlight: 'Medulla Oblongata controls involuntary actions: heartbeat, breathing, swallowing.'
      },
      {
        heading: 'The Excretory System',
        content: 'The kidneys are the primary excretory organs, filtering blood to produce urine. Each kidney contains approximately 1 million nephrons — the functional units of the kidney.\n\nNephron structure: Bowman\'s capsule → Proximal tubule → Loop of Henle → Distal tubule → Collecting duct.\n\nThe kidneys filter about 180 liters of blood daily, producing approximately 1.5–2 liters of urine. They maintain fluid balance, electrolyte levels, and blood pH.',
      },
    ],
    keyPoints: [
      'Pulmonary veins carry oxygenated blood; pulmonary arteries carry deoxygenated blood',
      'Medulla oblongata controls involuntary functions',
      'Insulin from pancreatic beta cells regulates blood sugar',
      'Nephron is the functional unit of the kidney (~1 million per kidney)',
      'Vitamin D is synthesized in skin via UV-B exposure',
    ],
  },
];

const englishChapters: ChapterContent[] = [
  {
    id: 'eng__error_spotting',
    title: 'Spotting the Error',
    subjectId: 'english',
    introduction: 'Error spotting questions test your knowledge of English grammar rules. You must identify grammatical errors in given sentences — covering subject-verb agreement, tenses, articles, prepositions, and more.',
    sections: [
      {
        heading: 'Subject-Verb Agreement Rules',
        content: 'The verb must agree with the subject in number (singular/plural):\n\n• "Neither the teacher nor the students were present." — With "neither...nor" and "either...or", the verb agrees with the nearest subject (Rule of Proximity).\n• "Each of the boys has completed his homework." — "Each" is a distributive pronoun and always takes a singular verb.\n• "The committee has decided unanimously." — Collective nouns take singular verbs when acting as a unit.\n• "A number of students are absent." (plural) vs. "The number of students is increasing." (singular)',
        highlight: 'Rule of Proximity: With "neither...nor" / "either...or", the verb agrees with the nearest subject.'
      },
      {
        heading: 'Common Error Patterns',
        content: 'Frequently tested error types:\n\n• Faulty comparisons: "The climate of Shimla is colder than Delhi." ✗ → "...than that of Delhi." ✓\n• Correlative conjunctions: "Scarcely had he arrived when it started raining." (Use "when/before", not "than")\n• Redundancy: "Return back" ✗ → "Return" ✓; "Repeat again" ✗ → "Repeat" ✓\n• Wrong prepositions: "Dispose off" ✗ → "Dispose of" ✓; "Comply to" ✗ → "Comply with" ✓\n• Articles: Use "an" before vowel sounds: "an hour" (h is silent), "a university" (sounds like "yoo")',
      },
    ],
    keyPoints: [
      '"Each" and "Every" always take singular verbs',
      'Rule of Proximity applies to "neither...nor" and "either...or"',
      'Faulty comparison: Always compare like with like ("...than that of...")',
      '"Scarcely...when/before" NOT "than"',
      '"Dispose of" (not "off"); "Comply with" (not "to")',
      'Article usage: "an hour" but "a university"',
    ],
  },
  {
    id: 'eng__vocabulary',
    title: 'Vocabulary & Antonyms',
    subjectId: 'english',
    introduction: 'A strong vocabulary is essential for competitive exams. This chapter covers important words, their meanings, synonyms, and antonyms frequently asked in SSC, RRB, and banking exams.',
    sections: [
      {
        heading: 'High-Frequency Vocabulary',
        content: 'Important words and their meanings:\n\n• EPHEMERAL — Lasting for a very short time. Antonym: Perpetual, Enduring\n• CANDID — Frank, outspoken, honest. Antonym: Evasive, Diplomatic\n• METICULOUS — Showing great attention to detail. Antonym: Careless, Sloppy\n• GARRULOUS — Excessively talkative. Antonym: Taciturn, Reticent\n• LACONIC — Using very few words; concise. Antonym: Verbose, Loquacious\n• UBIQUITOUS — Present, appearing, or found everywhere. Antonym: Rare, Scarce\n• PRAGMATIC — Dealing with things sensibly and realistically. Antonym: Idealistic\n• AMELIORATE — To make something better; improve. Antonym: Worsen, Deteriorate\n• BELLIGERENT — Hostile, aggressive. Antonym: Peaceful, Amicable\n• EPITOME — A perfect example of a quality or type',
        highlight: 'EPHEMERAL = short-lived (antonym: Perpetual); LACONIC = concise (antonym: Verbose)'
      },
      {
        heading: 'Confusing Word Pairs',
        content: 'Words often confused in exams:\n\n• Affect (verb: to influence) vs. Effect (noun: result)\n• Principal (head/main) vs. Principle (rule/belief)\n• Stationary (not moving) vs. Stationery (writing materials)\n• Complement (to complete) vs. Compliment (to praise)\n• Emigrate (leave a country) vs. Immigrate (enter a country)\n• Elicit (to draw out) vs. Illicit (illegal)\n• Desert (abandon; sandy area) vs. Dessert (sweet dish)',
      },
    ],
    keyPoints: [
      'EPHEMERAL = short-lived; GARRULOUS = talkative; LACONIC = concise',
      'UBIQUITOUS = found everywhere; PRAGMATIC = practical; BELLIGERENT = aggressive',
      'Affect = verb; Effect = noun (mostly)',
      'Principal = person/main; Principle = rule',
      'Stationary = still; Stationery = paper/pens',
    ],
  },
  {
    id: 'eng__idioms',
    title: 'Idioms & Phrasal Verbs',
    subjectId: 'english',
    introduction: 'Idioms are expressions whose meaning cannot be deduced from the literal meaning of their individual words. Phrasal verbs combine a verb with a preposition or adverb to create a new meaning.',
    sections: [
      {
        heading: 'Commonly Tested Idioms',
        content: 'Important idioms and their meanings:\n\n• "To burn the midnight oil" — To study or work late into the night\n• "A bolt from the blue" — A sudden, unexpected event\n• "To cry over spilt milk" — To regret something that has already happened\n• "To beat around the bush" — To avoid talking about the main topic\n• "To let the cat out of the bag" — To reveal a secret accidentally\n• "Once in a blue moon" — Very rarely\n• "To pull someone\'s leg" — To joke with someone\n• "To bury the hatchet" — To make peace, end a conflict\n• "A blessing in disguise" — Something that seems bad but turns out good\n• "To bite the bullet" — To endure a painful situation bravely',
        highlight: '"To burn the midnight oil" = To study or work late into the night'
      },
      {
        heading: 'Essential Phrasal Verbs',
        content: 'Frequently tested phrasal verbs:\n\n• Break down — Stop functioning / Collapse emotionally\n• Bring up — Raise a child / Introduce a topic\n• Call off — Cancel\n• Carry out — Execute, perform\n• Come across — Find by chance\n• Give up — Stop trying, surrender\n• Look after — Take care of\n• Put off — Postpone\n• Run out of — Exhaust the supply\n• Turn down — Reject\n• Make up — Invent (a story) / Reconcile after an argument',
      },
    ],
    keyPoints: [
      '"Burn the midnight oil" = study late; "Bolt from the blue" = sudden surprise',
      '"Cry over spilt milk" = regret what\'s done; "Beat around the bush" = avoid the topic',
      'Call off = cancel; Carry out = execute; Put off = postpone; Turn down = reject',
      'Break down = stop functioning; Come across = find by chance',
    ],
  },
  {
    id: 'eng__one_word',
    title: 'One Word Substitution',
    subjectId: 'english',
    introduction: 'One word substitution involves replacing a group of words or a phrase with a single word that conveys the same meaning. This is a high-scoring topic in competitive exams.',
    sections: [
      {
        heading: 'People & Personalities',
        content: 'One word for groups of words describing people:\n\n• Optimist — One who looks at the bright side of things\n• Pessimist — One who takes the worst view of everything\n• Egoist — One who thinks only about oneself\n• Altruist — One who works selflessly for the welfare of others\n• Philanthropist — A person who donates money for good causes\n• Misogynist — One who hates women\n• Misanthrope — One who hates all people\n• Ambidextrous — One who can use both hands equally well\n• Polyglot — A person who knows many languages\n• Stoic — A person who can endure pain without showing feelings',
        highlight: 'Optimist = sees the bright side; Altruist = selflessly helps others; Polyglot = knows many languages'
      },
      {
        heading: 'Actions, States & Things',
        content: 'One word substitutions for actions and concepts:\n\n• Panacea — A cure for all diseases or problems\n• Amnesty — A general pardon for political offenses\n• Epitaph — Words inscribed on a tombstone\n• Obituary — A notice of a person\'s death in a newspaper\n• Somnambulism — Walking in sleep\n• Plagiarism — Using someone else\'s work as your own\n• Omnivore — An animal that eats both plants and meat\n• Herbivore — An animal that eats only plants\n• Genocide — Deliberate killing of a large group of people\n• Utopia — An imaginary perfect place or state',
      },
    ],
    keyPoints: [
      'Panacea = cure for all; Amnesty = general pardon; Plagiarism = stealing someone\'s work',
      'Ambidextrous = uses both hands; Polyglot = knows many languages',
      'Somnambulism = sleepwalking; Epitaph = words on a tombstone',
      'Omnivore = eats both; Herbivore = eats plants; Carnivore = eats meat',
    ],
  },
  {
    id: 'eng__sentence_improvement',
    title: 'Sentence Improvement',
    subjectId: 'english',
    introduction: 'Sentence improvement questions require you to identify the part of a sentence that can be improved for grammatical correctness, clarity, or idiomatic expression.',
    sections: [
      {
        heading: 'Conditional Sentences',
        content: 'English has four types of conditional sentences:\n\n• Zero Conditional: If + present simple, present simple → General truths. "If water reaches 100°C, it boils."\n• First Conditional: If + present simple, will + base verb → Real future possibility. "If it rains, we will cancel the picnic."\n• Second Conditional: If + past simple, would + base verb → Hypothetical/unreal present. "If I were rich, I would travel the world."\n• Third Conditional: If + past perfect, would have + past participle → Unreal past. "If he had worked hard, he would have passed."\n\nNote: "If I were" (not "was") is correct in the second conditional — this is the subjunctive mood.',
        highlight: 'Third Conditional: If + past perfect, would have + past participle (for unreal past situations)'
      },
      {
        heading: 'Voice Transformation',
        content: 'Active to Passive voice conversion:\n\nActive: Subject + Verb + Object → Passive: Object + be + Past Participle + by Subject\n\nExamples:\n• Active: "She writes a letter." → Passive: "A letter is written by her."\n• Active: "They are building a house." → Passive: "A house is being built by them."\n• Active: "He will complete the work." → Passive: "The work will be completed by him."\n\nKey rules:\n• The tense of "be" must match the original tense\n• Intransitive verbs (sleep, arrive, die) cannot be made passive\n• Modal verbs: "can/may/must + be + past participle"',
      },
    ],
    keyPoints: [
      'Third Conditional: "If he had + PP, he would have + PP" — for unreal past',
      'Subjunctive mood: "If I were" (not "was") in second conditional',
      'Passive: Object + be (matching tense) + past participle + by + subject',
      'Intransitive verbs cannot be converted to passive voice',
      'Modals in passive: can/may/must + be + past participle',
    ],
  },
  {
    id: 'eng__active_passive',
    title: 'Active & Passive Voice',
    subjectId: 'english',
    introduction: 'Understanding voice transformation is crucial. In active voice, the subject performs the action. In passive voice, the subject receives the action. Mastering all tense transformations is key.',
    sections: [
      {
        heading: 'Tense-wise Transformation Table',
        content: 'Quick reference for voice changes across tenses:\n\n• Simple Present: writes → is written\n• Present Continuous: is writing → is being written\n• Present Perfect: has written → has been written\n• Simple Past: wrote → was written\n• Past Continuous: was writing → was being written\n• Past Perfect: had written → had been written\n• Simple Future: will write → will be written\n• Future Perfect: will have written → will have been written',
      },
      {
        heading: 'Special Cases',
        content: 'Important special cases in voice transformation:\n\n• Imperative sentences: "Close the door." → "Let the door be closed." / "You are requested to close the door."\n• Questions: "Did you write the letter?" → "Was the letter written by you?"\n• Double objects: "She gave me a book." → "A book was given to me by her." OR "I was given a book by her."\n• Verbs with prepositions: "People look up to her." → "She is looked up to (by people)."',
      },
    ],
    keyPoints: [
      'Simple Present: "writes" → "is written"; Past: "wrote" → "was written"',
      'Imperative: "Close the door" → "Let the door be closed"',
      'Double object sentences can have two passive forms',
      'Future Perfect: "will have written" → "will have been written"',
    ],
  },
];

const mathChapters: ChapterContent[] = [
  {
    id: 'math__percentage',
    title: 'Percentages & Profit-Loss',
    subjectId: 'mathematics',
    introduction: 'Percentage and Profit-Loss problems form the backbone of quantitative aptitude. These concepts are applied extensively in real-life calculations — discounts, taxation, interest rates, and business problems.',
    sections: [
      {
        heading: 'Percentage Fundamentals',
        content: 'Percentage means "per hundred." To convert a fraction to percentage, multiply by 100.\n\nKey formulas:\n• Percentage = (Value / Total) × 100\n• Percentage change = [(New - Old) / Old] × 100\n• If a value increases by R%, new value = Original × (1 + R/100)\n• If a value decreases by R%, new value = Original × (1 - R/100)\n\nExample: If a student scores 72 out of 90, percentage = (72/90) × 100 = 80%',
        highlight: 'Percentage Change = [(New - Old) / Old] × 100'
      },
      {
        heading: 'Profit, Loss & Discount',
        content: 'Important formulas:\n\n• Profit = SP - CP (when SP > CP)\n• Loss = CP - SP (when CP > SP)\n• Profit% = (Profit / CP) × 100\n• Loss% = (Loss / CP) × 100\n• SP = CP × (1 + Profit%/100) or CP × (1 - Loss%/100)\n• Discount% = (Marked Price - SP) / Marked Price × 100\n\nExample: If CP = ₹700 and profit = 20%, then SP = 700 × 1.20 = ₹840\n\nSuccessive discounts: Two successive discounts of 20% and 10% are NOT equal to 30%. Effective discount = 20 + 10 - (20×10/100) = 28%',
        highlight: 'SP at 20% profit: SP = CP × 1.20; Successive discounts ≠ sum of individual discounts.'
      },
    ],
    keyPoints: [
      'Profit% = (Profit/CP) × 100; Loss% = (Loss/CP) × 100',
      'SP at R% profit = CP × (1 + R/100)',
      'Successive discounts of a% and b%: effective = a + b - (ab/100)',
      'If price increases by R%, consumption must decrease by [R/(100+R)] × 100 to keep expenditure same',
    ],
  },
  {
    id: 'math__ratio',
    title: 'Ratio, Mixture & Proportion',
    subjectId: 'mathematics',
    introduction: 'Ratio and proportion problems test your ability to compare quantities and find relationships between numbers. Mixture problems are a practical application of ratios.',
    sections: [
      {
        heading: 'Ratio & Proportion',
        content: 'A ratio a:b compares two quantities of the same unit. A proportion states that two ratios are equal: a/b = c/d.\n\nKey properties:\n• If a:b = c:d, then ad = bc (cross multiplication)\n• Compound ratio of a:b and c:d is ac:bd\n• Duplicate ratio of a:b is a²:b²\n• Sub-duplicate ratio of a:b is √a:√b\n\nExample: If x:y = 3:5, and 6 is added to both, ratio becomes 2:3. Then (3k+6)/(5k+6) = 2/3 → 9k+18 = 10k+12 → k = 6. So x = 18, y = 30.',
        highlight: 'Cross multiplication: If a:b = c:d, then ad = bc'
      },
      {
        heading: 'Mixture & Alligation',
        content: 'The rule of alligation is used to find the ratio in which two or more ingredients at different prices (or concentrations) must be mixed to produce a mixture at a given price.\n\nAlligation formula:\n(Cheaper Quantity) : (Dearer Quantity) = (Dearer Price - Mean Price) : (Mean Price - Cheaper Price)\n\nExample: Mix milk at ₹20/L with water (₹0/L) to get mixture at ₹16/L.\nRatio = (20-16) : (16-0) = 4:16 = 1:4. So mix 1 part milk with 4 parts water? No — ratio is Milk:Water = (16-0):(20-16) = 16:4 = 4:1.',
      },
    ],
    keyPoints: [
      'Proportion: if a/b = c/d, then ad = bc',
      'Alligation: Ratio = (Dearer - Mean) : (Mean - Cheaper)',
      'Compound ratio of a:b and c:d = ac:bd',
      'When equal quantities added to both terms, ratio changes toward 1:1',
    ],
  },
  {
    id: 'math__time_speed',
    title: 'Time, Speed & Distance',
    subjectId: 'mathematics',
    introduction: 'Time, Speed & Distance problems are fundamental to quantitative aptitude. The basic relationship is Distance = Speed × Time. Unit conversion between km/h and m/s is frequently tested.',
    sections: [
      {
        heading: 'Basic Formulas & Conversions',
        content: 'Fundamental relationship: Distance = Speed × Time\n\nUnit conversions:\n• km/h to m/s: multiply by 5/18\n• m/s to km/h: multiply by 18/5\n\nExample: 54 km/h = 54 × 5/18 = 15 m/s\n\nTrain problems:\n• Train crossing a pole/person: Distance = Length of train\n• Train crossing a platform: Distance = Length of train + Length of platform\n• Two trains crossing each other (opposite directions): Relative speed = Sum of speeds\n• Two trains (same direction): Relative speed = Difference of speeds\n\nExample: A 180m train at 54 km/h crosses a pole in 180/15 = 12 seconds.',
        highlight: 'km/h to m/s: multiply by 5/18; Train crossing pole: time = Length/Speed'
      },
      {
        heading: 'Average Speed & Boats',
        content: 'Average speed for a round trip (same distance, different speeds):\nAverage Speed = 2ab / (a+b), where a and b are the two speeds.\n\nNote: Average speed ≠ arithmetic mean of speeds when distances are equal.\n\nBoat & Stream problems:\n• Speed downstream = Boat speed + Stream speed\n• Speed upstream = Boat speed - Stream speed\n• Boat speed (still water) = ½(Downstream + Upstream)\n• Stream speed = ½(Downstream - Upstream)',
      },
    ],
    keyPoints: [
      'Distance = Speed × Time; km/h to m/s = ×5/18',
      'Train crossing pole: Distance = Train length; crossing platform: Length of train + platform',
      'Average speed for equal distances = 2ab/(a+b)',
      'Downstream speed = Boat + Stream; Upstream = Boat - Stream',
    ],
  },
  {
    id: 'math__time_work',
    title: 'Time & Work',
    subjectId: 'mathematics',
    introduction: 'Time and Work problems involve calculating how long it takes for one or more workers (or pipes) to complete a task. The concept of work rate (1/time) is central to solving these problems.',
    sections: [
      {
        heading: 'Basic Concepts',
        content: 'If A can complete a job in "n" days, A\'s one-day work = 1/n of the total work.\n\nWhen A and B work together:\n• Combined one-day work = 1/A + 1/B\n• Time to complete together = (A×B) / (A+B)\n\nExample: If A can do a job in 12 days and B in 18 days:\n• Together: 1/12 + 1/18 = 3/36 + 2/36 = 5/36\n• Time = 36/5 = 7.2 days\n\nPipe problems follow the same logic:\n• Inlet pipe fills at rate 1/A per hour\n• Outlet pipe empties at rate 1/B per hour\n• Net rate when both open = 1/A - 1/B',
        highlight: 'Combined work rate = 1/A + 1/B; Time together = (A×B)/(A+B)'
      },
      {
        heading: 'Efficiency & Wages',
        content: 'When work is distributed based on efficiency:\n\n• If A is twice as efficient as B, A does 2 units while B does 1 unit in the same time.\n• Wages are distributed in the ratio of work done.\n\nExample: A can complete work in 10 days, B in 15 days. If total wages are ₹5,000:\n• Ratio of work = 1/10 : 1/15 = 3:2\n• A gets ₹3,000 and B gets ₹2,000\n\nPipe problem: Pipe A fills tank in 10 hours, Pipe B empties in 15 hours.\nNet rate = 1/10 - 1/15 = (3-2)/30 = 1/30. Tank fills in 30 hours.',
      },
    ],
    keyPoints: [
      'If A finishes in n days, A\'s work per day = 1/n',
      'A and B together = (A×B)/(A+B) days',
      'Wages distributed in ratio of work done',
      'Pipe net rate = fill rate - empty rate',
    ],
  },
  {
    id: 'math__algebra',
    title: 'Algebra & Quadratics',
    subjectId: 'mathematics',
    introduction: 'Algebra forms the foundation of higher mathematics. Quadratic equations, algebraic identities, and factorization are essential topics for competitive exams.',
    sections: [
      {
        heading: 'Algebraic Identities',
        content: 'Essential identities:\n\n• (a + b)² = a² + 2ab + b²\n• (a - b)² = a² - 2ab + b²\n• a² - b² = (a+b)(a-b)\n• (a + b)³ = a³ + 3a²b + 3ab² + b³\n• a³ + b³ = (a+b)(a² - ab + b²)\n• a³ - b³ = (a-b)(a² + ab + b²)\n\nUseful derivation: If (x + 1/x) = k, then:\n• x² + 1/x² = k² - 2\n• x⁴ + 1/x⁴ = (k² - 2)² - 2\n\nExample: If (x + 1/x) = 4, then x² + 1/x² = 16 - 2 = 14',
        highlight: 'If (x + 1/x) = k, then x² + 1/x² = k² - 2'
      },
      {
        heading: 'Quadratic Equations',
        content: 'A quadratic equation is of the form ax² + bx + c = 0 (a ≠ 0).\n\nSolving methods:\n• Factorization: Split the middle term\n• Quadratic formula: x = [-b ± √(b²-4ac)] / 2a\n• Discriminant D = b² - 4ac determines nature of roots:\n  - D > 0: Two distinct real roots\n  - D = 0: Two equal real roots\n  - D < 0: No real roots (complex roots)\n\nSum of roots = -b/a; Product of roots = c/a\n\nExample: x² - 7x + 12 = 0 → (x-3)(x-4) = 0 → roots are 3 and 4',
        highlight: 'Quadratic formula: x = [-b ± √(b²-4ac)] / 2a; Sum of roots = -b/a'
      },
    ],
    keyPoints: [
      '(a+b)² = a² + 2ab + b²; (a-b)² = a² - 2ab + b²',
      'a² - b² = (a+b)(a-b)',
      'Quadratic formula: x = [-b ± √(b²-4ac)] / 2a',
      'Sum of roots = -b/a; Product of roots = c/a',
      'Discriminant D = b²-4ac: D>0 → two real roots; D=0 → equal roots; D<0 → complex',
    ],
  },
  {
    id: 'math__geometry',
    title: 'Geometry & Trigonometry',
    subjectId: 'mathematics',
    introduction: 'Geometry deals with shapes, sizes, and spatial properties. Trigonometry relates angles to side lengths in triangles. Both are heavily tested in competitive exams.',
    sections: [
      {
        heading: 'Key Geometry Formulas',
        content: 'Circle formulas:\n• Area = πr²\n• Circumference = 2πr\n• Arc length = (θ/360) × 2πr\n\nTriangle formulas:\n• Area = ½ × base × height\n• Pythagoras theorem: In a right triangle, hypotenuse² = base² + height²\n• Common Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25)\n\nRectangle: Area = l×b; Perimeter = 2(l+b)\nCube: Volume = a³; Total surface area = 6a²\nSphere: Volume = (4/3)πr³; Surface area = 4πr²\nCylinder: Volume = πr²h; CSA = 2πrh',
        highlight: 'Pythagoras: hypotenuse² = base² + height²; Common triplets: (3,4,5), (5,12,13)'
      },
      {
        heading: 'Trigonometric Ratios & Identities',
        content: 'For a right triangle with angle θ:\n• sin θ = Opposite / Hypotenuse\n• cos θ = Adjacent / Hypotenuse\n• tan θ = Opposite / Adjacent = sin θ / cos θ\n\nStandard values:\n• sin 0° = 0, sin 30° = 1/2, sin 45° = 1/√2, sin 60° = √3/2, sin 90° = 1\n• cos 0° = 1, cos 30° = √3/2, cos 45° = 1/√2, cos 60° = 1/2, cos 90° = 0\n\nFundamental identity: sin²θ + cos²θ = 1 (for all angles)\nOther identities: 1 + tan²θ = sec²θ; 1 + cot²θ = csc²θ',
        highlight: 'Fundamental identity: sin²θ + cos²θ = 1 (always holds for any angle)'
      },
    ],
    keyPoints: [
      'Circle: Area = πr², Circumference = 2πr',
      'Pythagoras: c² = a² + b²; triplets: (3,4,5), (5,12,13)',
      'sin²θ + cos²θ = 1 is the fundamental trigonometric identity',
      'sin 30° = 1/2, cos 30° = √3/2, tan 45° = 1',
      'Sphere volume = (4/3)πr³; Cylinder volume = πr²h',
    ],
  },
  {
    id: 'math__numbers',
    title: 'Number Systems',
    subjectId: 'mathematics',
    introduction: 'Number system problems test your understanding of HCF, LCM, divisibility rules, prime numbers, and remainder theorems — fundamental concepts for all quantitative sections.',
    sections: [
      {
        heading: 'HCF, LCM & Divisibility',
        content: 'HCF (Highest Common Factor): Largest number that divides all given numbers.\nLCM (Least Common Multiple): Smallest number divisible by all given numbers.\n\nRelationship: HCF × LCM = Product of two numbers (for two numbers)\n\nDivisibility rules:\n• By 2: Last digit is even (0, 2, 4, 6, 8)\n• By 3: Sum of digits is divisible by 3\n• By 4: Last two digits form a number divisible by 4\n• By 5: Last digit is 0 or 5\n• By 6: Divisible by both 2 and 3\n• By 8: Last three digits form a number divisible by 8\n• By 9: Sum of digits is divisible by 9\n• By 11: Difference of sums of alternate digits is 0 or divisible by 11',
        highlight: 'HCF × LCM = Product of two numbers; By 3: Sum of digits divisible by 3'
      },
      {
        heading: 'Remainder Problems',
        content: 'To find the greatest number that divides a, b, c leaving remainders p, q, r respectively:\nAnswer = HCF of (a-p), (b-q), (c-r)\n\nExample: Greatest number dividing 29, 60, 103 leaving remainders 5, 12, 7:\n29-5 = 24, 60-12 = 48, 103-7 = 96\nHCF(24, 48, 96) = 24\n\nTo find the least number that when divided by a, b, c leaves the same remainder r:\nAnswer = LCM(a, b, c) + r\n\nPrime numbers up to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47',
      },
    ],
    keyPoints: [
      'HCF × LCM = Product (for two numbers)',
      'Divisibility by 3: sum of digits divisible by 3; by 9: sum divisible by 9',
      'Greatest number leaving remainders: HCF of (number - remainder) values',
      '2 is the only even prime number',
      'Divisibility by 11: difference of alternate digit sums is 0 or divisible by 11',
    ],
  },
];

// ─── Master Lookup ──────────────────────────────────────────

const ALL_CHAPTERS: ChapterContent[] = [
  ...gaChapters,
  ...scienceChapters,
  ...englishChapters,
  ...mathChapters,
];

export function getChaptersBySubject(subjectId: SubjectId): ChapterContent[] {
  return ALL_CHAPTERS.filter(ch => ch.subjectId === subjectId);
}

export function getChapterById(chapterId: string): ChapterContent | undefined {
  return ALL_CHAPTERS.find(ch => ch.id === chapterId);
}

export function getChapterIdForTopic(subjectId: SubjectId, topicName: string): string {
  const chapter = ALL_CHAPTERS.find(
    ch => ch.subjectId === subjectId && ch.title === topicName
  );
  return chapter?.id || `${subjectId}__${topicName.replace(/\s+/g, '_').toLowerCase()}`;
}

export function getAllChapters(): ChapterContent[] {
  return ALL_CHAPTERS;
}
