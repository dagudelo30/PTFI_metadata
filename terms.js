/* PTFI Core Metadata Schema — term dataset
   Compiled from: PTFI Core Metadata Schema (Figure 1), SOP 1 (Quality Check of
   Food Sample Metadata Curation), SOP 2 (FoodOn ID), SOP 3 (Term Request), and
   the New Food Collection Form. 47 elements across 5 facets. */

window.PTFI_VERSION = { schema: "7.0.0", revised: "2025-12-17" };

/* Facet metadata. `role` = the gray grouping labels in Figure 1. */
window.PTFI_FACETS = [
  {
    id: "collection",
    name: "Food Collection",
    role: "Food Collector Metadata",
    blurb: "Who collected the food, where and when the collection occurred, and under which conditions. Foundational context for environmental, cultural, and supply-chain drivers of variability in food composition.",
    count: 14,
  },
  {
    id: "specimen",
    name: "Specimen Data",
    role: "Food Collector Metadata",
    blurb: "The food as a biological entity — taxonomic identification, production attributes, and any processing present at the moment of collection. Anchors every downstream sample to a well-defined biological unit.",
    count: 11,
  },
  {
    id: "sample",
    name: "Sample Processing",
    role: "Laboratory Metadata",
    blurb: "The in-kitchen or benchtop activities that transform a specimen into the analytical aliquots actually measured. A single specimen may yield several samples differing by processing, anatomical part, or storage.",
    count: 12,
  },
  {
    id: "management",
    name: "Sample Management",
    role: "Curation Metadata",
    blurb: "Internal identifiers and governance that manage relationships among specimens, samples, aliquots, and studies — including ethical (ABS) and quality-control (curation) status. Managed by the PTFI database curator.",
    count: 7,
  },
  {
    id: "ontology",
    name: "Ontology References",
    role: "Curation Metadata",
    blurb: "External persistent identifiers (IRIs) that link each food item to community-maintained ontologies — FoodOn and the NCBI Taxonomy — encoding taxonomic identity, anatomical part, and processing state for FAIR interoperability.",
    count: 3,
  },
];

/* Each term:
   { name, facet, required: "required"|"conditional"|"optional"|"curator",
     type, format, definition, values:[], mapsTo:[{label,href}],
     examples:[], curation } */
