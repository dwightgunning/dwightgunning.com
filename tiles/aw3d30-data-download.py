"""
ALOS World 3D-30m (AW3D30) Data Downloads

Requires

"""
import argparse
import concurrent.futures
import os
import ssl
import sys
import time

import httpx


class DownloadResult:
    def __init__(self):
        self.error = None

def print_summary(base_file_name, start_time, end_time, file_size):
  duration = end_time - start_time
  kb_per_sec = file_size / duration / 1024 if duration > 0 else 0
  print(f"File download complete: {base_file_name} | Start: {time.ctime(start_time)} | End: {time.ctime(end_time)} | Duration: {duration:.2f}s | Size: {file_size} bytes | Speed: {kb_per_sec:.2f} KB/s")

def download_file(url, ssl_context, headers, destination, result):
    print(f"Starting download: {url}")
    try:
        base_file_name = os.path.basename(url)
        file_name = os.path.join(destination, base_file_name)
        start_time = time.time()
        with httpx.stream("GET", url, verify=ssl_context) as response:
            if response.status_code != httpx.codes.OK:
              print(f"File downloading {base_file_name} failed due to status code {response.status_code}")
              return
            response.raise_for_status()
            with open(file_name, "wb") as file:
                for chunk in response.iter_bytes():
                    file.write(chunk)
            end_time = time.time()
            file_size = os.path.getsize(file_name)
            print_summary(base_file_name, start_time, end_time, file_size)      
    except Exception as e:
        print(e)
        result.error = e

def download_files(destination, num_threads):
    print(f"Downloading files to {destination}")
    urls = [
        f"https://www.eorc.jaxa.jp/ALOS/aw3d30/data/release_v2303/{file}"
        for file in generate_file_names()
    ]

    headers = {
        "Accept-Encoding": "gzip, deflate, br"
    }
    ssl_context = ssl.create_default_context()
    ssl_context.set_ciphers("AES256-SHA256")
    ssl_context.options |= ssl.OP_NO_TLSv1 | ssl.OP_NO_TLSv1_1  # Disable TLSv1 and TLSv1.1

    with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
        results = [DownloadResult() for _ in urls]
        futures = []
        for url, result in zip(urls, results):
            future = executor.submit(download_file, url, ssl_context, headers, destination, result)
            futures.append((future, result))

            if len(futures) >= num_threads:
                for future, result in futures:
                    if result.error:
                        executor.shutdown(wait=False)
                        raise result.error
                futures = []

        for future, result in futures:
            if result.error:
                executor.shutdown(wait=False)
                raise result.error

    print("Download completed.")

def generate_file_names():
    for lat in range(0, 81, 5):
        for lon in range(0, 181, 5):
            yield f"N{lat:03}E{lon:03}_N{lat + 5:03}E{lon + 5:03}.zip"
            yield f"N{lat:03}W{lon:03}_N{lat + 5:03}W{lon + 5:03}.zip"

    for lat in range(5, 86, 5):
        for lon in range(0, 181, 5):
            yield f"S{lat:03}E{lon:03}_S{lat - 5:03}E{lon + 5:03}.zip"
            yield f"S{lat:03}W{lon:03}_S{lat - 5:03}W{lon + 5:03}.zip"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--download",
        metavar="<destination_path>",
        help="Download the dataset files to the specified destination path"
    )
    parser.add_argument(
        "-n",
        "--num-threads",
        type=int,
        default=16,
        metavar="<num_threads>",
        help="Number of parallel downloads (default: 16)"
    )
    args = parser.parse_args()

    if args.download:
        download_files(args.download, args.num_threads)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
