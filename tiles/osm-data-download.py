import os
import json
import requests
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urljoin

GEODATA_API = "https://download.geofabrik.de/index-v1-nogeom.json"
REGIONS_FILE = os.getenv("REGIONS_FILE")
DOWNLOAD_DIR = os.getenv("DOWNLOAD_DIR")

# Check if environment variables are set
if REGIONS_FILE is None or DOWNLOAD_DIR is None:
    print("Environment variables REGIONS_FILE and DOWNLOAD_DIR must be set.")
    sys.exit(1)

def get_geofabrik_data():
    print("Fetching Geofabrik data...")
    r = requests.get(GEODATA_API)
    return r.json()

def download_file(url, filename):
    print(f"Downloading {url}...")
    r = requests.get(url)
    with open(filename, 'wb') as f:
        f.write(r.content)
    print(f"Download complete: {filename}")

def get_most_recent_version(region, urls):
    filepath_region = region.split("/")[-1] # Accommodate regions with or without subdirectories in the name "andorra" and "us/washington"
    print(f"Getting most recent version for {region}...")
    # URLs excluding the 'latest' URLs.
    version_urls = [url for url in urls if filepath_region in url and 'latest' not in url]

    # Sort by date in reverse order (most recent first).
    version_urls.sort(key=lambda url: re.search(r'(\d{6})\.osm\.pbf$', url).group(1), reverse=True)

    # Return the first URL (most recent version), or None if the list is empty.
    return version_urls[0] if version_urls else None

def main():
    geofabrik_data = get_geofabrik_data()
    geofabrik_features = {feature['properties']['id']: feature for feature in geofabrik_data['features']}

    with open(REGIONS_FILE) as f:
        regions = json.load(f)

    # create a set of all region names we are interested in
    region_names = set(name for tile_area in regions.values() for name in tile_area.get('geofabrikRegions', []))
        
    # build a map of region names to the most recent version URLs
    region_to_url = {}
    region_names_with_geofabriek_data = set()
    for region in region_names:
        feature = geofabrik_features.get(region)
        if feature is None:
            print(f"Geofabriek region '{region}' not found in the region index json")
            sys.exit(1)


        region_names_with_geofabriek_data.add(feature['properties']['id'])
        # Get the base URL for this region.
        base_url = urljoin(feature['properties']['urls']['pbf'], "./")
        
        print(f"Fetching version list for {feature['properties']['id']} from {base_url}...")

        # # Get the list of URLs for this region.
        r = requests.get(base_url)
        urls = re.findall(r'href="([^"]*\.osm\.pbf)"', r.text)

        # Find the most recent version.
        most_recent_version = get_most_recent_version(feature['properties']['id'], urls)
        if most_recent_version is None:
            print(f"Unable to find Geofabriek osm file for {feature['properties']['id']}")
            sys.exit(1)
        else:
            region_to_url[feature['properties']['id']] = urljoin(base_url, most_recent_version)

    regions_without_geofabriek_data = region_names - region_names_with_geofabriek_data
    if regions_without_geofabriek_data:
        print(f"Regions with no Geofabriek data: {regions_without_geofabriek_data}")
        sys.exit(1)

    # make sure download directory exists
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)

    downloaded_files = []
    # download all files in parallel
    with ThreadPoolExecutor(max_workers=5) as executor:
        for region, url in region_to_url.items():
            filename = os.path.join(DOWNLOAD_DIR, f'{os.path.basename(url)}')
            downloaded_files.append(filename)
            if not os.path.exists(filename):
                executor.submit(download_file, url, filename)
            else:
                print(f"File already exists: {filename}")

    # remove files that were not downloaded
    stale_files = [os.path.join(DOWNLOAD_DIR, f) for f in os.listdir(DOWNLOAD_DIR) if os.path.isfile(os.path.join(DOWNLOAD_DIR, f)) and os.path.join(DOWNLOAD_DIR, f) not in downloaded_files]
    for stale_file in stale_files:
      print(f"Deleting stale file: {stale_file}")
      os.remove(stale_file)


if __name__ == '__main__':
    main()
