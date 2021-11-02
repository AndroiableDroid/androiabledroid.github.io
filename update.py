import json
import audio_metadata as am
import tbm_utils as tbm
import base64
import sys
from os import listdir
from os import remove

onlyfiles = listdir("tracks/")

data = []
for i in onlyfiles:
	if i != "tracks.json":
		item = {}
		try:
			metadata = am.load("tracks/" + i)
			item = {
				"file": str("tracks/" + i),
				"cover": "",
				"album": str(metadata['tags'].album)[1:-1][1:-1],
				"song": str(metadata['tags'].title)[1:-1][1:-1],
				"artist": str(metadata['tags'].artist)[1:-1][1:-1]
			}
			try:
				image_data = metadata['pictures'][0].data
				datauri = "data:{};base64,{}".format(metadata['pictures'][0].mime_type,str(base64.b64encode(image_data))[2:-1])
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
		except AttributeError:
			item = {
				"file": str("tracks/" + i),
				"cover": "/resources/Record.png",
				"album": "Unknown",
				"song": str(i),
				"artist": "Unknown"
			}
		except:
			print("Removed Malicious file " + i)
			remove("tracks/" + i)
			continue
		data.append(item)
with open("tracks/tracks.json", "w") as outfile:
	outfile.write(json.dumps(data, indent=4))
