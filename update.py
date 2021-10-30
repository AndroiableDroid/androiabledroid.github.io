import json
import stagger
import base64
import sys
from os import listdir

onlyfiles = listdir("tracks/")

data = []
for i in onlyfiles:
	metadata = stagger.read_tag("tracks/" + i)
	image_data = metadata['APIC'][0].data

	datauri = "data:{};base64,{}".format(metadata['APIC'][0].mime,str(base64.b64encode(image_data))[2:-1])
	item = {
			"cover": str(datauri),
			"album": str(metadata.album),
			"song": str(metadata.title),
			"artist": str(metadata.artist)
		}

	data.append(item)
with open("tracks/tracks.json", "w") as outfile:
	outfile.write(json.dumps(data, indent=4))
