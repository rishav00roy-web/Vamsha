// All site copy comes from the client's organisation profile (12 parts). Keep it accurate.
const L = (s) => s.trim().split('\n').map((x) => x.trim().replace(/\.$/, '')).filter(Boolean);

export const org = {
  name: 'VAMSHAA AGROTECH FOUNDATION',
  tagline: 'GO GREEN GO CLEAN',
  sectors: ['Bamboo Industries', 'Waste Management', 'Circular Economy', 'Rural Industrialisation'],
  statement: 'Building a Sustainable Green Economy Through Innovation, Industry and Community Participation.',
  legal: 'Section 8 Company under the Companies Act, 2013',
  cin: 'U84120MP2025NPL080841',
  gstin: '23AALCV7172N1ZO',
  incorporated: '24 December 2025',
  address: ['Ward No. 8, Gaytri Mandir Road, Sai Nagar,', 'Singrauli, Madhya Pradesh 486889, India'],
  phone: '+91 9981968555',
  phoneHref: 'tel:+919981968555',
  email: 'To be updated',
  directors: [
    { name: 'Ravi Prakash Gupta', role: 'Director', din: '11450129' },
    { name: 'Sangeeta Maurya', role: 'Director', din: '11450128' },
  ],
};

export const about = {
  p: [
    'VAMSHAA AGROTECH FOUNDATION is a Section 8 company incorporated under the Companies Act, 2013, in India, with its registered office at Singrauli, Madhya Pradesh.',
    'The Foundation is committed to developing sustainable industries, promoting environmental conservation, encouraging rural entrepreneurship and creating economic opportunities through bamboo-based industrial development and integrated waste management.',
    'Our organisational vision is to establish an integrated green industrial ecosystem that connects natural resources, manufacturing, recycling, technology, agriculture, entrepreneurship and community development.',
  ],
  sectors: [
    {
      t: 'Bamboo-based industrial development',
      d: 'Promoting bamboo cultivation, processing, manufacturing, engineering, construction materials, furniture, paper, packaging, textiles, charcoal, biomass, handicrafts and advanced bamboo-based products.',
      href: 'bamboo.html', icon: 'cultivation',
    },
    {
      t: 'Integrated waste management',
      d: 'Promoting scientific waste collection, segregation, material recovery, recycling, composting, biomass utilisation, resource recovery and circular economy solutions.',
      href: 'waste.html', icon: 'segregation',
    },
  ],
  belief: 'We believe that bamboo represents an important opportunity for sustainable manufacturing, while waste represents an opportunity for resource recovery and economic value creation.',
  approach: 'Through industrial clusters, Common Facility Centres, skill development, technology partnerships, enterprise development and market linkages, we aim to strengthen rural and regional economies.',
  principles: ['Environmental sustainability', 'Industrial and economic development', 'Inclusive community participation'],
  vision: "To become a leading contributor to India's sustainable green industrial transformation by developing bamboo-based industries, scientific waste management systems and resource-efficient rural enterprises.",
  mission: L(`
    Promote bamboo-based industrial development.
    Establish integrated waste management ecosystems.
    Develop rural and regional industrial clusters.
    Encourage green manufacturing and innovation.
    Promote recycling and resource recovery.
    Support farmers, artisans and rural entrepreneurs.
    Generate employment through green industries.
    Encourage women and youth entrepreneurship.
    Develop technology-driven manufacturing facilities.
    Establish partnerships with government, industry and research institutions.
    Promote circular economy practices.
    Support environmental education and community participation.
  `),
  values: [
    { t: 'Sustainability', d: 'Responsible use of natural resources.', icon: 'v-sustain' },
    { t: 'Innovation', d: 'Encouraging modern technologies and industrial solutions.', icon: 'v-innovate' },
    { t: 'Inclusiveness', d: 'Creating opportunities for rural communities, women and youth.', icon: 'v-include' },
    { t: 'Entrepreneurship', d: 'Supporting local businesses and enterprises.', icon: 'v-enterprise' },
    { t: 'Transparency', d: 'Responsible institutional and project management.', icon: 'v-transparent' },
    { t: 'Collaboration', d: 'Working with government, industry, communities and research institutions.', icon: 'v-collab' },
  ],
};

