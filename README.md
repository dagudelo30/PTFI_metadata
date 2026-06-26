# PTFI Core Metadata Schema

A FAIR data dictionary for the metadata collected for every food sample in the
Periodic Table of Food Initiative (PTFI). It defines each variable, its datatype
and obligation, its controlled value scheme, and — crucially — how it maps to
established standards so PTFI data stays interoperable beyond PTFI.

**Live reference:** open `index.html` (via GitHub Pages or a local server — see below).

---

## How it works: one source of truth → the view follows

```
ptfi-core-schema.csv   ← THE source of truth (edit this, in Excel or any editor)
index.html             ← reads the CSV at load time and renders it (no build step)
README.md
```

`index.html` fetches `ptfi-core-schema.csv` when it opens, so **editing the CSV is
all you need** — add a row, change a definition, fix a mapping, and the page
reflects it on the next reload. Counts, modules and badges are all computed from
the data; nothing about the schema is hard-coded in the page.

To view locally, serve over HTTP (a `file://` open will not load the CSV):

```bash
python3 -m http.server
# then visit http://localhost:8000
```

On GitHub Pages it works directly once Pages is enabled for the repo.

---

## The columns

| Column | Meaning |
|---|---|
| `ptfi_term` | Local term name; full identifier is `https://foodperiodictable.org/ptfi/terms/<ptfi_term>` |
| `label` | Human-readable name |
| `group` | Group as defined in the source Excel: Study, Specimen, Sample, Aliquot |
| `obligation` | Required / Conditional / Optional / Curator-assigned |
| `datatype`, `occurrence` | Value type, and whether one or many values are allowed |
| `value_scheme` | Standard that governs the **value** (ISO 8601, ISO 3166, Unit Ontology, FoodOn, NCBITaxon, BCP 47, GeoNames…) |
| `definition`, `allowed_values`, `examples` | Documentation of the field |
| `maps_to` | The external standard **term** this field corresponds to (`dwc:` Darwin Core, `dcterms:` Dublin Core), or blank if original |
| `match_type` | `skos:exactMatch` (same concept) or `skos:closeMatch` (near), or blank for original terms |
| `curation_note`, `reconciliation_note` | Curator guidance and the rationale for changes in this reconciliation |

---

## Mapping approach: mint everything under `ptfi:`, then map outward

Every variable has its own identifier under the PTFI namespace
`https://foodperiodictable.org/ptfi/terms/`. Each term then carries a mapping to
the closest established standard:

- **`skos:exactMatch`** — concept is identical to an external term (e.g.
  `ptfi:collectionCountry` ≡ `dwc:countryCode`). 10 terms.
- **`skos:closeMatch`** — concept is close but not identical, kept under review. 10 terms.
- **original** — no external equivalent exists; the term is PTFI's own (most
  laboratory-processing fields: weights, preparation methods, processing,
  curation status). 24 terms.

This gives every field one stable home that PTFI controls, while the match links
keep the data interoperable: a system that speaks Darwin Core or Dublin Core can
follow the mapping and understand the field. Borrowed vocabularies
(`dwc:` = TDWG Darwin Core, `dcterms:` = DCMI Dublin Core) are referenced, never
re-hosted.

---

## Status & open items

- **Draft v1.** Mappings labelled `skos:closeMatch` are provisional and meant to
  be confirmed with the metadata team.
- **Namespace resolution.** The `ptfi:` identifiers do not yet resolve
  (`https://foodperiodictable.org/ptfi/terms/` returns 404). Making them resolve
  is a server task on `foodperiodictable.org`, tracked separately.
- This dictionary is the human/tabular layer; it is intended to feed the RDF /
  Turtle application profile generated in
  [`PTFI_application_profiles`](https://github.com/ptfi-metadata/PTFI_application_profiles).

## Contributing

Edit `ptfi-core-schema.csv` and open a pull request. Keep `ptfi_term` in
`lowerCamelCase`, give every new term a definition, and add a `maps_to` +
`match_type` only when a genuine external equivalent exists.
