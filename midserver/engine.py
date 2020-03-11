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

def buildGraphs(funcNames, funcs, refTree, funcLookup):
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
                l = re.match(r'\((.+)\s', link).group(1)
                addr = re.match(r'\d+', l)
                if addr == None:
                    graph["graph"][bAddr][l] = {"style": {"line-style": "dashed"}}
                    if l not in graph["graph"]:
                        graph["graph"][l] = {}
                elif (addr.group(0) not in refTree["funcs"][func]) and (int(addr.group(0)) in funcLookup.keys()):
                    label = "ref: {}".format(funcLookup[int(addr.group(0))])
                    graph["graph"][bAddr][label] = {"style": {"line-style": "dashed"}}
                    graph["graph"][label] = {}
                else:
                    graph["graph"][bAddr][addr.group(0)] = {}
                    if addr not in graph["graph"]:
                        graph["graph"][addr.group(0)] = {}
        return graph

    graphs = {}
    graphs["funcs"] = buildFuncsGraph()
    for f in funcs:
        graphs[f] = buildBlocksGraph(f)
    graphs["blocks"] = {"graph": {}, "start": []}
    return graphs

def buildFuncLookup(funcs):
    lookup = {}
    for fName in funcs:
        lookup[funcs[fName]["address"]] = fName
    return lookup

def buildRefTree(funcs):
    tree = {"funcs": {}, "blocks": {}}
    for fName in funcs:
        func = funcs[fName]
        tree["funcs"][fName] = list(func["blocks"].keys()) # block addrs
        for bAddr in func["blocks"]:
            brefs = []
            instrs = func["blocks"][bAddr]["instructions"]
            for i in instrs:
                brefs.append(i["instruction"]["address"])
            tree["blocks"][bAddr] = brefs
    return tree

def main():
    projID = getProjID()
    if projID == '':
        return

    consoleArgs = sys.argv
    projData = { }
    data = { }
    with open("input/{}".format(projID)) as file:
        data = json.load(file)
    funcs = data["procedures"]
    funcNames = data["procedure-names"]
    projData["code"] = buildCodeLines(funcs)
    projData["funcs"] = funcNames
    projData["funcLookup"] = buildFuncLookup(funcs)
    projData["refTree"] = buildRefTree(funcs)
    projData["graphs"] = buildGraphs(funcNames, funcs, projData["refTree"], projData["funcLookup"])


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