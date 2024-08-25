#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import sys

def version_str_to_int(version:str)-> int:
	version_list:list = version.split(".")
	i = len(version_list)
	out = 0x0
	while (i != 0x0):
		out = out | (int(version_list[i - 0x1]) << (0x8 * (len(version_list) - i)))
		i = i - 0x1
	return (out)


file = open("./package.json")
package = json.load(file)
file.close()
if (version_str_to_int(package["version"]) & 0xFF) == 0x0:
	sys.stdout.write("")
else:
	sys.stdout.write("-beta")
