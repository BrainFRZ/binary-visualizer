import json, sys, os

MNEMONIC_WIDTH = 8

def getProjID():
    files = os.walk("input", topdown=True).__next__()[2]
    return files[0] if len(files) != 0 else ''

# Condense each block into lines of code to be accessed by block address for node display
def buildCodeLines(procedures):
    def buildLine(procAddr, blockAddr, instr):
        if (len(instr["label"]) != 0):
            return {"addr": instr["instruction"]["address"],
                    "code": "{}:".format(instr["label"][0]),
                    "procedure": procAddr,
                    "block": blockAddr}
        instr = instr["instruction"]
        instrCode = ""
        if (len(instr["op"]) == 0):
            instrCode = instr["mnemonic"]
        else:
            instrCode = ("{0:" + str(MNEMONIC_WIDTH) + "}{1}")  \
                            .format(instr["mnemonic"], ", ".join(instr["op"]))
        return {"addr": instr["address"],
                "code": instrCode,
                "procedure": procAddr,
                "block": blockAddr}

    code = { }
    for p in procedures:
        pAddr = p["address"]
        for block in p["blocks"]:
            bAddr = block["address"]
            call = lambda instr : buildLine(pAddr, bAddr, instr)
            code[bAddr] = list(map(call, block["instructions"]))
    return code

def buildGraphs(procNames, procs):
    def buildProcsGraph(names, graphs):
        graph = graphs["procs"] = { }
        for name in names:
            graph[name] = { }
        return graph

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
              "code": "Filler pending framework update",
              "status": "done",
              "analysis": consoleArgs[2],
              "items": projData}

    with open("output/{}".format(projID), 'w+') as output_file:
        json.dump(output, output_file)


if __name__ == "__main__":
    main()