export const bamboo = {
  title: 'Bamboo Industry Division',
  lead: 'Transforming Bamboo into Industry, Innovation and Opportunity',
  p: [
    'Bamboo is a versatile renewable resource with applications in construction, engineering, furniture, paper, packaging, textiles, food processing, handicrafts, biomass and advanced manufacturing.',
    'VAMSHAA AGROTECH FOUNDATION aims to promote the complete bamboo value chain, from plantation and harvesting to processing, manufacturing, branding and marketing.',
  ],
  chain: ['Plantation', 'Harvesting', 'Processing', 'Manufacturing', 'Branding', 'Marketing'],
  items: [
    { n: '5.1', t: 'Bamboo Cultivation & Plantation', icon: 'cultivation', list: L(`
      Commercial bamboo cultivation.
      Bamboo nursery development.
      Bamboo seedling production.
      Tissue culture propagation.
      Bamboo plantation management.
      Community bamboo plantations.
      Agroforestry development.
      Bamboo farming promotion.
      Sustainable harvesting.
      Bamboo resource mapping.
      Bamboo growers' networks.
      Plantation consultancy.`) },
    { n: '5.2', t: 'Bamboo Primary Processing', icon: 'processing', list: L(`
      Bamboo cutting.
      Bamboo splitting.
      Bamboo slivering.
      Bamboo stick production.
      Bamboo strip manufacturing.
      Bamboo slat production.
      Bamboo pole processing.
      Bamboo treatment and preservation.
      Bamboo seasoning.
      Bamboo drying.
      Bamboo sizing and grading.
      Bamboo raw material storage.`) },
    { n: '5.3', t: 'Bamboo Construction Industry', icon: 'construction', list: L(`
      Bamboo structural poles.
      Engineered bamboo beams.
      Bamboo laminated boards.
      Bamboo plywood alternatives.
      Bamboo flooring.
      Bamboo wall panels.
      Bamboo ceiling panels.
      Bamboo roofing materials.
      Bamboo doors and windows.
      Bamboo partitions.
      Bamboo prefabricated houses.
      Bamboo modular buildings.
      Bamboo bridges and walkways.
      Bamboo scaffolding.
      Bamboo composite building materials.`) },
    { n: '5.4', t: 'Bamboo Furniture Industry', icon: 'furniture', list: L(`
      Residential bamboo furniture.
      Office bamboo furniture.
      School furniture.
      Institutional furniture.
      Bamboo chairs and tables.
      Bamboo beds.
      Bamboo wardrobes.
      Bamboo cabinets.
      Bamboo shelves.
      Bamboo sofas.
      Outdoor furniture.
      Restaurant furniture.
      Modular furniture.
      Designer bamboo interiors.`) },
    { n: '5.5', t: 'Bamboo Paper & Pulp Industry', icon: 'paper', list: L(`
      Bamboo pulp manufacturing.
      Bamboo paper production.
      Bamboo printing paper.
      Bamboo writing paper.
      Bamboo tissue paper.
      Bamboo paperboard.
      Bamboo handmade paper.
      Bamboo stationery.
      Bamboo paper bags.
      Bamboo paper plates.
      Bamboo paper cups.
      Bamboo corrugated packaging.`) },
    { n: '5.6', t: 'Bamboo Packaging Industry', icon: 'packaging', list: L(`
      Bamboo packaging boxes.
      Bamboo gift packaging.
      Bamboo food containers.
      Bamboo storage containers.
      Bamboo packaging trays.
      Bamboo protective packaging.
      Bamboo retail packaging.
      Bamboo composite packaging.
      Eco-friendly packaging components.`) },
    { n: '5.7', t: 'Bamboo Fibre & Textile Industry', icon: 'textile', list: L(`
      Bamboo fibre extraction.
      Bamboo fibre processing.
      Bamboo yarn manufacturing.
      Bamboo fabric production.
      Bamboo textile blending.
      Bamboo garments.
      Bamboo socks.
      Bamboo towels.
      Bamboo bedsheets.
      Bamboo home textiles.
      Bamboo non-woven products.
      Bamboo fibre composite materials.`) },
    { n: '5.8', t: 'Bamboo Handicrafts & Lifestyle Products', icon: 'handicraft', list: L(`
      Bamboo baskets.
      Bamboo mats.
      Bamboo lamps.
      Bamboo decorative products.
      Bamboo wall hangings.
      Bamboo handbags.
      Bamboo jewellery.
      Bamboo gift products.
      Bamboo kitchenware.
      Bamboo storage products.
      Bamboo musical instruments.
      Bamboo souvenirs.
      Bamboo traditional crafts.
      Designer bamboo lifestyle products.`) },
    { n: '5.9', t: 'Bamboo Food Processing Industry', icon: 'food', list: L(`
      Bamboo shoot processing.
      Bamboo shoot pickles.
      Bamboo shoot canning.
      Bamboo shoot dehydration.
      Bamboo shoot powder.
      Bamboo shoot snacks.
      Ready-to-cook bamboo shoot products.
      Fermented bamboo shoot products.
      Traditional bamboo food products.
      Bamboo shoot packaging and marketing.`) },
    { n: '5.10', t: 'Bamboo Charcoal & Activated Carbon Industry', icon: 'charcoal', list: L(`
      Bamboo charcoal manufacturing.
      Bamboo charcoal powder.
      Bamboo activated carbon.
      Water filtration carbon.
      Air purification carbon.
      Industrial filtration materials.
      Bamboo biochar.
      Bamboo vinegar.
      Bamboo carbon-based products.
      Bamboo carbonisation by-products.`) },
    { n: '5.11', t: 'Bamboo Biomass & Renewable Energy', icon: 'biomass', list: L(`
      Bamboo biomass processing.
      Bamboo biomass pellets.
      Bamboo briquettes.
      Bamboo fuel products.
      Bamboo biomass power applications.
      Bamboo waste utilisation.
      Bamboo pyrolysis.
      Bamboo carbonisation.
      Biomass supply chains.
      Bioenergy applications.`) },
    { n: '5.12', t: 'Bamboo Utility Products', icon: 'utility', list: L(`
      Bamboo agarbatti sticks.
      Bamboo toothpicks.
      Bamboo skewers.
      Bamboo cotton bud sticks.
      Bamboo ice cream sticks.
      Bamboo chopsticks.
      Bamboo drinking straws.
      Bamboo cutlery.
      Bamboo blinds.
      Bamboo fencing.
      Bamboo kitchen utensils.
      Bamboo household utility products.`) },
    { n: '5.13', t: 'Advanced Bamboo Engineering & Materials', icon: 'engineering', list: L(`
      Bamboo particle boards.
      Bamboo fibre boards.
      Bamboo composite materials.
      Bamboo polymer composites.
      Bamboo laminated products.
      Bamboo acoustic panels.
      Bamboo insulation materials.
      Bamboo industrial components.
      Bamboo automotive interior components.
      Bamboo engineering applications.
      Bamboo product prototyping.
      Advanced material research.`) },
    { n: '5.14', t: 'Bamboo Machinery & Technology', icon: 'machinery', list: L(`
      Bamboo cutting machines.
      Bamboo splitting machines.
      Bamboo slivering machines.
      Bamboo stick-making machines.
      Bamboo treatment plants.
      Bamboo drying systems.
      Bamboo board manufacturing equipment.
      Bamboo furniture machinery.
      Bamboo paper processing machinery.
      Bamboo pellet machines.
      Bamboo briquette machines.
      Bamboo carbonisation equipment.
      Industrial automation solutions.`) },
    { n: '5.15', t: 'Bamboo Waste Utilisation', icon: 'bamboo-waste', list: L(`
      Bamboo sawdust utilisation.
      Bamboo offcut recycling.
      Bamboo residue processing.
      Bamboo biomass production.
      Bamboo waste briquettes.
      Bamboo biochar.
      Bamboo composting applications.
      Zero-waste manufacturing initiatives.`) },
  ],
};

