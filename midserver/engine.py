import json, sys, os, re

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

def buildGraphs(funcNames, funcs):
    def buildFuncsGraph():
        graph = {"graph": {}, "start": []}
        for name in funcNames:
            graph["graph"][name] = {}
        return graph
    def buildBlocksGraph(func):
        f = funcs[func]
        graph = {"graph": {}, "start": [f["address"]]}
        for bAddr in f["blocks"]:
            graph["graph"][bAddr] = {}
            for link in f["blocks"][bAddr]["links"]:
                addr = re.search("\d+", link)
                if addr != None:
                    graph["graph"][bAddr][addr.group(0)] = {}
        return graph

    graphs = {}
    graphs["funcs"] = buildFuncsGraph()
    for f in funcs:
        graphs[f] = buildBlocksGraph(f)
    graphs["states"] = {"graph": {}, "start": []}
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
    projData["funcs"] = data["procedure-names"]

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
