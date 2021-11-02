import json
import stagger
import base64
import sys
from os import listdir

onlyfiles = listdir("tracks/")

data = []
for i in onlyfiles:
	if i != "tracks.json":
		item = {}
		try:
			metadata = stagger.read_tag("tracks/" + i)
			item = {
				"file": str("tracks/" + i),
				"cover": "",
				"album": str(metadata.album),
				"song": str(metadata.title),
				"artist": str(metadata.artist)
			}
			try:
				image_data = metadata['APIC'][0].data
				datauri = "data:{};base64,{}".format(metadata['APIC'][0].mime,str(base64.b64encode(image_data))[2:-1])
				item["cover"] = str(datauri)
			except:
				item["cover"] = "/resources/Record.png"
			finally:
				if item["album"] == "":
					item["album"] = "Unknown"
				if item["artist"] == "":
					item["artist"] = "Unknown"
				if item["song"] == "":
					item["song"] = str(i)
		except:
			item = {
				"file": str("tracks/" + i),
				"cover": "/resources/Record.png",
				"album": "Unknown",
				"song": str(i),
				"artist": "Unknown"
			}
		data.append(item)
with open("tracks/tracks.json", "w") as outfile:
	outfile.write(json.dumps(data, indent=4))