export const waste = {
  title: 'Waste Management Division',
  lead: 'Turning Waste into Wealth',
  p: [
    'Waste management is an essential component of sustainable development, environmental protection and circular economic growth.',
    'VAMSHAA AGROTECH FOUNDATION aims to develop integrated systems that connect waste generation, collection, segregation, transportation, processing, recycling and resource recovery.',
    'Our objective is to encourage a transition from traditional waste disposal practices towards scientific and resource-efficient waste management.',
  ],
  chain: ['Generation', 'Collection', 'Segregation', 'Transportation', 'Processing', 'Recycling', 'Resource recovery'],
  items: [
    { n: '6.1', t: 'Municipal Solid Waste Management', icon: 'msw', list: L(`
      Household waste collection.
      Door-to-door collection systems.
      Community waste management.
      Commercial waste management.
      Institutional waste management.
      Waste transportation.
      Waste sorting and segregation.
      Scientific processing and disposal partnerships.`) },
    { n: '6.2', t: 'Waste Segregation at Source', icon: 'segregation', list: L(`
      Wet waste segregation.
      Dry waste segregation.
      Recyclable waste separation.
      Domestic hazardous waste handling.
      Sanitary waste management.
      Awareness and behaviour-change programmes.`) },
    { n: '6.3', t: 'Material Recovery Facility (MRF)', icon: 'mrf', list: L(`
      Waste sorting infrastructure.
      Plastic recovery.
      Paper recovery.
      Cardboard recovery.
      Metal recovery.
      Glass recovery.
      Recyclable material grading.
      Material storage and dispatch.
      Recycling industry linkages.`) },
    { n: '6.4', t: 'Plastic Waste Management', icon: 'plastic', list: L(`
      Plastic waste collection.
      Plastic segregation.
      Plastic sorting.
      Plastic recycling.
      Plastic granule production through authorised facilities.
      Recycled plastic products.
      Plastic waste recovery.
      Extended Producer Responsibility partnerships.`) },
    { n: '6.5', t: 'Organic Waste Management', icon: 'organic', list: L(`
      Organic waste collection.
      Compost manufacturing.
      Vermicomposting.
      Community composting.
      Organic manure production.
      Biogas production.
      Bio-slurry utilisation.
      Organic waste processing.
      Agricultural residue utilisation.`) },
    { n: '6.6', t: 'Industrial Waste Management', icon: 'industrial', note: 'Hazardous industrial waste and regulated waste streams will be handled only through legally authorised channels and facilities.', list: L(`
      Industrial waste assessment.
      Waste segregation.
      Recoverable material identification.
      Industrial by-product recovery.
      Recycling partnerships.
      Resource efficiency programmes.
      Waste reduction consultancy.
      Responsible disposal through authorised facilities.`) },
    { n: '6.7', t: 'Construction & Demolition Waste Management', icon: 'cnd', list: L(`
      Construction waste collection.
      Concrete waste recovery.
      Brick and rubble recovery.
      Construction material sorting.
      Reusable material recovery.
      Construction waste recycling.
      Recycled aggregate applications.`) },
    { n: '6.8', t: 'E-Waste Management', icon: 'ewaste', list: L(`
      Electronic waste awareness.
      E-waste collection partnerships.
      Authorised recycler linkages.
      Electronic material recovery.
      Responsible disposal awareness.
      Collection and channelisation systems.`) },
    { n: '6.9', t: 'Biomedical & Special Waste Awareness', icon: 'biomedical', note: 'The Foundation will not undertake regulated biomedical or hazardous waste treatment without the required permissions and infrastructure.', list: L(`
      Segregation awareness.
      Safe collection-system education.
      Institutional waste-management awareness.
      Authorised treatment facility partnerships.
      Regulatory compliance awareness.`) },
    { n: '6.10', t: 'Waste-to-Wealth & Resource Recovery', icon: 'wealth', list: L(`
      Organic waste to compost.
      Organic waste to biogas.
      Biomass briquette production.
      Waste material recovery.
      Recyclable material processing.
      Waste-derived resource opportunities.
      Industrial by-product utilisation.
      Circular economy solutions.`) },
  ],
  infra: {
    n: '6.11', t: 'Waste Management Infrastructure', icon: 'infra', lead: 'Proposed infrastructure includes:', list: L(`
      Integrated Waste Management Centres.
      Material Recovery Facilities.
      Organic Waste Processing Plants.
      Composting Units.
      Vermicomposting Units.
      Plastic Sorting and Recovery Facilities.
      Recycling Infrastructure.
      Waste Storage and Sorting Centres.
      Biomass Processing Units.
      Resource Recovery Centres.`),
  },
};

