# Tiles

This directory contains artifacts related to the toolchain for preparing and rendering map tiles that appear on the website.

## Goals

- A workflow for generating custom vector base tiles, using open source data, that can be statically hosted
- The base tileset should include layers and features that are relevant for outdoor oriented maps.
- Selected areas with tiles at higher zoom levels 15+ with features for showcasing outdoor activities (hiking, running, camping etc.).
- Planet-wide tiles at zoom levels 0-11 to facilitate user-friendly panning/zooming around the planet. Planet-wide features aren't needed as the features associated with the high-zoom areas is sufficient.

## Workflow

The workflow is executed via the [render-map-tiles](/.github/workflows/render-map-tiles.yml) Github Action.

The workflow is based on the regions defined in ([regions.json](/tiles/regions.json)). Each region specifies a bounding box and the zoom levels for which tiles will be rendered, as well as an (optional) [Geofabriek](https://www.geofabrik.de/data/download.html) region identifier for Open Street Map data.

The majority of the steps are executed on a large, short-lived, Digital Ocean droplet that is provisioned at the start of the run and destroyed at the end. The droplet is created using a custom image with Docker and other basic tools[1] pre-installed.

1. Spin up a Droplet and attach a Block Storage device (doctl)
2. Download Open Street Map data for each region (python)
3. Merge disparate OSM data (osmium)
4. Generate MBTile files for each region (planetiler)
5. Combine and convert the region MBTiles files into a consolidated planet PMTiles file (tippecanoe)
6. Upload the planet PMTiles file to S3 (aws-cli)
7. Detach the Block Storage and destroy the Droplet (doctl)

[1]. APT packages pre-installed: `awscli`, `curl`, `jq`, `python3`, `python3-pip`.

## Tooling

- [Open Map Tiles](https://github.com/openmaptiles/openmaptiles): Vector Tiles from OpenStreetMap and OpenData.
- [Planetiler](https://github.com/onthegomap/planetiler): Flexible tool to build planet-scale vector tilesets from OpenStreetMap data fast.
- [Osmium](https://osmcode.org/osmium-tool/): Command line tool for working with OpenStreetMap data based on the Osmium library.
- [Tippecanoe](https://github.com/felt/tippecanoe): Build vector tilesets from large collections of GeoJSON features.
- [PMTiles](https://github.com/protomaps/PMTiles): Cloud-optimized + compressed single-file tile archives for vector and raster maps.
- [MapLibre-gl-js](https://github.com/maplibre/maplibre-gl-js): The open-source fork of Mapbox GL JS: Interactive maps in the browser, powered by vector tiles and WebGL.
- [OSM Liberty](https://github.com/maputnik/osm-liberty): A free Mapbox GL basemap style for everyone.
- [BBOX Selector](https://boundingbox.klokantech.com/): A tool for obtaining BBOX coordinates.
- [BBOX Checker](https://linestrings.com/bbox/): A tool for verifying BBOX coordinates.
- [PMTiles Viewer](https://protomaps.github.io/PMTiles/): A tool for inspecting PMTiles files.
- [MBTiles files](https://github.com/consbio/mbtileserver): Basic Go server for mbtiles.

## Next up

- Customise the planetiler-openmaptiles profile to exclude POIs and other features that aren't useful for outdoor oriented maps.
- Schedule the Github Actions workflows so that tiles are automatically periodically re-rendered with the latest source data.
- Setup related projects as submodules for more streamlined development experience.
- Setup workflows to render and host tilesets with hill shading, contour lines.

## Inspiration and Prior Art

- [NST Guide](https://nst.guide) showcases the style of outdoor oriented map and the associated [GitHub project](https://github.com/nst-guide) describes the workflow.
- [GPX rides with Maplibre and Maptiler](https://observablehq.com/@mcmcclur/gpx-rides-with-maplibre-and-maptiler) demonstrates the route overlay and altitude visualisation that can be accomplished with MapLibre-gl.
- [Creating Vector PMTiles with Tippecanoe](https://bertt.wordpress.com/2023/01/06/creating-vector-pmtiles-with-tippecanoe/) walks through the creation of a PMTile vector tileset using OSM source data (E.g. railroads).
