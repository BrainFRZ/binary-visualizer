import json, sys, os

def getProjID():
    files = os.walk("input", topdown=True).__next__()[2]
    return files[0] if len(files) != 0 else ''

# Condense each block into lines of code to be accessed by block address for node display
def buildCodeLines(procedures):
    def buildLine(procAddr, blockAddr, instr):
        if (len(instr["label"]) != 0):
            return {"addr": instr["instruction"]["address"],
                    "label": instr["label"][0],
                    "procedure": procAddr,
                    "block": blockAddr}
        instr = instr["instruction"]
        return {"addr": instr["address"],
                "mnemonic": instr["mnemonic"],
                "args": instr["op"],
                "procedure": procAddr,
                "block": blockAddr}

    code = { }
    for pName in procedures:
        p = procedures[pName];
        pAddr = p["address"]
        for bAddr in p["blocks"]:
            call = lambda instr : buildLine(pAddr, bAddr, instr)
            code[bAddr] = list(map(call, p["blocks"][bAddr]["instructions"]))
    return code

def buildGraphs(procNames, procs):
    def buildProcsGraph(names, graphs):
        graphs["procs"] = { "graph": { } }
        for name in names:
            graphs["procs"]["graph"][name] = { }
        return graphs

    graphs = { "graphs": { } }
    graphs = buildProcsGraph(procNames, graphs["graphs"])
#    for proc in procs:
#        graphs["graphs"][proc] = buildBlockGraph(proc)
    return graphs

def main():
    projID = getProjID()
    if projID == '':
        return

    consoleArgs = sys.argv
    projData = { }
    data = { }
    with open("input/{}".format(projID)) as file:
        data = json.load(file)
    projData["code"] = buildCodeLines(data["procedures"])
    projData["graphs"] = buildGraphs(data["procedure-names"], data["procedures"])
#    projData["data"] = data

    output = {"userId": consoleArgs[1],
              "name": consoleArgs[3] if len(consoleArgs) >= 4 else "unnamed",
              "status": "done",
              "analysis": consoleArgs[2],
              "analysisInput": "Filler pending framework update",
              "analysisOutput": projData}

    with open("output/{}".format(projID), 'w+') as output_file:
        json.dump(output, output_file)


if __name__ == "__main__":
    main()