export const circular = {
  title: 'Integrated Green Industrial Ecosystem',
  p: [
    'We aim to connect bamboo industries and waste management through a circular economy model.',
    'The model focuses on responsible production, efficient resource utilisation, waste reduction, recycling and value addition.',
  ],
  opportunities: L(`
    Bamboo processing residues converted into biomass products.
    Bamboo offcuts utilised in suitable industrial applications.
    Bamboo sawdust used for briquettes and biochar.
    Organic waste converted into compost and biogas.
    Recyclable materials supplied to authorised recycling industries.
    Bamboo-based alternatives developed for selected conventional products.
    Waste recovery enterprises linked with green manufacturing.
    Rural entrepreneurs supported through local resource-based businesses.`),
  model: ['Natural resources', 'Production', 'Consumption', 'Collection', 'Segregation', 'Processing', 'Recycling', 'Value addition', 'New products'],
  goal: 'Our goal is to minimise waste and maximise environmental and economic value.',
  clusters: {
    p: 'The Foundation aims to facilitate the development of integrated bamboo industrial clusters with shared facilities, specialised machinery, technical services and market linkages.',
    list: L(`
      Bamboo industrial parks.
      Bamboo Common Facility Centres.
      Bamboo processing units.
      Bamboo manufacturing units.
      Bamboo product development centres.
      Bamboo training centres.
      Bamboo testing and quality facilities.
      Raw material storage and logistics.
      Marketing and exhibition facilities.`),
  },
  cfc: {
    bamboo: L(`
      Bamboo treatment and seasoning.
      Cutting and splitting.
      Slivering and stick production.
      Board manufacturing.
      Furniture manufacturing.
      Product finishing.
      Quality testing.
      Packaging and storage.`),
    waste: L(`
      Waste collection and sorting.
      Material Recovery Facility.
      Plastic sorting and recovery.
      Organic waste processing.
      Compost production.
      Biomass processing.
      Recyclable material storage.
      Resource recovery infrastructure.`),
    note: 'Common facilities will be developed according to project feasibility, investment capacity and applicable scheme guidelines.',
  },
};