window.PTFI_TERMS = [
  /* ============ FOOD COLLECTION (14) ============ */
  {
    name: "Collection Date", facet: "collection", required: "required", type: "Date",
    format: "ISO 8601 — YYYY-MM-DD",
    definition: "The date on which the specimen was collected.",
    mapsTo: [{ label: "ISO 8601-1:2019", href: "https://www.iso.org/iso-8601-date-and-time-format.html" }],
    examples: ["2024-03-15", "2025-09-02"],
    curation: "Must be present and formatted as YYYY-MM-DD.",
  },
  {
    name: "Collection Location Level 0", facet: "collection", required: "required", type: "Coded text",
    format: "Two-letter country code, UPPERCASE",
    definition: "Broadest geographic level of the collection location: the country, recorded as its ISO 3166-1 alpha-2 code.",
    mapsTo: [{ label: "ISO 3166-1 alpha-2", href: "https://www.iso.org/iso-3166-country-codes.html" }],
    examples: ["TH", "US", "MX"],
    curation: "Mandatory. Represent the country by its two-letter code in capitals (e.g. TH for Thailand).",
  },
  {
    name: "Collection Location Level 1", facet: "collection", required: "required", type: "Text",
    format: "Full country name, Sentence case",
    definition: "Country of collection written out in full.",
    examples: ["Thailand", "United States"],
    curation: "Mandatory. Full form in sentence case; must not contradict Level 0.",
  },
  {
    name: "Collection Location Level 2", facet: "collection", required: "required", type: "Text",
    format: "Sentence case",
    definition: "City (or principal administrative subdivision) where the food was collected.",
    examples: ["Ratchaburi", "Fort Collins"],
    curation: "Mandatory. Levels 0–2 must all be present and spelled correctly.",
  },
  {
    name: "Collection Location Level 3", facet: "collection", required: "optional", type: "Text",
    format: "Sentence case",
    definition: "More specific administrative level than Level 2 (e.g. district), added when available.",
    examples: ["Damnoen Saduak"],
    curation: "Add if applicable; no contradictory information between levels.",
  },
  {
    name: "Collection Location Level 4", facet: "collection", required: "optional", type: "Text",
    format: "Sentence case",
    definition: "More specific level than Level 3 (e.g. sub-district / ward), added when available.",
    examples: ["Tha Khwang"],
    curation: "Add if applicable.",
  },
  {
    name: "Collection Location Level 5", facet: "collection", required: "optional", type: "Text",
    format: "Sentence case",
    definition: "Most specific geographic level — neighborhood, market, farm, or named collection site.",
    examples: ["Damnoen Saduak Floating Market"],
    curation: "Add if applicable.",
  },
  {
    name: "Collection Latitude", facet: "collection", required: "conditional", type: "Number",
    format: "Decimal degrees, −90 to 90",
    definition: "Geographic latitude of the collection site, in decimal degrees.",
    examples: ["13.5215", "40.5853"],
    curation: "Valid range −90 to 90, numeric. If unavailable, query the collector to add. Record as precisely as possible.",
  },
  {
    name: "Collection Longitude", facet: "collection", required: "conditional", type: "Number",
    format: "Decimal degrees, −180 to 180",
    definition: "Geographic longitude of the collection site, in decimal degrees.",
    examples: ["99.9540", "−105.0844"],
    curation: "Valid range −180 to 180, numeric. If unavailable, query the collector to add. Record as precisely as possible.",
  },
  {
    name: "Collector Name", facet: "collection", required: "required", type: "Text",
    format: "Comma-separated for multiple",
    definition: "Full name(s) of the individual(s) who collected the specimen.",
    examples: ["Angela Fernando", "Jane Doe, John Smith"],
    curation: "Present, spell-checked, consistent name formatting. Multiple collectors as comma-separated values.",
  },
  {
    name: "Collector Organization", facet: "collection", required: "required", type: "Text",
    definition: "Affiliated organization or institution of the collector(s).",
    examples: ["Mahidol University, Institute of Nutrition"],
    curation: "Present and correctly spelled.",
  },
  {
    name: "Collection Temperature", facet: "collection", required: "required", type: "Coded text",
    definition: "Temperature conditions during collection or transport of the specimen.",
    values: ["controlled", "uncontrolled"],
    examples: ["controlled", "uncontrolled"],
    curation: "Select from the drop-down. Choose 'controlled' when stored under regulated conditions, otherwise 'uncontrolled' for ambient. Must not be blank.",
  },
  {
    name: "Collection Type", facet: "collection", required: "required", type: "Coded text",
    definition: "Method or context of specimen collection.",
    values: ["wild harvest", "cultivated", "market purchase"],
    examples: ["market purchase", "wild harvest"],
    curation: "Present; standardized description matching allowed terms. Row must not be left blank.",
  },
  {
    name: "Production Type", facet: "collection", required: "required", type: "Coded text",
    definition: "The system of production or cultivation under which the food was produced.",
    values: ["conventional", "grain-fed", "grass-fed", "organic", "wild", "farmed", "unknown", "other"],
    examples: ["organic", "conventional"],
    curation: "Standardized term(s) from the drop-down, lowercase.",
  },

  /* ============ SPECIMEN DATA (11) ============ */
  {
    name: "Specimen Food Product Name", facet: "specimen", required: "required", type: "Text",
    format: "lowercase",
    definition: "The standardized food product name for the specimen, aligned with the FoodOn ontology.",
    mapsTo: [{ label: "FoodOn", href: "https://foodon.org/" }],
    examples: ["gala apple", "fuji apple"],
    curation: "Lowercase and free of typos. If a cultivar is known, include it (e.g. 'gala apple', not just 'apple'). This name aligns with FoodOn — keep it error-free.",
  },
  {
    name: "Specimen Common Name", facet: "specimen", required: "required", type: "Text",
    definition: "Common or vernacular name of the specimen, in the local language or regional dialect as recorded by the collector.",
    examples: ["pu dong", "hoy dong"],
    curation: "Local language or dialect, no spelling errors, exact spacing/hyphenation. Confirm it translates to a meaningful food product name (e.g. 'hoy dong' = fermented shellfish in Thai), not simply 'fish'.",
  },
  {
    name: "Scientific Name", facet: "specimen", required: "conditional", type: "Text",
    format: "Latin binomial — Genus capitalized, species lowercase",
    definition: "Latin binomial (genus and species) for the specimen, following taxonomic conventions.",
    mapsTo: [{ label: "NCBI Taxonomy", href: "https://www.ncbi.nlm.nih.gov/taxonomy" }],
    examples: ["Malus domestica", "Allium cepa"],
    curation: "Roman form, genus capitalized, species lowercase, correct spelling. Record only for unprepared food (e.g. rice). For prepared food (e.g. fermented crab in brine) it should not be recorded — query the author to remove it.",
  },
  {
    name: "Specimen Breed, Cultivar, etc.", facet: "specimen", required: "optional", type: "Text",
    format: "lowercase",
    definition: "The specific breed, cultivar, variety, or subspecies designation of the specimen, if applicable.",
    examples: ["gala", "cavendish", "yukon gold"],
    curation: "Present when known; spelling consistent with accepted cultivar names, in lowercase.",
  },
  {
    name: "Language Tag", facet: "specimen", required: "required", type: "Coded text",
    format: "ISO 639 language + region, e.g. es-MX",
    definition: "The language of the common/vernacular name: a two-letter ISO 639 language code, optionally followed by a hyphen and a regional or dialect code.",
    mapsTo: [
      { label: "ISO 639 language codes", href: "https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes" },
      { label: "ISO 3166 region codes", href: "https://www.iso.org/iso-3166-country-codes.html" },
    ],
    examples: ["es-MX", "th-TH", "en"],
    curation: "Two-letter ISO code (e.g. es-MX for Mexican Spanish, th-TH for Thai). If empty, flag the row and request the corresponding language code.",
  },
  {
    name: "Specimen Origin Location", facet: "specimen", required: "required", type: "Coded text",
    format: "Two-letter country code",
    definition: "Original or natural habitat / location of the specimen prior to collection — which can differ from the collection location (e.g. collected in a US supermarket but originating from MX).",
    mapsTo: [{ label: "ISO 3166-1 alpha-2", href: "https://www.iso.org/iso-3166-country-codes.html" }],
    examples: ["MX", "PE"],
    curation: "Present and logical. Ensure a two-letter country code appears in every row; if not, query the author.",
  },
  {
    name: "Specimen Preparation", facet: "specimen", required: "required", type: "Coded text",
    format: "lowercase",
    definition: "Description of the specimen's condition or processing at the point of sampling.",
    values: ["fresh", "frozen", "dried", "raw", "processed", "cooked"],
    examples: ["fresh", "raw"],
    curation: "Standardized terminology from the drop-down, lowercase.",
  },
  {
    name: "Specimen Preparation Method", facet: "specimen", required: "required", type: "Text",
    format: "lowercase; encode all applicable",
    definition: "The preparation method(s) applied to the specimen.",
    examples: ["drying", "freezing", "dried and ground"],
    curation: "Method names present and consistent, lowercase. Encode all applicable methods (e.g. 'dried and ground'). If none was used, select the 'blank' or 'unknown' option.",
  },
  {
    name: "Quantity Type", facet: "specimen", required: "required", type: "Coded text",
    definition: "The description of the quantity measurement type for the food collected.",
    values: ["individual", "bulk", "liquid"],
    examples: ["individual", "bulk", "liquid"],
    curation: "individual (e.g. chicken, apple, trout); bulk (e.g. a bag of rice, ground samples, coffee beans); or liquid (e.g. oil, juice). Must be consistent with Quantity Size and Quantity Unit.",
  },
  {
    name: "Quantity Size", facet: "specimen", required: "conditional", type: "Number",
    definition: "The numeric amount of the specimen or sample collected.",
    examples: ["3", "150", "0.50"],
    curation: "Positive numeric value consistent with the Quantity Unit (e.g. 3 apples; 150 grams of rice; 0.50 L of oil). If unknown, leave blank.",
  },
  {
    name: "Quantity Unit", facet: "specimen", required: "required", type: "Coded text",
    format: "Standard units, lowercase",
    definition: "The unit of measure corresponding to the Quantity Size.",
    values: ["g", "kg", "mL", "L"],
    examples: ["g", "kg", "mL"],
    curation: "Present, standard units, lowercase.",
  },

  /* ============ SAMPLE PROCESSING (12) ============ */
  {
    name: "Study Sample Identifier", facet: "sample", required: "required", type: "Text",
    format: "Unique alphanumeric, no extra spaces",
    definition: "Unique identifier assigned to a specific sample within a study.",
    examples: ["SMP-00194"],
    curation: "A valid, unique alphanumeric ID with no errors or extra spaces.",
  },
  {
    name: "Sample Food Product Name", facet: "sample", required: "required", type: "Text",
    format: "lowercase, singular",
    definition: "The food product name for the sample. May match the specimen, or differ if the sample is a specific part or process of the food (e.g. beet root vs beet greens, or pickled beet root).",
    mapsTo: [{ label: "FoodOn", href: "https://foodon.org/" }],
    examples: ["blueberry", "beet greens", "pickled beet root"],
    curation: "Present, lowercase, singular, spelling verified.",
  },
  {
    name: "Sample Common Name", facet: "sample", required: "required", type: "Text",
    definition: "The sample's common name as recorded by the collector in their local language or regional dialect.",
    examples: ["sweet corn", "elote", "choclo", "mazorca"],
    curation: "Present and accurate.",
  },
  {
    name: "Sample Lab Location", facet: "sample", required: "required", type: "Text",
    definition: "The physical location or laboratory where sample analysis or processing took place.",
    examples: ["ETH Zurich"],
    curation: "Present and properly spelled. If missing, query the author to add.",
  },
  {
    name: "Sample Laboratory Processing", facet: "sample", required: "required", type: "Coded text",
    definition: "Description of the lab procedures applied to the sample prior to freezer storage.",
    values: ["homogenization", "freeze-drying"],
    examples: ["homogenization", "freeze-drying"],
    curation: "Standardized terminology from the drop-down.",
  },
  {
    name: "Sample Preparation", facet: "sample", required: "required", type: "Coded text",
    format: "lowercase",
    definition: "Description of how the sample was prepared before analysis, consistent with the processing steps applied.",
    values: ["raw", "processed", "raw; processed", "same as specimen"],
    examples: ["raw; processed", "same as specimen"],
    curation: "Consistent with sample processing steps (e.g. beef ground from whole tissue = 'raw; processed'). If unchanged from the specimen, select 'same as specimen'.",
  },
  {
    name: "Sample Preparation Method", facet: "sample", required: "required", type: "Text",
    format: "lowercase; comma-separated for multiple",
    definition: "The method(s) used for sample preparation.",
    examples: ["lyophilization", "oven-drying"],
    curation: "Standardized method terms from the drop-down. If more than one, express as comma-separated values.",
  },
  {
    name: "Sample Preparation Date", facet: "sample", required: "required", type: "Date",
    format: "ISO 8601 — YYYY-MM-DD",
    definition: "The date on which sample preparation occurred.",
    examples: ["2024-04-02"],
    curation: "Present and correctly formatted. If unknown, enter 'YYYY/MM/DD'.",
  },
  {
    name: "Sample Preparer Name", facet: "sample", required: "required", type: "Text",
    definition: "Name of the person who prepared the sample in the lab.",
    examples: ["Angela Fernando"],
    curation: "Present and correctly spelled.",
  },
  {
    name: "Sample Wet Weight (g)", facet: "sample", required: "required", type: "Number",
    format: "grams, positive",
    definition: "The wet (fresh) weight of the sample in grams, after inedible parts have been removed.",
    examples: ["152.4"],
    curation: "Required — entering the wet weight is necessary. If blank, query the author.",
  },
  {
    name: "Sample Dry Weight (g)", facet: "sample", required: "conditional", type: "Number",
    format: "grams, positive",
    definition: "The weight of the sample after drying, in grams.",
    examples: ["28.9"],
    curation: "Present where applicable; numeric, positive value.",
  },
  {
    name: "Aliquot Weight (mg)", facet: "sample", required: "conditional", type: "Number",
    format: "milligrams, positive",
    definition: "The weight, in milligrams, of the individual analytical aliquot drawn from the prepared sample for measurement.",
    examples: ["50", "100"],
    curation: "Numeric, positive value where an aliquot was generated for analysis.",
  },

  /* ============ SAMPLE MANAGEMENT (7) ============ */
  {
    name: "Study Identifier", facet: "management", required: "required", type: "Text",
    format: "'default-study' or LastName-StudyName-Year-Crop (camelCase, hyphen-delimited)",
    definition: "Unique identifier for the overall study or project associated with the sample.",
    examples: ["default-study", "VanBuiten-BreadStudy-2022-wheat"],
    curation: "Either 'default-study' (if not part of a special study) or a study identifier in the form LastName-StudyName-Year-StudyFoodOrCrop. Must not be blank.",
  },
  {
    name: "Study Tags", facet: "management", required: "optional", type: "Text",
    definition: "Keywords or tags describing the study focus or characteristics.",
    examples: ["fermentation", "post-harvest"],
    curation: "May be left blank.",
  },
  {
    name: "Freezerworks Specimen ID", facet: "management", required: "curator", type: "Text",
    definition: "Unique identifier assigned within the Freezerworks software for tracking the specimen.",
    examples: ["FW-2024-00831"],
    curation: "Managed by the curator in Freezerworks. May be blank at intake.",
  },
  {
    name: "Globally Unique Sample ID", facet: "management", required: "curator", type: "Text",
    definition: "A persistent, globally unique identifier assigned by PTFI to the sample, enabling traceability across the data lifecycle.",
    examples: ["PTFI:SMP:06809dc5-f143-459a"],
    curation: "Assigned by the PTFI database curator.",
  },
  {
    name: "Globally Unique Aliquot ID", facet: "management", required: "curator", type: "Text",
    definition: "A persistent, globally unique identifier assigned by PTFI to an individual aliquot derived from a sample.",
    examples: ["PTFI:ALQ:9c752d22-b09a"],
    curation: "Assigned by the PTFI database curator; links analytical results back to their sample and specimen.",
  },
  {
    name: "Specimen ABS Status", facet: "management", required: "curator", type: "Coded text",
    definition: "Access and Benefit Sharing status — the regulatory standing of the specimen's collection, use, and transfer under international agreements and national laws governing genetic resources.",
    examples: ["level 1", "ABS needed"],
    curation: "If the ABS level is not level 1, append 'ABS needed' to the curation status. Metadata cannot be published until ethical/legal clearance is confirmed.",
  },
  {
    name: "Curation Status", facet: "management", required: "curator", type: "Coded text",
    definition: "The current stage and quality-assessment of the sample's metadata curation.",
    values: ["required", "complete"],
    examples: ["required", "complete", "Specimen food product IRI requested; dry weight missing"],
    curation: "'required' when curation has not yet been performed; append descriptive notes for missing data or IRI requests (e.g. 'Dry weight missing'); 'complete' once all fields are curated, verified, and complete.",
  },

  /* ============ ONTOLOGY REFERENCES (3) ============ */
  {
    name: "Specimen Organism IRI", facet: "ontology", required: "curator", type: "IRI",
    definition: "A standardized Internationalized Resource Identifier from the NCBI Taxonomy for the taxonomic classification of the organism the specimen originates from. Retrieved via the EMBL-EBI Ontology Lookup Service (OLS).",
    mapsTo: [
      { label: "NCBI Taxonomy (OLS)", href: "https://www.ebi.ac.uk/ols4/ontologies/ncbitaxon" },
    ],
    examples: ["http://purl.obolibrary.org/obo/NCBITaxon_3750"],
    curation: "Search the Specimen Organism Name in OLS, select the best-matching term, and record its IRI. The specimen organism family follows the same procedure.",
  },
  {
    name: "Specimen Food Product IRI", facet: "ontology", required: "curator", type: "IRI",
    definition: "A FoodOn IRI categorizing the food-product form of the specimen, accounting for food name, preparation, and processing method.",
    mapsTo: [{ label: "FoodOn (OLS)", href: "https://www.ebi.ac.uk/ols4/ontologies/foodon" }],
    examples: ["FOODON:03309552  (passion fruit, raw)"],
    curation: "Search the Specimen Food Product Name in FoodOn; choose the term matching the name + preparation + method, derived from 'food material'. Avoid 'efsa foodex2' terms. If no term exists, submit a FoodOn term request (see SOP 3).",
  },
  {
    name: "Sample Food Product IRI", facet: "ontology", required: "curator", type: "IRI",
    definition: "A FoodOn IRI for the food-product form of the physical sample — which may differ from the specimen if preparation or processing differs.",
    mapsTo: [{ label: "FoodOn (OLS)", href: "https://www.ebi.ac.uk/ols4/ontologies/foodon" }],
    examples: ["FOODON:03309552"],
    curation: "Same procedure as the Specimen Food Product IRI, using the Sample Food Product Name, Sample Preparation, and Sample Preparation Method. May equal the specimen IRI when these are identical.",
  },
];