export const community = {
  agri: {
    p: 'The Foundation aims to support farmers and rural communities through sustainable resource development and enterprise opportunities.',
    list: L(`
      Bamboo farming promotion.
      Nursery development.
      Agroforestry.
      Sustainable agriculture awareness.
      Organic waste utilisation.
      Composting education.
      Agricultural residue management.
      Farmer training.
      Farmer Producer Organisation linkages.
      Market-oriented agricultural enterprises.`),
  },
  rural: L(`
    Bamboo micro-enterprises.
    Waste collection businesses.
    Recycling enterprises.
    Compost production units.
    Biomass businesses.
    Bamboo furniture workshops.
    Bamboo handicraft enterprises.
    Rural manufacturing units.
    Women-led businesses.
    Youth entrepreneurship.`),
  women: {
    p: 'Our development approach encourages participation from women, youth, tribal communities, traditional artisans and rural entrepreneurs.',
    list: L(`
      Women-led bamboo enterprises.
      SHG-based manufacturing.
      Waste management entrepreneurship.
      Skill-based employment.
      Technical training.
      Enterprise development.
      Digital marketing education.
      Financial literacy and business awareness.`),
  },
};

export const research = {
  rd: {
    p: 'The Foundation aims to collaborate with universities, technical institutions, research laboratories and industrial partners.',
    bamboo: L(`
      Advanced bamboo materials.
      Bamboo engineering.
      Bamboo preservation.
      Bamboo composites.
      Bamboo fibre applications.
      Bamboo carbon technology.
      Product innovation.`),
    waste: L(`
      Recycling technologies.
      Organic waste processing.
      Resource recovery.
      Composting technologies.
      Biomass utilisation.
      Waste processing automation.
      Circular economy systems.`),
  },
  training: L(`
    Bamboo plantation and harvesting.
    Bamboo processing and preservation.
    Bamboo furniture manufacturing.
    Bamboo construction techniques.
    Bamboo machinery operation.
    Bamboo handicraft development.
    Waste segregation and collection.
    Recycling operations.
    Compost production.
    Biogas operations.
    Material recovery facility operations.
    Green entrepreneurship.
    Business and marketing skills.`),
  tech: {
    p: 'The Foundation aims to encourage the adoption of appropriate technologies, automation, digital systems and modern industrial processes.',
    list: L(`
      Industrial machinery.
      Processing automation.
      Waste tracking systems.
      Digital collection management.
      Product design and prototyping.
      Quality management.
      Resource monitoring.
      Digital marketing and e-commerce.`),
  },
};

export const partners = {
  csr: {
    p: 'VAMSHAA AGROTECH FOUNDATION welcomes collaboration with eligible corporate organisations, public sector undertakings, industries and CSR partners for sustainable development projects.',
    list: L(`
      Bamboo Industrial Cluster Development.
      Bamboo Common Facility Centres.
      Bamboo Plantation and Livelihood Development.
      Integrated Waste Management Projects.
      Material Recovery Facilities.
      Plastic Waste Management.
      Organic Waste-to-Wealth Projects.
      Community Composting Facilities.
      Green Skill Development.
      Environmental Awareness.
      Rural Entrepreneurship Development.
      Sustainable Manufacturing Initiatives.`),
    note: 'CSR partnerships will be undertaken subject to statutory eligibility, project approvals and applicable CSR regulations.',
  },
  govt: {
    p: 'The Foundation seeks to explore collaborations with:',
    list: L(`
      Ministry of MSME.
      Ministry of Environment, Forest and Climate Change.
      Ministry of Agriculture and Farmers Welfare.
      National Bamboo Mission.
      State Bamboo Missions.
      NABARD.
      District Industries Centres.
      State Pollution Control Boards.
      Urban Local Bodies.
      Panchayati Raj Institutions.
      Technical and research institutions.
      Universities and agricultural institutions.
      Industrial development agencies.`),
    note: 'These are prospective collaboration areas, not representations of existing partnerships.',
  },
  industry: L(`
    Bamboo manufacturers.
    Machinery manufacturers.
    Recycling companies.
    Waste management operators.
    Industrial buyers.
    Technology providers.
    Product distributors.
    Exporters and importers.
    Research organisations.
    Farmer Producer Organisations.
    Self-Help Groups.
    Entrepreneurs and investors.`),
};

export const projects = {
  p: 'The Foundation aims to develop projects in the following areas:',
  groups: [
    { t: 'Bamboo Development Projects', icon: 'cultivation', list: L(`
      Bamboo Industrial Cluster.
      Bamboo Common Facility Centre.
      Bamboo Processing and Treatment Centre.
      Bamboo Furniture Manufacturing Unit.
      Bamboo Board Manufacturing Unit.
      Bamboo Charcoal and Activated Carbon Unit.
      Bamboo Paper and Packaging Unit.
      Bamboo Food Processing Unit.
      Bamboo Biomass Processing Unit.`) },
    { t: 'Waste Management Projects', icon: 'mrf', list: L(`
      Integrated Solid Waste Management Centre.
      Material Recovery Facility.
      Plastic Waste Recovery Unit.
      Organic Waste Composting Plant.
      Vermicomposting Unit.
      Biogas Production Unit.
      Biomass Briquette Unit.
      Community Waste Collection Programme.
      Resource Recovery Centre.`) },
    { t: 'Community Development Projects', icon: 'v-include', list: L(`
      Green Skill Development.
      Rural Entrepreneurship.
      Women-led Enterprise Development.
      Farmer Training.
      Environmental Education.
      Community Plantation.
      Green Livelihood Development.`) },
  ],
  impactLead: 'Through our proposed programmes and partnerships, we aim to contribute towards:',
  impact: [
    { t: 'Environmental sustainability', d: 'Encouraging responsible resource utilisation and environmental protection.', icon: 'i-env' },
    { t: 'Green industrialisation', d: 'Promoting bamboo manufacturing and resource recovery industries.', icon: 'i-industry' },
    { t: 'Employment generation', d: 'Creating opportunities through green enterprises and manufacturing.', icon: 'i-jobs' },
    { t: 'Rural development', d: 'Strengthening rural economies through local resource-based businesses.', icon: 'i-rural' },
    { t: 'Women empowerment', d: 'Encouraging women-led enterprises and skill development.', icon: 'i-women' },
    { t: 'Circular economy', d: 'Promoting recycling, reuse and material recovery.', icon: 'i-circular' },
    { t: 'Technology development', d: 'Encouraging research, innovation and modern manufacturing.', icon: 'i-tech' },
    { t: 'Community participation', d: 'Building awareness and collective responsibility for environmental protection.', icon: 'i-community' },
  ],
};

export const join = {
  title: 'Become a part of the green movement',
  p: 'We invite individuals, farmers, entrepreneurs, industries, institutions, CSR partners and development organisations to join our journey.',
  list: L(`
    Bamboo industrial projects.
    Waste management projects.
    Technology partnerships.
    Research collaborations.
    Skill development.
    Rural entrepreneurship.
    CSR programmes.
    Industrial manufacturing.
    Market development.
    Environmental initiatives.`),
  close: 'Together, we can create a stronger green economy and sustainable industrial future.',
  slogan: ['From bamboo to industry.', 'From waste to wealth.', 'Building a sustainable future.'],
};
